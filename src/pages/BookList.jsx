import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import ConfirmModal from '../components/ConfirmModal';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import { deleteBook, getBooks } from '../services/bookService';
import {
  filterBooks,
  getUniqueGenres,
  sortBooksByDate,
} from '../utils/bookHelpers';

const BOOKS_PER_PAGE = 6;

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [bookToDelete, setBookToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        setError('');

        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les livres. Vérifie que json-server est bien lancé.");
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  useEffect(() => {
    if (!actionMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActionMessage('');
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [actionMessage]);

  /* Retour à la première page si les filtres changent */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGenre, sortOrder]);

  const genres = useMemo(() => getUniqueGenres(books), [books]);

  const filteredBooks = useMemo(() => {
    const searchedBooks = filterBooks(books, searchTerm, selectedGenre);
    return sortBooksByDate(searchedBooks, sortOrder);
  }, [books, searchTerm, selectedGenre, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / BOOKS_PER_PAGE));

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;
    return filteredBooks.slice(startIndex, endIndex);
  }, [filteredBooks, currentPage]);

  /* Ajuste la page courante si le total diminue */
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleGenreChange(event) {
    setSelectedGenre(event.target.value);
  }

  function handleSortChange(event) {
    setSortOrder(event.target.value);
  }

  function handleResetFilters() {
    setSearchTerm('');
    setSelectedGenre('');
    setSortOrder('');
    setCurrentPage(1);
  }

  function handleDeleteRequest(bookId, bookTitle) {
    setBookToDelete({
      id: bookId,
      title: bookTitle,
    });
  }

  function handleCloseModal() {
    setBookToDelete(null);
  }

  async function handleConfirmDelete() {
    if (!bookToDelete) {
      return;
    }

    try {
      setError('');
      setActionMessage('');

      await deleteBook(bookToDelete.id);

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookToDelete.id)
      );

      setActionMessage(`Le livre "${bookToDelete.title}" a bien été supprimé.`);
      setBookToDelete(null);
    } catch (err) {
      console.error(err);
      setError("Impossible de supprimer le livre.");
      setBookToDelete(null);
    }
  }

  function handlePreviousPage() {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function handleNextPage() {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }

  const hasActiveFilters =
    searchTerm !== '' || selectedGenre !== '' || sortOrder !== '';

  return (
    <section className="book-list-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion de la bibliothèque</h1>
          <p className="page-subtitle">
            Consulte, recherche et gère ta collection de livres.
          </p>
        </div>

        <Link to="/ajouter" className="btn btn-primary">
          Ajouter un livre
        </Link>
      </div>

      {!loading && !error && (
        <FilterBar
          searchTerm={searchTerm}
          selectedGenre={selectedGenre}
          sortOrder={sortOrder}
          genres={genres}
          onSearchChange={handleSearchChange}
          onGenreChange={handleGenreChange}
          onSortChange={handleSortChange}
          onResetFilters={handleResetFilters}
        />
      )}

      {actionMessage && <p className="success-message">{actionMessage}</p>}
      {loading && <p className="info-message">Chargement des livres...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && filteredBooks.length === 0 && (
        <div className="empty-state">
          <h3 className="empty-state-title">
            {hasActiveFilters
              ? 'Aucun livre ne correspond à la recherche'
              : 'Aucun livre disponible'}
          </h3>

          <p className="empty-state-text">
            {hasActiveFilters
              ? 'Essaie de modifier les filtres.'
              : 'Ajoute un premier livre pour commencer.'}
          </p>

          {hasActiveFilters ? (
            <button
              type="button"
              className="btn btn-light"
              onClick={handleResetFilters}
            >
              Réinitialiser les filtres
            </button>
          ) : (
            <Link to="/ajouter" className="btn btn-primary">
              Ajouter un livre
            </Link>
          )}
        </div>
      )}

      {!loading && !error && filteredBooks.length > 0 && (
        <>
          <div className="books-grid">
            {paginatedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onDelete={handleDeleteRequest}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </>
      )}

      <ConfirmModal
        isOpen={!!bookToDelete}
        title="Confirmer la suppression"
        message={
          bookToDelete
            ? `Voulez-vous vraiment supprimer le livre "${bookToDelete.title}" ?`
            : ''
        }
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseModal}
      />
    </section>
  );
}

export default BookList;