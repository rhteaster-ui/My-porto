import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiVuedotjs,
  SiTailwindcss,
  SiFastapi,
  SiUpstash,
  SiVercel,
  SiNetlify,
  SiGithub,
  SiPwa,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

export type Tech = {
  name: string;
  Icon: IconType;
  color: string;
  group: 'Frontend' | 'Backend' | 'Deploy' | 'Tooling';
};

export const stack: Tech[] = [
  { name: 'HTML5', Icon: SiHtml5, color: '#e34f26', group: 'Frontend' },
  { name: 'CSS3', Icon: SiCss, color: '#1572b6', group: 'Frontend' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#f7df1e', group: 'Frontend' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6', group: 'Frontend' },
  { name: 'React', Icon: SiReact, color: '#61dafb', group: 'Frontend' },
  { name: 'Vue', Icon: SiVuedotjs, color: '#42b883', group: 'Frontend' },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#38bdf8', group: 'Frontend' },
  { name: 'PWA', Icon: SiPwa, color: '#5a0fc8', group: 'Frontend' },
  { name: 'FastAPI', Icon: SiFastapi, color: '#05998b', group: 'Backend' },
  { name: 'Upstash Redis', Icon: SiUpstash, color: '#00e9a3', group: 'Backend' },
  { name: 'Vercel', Icon: SiVercel, color: '#ffffff', group: 'Deploy' },
  { name: 'Netlify', Icon: SiNetlify, color: '#00c7b7', group: 'Deploy' },
  { name: 'GitHub', Icon: SiGithub, color: '#f5f5f5', group: 'Tooling' },
];
