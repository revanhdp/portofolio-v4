import { useSyncExternalStore } from "react";

export type Language = "en" | "id";

export const LANGUAGES: { id: Language; label: string; name: string }[] = [
  { id: "en", label: "EN", name: "English" },
  { id: "id", label: "ID", name: "Indonesia" },
];

const KEY = "porto:lang";
const EVENT = "porto:lang-change";

/* ── Dictionaries ─────────────────────────────────────────────────
   Sentences that carry an emphasised word or inline links are split
   into pieces (…Before / …After) so the markup stays in the page.
   Project and writing content in lib/data.ts is not translated.     */

const en = {
  nav: {
    index: "Index",
    allWork: "All work",
    allProjects: "All projects",
  },
  home: {
    callMe: "You can call me “Revan”",
    scrollCue: "scroll to explore",
    greetingSr: "Hello, I'm Revanza Hadi Putra.",
    more: "(more)",
    less: "(less)",
    bio1Before: "I'm a Software Engineer interested in building",
    bio1Detail:
      "clean, minimal interfaces and scalable backend systems. I care deeply about developer experience, performance, and maintainability.",
    bio1After: "products that actually matter, based in Indonesia.",
    bio2Before: "Currently engineering at",
    bio2Detail:
      "(a digital software agency specializing in web development, enterprise portals, and tailored digital solutions).",
    bio2Mid: ", where I build impactful platforms including",
    bio2And: "and",
    bio2After:
      "Previously completed two certified independent study (Studi Independen) programs in modern web software engineering.",
    linksBrowse: "Browse the",
    linksProjects: "projects",
    linksBuilt: "I've built, or check out the",
    linksStack: "stack",
    linksWork: "I work with. Wanna collaborate, discuss a project, or just say hi?",
    linksCoffee: "Let's grab a coffee",
    findMe: "You can find me on",
    orReach: "or reach me via",
    email: "email",
    workLabel: "Work",
  },
  work: {
    title: "Work",
    introBefore:
      "The full account of where I've worked — the role I held, and the platforms I actually",
    introEmph: "shipped",
    introAfter: "there.",
  },
  projects: {
    title: "Projects",
    intro:
      "Listed below are the projects I've participated in, dedicating significant time and effort towards their creation, maintenance, and enhancement.",
    archived: "Archived",
    archivedBefore:
      "The following are projects I've been involved with previously, but are no longer actively",
    archivedEmph: "maintained",
    source: "Source",
    overview: "Overview",
    stack: "Stack",
    built: "What I built",
    screens: "Screens",
    screensHint: "Tap a screen to view it in full.",
  },
  stack: {
    title: "Stack",
    introBefore:
      "The languages, frameworks, and tools I reach for day to day — chosen for the boring reason that they hold up well in",
    introEmph: "production",
  },
  sound: {
    on: "Sound on",
    off: "Sound off",
    turnOn: "Turn sound on",
    turnOff: "Turn sound off",
  },
  settings: {
    open: "Open settings",
    title: "Settings",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    language: "Language",
    sound: "Sound",
    smoothScroll: "Smooth scrolling",
    grain: "Film grain",
  },
};

export type Dict = typeof en;

const id: Dict = {
  nav: {
    index: "Beranda",
    allWork: "Semua pekerjaan",
    allProjects: "Semua proyek",
  },
  home: {
    callMe: "Panggil saja “Revan”",
    scrollCue: "gulir untuk menjelajah",
    greetingSr: "Halo, saya Revanza Hadi Putra.",
    more: "(selengkapnya)",
    less: "(tutup)",
    bio1Before: "Saya Software Engineer yang tertarik membangun",
    bio1Detail:
      "antarmuka yang bersih dan minimalis serta sistem backend yang scalable. Saya sangat peduli pada developer experience, performa, dan kemudahan perawatan.",
    bio1After: "produk yang benar-benar berarti, berbasis di Indonesia.",
    bio2Before: "Saat ini bekerja sebagai engineer di",
    bio2Detail:
      "(agensi perangkat lunak digital yang berfokus pada pengembangan web, portal enterprise, dan solusi digital yang disesuaikan).",
    bio2Mid: ", tempat saya membangun platform berdampak, di antaranya",
    bio2And: "dan",
    bio2After:
      "Sebelumnya menyelesaikan dua program Studi Independen bersertifikat di bidang rekayasa perangkat lunak web modern.",
    linksBrowse: "Lihat",
    linksProjects: "proyek",
    linksBuilt: "yang pernah saya bangun, atau intip",
    linksStack: "stack",
    linksWork: "yang saya pakai. Mau berkolaborasi, diskusi proyek, atau sekadar menyapa?",
    linksCoffee: "Ngopi bareng yuk",
    findMe: "Temui saya di",
    orReach: "atau hubungi saya lewat",
    email: "email",
    workLabel: "Pekerjaan",
  },
  work: {
    title: "Pekerjaan",
    introBefore:
      "Riwayat lengkap tempat saya bekerja — peran yang saya emban, dan platform yang benar-benar saya",
    introEmph: "rilis",
    introAfter: "di sana.",
  },
  projects: {
    title: "Proyek",
    intro:
      "Berikut proyek-proyek yang pernah saya ikuti, dengan waktu dan tenaga yang saya curahkan untuk pembuatan, perawatan, dan peningkatannya.",
    archived: "Diarsipkan",
    archivedBefore:
      "Berikut proyek yang pernah saya ikuti sebelumnya, namun tidak lagi",
    archivedEmph: "dirawat secara aktif",
    source: "Kode sumber",
    overview: "Ringkasan",
    stack: "Stack",
    built: "Yang saya bangun",
    screens: "Tampilan",
    screensHint: "Ketuk gambar untuk melihatnya selengkapnya.",
  },
  stack: {
    title: "Stack",
    introBefore:
      "Bahasa, framework, dan tools yang saya pakai sehari-hari — dipilih dengan alasan sederhana: andal di",
    introEmph: "production",
  },
  sound: {
    on: "Suara aktif",
    off: "Suara mati",
    turnOn: "Nyalakan suara",
    turnOff: "Matikan suara",
  },
  settings: {
    open: "Buka pengaturan",
    title: "Pengaturan",
    theme: "Tema",
    light: "Terang",
    dark: "Gelap",
    system: "Sistem",
    language: "Bahasa",
    sound: "Suara",
    smoothScroll: "Scroll halus",
    grain: "Tekstur grain",
  },
};

const dictionaries: Record<Language, Dict> = { en, id };

/* ── Store ────────────────────────────────────────────────────────
   Server and first client render use "en"; useSyncExternalStore
   then switches to the saved (or browser) language after hydration. */

function read(): Language {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "id") return saved;
  } catch {}
  return navigator.language?.toLowerCase().startsWith("id") ? "id" : "en";
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function setLanguage(lang: Language): void {
  try {
    localStorage.setItem(KEY, lang);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function useLanguage(): {
  lang: Language;
  t: Dict;
  setLanguage: (lang: Language) => void;
} {
  const lang = useSyncExternalStore<Language>(subscribe, read, () => "en");
  return { lang, t: dictionaries[lang], setLanguage };
}
