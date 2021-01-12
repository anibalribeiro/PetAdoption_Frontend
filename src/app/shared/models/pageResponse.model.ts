import { Pagination } from './pagination.model';

export interface PageResponse<T> {
  data: T[];
  empty: boolean;
  totalElements: number;
  pagination: Pagination;
}
