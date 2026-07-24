/**
 * SORTED LLM — Shared LLM caller with automatic fallback.
 *
 * Every SORTED tool routes through this so a premium-model hiccup
 * (rate limit, credit exhaustion, transient outage) never leaves the
 * user with nothing. Tries the preferred model first, then falls back
 * to the platform's default (automatic) model.
 *
 * @param {object} opts - InvokeLLM options (prompt, response_json_schema, file_urls, model?)
 * @returns {Promise<object|string>} - the LLM response
 */
import { base44 } from '@/api/base44Client';

export async function callSortedLLM(opts) {
  const preferred = opts.model || 'claude_sonnet_4_6';
  const { model: _drop, ...callOpts } = opts;

  try {
    return await base44.integrations.Core.InvokeLLM({ ...callOpts, model: preferred });
  } catch (primaryErr) {
    console.warn('[SORTED] primary model failed, falling back to default:', primaryErr?.message);
    // Never leave the user with nothing — retry on the automatic model.
    return await base44.integrations.Core.InvokeLLM(callOpts);
  }
}