import "./App.css";
import { useState } from "react";

export default function App() {
  const [quote, setQuote] = useState("");

  const getQuote = async () => {
    const random = Math.ceil(Math.random() * 100);
    const res = await fetch(`https://dummyjson.com/quotes/${random}`);
    const data = await res.json();
    setQuote(data.quote);
  };

  return (
    <>
      <button className="flex justify-center items-center text-2xl" onClick={getQuote}>
        Get a Quote now
      </button>
      {quote && <p className="text">{quote}</p>}
    </>
  );
}
