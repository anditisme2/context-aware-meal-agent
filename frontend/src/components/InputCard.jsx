import { useState } from "react"

function InputCard({ onSubmit }) {
    const [selectedUser, setSelectedUser] = useState("")
    const [craving, setCraving] = useState("")
    const [weather, setWeather] = useState("any")

  return (
    <div style={{
      background: "white",
      borderRadius: "16px",
      padding: "40px",
      maxWidth: "500px",
      margin: "0 auto",
      boxShadow: "0 4px 24px rgba(44, 24, 16, 0.1)",
      border: "1px solid #F5E6D3",
    }}>
      <h2 style={{ marginBottom: "24px", color: "#2C1810", textAlign: "center" }}>
        What are you craving today?
      </h2>

{/* Craving input */}
<div style={{ marginBottom: "20px" }}>
  <label style={{ display: "block", marginBottom: "8px", color: "#7D6355" }}>
    What are you craving?
  </label>
  <input
    type="text"
    placeholder="e.g. something spicy, noodles..."
    value={craving}
    onChange={e => setCraving(e.target.value)}
    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #F5E6D3" }}
  />
</div>

{/* Weather selector */}
<div style={{ marginBottom: "28px" }}>
  <label style={{ display: "block", marginBottom: "8px", color: "#7D6355" }}>
    What's the weather like?
  </label>
  <select
    value={weather}
    onChange={e => setWeather(e.target.value)}
    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #F5E6D3" }}
  >
    <option value="any">Any</option>
    <option value="hot">Hot </option>
    <option value="cold">Cold </option>
    <option value="rainy">Rainy </option>
    <option value="warm">Warm </option>
  </select>
</div>

{/* Submit button */}
<button
  onClick={() => onSubmit({ selectedUser, craving, weather })}
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
  Find My Meal
</button>

    </div>
  )
}

export default InputCard