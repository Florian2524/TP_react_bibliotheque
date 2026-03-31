import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

import './styles/base.css';
import './styles/layout.css';
import './styles/header.css';
import './styles/filters.css';
import './styles/books.css';
import './styles/forms.css';
import './styles/modal.css';

function App() {
  return (
    <div className="app">
      <Header />

      <main className="main-container">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/ajouter" element={<AddBook />} />
          <Route path="/modifier/:id" element={<EditBook />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;