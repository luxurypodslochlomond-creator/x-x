import React from "react";

export default function FamilyLoveStory() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ background: "radial-gradient(ellipse at top, #f7f3ec 0%, #ece4d3 100%)" }}>
      <iframe
        src="/family-love-story.html"
        title="Family — You'll Never Walk Alone"
        className="w-full max-w-md h-[600px] border-0"
        style={{ borderRadius: 20, boxShadow: "0 20px 60px -20px rgba(0,0,0,0.18)" }}
      />
    </div>
  );
}