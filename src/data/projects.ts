export type Project = {
  title: string;
  summary: string;
  tags: string[];
  year: string;
  kind: 'PWA' | 'Web App' | 'Static' | 'AI Tool';
  image: string;
  url: string;
};

export const projects: Project[] = [
  {
    title: 'rAi Engine',
    summary:
      'Asisten produktivitas berbasis AI dengan UI ringan, prompt presets, dan respons streaming — dirancang stabil di perangkat low-end.',
    tags: ['React', 'TypeScript', 'Tailwind', 'FastAPI'],
    year: '2025',
    kind: 'AI Tool',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    url: 'https://example.com/rai-engine',
  },
  {
    title: 'Lite Notes PWA',
    summary:
      'PWA pencatat offline-first dengan service worker, sinkronisasi opsional via Upstash Redis, dan animasi halus tanpa beban.',
    tags: ['PWA', 'Vue', 'Service Worker', 'Upstash'],
    year: '2025',
    kind: 'PWA',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    url: 'https://example.com/lite-notes',
  },
  {
    title: 'Focus Timer',
    summary:
      'Pomodoro web app minimalis dengan tema gelap, statistik harian ringan, dan transisi yang tidak mengganggu.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    year: '2024',
    kind: 'Web App',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    url: 'https://example.com/focus-timer',
  },
  {
    title: 'Statik Showcase',
    summary:
      'Template website statis interaktif untuk menampilkan karya — fokus pada whitespace, hierarki, dan performa.',
    tags: ['HTML', 'CSS', 'JS'],
    year: '2024',
    kind: 'Static',
    image: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1200&q=80',
    url: 'https://example.com/statik-showcase',
  },
  {
    title: 'API Bridge',
    summary:
      'Layer integrasi REST API ringan untuk konsumsi data publik — caching cerdas dan UI yang menjelaskan dirinya sendiri.',
    tags: ['TypeScript', 'FastAPI', 'REST'],
    year: '2024',
    kind: 'Web App',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    url: 'https://example.com/rai-engine',
  },
  {
    title: 'Channel Hub',
    summary:
      'Halaman link-in-bio yang dipoles untuk komunitas — kontras tenang, kartu kaca, dan animasi masuk yang lambat.',
    tags: ['React', 'Tailwind', 'Vercel'],
    year: '2024',
    kind: 'Static',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
    url: 'https://example.com/channel-hub',
  },
];
