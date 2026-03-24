import axios from 'axios';

const API_URL = 'http://localhost:3001/books';

export async function getBooks() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function getBookById(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function createBook(bookData) {
  const response = await axios.post(API_URL, bookData);
  return response.data;
}

export async function updateBook(id, bookData) {
  const response = await axios.put(`${API_URL}/${id}`, bookData);
  return response.data;
}

export async function deleteBook(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}