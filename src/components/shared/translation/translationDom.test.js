// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { restoreEnglish, scanWords } from '@/components/shared/translation/translationDom';

vi.mock('@/components/shared/translationMemory', () => ({ producedWords: () => new Set() }));

beforeEach(() => {
  restoreEnglish();
  document.body.innerHTML = '';
});

describe('returning to English without rescanning the page', () => {
  it('does not walk an untranslated document', () => {
    document.body.innerHTML = '<p>The record</p>';
    const walk = vi.spyOn(document, 'createTreeWalker');
    restoreEnglish();
    expect(walk).not.toHaveBeenCalled();
    expect(document.body.textContent).toBe('The record');
    walk.mockRestore();
  });

  it('restores text and placeholders after a translated language', () => {
    document.body.innerHTML = '<p>The record</p><input placeholder="Search" />';
    scanWords({ 'The record': 'Le registre', Search: 'Rechercher' });
    expect(document.querySelector('p').textContent).toBe('Le registre');
    restoreEnglish();
    expect(document.querySelector('p').textContent).toBe('The record');
    expect(document.querySelector('input').placeholder).toBe('Search');
  });

  it('preserves newer content already rendered by the page', () => {
    document.body.innerHTML = '<p>The record</p>';
    scanWords({ 'The record': 'Le registre' });
    document.querySelector('p').firstChild.nodeValue = 'A new entry';
    restoreEnglish();
    expect(document.querySelector('p').textContent).toBe('A new entry');
  });

  it('releases removed nodes and allows another language afterwards', () => {
    document.body.innerHTML = '<p>The record</p>';
    scanWords({ 'The record': 'Le registre' });
    document.body.innerHTML = '<p>The record</p>';
    restoreEnglish();
    scanWords({ 'The record': 'El registro' });
    expect(document.querySelector('p').textContent).toBe('El registro');
    restoreEnglish();
    expect(document.querySelector('p').textContent).toBe('The record');
  });
});