"use client";
import Link from "next/link";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import Modaladdquestions from "@/components/modaladd";  

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 


  const submitQuestion = async () => {
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

      if (res.ok) {
        setTitle(""); 
        setDescription("");
      } else {
        setStatus("Error in adding question");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("Error in adding question");
    } finally {
      setIsModalOpen(false); 
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      setStatus("Please enter a title and description");
      return;
    }
    setIsModalOpen(true); 
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleConfirmSubmit = () => {
    submitQuestion();
  };

  return (
    <div className="container-home">
      <div className="box1">
        <div className="box2">
          <p className="title-home">Find your answer</p>
          <h1 className="h1-box1">Question and Answers</h1>
          <p className="des-box">
            Looking for answers? You have come to the right place! Our community
            is here to help with reliable, insightful answers to all your
            questions. Whether you're here to learn, share your expertise, or
            just browse, we are excited to have you.
          </p>
          <Link href={"/questions"} className="btn-box">
            GO TO QUESTIONS
          </Link>
        </div>
        <img src="/download.jpg" className="img-home" />
      </div>

      <div className="box2-home">
        <h1 className="h1-box2">Ask your questions</h1>
        {status && <p className="err">{status}</p>}
        <form onSubmit={handleSubmit} className="form">
          <div>
            <TextField
              id="title"
              label="Title"
              variant="filled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              id="description"
              label="Description"
              variant="filled"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </div>
          <button type="submit" className="submit-button-qestions">
            SUBMIT
          </button>
        </form>
      </div>


      {isModalOpen && (
        <Modaladdquestions
          onClose={handleCloseModal}
          onConfirm={handleConfirmSubmit} 
        />
      )}
    </div>
  );
}
