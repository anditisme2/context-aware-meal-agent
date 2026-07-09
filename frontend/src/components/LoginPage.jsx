import { useState } from "react"

function LoginPage({ onLogin }) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    if (!name.trim()) return

    const res = await fetch("http://localhost:8000/api/users")
    const users = await res.json()
    const found = users.find(u => u.name.toLowerCase() === name.toLowerCase().trim())

    if (found) {
      onLogin(found)
    } else {
      setError("User not found. Try Alex, Jordan, or Sam.")
    }
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
    }}>
      <div style={{
        background: "white",
        padding: "48px",
        borderRadius: "20px",
        width: "380px",
        boxShadow: "0 8px 32px rgba(44,24,16,0.12)",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>🍽️</h1>
        <h2 style={{ color: "var(--text)", marginBottom: "4px" }}>Smart Food Agent</h2>
        <p style={{ color: "var(--text-light)", marginBottom: "32px", fontSize: "0.9rem" }}>
          Your personal AI meal assistant
        </p>

        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "10px",
            border: "1.5px solid #F5E6D3",
            fontSize: "1rem",
            fontFamily: "Georgia, serif",
            marginBottom: "12px",
            outline: "none",
          }}
        />

        {error && <p style={{ color: "var(--red)", fontSize: "0.85rem", marginBottom: "12px" }}>{error}</p>}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            background: "var(--red)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "1rem",
            fontFamily: "Georgia, serif",
            cursor: "pointer",
          }}
        >
          Let's Eat 🍽️
        </button>
      </div>
    </div>
  )
}

export default LoginPage