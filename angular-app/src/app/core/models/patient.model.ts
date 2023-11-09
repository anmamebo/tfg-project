import { Address } from "./address.model";
import { User } from "./user.model";

export class Patient {
  constructor(
    public id: string,
    public dni: string,
    public birthdate?: string | null,
    public gender?: string,
    public phone?: string | null,
    public social_security?: string | null,
    public address?: Address,
    public user?: User,
  ) {}
}