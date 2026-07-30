type ShipmentPaginationProps = {
  page: number;
  totalPages: number;
  pageSize: number;
  resultCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export function ShipmentPagination({
  page,
  totalPages,
  pageSize,
  resultCount,
  onPageChange,
  onPageSizeChange,
}: ShipmentPaginationProps) {
  const firstPages = [1, 2, 3].filter((number) => number <= totalPages);

  return (
    <footer className="pagination">
      <label>
        Show{" "}
        <select
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
        >
          <option value="8">8</option>
          {pageSize === 11 ? <option value="11">11</option> : <option value="12">12</option>}
          <option value="24">24</option>
        </select>
        {" "}of {resultCount.toLocaleString()} results
      </label>
      <nav aria-label="Pagination">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>‹</button>
        {firstPages.map((number) => (
          <button
            key={number}
            className={page === number ? "active" : ""}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
        {totalPages > 4 && <span>…</span>}
        {totalPages > 3 && (
          <button
            className={page === totalPages ? "active" : ""}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        )}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          ›
        </button>
      </nav>
    </footer>
  );
}
