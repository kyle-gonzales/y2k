import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const yesText = ["Yes", "Pleasee", "Are you sure?", "sAY YES", "NO", "hay nako", "click me!", "come onnn, it'll be funnn!", "HELLO???", "stOP RUNNING AWAY FROM MEEE", "hay nakoo", "😔😔😔", "do you not love me?!?!", "I <3 KYLE FOREVER"];

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [no, setNo] = useState(0);
  const [position, setPosition] = useState({ top: "60%", left: "55%" });
  const [hearts, setHearts] = useState([]);
  const [text, setText] = useState(yesText);

  const trick = () => {
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
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const moveButton = () => {
    console.log(no);
    setNo(prev => prev+1);
    const padding = 80; // keeps button on screen
    const maxX = window.innerWidth - padding;
    const maxY = window.innerHeight - padding;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    setPosition({
      left: `${x}px`,
      top: `${y}px`,
    });
  };
  const yesScale = Math.min(1 + no * 0.25, 10);

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center relative overflow-hidden">
      <div className="relative bg-white rounded-2xl shadow-lg p-8 text-center w-96 z-10">
        {!accepted ? (
          <>
            <h1 className="text-xl font-semibold mb-6 flex flex-col gap-2">
              My sweet langga, will you be my valentine? 💕
              <span className="text-xs font-normal text-black/50">
                (only if you want!)
              </span>
            </h1>

            <div className="flex justify-center gap-4">
              <button
                className="font-semibold px-4 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-transform duration-200 ease-out"
                onClick={() => setAccepted(true)}
                style={{ transform: `scale(${yesScale})` }}
                onMouseEnter={trick}
                onTouchStart={trick}
              >
                {text[Math.min(no, text.length-1)]}
              </button>
              {!accepted && (
                <button
                  className={`${no > 0 ? "absolute" : "" } px-4 py-2 rounded-full bg-gray-200 text-gray-700 transition-all duration-200 font-semibold`}
                  style={position}
                  onMouseEnter={moveButton}
                  onTouchStart={moveButton}
                  tabIndex={-1}
                >
                  No
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-pink-600">
              I knew you'd say yes! I can't wait to be with you, langga! I love you soooo 💕
            </h1>
            {hearts.map(heart => (
              <div
                key={heart.id}
                className="absolute bottom-0 animate-float"
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


      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100vh);
          }
        }

        .animate-float {
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}

function Yuri() {
  return (
    <div className="absolute perspective -top-[140px] left-[20px]">
      <div className="yuri" />
    </div>
  );
}
function Kyle() {
  return (
    <div className="absolute perspective -top-[130px] right-[20px]">
      <div className="kyle" />
    </div>
  );
}