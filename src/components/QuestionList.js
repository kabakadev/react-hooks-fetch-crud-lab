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
      .then(
        setQuiz((prevQuiz) => prevQuiz.filter((question) => question.id !== id))
      );
  };
  const handleUpdate = (updatedQuestion) => {
    setQuiz(
      quiz.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  };

  const newQuizzes = quiz.map((oneQuiz) => {
    return (
      <QuestionItem
        key={oneQuiz.id}
        question={oneQuiz}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
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
