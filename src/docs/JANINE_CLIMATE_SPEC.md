# Janine Selendy — Together We Change Climate — Platform Specification

> **Source:** `WebPlatformbasicfeatures093016262.docx` (sent by Janine M. H. Selendy, 30 Sep 2026)
> **Profile:** `JanineSelendyProfile0918262.docx`
> **Context letter:** `platformrequestShermanandPeter2.docx` (to Sherman & Peter, re: pro bono web platform creators)
> **Email:** 9 Oct 2026 — "Most of what you need right now is in the outline I sent you. We will need many more categories and I will address that as I feel better."

---

## HER MANTRA

> **"Together we can change the course of climate change."**

---

## HER FULL SPEC (verbatim)

### Purpose
Spread knowledge of climate emergencies and of efforts to mitigate climate change using the 7.4 billion smartphones, social media, and a well-organized, fast Wiki-like platform.

Share immediate knowledge of climate emergencies and positive actions on an international scale. As people are aware of endeavors underway, they will gain a sense of hope for our suffering planet and be encouraged to do what they themselves can do.

At every scale, from individuals to whole countries, initiatives are underway that can set examples for others for replication in whole or in part.

Examples: seagrass protection, mangrove planting, using dual-purpose cow peas to see farmers through drought and floods, simple gestures of adding a sweater, buying less, walking, using mass transportation, poor women collecting plastics from the streets of Ouagadougou (Burkina Faso), to Uruguay today generating over 98% of its electricity from wind, hydro, biomass, solar.

References: Sir David Attenborough's "The Year the Earth Changed" documentary. WHO "Stay Home" Covid response → CO₂ down 5%, air pollution down dramatically, Himalayas visible for first time in 30 years, LA best air quality in 40 years.

Dr. Jane Goodall: "Every single day, we hold the power to shape the world around us."

---

### Features She Asked For

| # | Feature | Her Words | Status |
|---|---------|-----------|--------|
| 1 | **Name** | Alternatives or use the mantra | ✅ Done — mantra is the title |
| 2 | **Sign in: Email required** | "Email required for submission and interaction in groups" | ❌ **MISS** — no email enforcement |
| 3 | **Privacy** | "Addresses general, no need to infringe on privacy, just enough for rough mapping" | ✅ Done — `region_rough` |
| 4 | **Connectivity** | "Very fast 2-3 seconds to connect" | ✅ Done |
| 5 | **Capacity** | "Handle millions of users" | ✅ Done |
| 6 | **Design** | "Captivating alternating photographs across top" | ✅ Done — featured carousel |
| 7 | **Images** | "Vibrant images top and throughout. Tap on image to go to summary" | ✅ Done |
| 8 | **Categories** | agriculture (water supply, drought, resilient crops), water, heat, coastal erosion protection, seagrasses, mangroves, oceans, zooplankton, phytoplankton, forest preservation, rewilding, urban geodesign, transportation, EV, renewable energy, solar powered desalination, etc. + climate crises (drought, flooding) | ✅ Done — all in enum. **More coming from Janine.** |
| 9 | **Subcategories** | "agriculture subcategories (water supply, drought, resilient crops)" | ⚠️ Field exists but free text, not structured |
| 10 | **Group gatherings** | "people designing plastic shelters, plastic clothes, saving seagrasses, in an area or region can share directly" | ✅ Done — `ClimateGroup` entity |
| 11 | **Comments** | "Comments: Enable" | ❌ **MISS** — no comments on entries |
| 12 | **Solutions Summaries** | Positive actions (see solutions-site.org) | ✅ Done — `entry_type: solution` |
| 13 | **Climate Crisis Summaries** | drought, flooding, extreme weather alerts | ✅ Done — `entry_type: climate_crisis` |
| 14 | **Descriptions** | "short descriptions and more details (LinkedIn and Solutions-site.org examples)" | ✅ Done — `summary` + `details` |
| 15 | **Topics** | See Horizon International Solutions Site examples | ✅ Done |
| 16 | **Images** | "capacity to add and make easy to view (copyright free images)" | ✅ Done — `image_url` + `image_credit` |
| 17 | **Music** | "theme song when produced" | ⚠️ Future — "when produced" |
| 18 | **Translations** | "Instant translations" — Google Translate 243-249 languages | ✅ Done — `translateClimate` + `useEntryTranslation` |
| 19 | **Spam filter** | "Additional oversight (LinkedIn, other social media means of clearance) might be arranged with UNDP (with 1180 regional offices) and other international entities" | ❌ **MISS** — no spam/oversight on submissions |
| 20 | **Mapping** | "Ready to be able to add mapping, for example by ESRI (ESRI may provide mapping) showing locations of climate crisis or positive action" | ❌ **MISS** — not yet implemented |
| 21 | **Public service statement** | "This platform is provided as a public service to help save our planet." | ✅ Done — "A public service · for the world" |
| 22 | **No advertising** | Explicit | ✅ Done |
| 23 | **No fund raising** | Explicit | ✅ Done |
| 24 | **Donations welcome** | "Donations welcome...made to...." | ⚠️ Says "welcome" but **no destination specified** — Janine needs to tell us where |
| 25 | **Definitions** | "(add definitions)" — she provided 3: Geodesign, Rewilding, Heat | ⚠️ We have Geodesign + Rewilding. **Missing: Heat definition** + more to add |

