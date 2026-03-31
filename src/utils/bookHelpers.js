// Fichier de regroupement des fonctions d'aide pour les livres (formatage de date, troncature de texte, etc.)



// Formatte une date au format français

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

// Troncature de texte avec ajout de "..." si le texte dépasse la longueur maximale

export function truncateText(text, maxLength = 180) {
  if (!text) {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}

// Obtenir le chemin complet de la couverture d'un livre, en gérant les URL externes et les chemins locaux

export function getCoverPath(cover) {
  if (!cover) {
    return '';
  }

  if (cover.startsWith('http://') || cover.startsWith('https://')) {
    return cover;
  }

  return `/images/couvertures/${cover}`;
}

// Obtenir la liste des genres uniques à partir d'une liste de livres, triée par ordre alphabétique

export function getUniqueGenres(books) {
  const genres = books
    .map((book) => book.genre)
    .filter((genre) => genre && genre.trim() !== '');

  return [...new Set(genres)].sort((a, b) => a.localeCompare(b, 'fr'));
}

// Filtrer les livres en fonction du terme de recherche et du genre sélectionné

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

// Trier les livres par date de publication en fonction de l'ordre de tri sélectionné (ascendant ou descendant)

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