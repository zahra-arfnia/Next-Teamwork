"use client";
import "../globals.css";
import React, { useState, useEffect } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
const API_URL = "/api/v1/question";

export default function Question() {
  const [qaData, setQaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("newer");
  const [searchTerm, setSearchTerm] = useState("");
  console.log(qaData);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setQaData(data);
    } catch (err) {
      console.error("Error fetching questions");
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const handleSetFilter = () => {
    const sortedData = [...qaData].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return filter === "newer" ? dateB - dateA : dateA - dateB;
    });

    setQaData(sortedData);
  };

  return (
    <div className="question-container">
      <h1 className="question-title">Questions</h1>

      <input
        type="text"
        placeholder="Search"
        className="question-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="question-filter">
        <p>Filter by:</p>
        <div className="flex">
          <button
            className="filter-button"
            onClick={() => {
              setFilter("newer");
              handleSetFilter();
            }}
          >
            <FaArrowDownLong className="icon-filter" /> Newer
          </button>
          <button
            className="filter-button"
            onClick={() => {
              setFilter("older");
              handleSetFilter();
            }}
          >
            <FaArrowDownLong className="icon-filter" /> Older
          </button>
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading questions...</p>
      ) : error ? (
        <p className="error-text">no </p>
      ) : (
        qaData.map((item) => (
          <div key={item._id} className="question-item">
            <div className="question-data">
              <Link href={`/questions/${item._id}`} className="question-link">
                <div>
                  <h2 className="item-title">{item.title}</h2>
                  <p className="item-description">{item.description}</p>
                </div>
                <p className="item-date">{new Date().toLocaleString()}</p>
              </Link>
            </div>

            <button
              onClick={() => handleDelete(item._id)}
              className="delete-button"
            >
              <FaTrash className="icon-delete-btn" />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
