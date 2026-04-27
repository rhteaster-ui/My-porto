import {
  SiGithub,
  SiInstagram,
  SiTiktok,
  SiTelegram,
  SiWhatsapp,
  SiFacebook,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

const map: Record<string, IconType> = {
  github: SiGithub,
  instagram: SiInstagram,
  tiktok: SiTiktok,
  telegram: SiTelegram,
  whatsapp: SiWhatsapp,
  facebook: SiFacebook,
};

export function SocialIcon({
  name,
  className,
}: {
  name: keyof typeof map | string;
  className?: string;
}) {
  const Icon = map[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
