// Type for service includes
interface ServiceIncludes {
  [key: string]: string;
}

export interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  includes: string[] | ServiceIncludes; // Can be array or object with string values
  price: number;
  priceRub: number; // For backward compatibility
  forWhom: string[];
  modalTitleKey: string;
  modalDescriptionKey: string;
}
