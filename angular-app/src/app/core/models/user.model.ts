import { Doctor } from './doctor.model';
import { Patient } from './patient.model';

export class User {
  constructor(
    public id: string,
    public username: string,
    public password: string,
    public email: string,
    public name: string,
    public last_name: string,
    public is_staff: boolean,
    public is_active: boolean,
    public profile_picture?: string,
    public patient?: Patient,
    public doctor?: Doctor
  ) {}
}
