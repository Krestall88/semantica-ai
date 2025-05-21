export interface Service {
  title: string;
  description: string;
  includes: string[];
  priceRub: number;
  forWhom: string[];
  modalTitle?: string;
  modalDescription?: string;
}
