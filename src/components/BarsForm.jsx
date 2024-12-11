import { useEffect } from "react";
import facade from "../util/apiFacade";

const BarsForm = ({ setBars }) => {
  useEffect(() => {
    const fetchBars = async () => {
      const bars = await facade.fetchData("/api/bars");
      setBars(bars);
    };
    fetchBars();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formElement = evt.target;
    const form = new FormData(formElement);
    const obj = Object.fromEntries(form.entries());
    delete obj.id;
    console.log(obj);

    try {
      const createdBar = await facade.postData("/api/bars", obj); // Adjust endpoint as needed
      setBars((prevBars) => [...prevBars, createdBar]); // Append the new bar to the list
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add Bar</h2>
        <label htmlFor="title">Title</label>
        <input name="title" id="title" type="text" placeholder="title" />
        <br />
        <label htmlFor="content">Content</label>
        <input name="content" id="content" type="text" placeholder="content" />
        <br />
        <label htmlFor="date">Date</label>
        <input name="date" id="date" type="date" placeholder="YYYY-MM-DD" />
        <br />
        <label htmlFor="genre">Genre</label>
        <select name="genre" id="genre">
          <option defaultChecked>Select Genre</option>
          <option value="PHILOSOPHY">PHILOSOPHY</option>
          <option value="POEM">POEM</option>
          <option value="MOTIVATIONAL">MOTIVATIONAL</option>
          <option value="HUMOR">HUMOR</option>
        </select>
        <br />
        <label htmlFor="authorName">Author name</label>
        <input
          name="authorName"
          id="authorName"
          type="authorName"
          placeholder="authorName"
        />
        <br />
        <label htmlFor="authorDescription">Author description</label>
        <input
          name="authorDescription"
          id="authorDescription"
          type="authorDescription"
          placeholder="authorDescription"
        />
        <br />
        <button type="submit">Save Bar</button>
      </form>
    </>
  );
};
export default BarsForm;
