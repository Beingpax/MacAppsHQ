export type PriceType = 'Free' | 'Freemium' | 'Paid';
export type PricingModel = 'One-time' | 'Subscription' | 'None';

export interface App {
  id: string;
  slug: string;
  name: string;
  description: string;
  description_md: string | null;
  description_html?: string;
  icon: string;
  price: PriceType;
  pricing_details?: string | null;
  pricing_model?: PricingModel;
  category: string;
  featured: boolean;
  developer: string;
  website: string;
  sort_order: number;
  created_at: string;
  related_apps?: string[] | null;
}

export type NewApp = Omit<App, 'id' | 'slug' | 'created_at' | 'description_html'>;