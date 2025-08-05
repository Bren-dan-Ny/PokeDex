function Pagination({ currentPage, totalPages, onPageChange, disabled }) {
  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Mostrar todas si son pocas
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const handleClick = (page) => {
    if (!disabled && page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="d-flex justify-content-center my-4 align-items-center flex-wrap gap-2 mt-5">
      <button
        className="btn btn-outline-dark"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
        aria-label="Página anterior"
      >
        ◀
      </button>

      {generatePageNumbers().map((page, index) => (
        <button
          key={index}
          className={`btn ${
            page === currentPage ? "btn-dark" : "btn-outline-dark"
          } ${page === "..." ? "disabled" : ""}`}
          onClick={() => handleClick(page)}
          disabled={page === "..." || disabled}
          aria-label={`Ir a la página ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        className="btn btn-outline-dark="
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
        aria-label="Página siguiente"
      >
        ▶
      </button>
    </div>
  );
}

export default Pagination;
