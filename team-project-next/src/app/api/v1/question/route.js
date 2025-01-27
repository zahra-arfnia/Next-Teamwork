import { connectDB, disconnectDB } from "@/db/connectDB";
import Question from "@/db/Models/Question";
import { revalidateTag } from "next/cache";
// GET all Questions
export async function GET() {
  try {
    await connectDB();
    const Questions = await Question.find();
    return new Response(JSON.stringify(Questions), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching Questions:", error);
    disconnectDB();
  } finally {
    disconnectDB();
  }
}
// POST a new Question
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newQuestion = new Question(body);
    await newQuestion.save();
    revalidateTag("Questions");
    return new Response(JSON.stringify(newQuestion), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching Questions:", error);
    disconnectDB();
  } finally {
    disconnectDB();
  }
}




// PATCH answer
export async function PATCH(request) {
  try {
    await connectDB();
    const { id, newAnswer, updatedAnswers } = await request.json();

    let updatedQuestion;

    if (newAnswer) {
      updatedQuestion = await Question.findByIdAndUpdate(
        id,
        { $push: { answer: newAnswer } },
        { new: true }
      );
    } else if (updatedAnswers) {
      updatedQuestion = await Question.findByIdAndUpdate(
        id,
        { answer: updatedAnswers },
        { new: true }
      );
    }

    return new Response(JSON.stringify(updatedQuestion), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating answers:", error);
    disconnectDB();
    return new Response(
      JSON.stringify({ message: "Failed to update answers." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    disconnectDB();
  }
}
