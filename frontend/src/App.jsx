import { useState } from "react"
import LoginPage from "./components/LoginPage"
import MainPage from "./components/MainPage"

function App() {
  const [user, setUser] = useState({
    id: "u3",
    name: "Sam",
    dietary_restrictions: [],
    allergies: [],
    health_goal: "general",
    preferences: ["asian", "quick", "comfort"],
    dislikes: [],
    order_history: ["m7", "m8", "m9", "m10"],
    feedback: { m7: 5, m8: 5, m9: 4, m10: 3 }
  })

  return (
    <>
      {!user
        ? <LoginPage onLogin={setUser} />
        : <MainPage user={user} />
      }
    </>
  )
}

export default App