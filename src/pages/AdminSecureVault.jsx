import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Lock, AlertTriangle } from "lucide-react";
import VaultEntry from "@/components/admin/VaultEntry";

export default function AdminSecureVault() {
  const [user, setUser] = useState(undefined);
  const [entries, setEntries] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    base44.auth
      .me()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (user?.role !== "admin") return;
    base44.entities.SecureVault.list({ sort: "sort_order", limit: 200 })
      .then((page) => setEntries(page.items))
      .catch((e) => setError(e?.message || "Could not open the vault."));
  }, [user]);

  if (user === undefined) {
    return (
      <div className="min-h-screen beadie-paper flex items-center justify-center">
        <p className="font-mono text-xs tracking-[0.3em] beadie-muted">OPENING VAULT…</p>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen beadie-paper flex items-center justify-center px-6">
        <div className="border-2 border-[#1a1612] p-8 text-center max-w-sm">
          <Lock className="w-10 h-10 mx-auto beadie-ink" />
          <h1 className="mt-4 font-display text-2xl beadie-ink">Vault is locked</h1>
          <p className="mt-2 text-sm beadie-muted">
            Only admins can open the vault.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen beadie-paper flex items-center justify-center px-6">
        <div className="border-2 border-[#b3261e] p-8 text-center max-w-sm">
          <AlertTriangle className="w-10 h-10 mx-auto beadie-signal" />
          <p className="mt-4 text-sm beadie-ink">{error}</p>
        </div>
      </div>
    );
  }

  if (!entries) {
    return (
      <div className="min-h-screen beadie-paper flex items-center justify-center">
        <p className="font-mono text-xs tracking-[0.3em] beadie-muted">OPENING VAULT…</p>
      </div>
    );
  }

  const sections = [];
  entries.forEach((entry) => {
    let section = sections.find((s) => s.name === entry.section);
    if (!section) {
      section = { name: entry.section, items: [] };
      sections.push(section);
    }
    section.items.push(entry);
  });

  return (
    <div className="min-h-screen beadie-paper px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3">
          <Lock className="w-7 h-7 beadie-ink" />
          <h1 className="font-display text-3xl beadie-ink">Secure Vault</h1>
        </div>
        <p className="mt-3 text-sm beadie-muted leading-relaxed">
          Everything private about the CIC, held in one place. Only admins can open this —
          it is never sent to anyone else&apos;s browser. Use the copy button beside a value.
        </p>

        <div className="mt-8 space-y-10">
          {sections.map((section) => (
            <section key={section.name}>
              <h2 className="border-b-2 border-[#1a1612] pb-2 font-mono text-xs font-bold uppercase tracking-widest beadie-ink">
                {section.name}
              </h2>
              <div className="mt-3 space-y-2">
                {section.items.map((entry) => (
                  <VaultEntry key={entry.id} entry={entry} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 border-t border-[#1a1612]/15 pt-4 text-xs beadie-muted leading-relaxed">
          The old Companies House and admin pages still hold their own copies until we move them
          across. Nothing here replaces them yet — this is the safe home they are moving into.
        </p>
      </div>
    </div>
  );
}