import * as pt from "@/data/profile";
import * as en from "@/data/content/en";
import * as es from "@/data/content/es";
import { UI_TEXT, type Lang } from "@/data/i18n";

const pick = (m: typeof pt | typeof en | typeof es) => ({
  profile: m.profile,
  company: m.company,
  highlights: m.highlights,
  marqueeOrgs: m.marqueeOrgs,
  marqueeTech: m.marqueeTech,
  services: m.services,
  recruiterSummary: m.recruiterSummary,
  aiExperience: m.aiExperience,
  levelEvidence: m.levelEvidence,
  careerSteps: m.careerSteps,
  featuredProjects: m.featuredProjects,
  openSource: m.openSource,
  experience: m.experience,
  skills: m.skills,
  education: m.education,
  courses: m.courses,
  languages: m.languages,
});

const DATA = { pt: pick(pt), en: pick(en), es: pick(es) };

export function getContent(lang: Lang) {
  return { ...DATA[lang], ui: UI_TEXT[lang], lang };
}

export type Content = ReturnType<typeof getContent>;
