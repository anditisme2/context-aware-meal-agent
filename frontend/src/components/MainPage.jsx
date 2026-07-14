import { useState } from "react"
import foodBg from "../assets/foodimg.jpg"

function MainPage({ user }) {
  const [listening, setListening] = useState(false)
  const [recommendations, setRecommendations] = useState([])

  return (
    <div style={{ minHeight: "100vh", background: "white", fontFamily: "Georgia, serif" }}>

      {/* food photo strip */}
      <div style={{
        width: "100%",
        height: "30vh",
        backgroundImage: `url(${foodBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexShrink: 0,
      }} />

      {/* double orange lines */}
      <div style={{ width: "100%" }}>
        <div style={{ height: "3px", background: "#E87722" }} />
        <div style={{ height: "3px", background: "#E87722", marginTop: "3px" }} />
      </div>

      {/* annam card overlapping */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "-140px" }}>
        <div style={{
  width: "520px",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
  zIndex: 10,
  marginBottom: "32px",
  background: "rgba(255, 243, 225, 0.5)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  padding: "40px 40px 41px",
  textAlign: "center",
}}>
  <h1 style={{
    fontFamily: "'La Belle Aurore', cursive",
    fontSize: "3rem",
    color: "white",
    margin: "0 0 6px 0",
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
      </div>

      {/* two column cards */}
      <div style={{
        display: "flex",
        gap: "24px",
        padding: "0 40px 120px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>

        {/* left — previous orders */}
        <div style={{
          flex: 1,
          border: "2px solid #333",
          borderRadius: "16px",
          position: "relative",
          padding: "24px",
          paddingTop: "40px",
          background: "white",
        }}>
          <div style={{
            position: "absolute",
            top: "-18px",
            left: "24px",
            background: "#E87722",
            borderRadius: "20px",
            padding: "8px 20px",
          }}>
            <span style={{
              fontFamily: "'La Belle Aurore', cursive",
              fontSize: "1.2rem",
              color: "white",
            }}>
              Your Previous Orders
            </span>
          </div>

          {user.order_history.length === 0 ? (
            <p style={{ color: "#999", textAlign: "center" }}>No orders yet</p>
          ) : (
            user.order_history.slice(0, 4).map((orderId, i) => (
              <div key={i} style={{
                borderBottom: "1px solid #f0f0f0",
                paddingBottom: "12px",
                marginBottom: "12px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: "bold", fontSize: "1rem" }}>Last order</span>
                  <span style={{ fontWeight: "bold", fontSize: "1rem" }}>Total cost</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#777", fontSize: "0.85rem" }}>
                  <span>{orderId}</span>
                  <span>Restaurant name</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* right — suggestions */}
        <div style={{
          flex: 1,
          border: "2px solid #333",
          borderRadius: "16px",
          position: "relative",
          padding: "24px",
          paddingTop: "40px",
          background: "white",
        }}>
          <div style={{
            position: "absolute",
            top: "-18px",
            left: "24px",
            background: "#E87722",
            borderRadius: "20px",
            padding: "8px 20px",
          }}>
            <span style={{
              fontFamily: "'La Belle Aurore', cursive",
              fontSize: "1.2rem",
              color: "white",
            }}>
              Suggestions
            </span>
          </div>

          {recommendations.length === 0 ? (
            <p style={{ color: "#999", textAlign: "center" }}>Ask Annam for suggestions!</p>
          ) : (
            recommendations.map((rec, i) => (
              <div key={i} style={{
                borderBottom: "1px solid #f0f0f0",
                paddingBottom: "12px",
                marginBottom: "12px",
              }}>
                <div style={{ fontWeight: "bold", color: "#E87722", fontSize: "0.9rem" }}>
                  0{i + 1}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: "bold", fontSize: "1rem" }}>{rec.meal.name}</span>
                  <span style={{ color: "#777", fontSize: "0.85rem" }}>{rec.restaurant.name}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* bottom mic bar */}
      <div style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "white",
        borderRadius: "40px",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        zIndex: 100,
      }}>
        {/* mic icon */}
        <div style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </div>

        {/* Ask Annam pill */}
        <div style={{
          background: "#E87722",
          borderRadius: "30px",
          padding: "10px 28px",
          cursor: "pointer",
        }}>
          <span style={{
            fontFamily: "'La Belle Aurore', cursive",
            fontSize: "1.2rem",
            color: "white",
          }}>
            {listening ? "Annam is listening..." : "Ask Annam..."}
          </span>
        </div>
      </div>

    </div>
  )
}

export default MainPage