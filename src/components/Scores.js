import "firebase/compat/auth";
import "firebase/compat/firestore";

// In development: basic score querying experimentation with Firestore.
// Some score querying might be better hosted using a relational database.
// However, I would still like to explore a NoSQL database
// and its ability to potentially serve information about activity across all users.

function Scores(props) {
  return (
    <div>
      <div className="test-container">
        <h1>Scores:</h1>
        <table></table>
      </div>
    </div>
  );
}

export default Scores;
