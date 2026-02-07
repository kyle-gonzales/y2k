import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const yesText = ["Yes", "Pleasee", "Are you sure?", "sAY YES", "NO", "hay nako", "click me!", "come onnn, it'll be funnn!", "HELLO???", "stOP RUNNING AWAY FROM MEEE", "hay nakoo", "😔😔😔", "do you not love me?!?!", "I <3 KYLE FOREVER"];

export default function App() {
  const [stage, setStage] = useState("letter");
  const [no, setNo] = useState(0);
  const [position, setPosition] = useState({ top: "60%", left: "55%" });
  const [hearts, setHearts] = useState([]);
  const [text, setText] = useState(yesText);

  const trick = () => {
    if (no !== 4) return;

    setText(prev => prev.map(t => {
      if (t === "NO") return "YES! AHA I GOT YOU"
      return t;
    }))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100, // Random position from 0-100%
        size: Math.random() * 24 + 12, // Random size between 12-36px
        duration: Math.random() * 3 + 2, // Random animation duration 2-5s
        opacity: Math.random() * 0.5 + 0.5, // Random opacity 0.5-1
      };

      setHearts(prevHearts => [...prevHearts, newHeart]);

      // Remove heart after animation completes
      setTimeout(() => {
        setHearts(prevHearts => prevHearts.filter(heart => heart.id !== newHeart.id));
      }, newHeart.duration * 1000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const random = () => {
    return Math.random() * 1.5 - 0.5
  }

  const moveButton = () => {
    setNo(prev => prev+1);
    const maxX = window.innerWidth - (window.innerWidth / 1.4);
    const maxY = window.innerHeight - (window.innerHeight / 1.4);

    const x = random() * maxX;
    const y = random() * maxY;

    console.log(x)
    console.log(y)

    setPosition({
      left: `${x}px`,
      top: `${y}px`,
    });
  };

  const yesScale = Math.min(1 + no * 0.25, 10);

  return (
    <div className="font-gummy min-h-screen bg-pink-100 flex items-center justify-center relative overflow-hidden text-gray-900">
      {stage === "letter" && (
        <button
          className="font-bold text-lg transition-transform duration-300 ease-out active:scale-95 active:translate-y-1 hover:scale-105 shadow-lg absolute"
          onClick={() => setStage("ask")}
        >
          <img src="letter.png" />
        </button>
      )}
      <div className={`${stage !== "letter" ? "absolute" : ""} bg-white rounded-2xl shadow-lg p-8 text-center w-96 z-10 transition-all duration-500 ease-out
        ${stage === "ask"
          ? "block opacity-100 scale-100 translate-y-0"
          : stage === "letter"
            ? "opacity-0 scale-90 translate-y-6 pointer-events-none"
            : ""}`}
      >
        {stage === "ask" ? (
          <>
            <h1 className="text-3xl font-semibold mb-6 flex flex-col gap-2">
              My sweet langga, will you be my valentine? 💕
              <span className="text-xs font-normal text-black/50">
                (only if you want!)
              </span>
            </h1>

            <div className="flex flex-col gap-4 items-center">
              <button
                className="font-semibold px-6 text-lg py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-transform duration-200 ease-out"
                onClick={() => setStage("yay")}
                style={{ transform: `scale(${yesScale})` }}
                onMouseEnter={trick}
                onTouchStart={trick}
              >
                {text[Math.min(no, text.length-1)]}
              </button>
              <button
                className={`${no > 0 ? "absolute" : "" } px-6 text-lg py-2 rounded-full bg-gray-200 text-gray-700 transition-all duration-200 font-semibold`}
                style={position}
                onMouseEnter={moveButton}
                onTouchStart={moveButton}
                tabIndex={-1}
              >
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 items-center">
              <h1 className="text-2xl font-bold text-pink-600">
                I knew you'd say yes! I can't wait to be with you, langga! I love you soooo 💕
              </h1>
              <img src="cute.gif" width={180} />

            </div>
            {hearts.map(heart => (
              <div
                key={heart.id}
                className="absolute -bottom-[300px]"
                style={{
                  left: `${heart.left}%`,
                  animation: `float ${heart.duration}s linear`,
                  opacity: heart.opacity,
                }}
              >
                <Heart
                  size={heart.size}
                  className="text-red-500 fill-red-500"
                />
              </div>
            ))}
            <Yuri />
            {/* <3 */}
            <Kyle />
          </>
        )}
      </div>
    </div>
  );
}

function Yuri() {
  return (
    <div className="absolute -top-[140px] left-[10px]">
      <img src="yuri.png" width={180} className="yuri"/>
    </div>
  );
}
function Kyle() {
  return (
    <div className="absolute -top-[160px] right-[10px]">
      <img src="kyle.png" width={180} className="kyle"/>

    </div>
  );
}