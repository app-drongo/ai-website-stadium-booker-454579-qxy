'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  brandName: 'StadiumBook',
  brandDescription: 'Book premium soccer stadiums instantly - where champions play their best game',

  // Company section
  companyTitle: 'Company',
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Stadiums', href: '/stadiums' },
  ],

  // Legal section
  legalTitle: 'Legal',
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],

  // Contact info
  contactTitle: 'Contact',
  address: '123 Sports Avenue, Athletic District',
  phone: '+1 (555) 123-4567',
  email: 'info@stadiumbook.com',

  // Social links
  socialTitle: 'Follow Us',
  socialLinks: [
    { platform: 'Facebook', href: 'https://facebook.com/stadiumbook' },
    { platform: 'Twitter', href: 'https://twitter.com/stadiumbook' },
  ],

  // Newsletter
  newsletterTitle: 'Stay Updated',
  newsletterDescription: 'Get the latest stadium availability and exclusive offers',
  newsletterPlaceholder: 'Enter your email',
  newsletterButtonText: 'Subscribe',

  // Copyright
  copyrightText: '© 2024 StadiumBook. All rights reserved.',

  // CTA
  ctaText: 'Book Now',
  ctaHref: '/booking',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer id="footer" className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-primary mb-4">
              <span data-editable="brandName">{config.brandName}</span>
            </h3>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              <span data-editable="brandDescription">{config.brandDescription}</span>
            </p>
            <Button
              onClick={() => handleLinkClick(config.ctaHref)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold mb-4">
              <span data-editable="companyTitle">{config.companyTitle}</span>
            </h4>
            <ul className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    data-editable-href={`companyLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-semibold mb-4">
              <span data-editable="legalTitle">{config.legalTitle}</span>
            </h4>
            <ul className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    data-editable-href={`legalLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4">
              <span data-editable="contactTitle">{config.contactTitle}</span>
            </h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span data-editable="address">{config.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span data-editable="phone">{config.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span data-editable="email">{config.email}</span>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h5 className="font-medium mb-3 text-sm">
                <span data-editable="socialTitle">{config.socialTitle}</span>
              </h5>
              <div className="flex gap-3">
                {config.socialLinks.map((social, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLinkClick(social.href)}
                    className="p-2 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    data-editable-href={`socialLinks[${idx}].href`}
                    data-href={social.href}
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            <span data-editable="copyrightText">{config.copyrightText}</span>
          </p>

          {/* Newsletter signup */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-sm text-muted-foreground">
              <span data-editable="newsletterDescription">{config.newsletterDescription}</span>
            </span>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex gap-2"
              data-form-id="6925fda91e963ce33c2aff6d"
            >
              <input
                type="email"
                placeholder={config.newsletterPlaceholder}
                className="px-3 py-1.5 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                data-editable="newsletterPlaceholder"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <span data-editable="newsletterButtonText">{config.newsletterButtonText}</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
