export interface SocialLink {
  id: 'facebook' | 'instagram' | 'x' | 'linkedin';
  label: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'x', label: 'X', href: '#' },
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
];
