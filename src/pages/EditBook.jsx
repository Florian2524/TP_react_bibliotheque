import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { getBookById, updateBook } from '../services/bookService';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadBook() {
      try {
        setLoading(true);
        setError('');

        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 404) {
          setError('Livre introuvable.');
        } else {
          setError("Impossible de charger le livre à modifier.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  async function handleEditBook(bookData) {
    await updateBook(id, bookData);
    navigate('/');
  }

  return (
    <section className="tp-form-page">
      <h1 className="tp-form-page-title">Modifier le livre</h1>

      {loading && <p className="info-message">Chargement du livre...</p>}

      {!loading && error && (
        <div className="not-found-card">
          <h2 className="not-found-title">{error}</h2>
          <p className="not-found-text">
            Le livre demandé n'existe pas ou n'est plus disponible.
          </p>
          <Link to="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      )}

      {!loading && !error && book && (
        <div className="tp-form-wrapper">
          <BookForm
            initialValues={book}
            onSubmit={handleEditBook}
            submitLabel="Enregistrer les modifications"
          />
        </div>
      )}
    </section>
  );
}

export default EditBook;