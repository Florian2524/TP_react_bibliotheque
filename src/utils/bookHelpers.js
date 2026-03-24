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

export function truncateText(text, maxLength = 180) {
  if (!text) {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}

export function getCoverPath(fileName) {
  if (!fileName) {
    return '';
  }

  return `/images/couvertures/${fileName}`;
}