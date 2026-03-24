import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { getBooks } from '../services/bookService';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        setError('');

        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError("Impossible de charger les livres. Vérifie que json-server est bien lancé.");
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="page-subtitle">Bibliothèque personnelle</p>
          <h2 className="page-title">Liste des livres</h2>
        </div>

        <div className="page-count">
          {books.length} livre{books.length > 1 ? 's' : ''}
        </div>
      </div>

      {loading && <p className="info-message">Chargement des livres...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p className="info-message">Aucun livre trouvé.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}

export default BookList;