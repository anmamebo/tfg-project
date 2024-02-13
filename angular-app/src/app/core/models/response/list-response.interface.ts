export interface PaginatedResponse<T> {
  count: number;
  total_pages: number;
  results: T[];
}

export type NonPaginatedResponse<T> = T[];

export type ListResponse<T> = PaginatedResponse<T> | NonPaginatedResponse<T>;
