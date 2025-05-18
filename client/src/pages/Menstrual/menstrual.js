import React, { useState, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import "./menstrual.css";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Replace with your actual API key
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

function Menstrual() {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [nextPeriod, setNextPeriod] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [lastQnA, setLastQnA] = useState({ question: "", answer: "" });
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setLastPeriodDate(date);

    if (date) {
      const next = new Date(date);
      next.setDate(next.getDate() + 28);
      setNextPeriod(next.toDateString());
    } else {
      setNextPeriod("");
    }
  };

  const cleanAnswerText = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1") // bold **text** -> text
      .replace(/\*(.*?)\*/g, "$1")     // italic *text* -> text
      .replace(/^\s*[-*]\s*/gm, "• ")  // list markers - or * at start of line -> bullet
      .replace(/\n\s*\n/g, "\n\n")     // normalize blank lines
      .trim();
  };

  const askGemini = async (question) => {
    setLoading(true);

    const prompt = `You are a menstrual health expert. Keep your answers short and clear.\nUser: ${question}`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const rawAnswer = response?.text || "Sorry, I couldn't understand that.";
      const cleanedAnswer = cleanAnswerText(rawAnswer);

      setLastQnA({ question, answer: cleanedAnswer });
    } catch (error) {
      setLastQnA({
        question,
        answer: "Error: Unable to fetch answer. Please try again later.",
      });
    }

    setLoading(false);
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (userQuestion.trim()) {
      askGemini(userQuestion.trim());
      setUserQuestion("");
      inputRef.current.blur(); // remove focus after submit
    }
  };

  return (
    <div className="menstrual-container">
      <h2 className="menstrual-heading">🩸 Cycle Calendar</h2>
      <div className="menstrual-calendar-section">
        <label htmlFor="period-date">Enter Last Period Date:</label>
        <input
          id="period-date"
          type="date"
          value={lastPeriodDate}
          onChange={handleDateChange}
          aria-describedby="next-period-info"
        />
        {nextPeriod && (
          <p id="next-period-info">
            🔔 Estimated Next Period: <strong>{nextPeriod}</strong>
          </p>
        )}
      </div>

      {/* Chatbot Section */}
      <div className="chatbot-section" style={{ marginTop: "2rem" }}>
        <h3>Ask about menstrual health</h3>
        <form onSubmit={handleQuestionSubmit} style={{ textAlign: "center" }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask me anything..."
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            style={{
              padding: "0.5rem",
              width: "80%",
              margin: "0 auto",
              display: "block",
              textAlign: "center",
            }}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "0.5rem", marginTop: "0.5rem" }}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </form>

        {/* Show last question and answer */}
        {lastQnA.question && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "#fff0f6",
              borderRadius: "10px",
              color: "#660029",
              maxWidth: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "left",
              whiteSpace: "pre-wrap",
              fontFamily: "Arial, sans-serif",
              fontSize: "1rem",
            }}
          >
            <strong>You asked:</strong> <br />
            {lastQnA.question}
            <br />
            <br />
            <strong>Expert answered:</strong> <br />
            {lastQnA.answer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Menstrual;
