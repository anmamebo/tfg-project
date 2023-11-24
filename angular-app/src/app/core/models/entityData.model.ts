import { ListService } from 'src/app/core/services/generic/list.service';

export interface entityData {
  title: string,
  entityPlural: string,
  entitySingular: string,
  columns: { header: string, field: string, }[],
  create: {
    hasCreate: boolean,
    createText?: string,
    create?: string,
  }
  actions: {
    hasActions: boolean,
    actions?: {
      show?: string,
      edit?: string,
    }
  }
  service: ListService<any> | null,
  items: any[] | null,
  page: number,
  totalPages: number,
  numItems: number,
  numResults: number,
  search: string,
}