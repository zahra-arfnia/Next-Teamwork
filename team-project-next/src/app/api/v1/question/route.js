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
