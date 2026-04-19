import { useState } from "react"

function LoginPage({ onLogin }) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    console.log("handleLogin called with name:", name)
    if (!name.trim()) return

    const res = await fetch("http://localhost:8000/api/users")
    const users = await res.json()

    const found = users.find(u => u.name.toLowerCase() === name.toLowerCase().trim())

    if (found) {
      onLogin(found)
    } else {
      setError("User not found. Want to create a profile?")
    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "16px",
        maxWidth: "400px",
        width: "100%",
        boxShadow: "0 4px 24px rgba(44, 24, 16, 0.1)",
        border: "1px solid #F5E6D3",
        textAlign: "center",
      }}>
        <h2 style={{ color: "#2C1810", marginBottom: "8px" }}>Welcome Back</h2>
        <p style={{ color: "#7D6355", marginBottom: "24px" }}>Enter your name to continue</p>

        <input
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #F5E6D3",
            marginBottom: "16px",
            fontFamily: "Georgia, serif",
            fontSize: "1rem",
          }}
        />

        {error && <p style={{ color: "#C0392B", marginBottom: "16px" }}>{error}</p>}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            background: "#C0392B",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
            fontFamily: "Georgia, serif",
          }}
        >
          Let's Eat 
        </button>
      </div>
    </div>
  )
}

export default LoginPage