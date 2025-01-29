"use client";
import { useState, useEffect } from "react";
import AddFrame from "./AddFrame";

const useResponsiveValues = () => {
  const [screenSize, setScreenSize] = useState({
    width: 1024, // Default to desktop
    isMobile: false,
    isTablet: false,
  });

  useEffect(() => {
    // Function to update values based on matchMedia
    const updateSize = () => {
      const mobile = matchMedia("(max-width: 639px)").matches;
      const tablet = matchMedia(
        "(min-width: 640px) and (max-width: 1023px)"
      ).matches;

      setScreenSize({
        width: mobile ? 300 : tablet ? 600 : 1024,
        isMobile: mobile,
        isTablet: tablet,
      });
    };

    // Initial update
    updateSize();

    // Create MediaQueryList objects
    const mobileQuery = matchMedia("(max-width: 639px)");
    const tabletQuery = matchMedia(
      "(min-width: 640px) and (max-width: 1023px)"
    );

    // Event listener callback
    const handleChange = () => updateSize();

    // Add listeners
    mobileQuery.addListener(handleChange);
    tabletQuery.addListener(handleChange);

    // Cleanup
    return () => {
      mobileQuery.removeListener(handleChange);
      tabletQuery.removeListener(handleChange);
    };
  }, []);

  return screenSize;
};

export default function Home() {
  const { width, isMobile } = useResponsiveValues();
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalYaps, setTotalYaps] = useState(1000);

  // Update totalYaps based on screen size
  useEffect(() => {
    setTotalYaps(isMobile ? 400 : width < 1024 ? 600 : 1000);
  }, [width, isMobile]);

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
            Math.random() * (isMobile ? 10 : 20) - (isMobile ? 5 : 10);
          const randomMarginTop =
            Math.random() * (isMobile ? 10 : 20) - (isMobile ? 5 : 10);

          return (
            <div
              key={i}
              className={`text-white text-2xl md:text-3xl lg:text-4xl font-bold transition-opacity duration-500 ease-in-out ${
                i === activeIndex ? "opacity-100 scale-105" : "opacity-10"
              }`}
              style={{
                marginLeft: `${randomMarginLeft}px`,
                marginTop: `${randomMarginTop}px`,
                fontSize: isMobile ? "1rem" : undefined,
              }}
            >
              Yap
            </div>
          );
        })}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-white">
          spaces on farcaster for you to <br /> yap
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-300 font-semibold">
          yap it. meme it. pump it.
        </p>
        <AddFrame />
      </div>
    </div>
  );
}
