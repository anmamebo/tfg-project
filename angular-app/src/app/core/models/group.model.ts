import { Permission } from './permission.model';

export class Group {
  constructor(
    public id: string,
    public name: string,
    public permissions?: Permission[]
  ) {}
}
