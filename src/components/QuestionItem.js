import React from "react";

function QuestionItem({ question, onUpdate, setQuiz }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setQuiz((prevQuiz) =>
          prevQuiz.filter((question) => question.id !== id)
        );
      });
  };
  const handleCorrectAnswer = (e) => {
    const newCorrectIndex = parseInt(e.target.value);
    let correctObject = { correctIndex: newCorrectIndex };
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(correctObject),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        console.log(updatedQuestion);
        onUpdate(updatedQuestion);
      });
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswer}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
