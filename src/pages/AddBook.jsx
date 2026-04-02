import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { createBook } from '../services/bookService';

// Composant page : ajout d’un livre
function AddBook() {
  const navigate = useNavigate(); // Permet la redirection

  // Gestion de la soumission du formulaire
  async function handleAddBook(bookData) {
    await createBook(bookData); // Appel API : création du livre
    navigate('/'); // Redirection vers la liste
  }

  return (
    <section className="tp-form-page">
      <h1 className="tp-form-page-title">Ajouter un nouveau livre</h1>

      <div className="tp-form-wrapper">
        <BookForm
          onSubmit={handleAddBook} // Callback à la soumission
          submitLabel="Ajouter le livre" // Texte du bouton
        />
      </div>
    </section>
  );
}

export default AddBook;