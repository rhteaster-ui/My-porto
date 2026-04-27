export type Project = {
  title: string;
  summary: string;
  tags: string[];
  year: string;
  kind: 'PWA' | 'Web App' | 'Static' | 'AI Tool';
  accent?: 'cyan' | 'violet' | 'mint';
};

export const projects: Project[] = [
  {
    title: 'rAi Engine',
    summary:
      'Asisten produktivitas berbasis AI dengan UI ringan, prompt presets, dan respons streaming — dirancang stabil di perangkat low-end.',
    tags: ['React', 'TypeScript', 'Tailwind', 'FastAPI'],
    year: '2025',
    kind: 'AI Tool',
    accent: 'violet',
  },
  {
    title: 'Lite Notes PWA',
    summary:
      'PWA pencatat offline-first dengan service worker, sinkronisasi opsional via Upstash Redis, dan animasi halus tanpa beban.',
    tags: ['PWA', 'Vue', 'Service Worker', 'Upstash'],
    year: '2025',
    kind: 'PWA',
    accent: 'cyan',
  },
  {
    title: 'Focus Timer',
    summary:
      'Pomodoro web app minimalis dengan tema gelap, statistik harian ringan, dan transisi yang tidak mengganggu.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    year: '2024',
    kind: 'Web App',
    accent: 'mint',
  },
  {
    title: 'Statik Showcase',
    summary:
      'Template website statis interaktif untuk menampilkan karya — fokus pada whitespace, hierarki, dan performa.',
    tags: ['HTML', 'CSS', 'JS'],
    year: '2024',
    kind: 'Static',
    accent: 'cyan',
  },
  {
    title: 'API Bridge',
    summary:
      'Layer integrasi REST API ringan untuk konsumsi data publik — caching cerdas dan UI yang menjelaskan dirinya sendiri.',
    tags: ['TypeScript', 'FastAPI', 'REST'],
    year: '2024',
    kind: 'Web App',
    accent: 'violet',
  },
  {
    title: 'Channel Hub',
    summary:
      'Halaman link-in-bio yang dipoles untuk komunitas — kontras tenang, kartu kaca, dan animasi masuk yang lambat.',
    tags: ['React', 'Tailwind', 'Vercel'],
    year: '2024',
    kind: 'Static',
    accent: 'mint',
  },
];
