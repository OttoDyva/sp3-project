import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import SearchAuthor from "./SearchAuthor";

// Util
import facade from "../util/apiFacade";

// CSS
import "../css/Author.css";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const authorsPerPage = 27;

  // Fetch authors on component mount
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authors = await facade.fetchData("/api/authors");
        setAuthors(authors);
        setFilteredAuthors(authors);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    fetchAuthors();
  }, []);

  // Delete an author
  const deleteAuthorById = async (authorId) => {
    try {
      await facade.deleteData(`/api/authors/${authorId}`);
      setAuthors((prev) => prev.filter((author) => author.id !== authorId));
      setFilteredAuthors((prev) =>
        prev.filter((author) => author.id !== authorId)
      );
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  // Edit an author
  const editAuthorById = async (authorId) => {
    try {
      const updatedAuthor = await facade.editData(
        `/api/authors/${authorId}`,
        editFormData
      );

      // Update the state with the edited author
      setAuthors((prev) =>
        prev.map((author) => (author.id === authorId ? updatedAuthor : author))
      );
      setFilteredAuthors((prev) =>
        prev.map((author) => (author.id === authorId ? updatedAuthor : author))
      );

      setEditingAuthor(null);
      setEditFormData({});
    } catch (error) {
      console.error("Error editing author:", error);
    }
  };

  const handleEditClick = (author) => {
    setEditingAuthor(author.id);
    setEditFormData({ name: author.name, description: author.description });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelEdit = () => {
    setEditingAuthor(null);
    setEditFormData({});
  };

  const handleAuthorClick = (authorId) => {
    navigate(`/authors/${authorId}`);
  };

  // Paginate the filtered authors
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = filteredAuthors.slice(
    indexOfFirstAuthor,
    indexOfLastAuthor
  );

  const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top when the page changes
  };

  // Navigate to first/last page
  const goToFirstPage = () => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
    window.scrollTo(0, 0);
  };

  return (
    <div className="author-list-container">
      <div className="title">
        <h1>AUTHORS</h1>
      </div>

      <SearchAuthor onSearchResults={setFilteredAuthors} />
      <div className="author-list-grid">
        {currentAuthors.map((author) => (
          <div key={author.id} className="author-card">
            {editingAuthor === author.id ? (
              // Edit form
              <div className="edit-form">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name || ""}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
                <label>Description:</label>
                <textarea
                  name="description"
                  value={editFormData.description || ""}
                  onChange={handleInputChange}
                  placeholder="Description"
                />
                <div className="action-buttons">
                  <button onClick={() => editAuthorById(author.id)}>
                    Save
                  </button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              // Display author details
              <>
                <h3
                  className="author-name clickable"
                  onClick={() => handleAuthorClick(author.id)}
                >
                  {author.name}
                </h3>
                <p className="author-description">{author.description}</p>

                {facade.loggedIn() && facade.hasUserAccess("admin") && (
                  <div className="action-buttons">
                    <button onClick={() => deleteAuthorById(author.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleEditClick(author)}>
                      Edit
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={goToFirstPage} disabled={currentPage === 1}>
          &lt;&lt; First
        </button>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt; Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages}>
          Last &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default AuthorList;
