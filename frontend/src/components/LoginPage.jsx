import { useState } from "react"
import foodBg from "../assets/foodimg.jpg"

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    if (!username.trim()) return
    const res = await fetch("http://localhost:8000/api/users")
    const users = await res.json()
    const found = users.find(u => u.name.toLowerCase() === username.toLowerCase().trim())
    if (found) {
      onLogin(found)
    } else {
      setError("User not found.")
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>

      {/* full width photo */}
      <div style={{
        width: "100%",
        height: "55vh",
        backgroundImage: `url(${foodBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexShrink: 0,
      }} />

      {/* double orange lines below photo */}
      <div style={{ width: "100%", flexShrink: 0 }}>
        <div style={{ height: "3px", background: "#E87722" }} />
        <div style={{ height: "3px", background: "#E87722", marginTop: "3px" }} />
      </div>

      {/* card */}
      <div style={{
        marginTop: "-140px",
        width: "520px",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        zIndex: 10,
      }}>

        {/* blurred top — title and subtitle on photo */}
        <div style={{
          background: "rgba(255, 243, 225, 0.5)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          padding: "40px 40px 40px",
          textAlign: "center",
        }}>
          <h1 style={{
            fontFamily: "'La Belle Aurore', cursive",
            fontSize: "3rem",
            color: "white",
            margin: "10px 0 6px 0",
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}>
            Annam
          </h1>
          <p style={{
            fontFamily: "Georgia, serif",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#1a1a1a",
            margin: 0,
          }}>
            Your Intelligent Meal Agent
          </p>
        </div>

        {/* solid cream bottom — inputs */}
        <div style={{
          background: "#FFF3E8",
          padding: "28px 32px 36px",
          textAlign: "center",
        }}>
          <input
            type="text"
            placeholder="Username/ mail"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "10px",
              border: "1.5px solid #ddd",
              fontSize: "1rem",
              marginBottom: "14px",
              fontFamily: "Georgia, serif",
              background: "white",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "10px",
              border: "1.5px solid #ddd",
              fontSize: "1rem",
              marginBottom: "24px",
              fontFamily: "Georgia, serif",
              background: "white",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          {error && (
            <p style={{ color: "#C0392B", fontSize: "0.85rem", marginBottom: "12px" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            style={{
              width: "60%",
              padding: "14px",
              background: "#E87722",
              color: "white",
              border: "none",
              borderRadius: "30px",
              fontSize: "1.1rem",
              fontFamily: "Georgia, serif",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage