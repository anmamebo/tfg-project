import { Department } from './department.model';

export class Room {
  constructor(
    public id: string,
    public name: string,
    public location: string,
    public is_available: boolean,
    public description?: string,
    public type?: string,
    public capacity?: number,
    public department?: Department,
    public state?: boolean
  ) {}
}
