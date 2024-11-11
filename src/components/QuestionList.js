import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ quiz, setQuiz }) {
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuiz(data));
  }, [setQuiz]);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(setQuiz(quiz.filter((question) => question.id !== id)));
  };
  const newQuizzes = quiz.map((oneQuiz) => {
    return (
      <QuestionItem
        key={oneQuiz.id}
        question={oneQuiz}
        onDelete={handleDelete}
      />
    );
  });

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{newQuizzes}</ul>
    </section>
  );
}

export default QuestionList;
