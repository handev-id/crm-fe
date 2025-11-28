import { ReactNode, useEffect, useMemo, useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";

export type SortType = {
  label: string;
  value: string;
};

export type SortValue = {
  order: string | undefined;
  direction: "asc" | "desc" | undefined;
};

export type Data<T, K extends keyof T = keyof T> = {
  key: K | null;
  label?: string;
  render?: (value: T[K] | null, index: number) => ReactNode;
  action?: boolean;
};

export type DataGridProps<T> = {
  data: T[];
  columns: (Data<T> | "indexing" | "select")[];
  loading?: boolean;
  buttons?: ReactNode;
  pageTotal?: number;
  initialPage?: number;
  onPageChanged?: (page: number) => void;
  onSearch?: (query?: string) => void;
  sortValues?: SortType[];
  onSort?: (sort?: SortValue) => void;
  limit?: number;
  sort?: SortValue;
  onSelectedButtons?: (values: T[]) => ReactNode;
  backButton?: ReactNode;
  className?: string;
};

export function DataGrid<T>({
  data,
  columns,
  loading,
  buttons,
  initialPage,
  pageTotal = 0,
  onPageChanged,
  onSearch,
  onSort,
  sortValues,
  limit: dataLimit = 10,
  sort: initialSort,
  onSelectedButtons,
  backButton,
  className,
}: DataGridProps<T>) {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<SortValue>(
    initialSort || { order: "", direction: "asc" }
  );
  const [selected, setSelected] = useState<number[]>([]);
  const [openSort, setOpenSort] = useState(false);

  const selectedButtons = useMemo(() => {
    return onSelectedButtons
      ? onSelectedButtons(data.filter((_, index) => selected.includes(index)))
      : null;
  }, [selected]);

  useEffect(() => {
    if (initialPage !== undefined) {
      setPage(initialPage - 1);
    }
  }, [initialPage]);

  useEffect(() => {
    setSelected([]);
  }, [data]);

  const totalPages = pageTotal;

  return (
    <div className={`w-full relative ${className}`}>
      <div className="flex items-center justify-between gap-3">
        {backButton}
        {onSearch && (
          <div className="relative w-full max-w-sm mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 w-4 h-4" />
            <Input
              placeholder="Cari..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch(e.currentTarget.value);
                }
              }}
              className="pl-10 bg-white"
            />
          </div>
        )}
        {sortValues && sortValues.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setOpenSort((v) => !v)}
              className="px-3 py-2 border rounded-md text-sm bg-white flex items-center gap-2"
            >
              Urutkan
              {openSort ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSort && (
              <div className="absolute z-20 bg-white border rounded shadow w-40 mt-1 p-1 text-sm">
                <div
                  className={`px-3 py-2 cursor-pointer rounded ${
                    !sort.order ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    onSort?.({ order: "", direction: sort.direction });
                    setSort((v) => ({ ...v, order: "" }));
                    setOpenSort(false);
                  }}
                >
                  Tidak ada
                </div>

                {sortValues.map((item) => (
                  <div
                    key={item.value}
                    className={`px-3 py-2 cursor-pointer rounded ${
                      sort.order === item.value ? "bg-gray-100" : ""
                    }`}
                    onClick={() => {
                      onSort?.({
                        order: item.value,
                        direction: sort.direction,
                      });
                      setSort((v) => ({ ...v, order: item.value }));
                      setOpenSort(false);
                    }}
                  >
                    {item.label}
                  </div>
                ))}

                <div className="border-t my-1"></div>

                <div
                  className={`px-3 py-2 flex items-center gap-2 cursor-pointer rounded ${
                    sort.direction === "asc" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    onSort?.({ order: sort.order, direction: "asc" });
                    setSort((v) => ({ ...v, direction: "asc" }));
                    setOpenSort(false);
                  }}
                >
                  <ChevronUp size={14} /> Bawah ke atas
                </div>

                <div
                  className={`px-3 py-2 flex items-center gap-2 cursor-pointer rounded ${
                    sort.direction === "desc" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    onSort?.({ order: sort.order, direction: "desc" });
                    setSort((v) => ({ ...v, direction: "desc" }));
                    setOpenSort(false);
                  }}
                >
                  <ChevronDown size={14} /> Atas ke bawah
                </div>
              </div>
            )}
          </div>
        )}

        <div>{selected.length ? selectedButtons : buttons}</div>
      </div>

      <div className="border rounded-lg overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {column === "indexing" ? (
                      "#"
                    ) : column === "select" ? (
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={selected.length >= data.length}
                        onChange={() => {
                          if (selected.length >= data.length) {
                            setSelected([]);
                          } else {
                            setSelected(data.map((_, i) => i));
                          }
                        }}
                      />
                    ) : (
                      (column as Data<T>).label
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 h">
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {columns.map((col, colIndex) => {
                      if (col === "indexing")
                        return (
                          <td key={colIndex} className="px-6 py-4 text-sm">
                            {page * dataLimit + rowIndex + 1}
                          </td>
                        );

                      if (col === "select")
                        return (
                          <td key={colIndex} className="px-6 py-4">
                            <input
                              type="checkbox"
                              className="w-4 h-4"
                              checked={selected.includes(rowIndex)}
                              onChange={() =>
                                setSelected((prev) => {
                                  const v = [...prev];
                                  const i = v.indexOf(rowIndex);
                                  if (i >= 0) v.splice(i, 1);
                                  else v.push(rowIndex);
                                  return v;
                                })
                              }
                            />
                          </td>
                        );

                      const item = col as Data<T>;

                      return (
                        <td key={colIndex} className="px-6 py-4 text-sm">
                          {item.render
                            ? item.render(row[item.key!], rowIndex)
                            : (row[item.key!] as any)}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center py-10">
                      <Spinner className="h-8 w-8 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Loading, please wait...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Belum ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  if (page > 0) {
                    setPage(page - 1);
                    onPageChanged?.(page);
                  }
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={page === i}
                  onClick={() => {
                    setPage(i);
                    onPageChanged?.(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => {
                  if (page < totalPages - 1) {
                    setPage(page + 1);
                    onPageChanged?.(page + 2);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
