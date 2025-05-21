export type ServiceId = 'website' | 'content' | 'branding' | 'assistant' | 'automation';

export type Currency = 'USD' | 'EUR' | 'RUB';

export interface Service {
    id: ServiceId;
    title: string;
    description: string;
    price: {
        USD: number;
        EUR: number;
        RUB: number;
    };
}
