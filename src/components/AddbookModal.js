import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

function AddbookModal({
  setIsModal,
  getBooks,
  isEditting,
  selectedBook,
  setSelectedBook,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const addBook = async (e) => {
    const token = localStorage.getItem("token");
    if (isEditting) {
      e.preventDefault();
      const token = localStorage.getItem("token");
      try {
        await axios.patch(
          `http://localhost:4000/api/v1/books/${selectedBook._id}`,
          {
            title: title,
            author: author,
            description: description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTitle("");
        setAuthor("");
        setDescription("");
        setIsModal(false);
        setSelectedBook(null);
        getBooks();
      } catch (error) {
        console.log(error);
      }
    } else {
      e.preventDefault();
      try {
        await axios.post(
          "http://localhost:4000/api/v1/books/",
          {
            title: title,
            author: author,
            description: description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTitle("");
        setAuthor("");
        setDescription("");
        setIsModal(false);
        setSelectedBook(null);
        getBooks();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isEditting) {
      setTitle(selectedBook.title);
      setAuthor(selectedBook.author);
      setDescription(selectedBook.description);
    }
    console.log(selectedBook);
  }, [isEditting, selectedBook]);

  return (
    <section className="modal">
      <div className="addBookModal">
        <span onClick={() => setIsModal(false)} className="closeBtn">
          <AiOutlineCloseCircle />
        </span>
        <form className="addBookForm">
          <h3>Add a book</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            name=""
            id=""
            placeholder="Add a short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit" onClick={addBook}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddbookModal;
