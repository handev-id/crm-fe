export type PaginatedResponse<T> = {
  meta: Meta;
  data: Partial<T>[];
};

type Meta = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl?: string;
  previousPageUrl?: string;
};
