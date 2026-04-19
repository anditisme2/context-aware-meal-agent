import { Player } from "@lottiefiles/react-lottie-player"
import foodAnimation from "../assets/PrepareFood.json"

function LoadingScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Player autoplay loop src={foodAnimation} style={{ height: 300, width: 300 }} />
      <p>Heating up your meals...</p>
    </div>
  )
}

export default LoadingScreen