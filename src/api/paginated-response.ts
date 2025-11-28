export type PaginatedResponse<T> = {
  meta: Meta;
  data: Partial<T>[];
};

type Meta = {
  total: number;
  page: number;
};
