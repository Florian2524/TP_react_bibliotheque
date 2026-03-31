import { Link } from 'react-router-dom';
import { formatDate, truncateText, getCoverPath } from '../utils/bookHelpers';

function BookCard({ book, onDelete }) {
  function handleDeleteClick() {
    onDelete(book.id, book.titre);
  }

  function handleImageError(event) {
    event.target.src = '/images/couvertures/default-cover.jpg';
  }

  return (
    <article className="book-card">
      <div className="book-card-image">
        <img
          src={getCoverPath(book.couverture)}
          alt={`Couverture du livre ${book.titre}`}
          onError={handleImageError}
        />
      </div>

      <div className="book-card-content">
        <h3 className="book-title">{book.titre}</h3>
        <p className="book-author">{book.auteur}</p>

        <div className="book-meta">
          <span>{book.genre}</span>
          <span>{formatDate(book.date)}</span>
        </div>

        <p className="book-summary">{truncateText(book.resume, 140)}</p>

        <div className="book-card-actions">
          <Link to={`/modifier/${book.id}`} className="btn btn-secondary">
            Modifier
          </Link>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDeleteClick}
          >
            Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}

export default BookCard;