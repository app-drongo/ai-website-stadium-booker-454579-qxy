'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  logo: 'StadiumBook',
  tagline: 'Premium Soccer Stadium Booking',
  navItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Pricing', href: '#pricing' },
  ],
  ctaText: 'Book Now',
  ctaHref: '#pricing',
  contactInfo: [
    { icon: 'phone', text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: 'mail', text: 'book@stadiumbook.com', href: 'mailto:book@stadiumbook.com' },
    { icon: 'location', text: 'Downtown Sports District', href: '#' },
  ],
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
    setIsOpen(false);
  };

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'mail':
        return <Mail className="h-4 w-4" />;
      case 'location':
        return <MapPin className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <section
      id="navigation"
      className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <div className="w-6 h-6 bg-primary-foreground rounded-sm opacity-90"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground" data-editable="logo">
                {config.logo}
              </span>
              <span
                className="text-xs text-muted-foreground hidden sm:block"
                data-editable="tagline"
              >
                {config.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {config.navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.href)}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                data-editable-href={`navItems[${idx}].href`}
                data-href={item.href}
              >
                <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              onClick={handleCTAClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-card text-card-foreground w-80 sm:w-96">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                      <div className="w-5 h-5 bg-primary-foreground rounded-sm opacity-90"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-card-foreground" data-editable="logo">
                        {config.logo}
                      </span>
                      <span className="text-xs text-muted-foreground" data-editable="tagline">
                        {config.tagline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 py-6">
                  <div className="space-y-4">
                    {config.navItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavClick(item.href)}
                        className="block w-full text-left py-3 px-4 text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors duration-200 font-medium"
                        data-editable-href={`navItems[${idx}].href`}
                        data-href={item.href}
                      >
                        <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <div className="mt-8">
                    <Button
                      onClick={handleCTAClick}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                    >
                      <span data-editable="ctaText">{config.ctaText}</span>
                    </Button>
                  </div>
                </nav>

                {/* Contact Info */}
                <div className="border-t border-border pt-6">
                  <h4 className="text-sm font-semibold text-card-foreground mb-4">Contact Info</h4>
                  <div className="space-y-3">
                    {config.contactInfo.map((contact, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavClick(contact.href)}
                        className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-card-foreground transition-colors duration-200 w-full text-left"
                        data-editable-href={`contactInfo[${idx}].href`}
                        data-href={contact.href}
                      >
                        {renderIcon(contact.icon)}
                        <span data-editable={`contactInfo[${idx}].text`}>{contact.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}
