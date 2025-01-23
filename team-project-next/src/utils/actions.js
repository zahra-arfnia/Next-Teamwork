"use server";
import { revalidateTag } from "next/cache";
export const getQuestion = async (formData) => {
  await fetch("http://localhost:3000/api/v1/question", {});
  revalidateTag("questions");
};
export const addQuestion = async (formData) => {
  await fetch("http://localhost:3000/api/v1/question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  revalidateTag("questions");
};
