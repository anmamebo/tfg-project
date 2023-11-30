import { Department } from "./department.model";

export class Room {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
    public type?: string,
    public capacity?: number,
    public location?: string,
    public is_available?: boolean,
    public department?: Department,
    public state?: boolean,
  ) {}
}