import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const greetings = [
    "Hello",
    "नमस्ते",
    "Bonjour",
    "Hola",
    "Ciao",
    "こんにちは",
    "안녕하세요",
    "你好",
  ];
  const [greeting, setGreeting] = useState(greetings[0]);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      index = (index + 1) % greetings.length;
      setGreeting(greetings[index]);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-black">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#ef4444] opacity-90 transition-opacity duration-500">
        {greeting}
      </h1>
      {/* <div className="mt-4 h-1 w-24 bg-[#fffdfd] rounded-full animate-pulse" /> */}
    </div>
  );
};

export default LoadingScreen;