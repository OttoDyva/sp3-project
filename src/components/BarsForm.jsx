import { useEffect, useState, useRef } from "react";
import facade from "../util/apiFacade";

const BarsForm = ({ setBars }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    const fetchBars = async () => {
      try {
        const bars = await facade.fetchData("/api/bars");
        if (setBars) setBars(bars);
      } catch (error) {
        console.error("Error fetching bars:", error);
      }
    };
    fetchBars();
  }, [setBars]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formElement = evt.target;
    const form = new FormData(formElement);
    const obj = Object.fromEntries(form.entries());
    delete obj.id;

    obj.authorName = obj.authorName.trim();

    try {
      const authors = await facade.fetchData("/api/authors");
      const existingAuthor = authors.find(
        (author) =>
          author.name.trim().toLowerCase() === obj.authorName.toLowerCase()
      );

      if (existingAuthor) {
        const confirmAdd = window.confirm(
          `Author "${existingAuthor.name}" already exists. Would you like to add this bar to the existing author?`
        );

        if (!confirmAdd) {
          return;
        }

        obj.authorName = existingAuthor.name;
        obj.authorDescription = existingAuthor.description;
      }

      const createdBar = await facade.postData("/api/bars", obj);

      setBars((prevBars) => [...prevBars, createdBar]);

      setSuccessMessage("Bar created successfully!");

      if (formRef.current) {
        formRef.current.reset();
      }

      const updatedAuthors = await facade.fetchData("/api/authors");
      const duplicateAuthors = updatedAuthors.filter(
        (author) =>
          author.name.trim().toLowerCase() === obj.authorName.toLowerCase() &&
          author.bars.length === 0
      );

      for (const duplicateAuthor of duplicateAuthors) {
        console.log(`Deleting duplicate author with ID: ${duplicateAuthor.id}`);
        await facade.deleteData(`/api/authors/${duplicateAuthor.id}`);
      }

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting the form:", error);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef}>
        <h2>Add Bar</h2>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          type="text"
          placeholder="title"
          required
        />
        <br />
        <label htmlFor="content">Content</label>
        <input
          name="content"
          id="content"
          type="text"
          placeholder="content"
          required
        />
        <br />
        <label htmlFor="date">Date</label>
        <input
          name="date"
          id="date"
          type="date"
          placeholder="YYYY-MM-DD"
          required
        />
        <br />
        <label htmlFor="genre">Genre</label>
        <select name="genre" id="genre" required>
          <option value="" disabled defaultChecked>
            Select Genre
          </option>
          <option value="PHILOSOPHY">PHILOSOPHY</option>
          <option value="POEM">POEM</option>
          <option value="MOTIVATIONAL">MOTIVATIONAL</option>
          <option value="HUMOR">HUMOR</option>
        </select>
        <br />
        <label htmlFor="authorName">Author Name</label>
        <input
          name="authorName"
          id="authorName"
          type="text"
          placeholder="authorName"
          required
        />
        <br />
        <label htmlFor="authorDescription">Author Description</label>
        <input
          name="authorDescription"
          id="authorDescription"
          type="text"
          placeholder="authorDescription"
          required
        />
        <br />
        <button type="submit">Save Bar</button>
      </form>
      {successMessage && (
        <p className="success-message fade-in">{successMessage}</p>
      )}
    </div>
  );
};

export default BarsForm;
