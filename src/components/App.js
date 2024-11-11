import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [quiz, setQuiz] = useState([]);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm quiz={quiz} setQuiz={setQuiz} />
      ) : (
        <QuestionList quiz={quiz} setQuiz={setQuiz} />
      )}
    </main>
  );
}

export default App;
