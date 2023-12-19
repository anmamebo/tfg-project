export interface Address {
  id: string;
  street: string;
  number: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
  floor?: string | null;
}
