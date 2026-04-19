import ramen from "../assets/food/ramen.png"
import kebab from "../assets/food/kebab.png"
import pancakes from "../assets/food/pancakes.png"
import bread from "../assets/food/bread.png"
import dimsum from "../assets/food/dimsum.png"
import salad from "../assets/food/salad.png"
import sushi from "../assets/food/sushi.png"

const foodItems=[
  {src: ramen, top:"1%", left:"10%", rotate: -20, size: 80},
  {src: kebab, top: "2%", left: "25%", rotate: 15, size: 70},
  { src: pancakes, bottom: "1%", left: "45%", rotate: -10, size: 75 },
  {src: salad, top: "2%", left: "65%", rotate: -25, size: 70},
  {src: dimsum, top: "1%", left: "83%", rotate: 15, size: 75},
  // bottom edge
  { src: bread, bottom: "1%", left: "10%", rotate: 20, size: 75 },
  { src: pancakes, bottom: "2%", left: "30%", rotate: -25, size: 80 },
  { src: sushi, bottom: "1%", left: "50%", rotate: 10, size: 70 },
  { src: ramen, bottom: "2%", left: "70%", rotate: -20, size: 75 },
  { src: kebab, bottom: "1%", left: "88%", rotate: 15, size: 70 },

  // left edge
  { src: dimsum, top: "15%", left: "0.5%", rotate: -30, size: 70 },
  { src: salad, top: "35%", left: "0.5%", rotate: 20, size: 75 },
  { src: kebab, top: "55%", left: "0.5%", rotate: -15, size: 70 },
  { src: pancakes, top: "75%", left: "0.5%", rotate: 25, size: 75 },

  // right edge
  { src: kebab, top: "15%", right: "0.5%", rotate: 30, size: 70 },
  { src: ramen, top: "35%", right: "0.5%", rotate: -20, size: 75 },
  { src: sushi, top: "55%", right: "0.5%", rotate: 15, size: 70 },
  { src: dimsum, top: "75%", right: "0.5%", rotate: -25, size: 75 },
]

function BorderFrame() {
  return (
    <>
      <svg
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100%", height: "100%",
          pointerEvents: "none",
          zIndex: 100,
        }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <rect x="20" y="20" width="1400" height="860" fill="none" stroke="#C0392B" strokeWidth="3" />
        <rect x="30" y="30" width="1380" height="840" fill="none" stroke="#F5E6D3" strokeWidth="2" />
      </svg>

      {foodItems.map((item, i) => (
        <img
          key={i}
          src={item.src}
          style={{
            position: "fixed",
            width: item.size,
            height: item.size,
            objectFit: "contain",
            transform: `rotate(${item.rotate}deg)`,
            pointerEvents: "none",
            zIndex: 101,
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
          }}
        />
      ))}
    </>
  )
}

export default BorderFrame