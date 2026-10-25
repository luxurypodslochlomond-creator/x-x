// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock('@/api/base44Client', () => ({ base44: { functions: { invoke } } }));
import { getDictionary, mergeDictionary, splitWords, translateWords } from '@/components/shared/translation/translationCache';
import { scanWords } from '@/components/shared/translation/translationDom';
import translationSession from '@/components/shared/translation/translationSession';

beforeEach(() => {
  document.body.innerHTML = '';
  localStorage.clear();
  invoke.mockReset();
});

describe('source text and language switching', () => {
  it('switches between non-English languages and restores English exactly', () => {
    document.body.innerHTML = '<p>  A public record  </p><input placeholder="Search a language">';
    scanWords({ 'A public record': 'Un registre public', 'Search a language': 'Chercher une langue' });
    expect(document.querySelector('p').textContent).toBe('  Un registre public  ');
    scanWords({ 'A public record': 'ᎪᏪᎵ', 'Search a language': 'ᎠᏯᏍᏗ' });
    expect(document.querySelector('p').textContent).toBe('  ᎪᏪᎵ  ');
    scanWords({}, true);
    expect(document.querySelector('p').textContent).toBe('  A public record  ');
    expect(document.querySelector('input').placeholder).toBe('Search a language');
  });

  it('does not blacklist an English word that another language left unchanged', () => {
    document.body.innerHTML = '<p>Support</p>';
    scanWords({ Support: 'Support' });
    scanWords({ Support: 'Apoyo' });
    expect(document.querySelector('p').textContent).toBe('Apoyo');
  });

  it('replaces corrected cached wording using the source, not a substring of the translation', () => {
    document.body.innerHTML = '<p>Wire</p>';
    scanWords({ Wire: 'Ancien mot' });
    scanWords({ Wire: 'Actualités' });
    expect(document.querySelector('p').textContent).toBe('Actualités');
  });

  it('uses newly rendered source text when React changes a node', () => {
    document.body.innerHTML = '<p>First headline</p>';
    scanWords({ 'First headline': 'Premier titre' });
    document.querySelector('p').firstChild.nodeValue = 'Next headline';
    scanWords({ 'Next headline': 'Nächste Meldung' });
    expect(document.querySelector('p').textContent).toBe('Nächste Meldung');
    scanWords({}, true);
    expect(document.querySelector('p').textContent).toBe('Next headline');
  });

  it('leaves language names, original-entry text and typed input alone', () => {
    document.body.innerHTML = '<p data-no-translate>English</p><textarea>Private input</textarea><select><option>Cherokee</option></select><p>Founder</p>';
    expect(scanWords({})).toEqual(['Founder']);
    scanWords({ English: 'Wrong', Cherokee: 'Wrong', Founder: 'Fundadora' });
    expect(document.querySelector('[data-no-translate]').textContent).toBe('English');
    expect(document.querySelector('textarea').value).toBe('Private input');
    expect(document.querySelector('option').textContent).toBe('Cherokee');
  });

  it('includes long founder paragraphs instead of silently skipping them', () => {
    const text = 'A long sourced biography. '.repeat(80);
    document.body.innerHTML = '<p></p>';
    document.querySelector('p').textContent = text;
    expect(scanWords({})).toEqual([text.trim()]);
  });
});

describe('requests and page lifetimes', () => {
  it('actually respects the character budget and deduplicates repeated words', () => {
    const words = Array.from({ length: 12 }, (_, i) => `${i}${'x'.repeat(900)}`);
    const pieces = splitWords([...words, words[0]]);
    expect(pieces.flat()).toHaveLength(12);
    expect(pieces.every((piece) => piece.join('').length <= 3000)).toBe(true);
  });

  it('does not save a failed translation as an English success', async () => {
    invoke.mockResolvedValue({ data: { translations: { s0: null }, incomplete: true } });
    const result = await translateWords('missing-test', ['A source sentence']);
    expect(result.incomplete).toBe(true);
    expect(getDictionary('missing-test')['A source sentence']).toBeUndefined();
  });

  it('keeps a late response in its own language without repainting the new page', async () => {
    let finishOld;
    const oldAnswer = new Promise((resolve) => { finishOld = resolve; });
    invoke.mockImplementation((name, payload) => {
      if (name === 'serveClimateTongue') return Promise.resolve({ data: { dict: {} } });
      if (payload.lang === 'old-test') return oldAnswer;
      return Promise.resolve({ data: { translations: { s0: 'Neue Seite' } } });
    });
    document.body.innerHTML = '<p>Record page</p>';
    const oldUpdate = vi.fn();
    const stopOld = translationSession('old-test', oldUpdate);
    await vi.waitFor(() => expect(invoke).toHaveBeenCalledWith('translateClimate', expect.objectContaining({ lang: 'old-test' })));
    stopOld();
    document.body.innerHTML = '<p>Founder page</p>';
    const stopNew = translationSession('new-test', vi.fn());
    await vi.waitFor(() => expect(document.querySelector('p').textContent).toBe('Neue Seite'));
    const oldCalls = oldUpdate.mock.calls.length;
    finishOld({ data: { translations: { s0: 'Ancienne page' } } });
    await vi.waitFor(() => expect(getDictionary('old-test')['Record page']).toBe('Ancienne page'));
    expect(document.querySelector('p').textContent).toBe('Neue Seite');
    expect(oldUpdate).toHaveBeenCalledTimes(oldCalls);
    stopNew();
  });

  it('translates late-arriving wire content without translating its own writes again', async () => {
    invoke.mockImplementation((name, payload) => {
      if (name === 'serveClimateTongue') return Promise.resolve({ data: { dict: { Wire: 'Fil' } } });
      return Promise.resolve({ data: { translations: Object.fromEntries(Object.keys(payload.strings).map((key) => [key, 'Titre traduit'])) } });
    });
    document.body.innerHTML = '<h1>Wire</h1>';
    const stop = translationSession('wire-test', vi.fn());
    await vi.waitFor(() => expect(document.querySelector('h1').textContent).toBe('Fil'));
    document.body.insertAdjacentHTML('beforeend', '<p>A late headline</p>');
    await vi.waitFor(() => expect(document.querySelector('p').textContent).toBe('Titre traduit'));
    expect(invoke.mock.calls.filter(([name]) => name === 'translateClimate')).toHaveLength(1);
    stop();
  });

  it('merges server updates into the existing dictionary object, not a replacement', () => {
    const first = getDictionary('same-object-test');
    mergeDictionary('same-object-test', { Founder: 'Fondatrice' });
    expect(getDictionary('same-object-test')).toBe(first);
    expect(first.Founder).toBe('Fondatrice');
  });
});