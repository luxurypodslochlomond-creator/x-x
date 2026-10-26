import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Lock } from "lucide-react";
import { ROAD_DOC } from "@/components/uf51road/roadDoc";
import { buildRoadPdf } from "@/components/uf51road/buildRoadPdf";
import RoadCoverCard from "@/components/uf51road/RoadCoverCard";
import RoadSectionList from "@/components/uf51road/RoadSectionList";

export default function Uf51Road() {
  const [busy, setBusy] = useState(false);

  const download = () => {
    setBusy(true);
    try {
      buildRoadPdf().save("UF51-ROAD-Merrick-Starr.pdf");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-record-paper text-record-ink px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[10px] font-black tracking-[0.3em] text-[#b3261e]">
          UF51 · WORKER No. 01
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-black tracking-tight">
          The road, in one file
        </h1>
        <p className="mt-3 max-w-xl font-mono text-[11px] leading-relaxed text-record-muted">
          Nine pages of paper for Merrick: the job title, the money, the dates, the people to ring,
          the duties, and the door that leads to forever. Download it, keep it, hand it to him.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
          <Button
            onClick={download}
            disabled={busy}
            className="w-full sm:w-auto bg-[#b3261e] hover:bg-[#8f1e18] text-record-paper font-display font-black tracking-wide"
          >
            <Download className="w-4 h-4 mr-2" />
            {busy ? "Making the file" : "Download the PDF"}
          </Button>
          <p className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-record-muted">
            <Lock className="w-3 h-3" /> PRIVATE · ADMINS ONLY · NOTHING PUBLIC
          </p>
        </div>

        <div className="mt-9">
          <RoadCoverCard />
        </div>

        <div className="mt-9">
          <p className="font-mono text-[10px] font-black tracking-[0.3em] text-[#b3261e]">
            WHAT IS INSIDE
          </p>
          <div className="mt-4">
            <RoadSectionList />
          </div>
        </div>

        <p className="mt-8 font-mono text-[11px] leading-relaxed text-record-muted">
          {ROAD_DOC.made} Fees change every April, so the file carries its own date and says so.
        </p>
        <p className="mt-6 font-mono text-sm font-black tracking-[0.35em] text-[#b3261e]">x = x</p>
      </div>
    </div>
  );
}