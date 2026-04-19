import { useState } from "react"
import LoadingScreen from "./components/LoadingScreen"
import BorderFrame from "./components/BorderFrame"
import InputCard from "./components/InputCard"
import LoginPage from "./components/LoginPage"

function App() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  if(loading) {
    return <LoadingScreen />
  }
  const handleSubmit = async ({ craving, weather }) => {
  setLoading(true)
  const res = await fetch("http://localhost:8000/api/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: user.id,
      craving,
      weather,
    })
  })
  const data = await res.json()
  console.log(data)
  setLoading(false)
}
  return (
    <>
      <BorderFrame />
        <div style={{
          padding: "60px",
          miinHeight: "100vh",
        }}>
          {!user
          ? <LoginPage onLogin={setUser} />
          : (
            <>
              <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#2C1810" }}>
                 Smart Food Agent
              </h1>
              <p style={{ textAlign: "center", color: "#7D6355", marginBottom: "24px" }}>
                Welcome back, {user.name}!
              </p>
              <InputCard onSubmit={handleInputSubmit} />
            </>
          )
        }
        </div>
      </>
  )
}

export default App