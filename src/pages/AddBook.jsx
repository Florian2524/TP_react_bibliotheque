import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { createBook } from '../services/bookService';

function AddBook() {
  const navigate = useNavigate();

  async function handleAddBook(bookData) {
    await createBook(bookData);
    navigate('/');
  }

  return (
    <section className="tp-form-page">
      <h1 className="tp-form-page-title">Ajouter un nouveau livre</h1>

      <div className="tp-form-wrapper">
        <BookForm
          onSubmit={handleAddBook}
          submitLabel="Ajouter le livre"
        />
      </div>
    </section>
  );
}

export default AddBook;