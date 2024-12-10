const AuthorList = ({ authors, onSelectAuthor }) => (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <h2>Author</h2>
      <ul>
        {authors.map((author) => (
          <li
            key={author.id}
            onClick={() => onSelectAuthor(author.id)}
            style={{ cursor: "pointer" }}
          >
            <h3>{author.name}</h3>
            <p>
              Description: {author.description} <br />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
  export default AuthorList;
  