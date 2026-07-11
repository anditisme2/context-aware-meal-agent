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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "Georgia, serif" }}>

      {/* food photo section */}
      <div style={{
        position: "relative",
        height: "55vh",
        backgroundImage: `url(${foodBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        {/* branding */}
        <div style={{
          position: "absolute",
          bottom: "40px",
          width: "100%",
          textAlign: "center",
        }}>
          <h1 style={{
            color: "white",
            fontSize: "3.5rem",
            fontFamily: "'La Belle Aurore', cursive",
            margin: 0,
          }}>
            Annam
          </h1>
          <p style={{
            color: "white",
            fontSize: "1rem",
            fontWeight: "bold",
            margin: "8px 0 0 0",
            letterSpacing: "1px",
          }}>
            Your Intelligent Meal Agent
          </p>
        </div>

        {/* orange bottom border line */}
        <div style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "4px",
          background: "orange",
        }} />
      </div>

      {/* login card section */}
      <div style={{
        flex: 1,
        background: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "0",
      }}>
        <div style={{
          background: "#FFF3E8",
          borderRadius: "16px",
          padding: "32px 40px",
          width: "380px",
          marginTop: "-30px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
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
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              marginBottom: "16px",
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
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              marginBottom: "16px",
              fontFamily: "Georgia, serif",
              background: "white",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          {error && (
            <p style={{ color: "red", fontSize: "0.85rem", marginBottom: "12px" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "14px",
              background: "orange",
              color: "white",
              border: "2px solid #333",
              borderRadius: "30px",
              fontSize: "1.1rem",
              fontFamily: "Georgia, serif",
              cursor: "pointer",
              fontWeight: "bold",
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