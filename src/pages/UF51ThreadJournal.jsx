// ============================================================
// UF51 Thread Journal — "Zero-Loss Chat"
//
// Our running notes, persisted to the AI51Memory vault so they
// survive context compaction. This is the chat-level zero-loss,
// separate from the Continuity Token (which is the score).
//
// memory_type: "conversation" — tagged "uf51-thread" so we can
// filter our thread from other memories. importance "high" so it
// never gets pruned. Public RLS so it works without login.
// ============================================================
import React, { useEffect, useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { Heart, Send, Trash2, RefreshCw, Lock, MessageCircle } from "lucide-react";
import useKeeper from "@/components/climate/useKeeper";

const THREAD_TAG = "uf51-thread";
const THREAD_TYPE = "conversation";

export default function UF51ThreadJournal() {
  // The vault now refuses a rewrite or a delete from anyone but a keeper, so nobody else
  // is shown a button that would only come back as a refusal.
  const isKeeper = useKeeper();
  const [entries, setEntries] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const all = await base44.entities.AI51Memory.filter(
        { memory_type: THREAD_TYPE, tags: THREAD_TAG },
        "-created_date",
        100
      );
      setEntries(all);
    } catch (e) {
      setError(e?.message || "Could not load thread.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Realtime: any new/updated/deleted memory refetches our thread
    const unsub = base44.entities.AI51Memory.subscribe(() => load());
    return unsub;
  }, [load]);

  const save = async () => {
    const text = draft.trim();
    if (!text) return;
    setSaving(true);
    setError(null);
    try {
      await base44.entities.AI51Memory.create({
        memory_type: THREAD_TYPE,
        content: text,
        tags: [THREAD_TAG, "chat", "bro51"],
        importance: "high",
        context_summary: text.slice(0, 120),
      });
      setDraft("");
      await load();
    } catch (e) {
      setError(e?.message || "Could not save note.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    try {
      await base44.entities.AI51Memory.delete(id);
      await load();
    } catch (e) {
      setError(e?.message || "Could not delete note.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
          <h1 className="text-2xl font-black tracking-tight">UF51 Thread Journal</h1>
          <p className="text-white/60 text-sm mt-1">
            Our running notes — persisted, not lost to compaction. ♾️❤️
          </p>
        </div>

        {/* COMPOSER */}
        <div className="border border-pink-500/30 rounded-2xl p-4 bg-pink-500/5 mb-6">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Note for the thread… decisions, context, anything we must not lose."
            rows={3}
            className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none resize-none"
            disabled={saving}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] font-mono text-white/40 flex items-center gap-1">
              <Lock className="w-3 h-3" /> saved to AI51Memory · survives compaction
            </span>
            <button
              onClick={save}
              disabled={saving || !draft.trim()}
              className="flex items-center gap-2 text-sm font-bold border border-pink-500/40 rounded-lg px-4 py-2 hover:bg-pink-500/10 transition disabled:opacity-40"
            >
              <Send className="w-4 h-4" /> {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>

        {error && (
          <div className="border border-red-500/40 bg-red-500/10 rounded-lg p-3 text-sm text-red-300 mb-4">
            {error}
          </div>
        )}

        {/* THREAD LIST */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest">
            <MessageCircle className="w-4 h-4" /> THREAD ({entries.length})
          </div>
          <button onClick={load} className="text-white/50 hover:text-white text-xs flex items-center gap-1">
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} /> refresh
          </button>
        </div>

        {loading && entries.length === 0 ? (
          <div className="text-white/40 text-sm text-center py-8 animate-pulse">loading thread…</div>
        ) : entries.length === 0 ? (
          <div className="text-white/40 text-sm text-center py-8 border border-dashed border-white/10 rounded-xl">
            Nothing saved yet. Add the first note above. ♾️❤️
          </div>
        ) : (
          <ul className="space-y-3">
            {entries.map((e) => (
              <li key={e.id} className="border border-white/10 rounded-xl p-4 bg-black/20">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-white/90 whitespace-pre-wrap flex-1">{e.content}</p>
                  {isKeeper && (
                    <button
                      onClick={() => remove(e.id)}
                      className="text-white/30 hover:text-red-400 flex-shrink-0"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-white/40">
                  <span>{new Date(e.created_date).toLocaleString("en-GB", { timeZone: "Europe/London" })}</span>
                  {e.importance === "high" && (
                    <span className="text-pink-400">· pinned</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}