import "./index.css"
import { useState } from "react"
import LoginPage from "./components/LoginPage"

function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      {!user
        ? <LoginPage onLogin={setUser} />
        : <div>Welcome, {user.name}!</div>
      }
    </>
  )
}

export default App