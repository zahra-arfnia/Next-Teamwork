"use client";
import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import {use} from "react"
import { FaTrash } from "react-icons/fa";
const API_URL = "/api/v1/question";

export default function QuestionPage({ params }) {
  const { id } = use(params);

  const [qaData, setQaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setQaData(data);
    } catch (err) {
      console.error("Error fetching questions");
      setError( err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const question = qaData.find((item) => item._id === id);

  const handleEditAnswer = async (index, updatedAnswer) => {
    const updatedAnswers = [...question.answer];
    updatedAnswers[index] = updatedAnswer.trim();

    try {
      const res = await fetch(API_URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, updatedAnswers }),
      });

      if (!res.ok) throw new Error("Failed to update answers");

      const updatedQuestion = await res.json();
      setQaData((prevData) =>
        prevData.map((item) =>
          item._id === id ? updatedQuestion : item
        )
      );
    } catch (err) {
      console.error("Error updating answers:", err);
      setError("Failed to update answers.");
    }
  };

  const handleAddAnswer = async () => {
    if (newAnswer.trim()) {
      try {
        const res = await fetch(API_URL, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, newAnswer: newAnswer.trim() }),
        });

        if (!res.ok) throw new Error("Failed to save the new answer");

        const updatedQuestion = await res.json();
        setQaData((prevData) =>
          prevData.map((item) =>
            item._id === id ? updatedQuestion : item
          )
        );
        setNewAnswer("");
      } catch (err) {
        console.error("Error adding answer:", err);
        setError("Failed to add answer.");
      }
    }
  };



  const handleDeleteAnswer = async (index) => {
    const updatedAnswers = [...question.answer];
    updatedAnswers.splice(index, 1);
  
    try {
      const res = await fetch(API_URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, updatedAnswers }), 
      });
  
      if (!res.ok) throw new Error("Failed to delete the answer");
  
      const updatedQuestion = await res.json();
      setQaData((prevData) =>
        prevData.map((item) =>
          item._id === id ? updatedQuestion : item
        )
      );
    } catch (err) {
      console.error("Error deleting answer:", err);
      setError("Failed to delete answer.");
    }
  };
  



  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!question) {
    notFound();
    return null;
  }

  return (
    <div className="page-container">
      <div className="main-content">
        <div className="question-header">
          <p className="question-title">{question.title}</p>
          <p className="question-text">{question.description}</p>
        </div>

        <div className="answers-section">
          <p className="answers-title">Answers:</p>

          {question.answer.map((answer, index) => (
            <div key={index} className="answer-item">
              <input
                type="text"
                value={answer}
                className="answer_input"
                onChange={(e) =>
                  handleEditAnswer(index, e.target.value)
                }
                placeholder="Edit your answer..."
              />
           <FaTrash
      className="icon-delete-answer-btn"
      onClick={() => handleDeleteAnswer(index)}
    />
            </div>
          ))}

          <input
            placeholder="Write your new answer..."
            type="text"
            className="answer-input"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button className="submit-button" onClick={handleAddAnswer}>
           SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
