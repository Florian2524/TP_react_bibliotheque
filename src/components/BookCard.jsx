import { Link } from 'react-router-dom';
import { formatDate, truncateText, getCoverPath } from '../utils/bookHelpers';

function BookCard({ book }) {
  return (
    <article className="book-card">
      <div className="book-card-image">
        <img
          src={getCoverPath(book.couverture)}
          alt={`Couverture du livre ${book.titre}`}
        />
      </div>

      <div className="book-card-content">
        <div className="book-card-top">
          <span className="book-genre">{book.genre}</span>
          <span className="book-date">{formatDate(book.date)}</span>
        </div>

        <h3 className="book-title">{book.titre}</h3>
        <p className="book-author">Par {book.auteur}</p>

        <p className="book-summary">{truncateText(book.resume, 160)}</p>

        <div className="book-card-actions">
          <Link to={`/modifier/${book.id}`} className="btn btn-secondary">
            Modifier
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BookCard;