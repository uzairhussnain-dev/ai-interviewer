from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()

class RoleRequest(BaseModel):
    role: str

class AnswerRequest(BaseModel):
    role: str
    question: str
    answer: str


QUESTIONS = {
    "web": [
        "Explain React lifecycle",
        "What is REST API?",
        "What is flexbox in CSS?"
    ],
    "python": [
        "What are decorators in Python?",
        "Explain OOP concepts",
        "What is FastAPI?"
    ],
    "design": [
        "What makes good UI design?",
        "Explain color theory",
        "What is UX vs UI?"
    ],
    "freelancing": [
        "How do you handle difficult clients?",
        "How do you price a project?",
        "How do you manage deadlines?"
    ]
}

@app.post("/question")
def get_question(data: RoleRequest):
    role = data.role

    question = random.choice(QUESTIONS.get(role, QUESTIONS["web"]))

    return {
        "role": role,
        "question": question
    }


@app.post("/evaluate")
def evaluate_answer(data: AnswerRequest):

    length = len(data.answer.split())

    score = min(10, length // 10)

    return {
        "score": score,
        "feedback": f"Answer evaluated for {data.role} role. Add more technical depth.",
        "role": data.role
    }