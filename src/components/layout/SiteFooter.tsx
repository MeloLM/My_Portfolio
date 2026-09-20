/**
 * Footer minimale: identità, navigazione secondaria, social.
 * Server Component — l'anno è calcolato in fase di render sul server.
 */

import Link from 'next/link';
import { NAV_ITEMS } from '../../constants';
import { personalInfo, socialLinks } from '../../data/profileData';
import { socialIcons } from '../ui/SocialIcons';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-12">
      <div className="container flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">{personalInfo.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{personalInfo.role}</p>
        </div>

        <nav aria-label="Navigazione footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ platform, label, href }) => {
            const Icon = socialIcons[platform];

            return (
              <a
                key={platform}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="container mt-8 border-t border-border/60 pt-6">
        <p className="text-xs text-muted-foreground">
          © {year} {personalInfo.name}. Costruito con Next.js, TypeScript e Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
