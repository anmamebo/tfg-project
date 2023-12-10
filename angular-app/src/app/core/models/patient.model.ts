import { Address } from './address.model';
import { User } from './user.model';

export class Patient {
  constructor(
    public id: string,
    public dni: string,
    public gender: string,
    public user: User,
    public birthdate?: string | null,
    public phone?: string | null,
    public social_security?: string | null,
    public address?: Address,
    public state?: boolean
  ) {}
}
