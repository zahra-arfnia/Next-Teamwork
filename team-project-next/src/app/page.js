// import Image from "next/image";

// import { Button } from "@mui/material";

// export default function Home() {
//   return <div>L</div>;
// }
"use client";
import { useState, useEffect } from "react";

export default function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setStatus("لطفاً عنوان و توضیحات را وارد کنید.");
      return;
    }

    try {
      const res = await fetch("/api/v1/question", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          title,
          description,
        }), 
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setStatus("سوال جدید با موفقیت اضافه شد.");
        setTitle(""); 
        setDescription("");
        fetchQuestions();  
      } else {
        setStatus("خطا در اضافه کردن سوال.");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      setStatus("خطا در ارتباط با سرور.");
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await fetch("/api/v1/question");
      const data = await res.json();
      if (res.ok) {
        setQuestions(data);
      } else {
        setStatus("خطا در بارگذاری سوالات.");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setStatus("خطا در ارتباط با سرور.");
    }
  };


  useEffect(() => {
    fetchQuestions();
  }, []); 

  return (
    <div>
      <h1>اضافه کردن سوال جدید</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">عنوان سوال:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان سوال را وارد کنید"
          />
        </div>
        <div>
          <label htmlFor="description">توضیحات سوال:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="توضیحات سوال را وارد کنید"
          />
        </div>
        <button type="submit">ارسال سوال</button>
      </form>

      {status && <p>{status}</p>}

      <h2>سوالات موجود</h2>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question._id}>
              <h3>{question.title}</h3>
              <p>{question.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>هیچ سوالی پیدا نشد.</p>
      )}
    </div>
  );
}
