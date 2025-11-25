'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Clock, Users } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Flexible Pricing for Every Team',
  subtitle: 'Choose the perfect package for your training, matches, or tournaments',
  billingToggle: {
    monthly: 'Monthly',
    yearly: 'Yearly',
  },
  plans: [
    {
      id: 'basic',
      name: 'Training Sessions',
      description: 'Perfect for regular team training',
      monthlyPrice: 150,
      yearlyPrice: 1500,
      currency: '$',
      period: 'per session',
      yearlyPeriod: 'per month',
      popular: false,
      features: [
        '2-hour stadium access',
        'Basic lighting system',
        'Changing room access',
        'Equipment storage',
        'Weekday availability',
      ],
      ctaText: 'Book Training',
      ctaHref: '/book/training',
    },
    {
      id: 'professional',
      name: 'Match Package',
      description: 'Ideal for competitive matches and tournaments',
      monthlyPrice: 350,
      yearlyPrice: 3500,
      currency: '$',
      period: 'per match',
      yearlyPeriod: 'per month',
      popular: true,
      features: [
        '4-hour stadium access',
        'Professional lighting',
        'Referee facilities',
        'Live streaming setup',
        'Weekend availability',
        'Scoreboard operation',
      ],
      ctaText: 'Book Match',
      ctaHref: '/book/match',
    },
    {
      id: 'premium',
      name: 'Championship',
      description: 'Full premium experience for major events',
      monthlyPrice: 750,
      yearlyPrice: 7500,
      currency: '$',
      period: 'per event',
      yearlyPeriod: 'per month',
      popular: false,
      features: [
        'Full day stadium access',
        'Premium facilities',
        'Media center access',
        'VIP hospitality areas',
        'Professional broadcast',
        'Event management support',
        'Security services',
      ],
      ctaText: 'Book Premium',
      ctaHref: '/book/premium',
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
            >
              <span data-editable="billingToggle.monthly">{config.billingToggle.monthly}</span>
            </span>
            <button
              onClick={toggleBilling}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              role="switch"
              aria-checked={isYearly}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span
              className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
            >
              <span data-editable="billingToggle.yearly">{config.billingToggle.yearly}</span>
            </span>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {config.plans.map((plan, idx) => (
            <Card
              key={plan.id}
              className={`relative bg-card text-card-foreground border-border transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'border-primary shadow-md scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-xl font-bold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground mb-4">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>

                <div className="mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold">
                      <span data-editable={`plans[${idx}].currency`}>{plan.currency}</span>
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      <span data-editable={`plans[${idx}].${isYearly ? 'yearlyPeriod' : 'period'}`}>
                        {isYearly ? plan.yearlyPeriod : plan.period}
                      </span>
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Flexible Booking</h4>
              <p className="text-sm text-muted-foreground">
                Book up to 30 days in advance with easy rescheduling
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Team Support</h4>
              <p className="text-sm text-muted-foreground">
                Dedicated support for teams and tournament organizers
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Premium Quality</h4>
              <p className="text-sm text-muted-foreground">
                FIFA-standard pitches with professional maintenance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
