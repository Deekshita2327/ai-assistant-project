import { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) return;

    try {
      setLoading(true);
      setAnswer("");

      const res = await axios.post("http://localhost:5000/api/chat", {
        question,
      });

      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("❌ Error fetching response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Assistant 🤖</h1>

      <input
        type="text"
        placeholder="Ask something..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleAsk} disabled={loading} style={styles.button}>
        {loading ? "Loading..." : "Ask"}
      </button>

      {/* Loading */}
      {loading && <p style={styles.loading}>🤖 Thinking...</p>}

      {/* Answer in bullet points */}
      {answer && (
        <ul style={styles.answer}>
          {answer.split("\n").map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    color: "white",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "300px",
    borderRadius: "5px",
    border: "1px solid gray",
    marginBottom: "10px",
  },
  button: {
    display: "block",
    margin: "10px auto",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  loading: {
    marginTop: "10px",
    color: "#aaa",
  },
  answer: {
    marginTop: "20px",
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "left",
    lineHeight: "1.8",
  },
};

export default App;