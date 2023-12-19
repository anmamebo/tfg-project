import { Permission } from './permission.interface';

export interface Group {
  id: string;
  name: string;
  permissions?: Permission[];
}
