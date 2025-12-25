import { useSearchParams } from "react-router-dom";

type QueryValue = string | number | null | undefined;

export default function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = (key: string) => searchParams.get(key);

  const update = (
    next: Record<string, QueryValue>,
    options?: { replace?: boolean }
  ) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(next).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    setSearchParams(params, options);
  };

  const remove = (key: string | string[]) => {
    const params = new URLSearchParams(searchParams);
    (Array.isArray(key) ? key : [key]).forEach((k) => params.delete(k));
    setSearchParams(params);
  };

  return {
    params: searchParams,
    get,
    update,
    remove,
  };
}
