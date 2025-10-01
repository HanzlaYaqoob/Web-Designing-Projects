import React, { useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";
import "./css/Practice.css";
function Practice() {
  const [theme, setTheme] = useState("light");
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const handleClickState = () => {
    setCount(count + 1); // triggers re-render
    console.log("Rendered! count =", count);
  };
  const handleClickRef = () => {
    setCount(count + 1); // triggers re-render
    console.log("Rendered! count =", count);
  };

  const themeModes = () => {
    {
      setTheme((prevTheme) => {
        const nextTheme = prevTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nextTheme);
        return nextTheme;
      });
    }
  };

  return (
    <main>
      <div className="bg-[var(--bgColor)] text-[var(--text)] text-2xl font-bold">
        <div className="flex justify-between">
          <button className="items-center my-3" onClick={themeModes}>
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <h1 class="text-center">Happy Coding</h1>
          <span> {":)"}</span>
        </div>
      </div>
      <div className="relative p-4">
        <div className="absolute -inset-4  bg-pink-600 blur-3xl opacity-50"></div>
        <div className="relative z-10">
          <div className="bg-amber-300">1</div>
          <div className="bg-amber-500">2</div>
          <div className="bg-amber-900">3</div>
        </div>
      </div>
      <div className="main mt-5">
        <div className="sib1"></div>
        <div className="sib2"></div>
        <div className="sib3"></div>
      </div>
      <div className="p-4 border">
        <p>Clicked {count} times</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleClickState}>
          Increment
        </button>
      </div>
      <div className="p-4 border">
        <p>Clicked {countRef.current} times</p>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleClickRef}>
          Increment
        </button>
      </div>
    </main>
  );
}

export default Practice;
