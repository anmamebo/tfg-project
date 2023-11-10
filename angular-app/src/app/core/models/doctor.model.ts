import { User } from "./user.model";

export class Doctor {
  constructor(
    public id: string,
    public collegiate_number: string,
    public is_available: boolean,
    public user?: User,
  ) {}
}