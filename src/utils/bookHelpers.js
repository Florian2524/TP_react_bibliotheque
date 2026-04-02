/* =========================
   HELPERS LIVRES
   ========================= */

/* Formatage date (FR) */
export function formatDate(dateString) {
  if (!dateString) {
    return 'Date inconnue';
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString('fr-FR');
}

/* Troncature texte */
export function truncateText(text, maxLength = 180) {
  if (!text) {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}

/* Chemin image couverture */
export function getCoverPath(cover) {
  if (!cover) {
    return '';
  }

  if (cover.startsWith('http://') || cover.startsWith('https://')) {
    return cover;
  }

  return `/images/couvertures/${cover}`;
}

/* Genres uniques triés */
export function getUniqueGenres(books) {
  const genres = books
    .map((book) => book.genre)
    .filter((genre) => genre && genre.trim() !== '');

  return [...new Set(genres)].sort((a, b) => a.localeCompare(b, 'fr'));
}

/* Filtrage livres */
export function filterBooks(books, searchTerm, selectedGenre) {
  return books.filter((book) => {
    const title = book.titre?.toLowerCase() || '';
    const author = book.auteur?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      title.includes(search) || author.includes(search);

    const matchesGenre =
      selectedGenre === '' || book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });
}

/* Tri par date */
export function sortBooksByDate(books, sortOrder) {
  if (!sortOrder) {
    return books;
  }

  const sortedBooks = [...books].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateA - dateB;
  });

  if (sortOrder === 'desc') {
    sortedBooks.reverse();
  }

  return sortedBooks;
}