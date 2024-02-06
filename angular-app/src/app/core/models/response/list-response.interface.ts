export interface PaginatedResponse<T> {
  count: number;
  results: T[];
}

export type NonPaginatedResponse<T> = T[];

export type ListResponse<T> = PaginatedResponse<T> | NonPaginatedResponse<T>;
