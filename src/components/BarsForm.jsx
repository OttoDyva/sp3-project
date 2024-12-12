import { useEffect } from "react";
import facade from "../util/apiFacade";

const BarsForm = ({ setBars }) => {
  useEffect(() => {
    const fetchBars = async () => {
      try {
        const bars = await facade.fetchData("/api/bars");
        if (setBars) setBars(bars); // Only call setBars if it's defined
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

    obj.authorName = obj.authorName.trim(); // Normalize author name

    try {
      // Fetch existing authors
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
          return; // Stop further processing if the user cancels
        }

        // Use the existing author's exact name and description
        obj.authorName = existingAuthor.name; // Ensure exact matching
        obj.authorDescription = existingAuthor.description; // Use existing description
      }

      console.log("Payload being sent to API:", obj); // Debugging
      const createdBar = await facade.postData("/api/bars", obj);

      // Update bars state
      setBars((prevBars) => [...prevBars, createdBar]);

      // Fetch authors again to check for empty duplicates
      const updatedAuthors = await facade.fetchData("/api/authors");
      const emptyAuthors = updatedAuthors.filter(
        (author) =>
          author.name.trim().toLowerCase() === obj.authorName.toLowerCase() &&
          author.bars.length === 0
      );

      // Delete all empty duplicate authors
      for (const emptyAuthor of emptyAuthors) {
        console.log(`Deleting empty author with ID: ${emptyAuthor.id}`);
        await facade.deleteData(`/api/authors/${emptyAuthor.id}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default BarsForm;
