import { Address } from './address.interface';
import { User } from './user.interface';

export interface Patient {
  id: string;
  dni: string;
  gender: string;
  user: User;
  birthdate?: string | null;
  phone?: string | null;
  social_security?: string | null;
  nationality?: string | null;
  address?: Address;
  state?: boolean;
}
