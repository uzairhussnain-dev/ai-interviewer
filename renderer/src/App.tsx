import { useState } from "react";

export default function App() {
  const [role, setRole] = useState<string>("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<any>(null);

  const startInterview = async (selectedRole: string) => {
    setRole(selectedRole);

    const res = await window.electron.invoke("get-question", selectedRole);
    setQuestion(res.question);
    setResult(null);
    setAnswer("");
  };

  const submitAnswer = async () => {
    const res = await window.electron.invoke("evaluate-answer", {
      role,
      question,
      answer,
    });

    setResult(res);
  };

  return (
    <div style={{
      height: "100vh",
      background: "#0f0f0f",
      color: "white",
      display: "flex",
      flexDirection: "column",
      
      alignItems: "center",
      justifyContent: "center"
    }}>

      <h1>🧠 AI Interview Trainer</h1>

      {!role && (
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          
          <button onClick={() => startInterview("web")}>Web Dev</button>
          <button onClick={() => startInterview("python")}>Python</button>
          <button onClick={() => startInterview("design")}>Design</button>
          <button onClick={() => startInterview("freelancing")}>Freelancing</button>

        </div>
      )}

      {role && (
        <>
          <h3>Role: {role}</h3>

          <h2>{question}</h2>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer..."
            style={{ width: 400, height: 120 }}
          />

          <button onClick={submitAnswer}>
            Submit Answer
          </button>
        </>
      )}

      {result && (
        <div>
          <h3>Score: {result.score}/10</h3>
          <p>{result.feedback}</p>
        </div>
      )}

    </div>
  );
}