---

### Definitions She Provided (verbatim)

**Geodesign:**
> A set of concepts and methods used to involve all stakeholders and various professions in collaboratively designing and realizing the optimal solution for spatial challenges in the built and natural environments, utilizing all available techniques and data in an integrated process. GeoDesign is a methodology that provides the context and content for making spatial decisions. It provides the practical means for implementing change. Originally, geodesign was mainly applied during the design and planning phase. Now, it is also used during realization and maintenance phases and to facilitate re-use of for example buildings or industrial areas. Geodesign includes project conceptualization, analysis, design specification, stakeholder participation and collaboration, design creation, simulation, and evaluation (among other stages).
> Source: Wikipedia, accessed 081726

**Rewilding:**
> A large-scale conservation approach focused on restoring damaged ecosystems and returning them to a state where nature can take care of itself. Instead of constantly managing a landscape, rewilding reduces human control, brings back missing native species, and lets natural processes like grazing and flooding shape the environment.
> Source: AI generated 081726, multiple references

**Heat:**
> Guardian article 081626: In England: "Unite [a union] has been warning about all this since the phases of intense heat that began back in May; its members, the union says, have experienced 'heat exhaustion, heatstroke and dehydration'."

---

## WHAT WE'VE MISSED — Priority Order

### Critical (she explicitly asked, we don't have)
1. **Comments** — "Comments: Enable" — zero comments on entries
2. **Email required for submission** — "Email required for submission and interaction in groups"
3. **Spam filter / oversight** — she wants clearance before publication

### Moderate (she mentioned, we're partial)
4. **Heat definition** — she provided one, we don't display it
5. **More definitions** — she says "(add definitions)" for other categories
6. **Donations destination** — "made to...." — we say "welcome" but don't say where
7. **Mapping (ESRI)** — architecturally defined, not built

### Low priority / future
8. **Music / theme song** — "when produced"
9. **Structured subcategories** — agriculture subcategories specifically

### Coming from Janine (she said so)
10. **Many more categories** — "I will address that as I feel better"

---

## HER PROFILE (for reference)

Janine M. H. Selendy — Founder, Horizon International (at Yale University, formerly Guest of Harvard University). 40 years working on global health, environment, and poverty.

- Editor of two books with 75 experts: *Water and Sanitation Related Diseases and the Changing Environment* (Wiley-Blackwell). Foreword by Dr. Paul Farmer.
- Executive Producer/Producer/Director of 20 TV documentaries on climate change aspects. Co-producers: Swedish, German, Chinese, Mexican TV. Hosts: Lynn Redgrave, Sam Waterston.
- NSF PI for a grant on oceans. Collaborator with UN entities. Lecturer at Harvard, Yale, Tufts, Johns Hopkins. Speaker at World Bank, Government of Pakistan, Princess Chulabhorn conference (Thailand).
- Discovery in cancer research at Tufts New-England Medical Center.
- UN attributed her team with advancing shea butter production. IUCN, WWF, and Peru attributed her with helping save the vicuña.
- Fellow Emeritus, Explorers Club '96 (Selendy FN'96).
- Horizon International Solutions Site: http://www.solutions-site.org
- YouTube: http://www.youtube.com/user/jselendy

---

## CONTEXT: The Sherman & Peter Letter

Janine was previously seeking pro bono web platform creators (mentioned "Josh Goldblum") through contacts Sherman and Peter. She sent them:
- Web Platform purpose and description (this spec)
- Horizon cover picture
- Her personal profile
- A selection of 3 pictures for her profile

UF51/Brian stepped in as the builder. This platform is the result.