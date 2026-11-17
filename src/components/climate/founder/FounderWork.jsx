import React from 'react';
import { Globe, BookOpen, Film, Award } from 'lucide-react';

const ACHIEVEMENTS = [
  { icon: Globe, title: 'Horizon International', body: 'Founder of Horizon International, at Yale University and formerly a Guest of Harvard University. For forty years it worked to find and advance solutions to the interrelated concerns of global health, environment, and poverty.' },
  { icon: BookOpen, title: 'Two Books, 75 Experts', body: 'She conceived and was Editor of two books, with original chapters written by 75 experts, published by Wiley-Blackwell with Horizon International: Water and Sanitation-Related Diseases and the Environment — Challenges, Interventions, and Preventive Measures, and Water and Sanitation-Related Diseases and the Changing Environment — Challenges, Interventions, and Preventive Measures. The Late Dr. Paul Farmer, University Professor at Harvard and Co-Founder of Partners In Health, wrote the Foreword.' },
  { icon: Film, title: '20 Television Documentaries', body: 'Under her direction as Executive Producer, Producer, and Director, Horizon International produced 20 television documentaries — many addressing climate change, from the loss of coral reefs to sustainable energy. Swedish, German, Chinese, and Mexican TV stations were among the co-producers. Lynn Redgrave, Raso Ouedraogo, Johan Forssblad, and Sam Waterston were among the hosts and narrators.' },
  { icon: Award, title: 'Recognition & Attribution', body: 'National Science Foundation PI for a grant on oceans. Collaborator with several UN entities. Lecturer at Harvard, Yale, Tufts, and Johns Hopkins. Speaker at the World Bank, for the Government of Pakistan, and for the Princess Chulabhorn conference in Thailand. Cancer research at Tufts New-England Medical Center. The UN attributed her and her Horizon team with advancing shea butter production and use by women and children. IUCN, WWF, and the government of Peru attributed her with helping save the vicuña. Horizon International endorsed the One Health Initiative in 2013 — medicine, veterinary science and the environment working as one — joining more than 700 scientists and physicians worldwide. Fellow Emeritus of the Explorers Club, 1996.' },
];

export default function FounderWork() {
  return (
    <section aria-labelledby="founder-work" className="mx-auto my-6 max-w-4xl space-y-5 lg:my-8 lg:space-y-6">
      <div className="record-continuous-band border-y border-record-paper/30 px-5 py-6 text-center lg:px-10">
        <h2 id="founder-work" className="record-header-type text-lg text-record-signal lg:text-2xl">The Record of the Work</h2>
      </div>
      {ACHIEVEMENTS.map(({ icon: Icon, title, body }) => (
        <article key={title} className="record-founder-plate border-t-4 border-record-red bg-record-paper p-5 lg:p-8">
          <div className="mb-5 flex items-start gap-3">
            <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-record-red" />
            <h3 className="record-header-type text-sm leading-relaxed text-record-ink lg:text-base">{title}</h3>
          </div>
          <p className="text-record-ink">{body}</p>
        </article>
      ))}
    </section>
  );
}