import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlinePlus,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import AddbookModal from "../components/AddbookModal";

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const getBooks = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/books/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(data.data.books);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteBook = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:4000/api/v1/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const searchBook = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/books/${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooks(data.book);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!search) getBooks();
  }, [search]);

  const editBook = (book) => {
    setSelectedBook(book);
    setIsEditting(true);
    setIsModal(true);
  };

  if (search && books.length === 0) {
    return <h1>No results matching {search}</h1>;
  }

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Search for a book"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="searchIcon">
          <AiOutlineSearch />
        </span>
        <button className="searchBtn" onClick={searchBook}>
          Search
        </button>
      </div>
      <div className="addBook">
        <button className="addBookBtn" onClick={() => setIsModal(true)}>
          <AiOutlinePlus /> Add a book
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th className="title">Title</th>
            <th className="author">Author</th>
            <th className="description">Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => {
            return (
              <tr key={book._id}>
                <td className="title">{book.title}</td>
                <td className="author">{book.author}</td>
                <td className="description">{book.description}</td>
                <td>
                  <AiFillDelete
                    onClick={() => deleteBook(book._id)}
                    style={{ cursor: "pointer", width: "1.5rem" }}
                  />
                  <AiFillEdit
                    onClick={() => editBook(book)}
                    style={{ cursor: "pointer", width: "1.5rem" }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isModal && (
        <AddbookModal
          setIsModal={setIsModal}
          getBooks={getBooks}
          isEditting={isEditting}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      )}
    </>
  );
}

export default Home;
