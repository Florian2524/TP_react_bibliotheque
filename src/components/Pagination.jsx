function Pagination({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination" aria-label="Pagination des livres">
      <button
        type="button"
        className="btn btn-light"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        Précédent
      </button>

      <span className="pagination-info">
        Page {currentPage} sur {totalPages}
      </span>

      <button
        type="button"
        className="btn btn-light"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </nav>
  );
}

export default Pagination;