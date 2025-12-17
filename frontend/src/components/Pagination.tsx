import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (page > 2) pages.push(1);
    if (page > 3) pages.push("...");

    for (let p = Math.max(1, page - 1); p <= Math.min(totalPages, page + 1); p++) {
      pages.push(p);
    }

    if (page < totalPages - 2) pages.push("...");
    if (page < totalPages - 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex justify-center mt-10">
      <UIPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && onChange(page - 1)}
              className={page === 1 ? "pointer-events-none opacity-50 " : "cursor-pointer"}
            />
          </PaginationItem>

          {getPages().map((p, i) =>
            p === "..." ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink className="cursor-pointer"
                  isActive={p === page}
                  onClick={() => onChange(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && onChange(page + 1)}
              className={
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </UIPagination>
    </div>
  );
}
