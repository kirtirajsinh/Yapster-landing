"use client";
import { useState, useEffect } from "react";
import AddFrame from "./AddFrame";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalYaps, setTotalYaps] = useState(1000);

  // Adjust number of Yaps based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 640) {
          setTotalYaps(300);
        } else if (width < 1024) {
          setTotalYaps(600);
        } else {
          setTotalYaps(1000);
        }
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(Math.floor(Math.random() * totalYaps));
    }, 2000);

    return () => clearInterval(interval);
  }, [totalYaps]);

  return (
    <div className="relative min-h-screen bg-gradient-to-t from-black via-green-900 to-green-800 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(144,238,144,0.25)_20%,_rgba(0,0,0,1)_80%)] duration-300 ease-in pointer-events-none"></div>
      {/* Background text */}
      <div className="absolute flex flex-wrap w-full overflow-hidden">
        {Array.from({ length: totalYaps }).map((_, i) => {
          const randomMarginLeft =
            Math.random() * (window.innerWidth < 640 ? 10 : 20) -
            (window.innerWidth < 640 ? 5 : 10);
          const randomMarginTop =
            Math.random() * (window.innerWidth < 640 ? 10 : 20) -
            (window.innerWidth < 640 ? 5 : 10);

          return (
            <div
              key={i}
              className={`text-white text-2xl md:text-3xl lg:text-4xl font-bold transition-opacity duration-500 ease-in-out ${
                i === activeIndex ? "opacity-100 sclae-105" : "opacity-10"
              }`}
              style={{
                marginLeft: `${randomMarginLeft}px`,
                marginTop: `${randomMarginTop}px`,
                fontSize: window.innerWidth < 640 ? "1rem" : undefined,
              }}
            >
              Yap
            </div>
          );
        })}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 ">
        <h1 className="text-4xl sm:text-6xl  font-bold bg-clip-text text-transparent bg-white">
          spaces on farcaster for you to <br /> yap
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-300">
          yap it. meme it. pump it.
        </p>
        <AddFrame />
      </div>
    </div>
  );
}
