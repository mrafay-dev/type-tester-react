import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const quotes = [
  { quote: "Work hard to succeed", author: "Rafay" },
  { quote: "Many hands make light work", author: "Unknown" },
  { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { quote: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { quote: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" }
];



function DisplayQuote() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleNewQuote() {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === currentIndex);
    setCurrentIndex(randomIndex);
  }

  useEffect(() => {
    function handleKeyPress(event) {
      if (event.code === "Space") {
        event.preventDefault();
        let randomIndex;

        do {
          randomIndex = Math.floor(Math.random() * quotes.length);
        } while (randomIndex === currentIndex);
        setCurrentIndex(randomIndex);
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentIndex]);

  return (
    <div class="test">
      <h1 className='title'>Quote Generator!</h1>
      <p id="quote-title">{quotes[currentIndex].quote}</p>
      <p id="quote-author">-{quotes[currentIndex].author}</p>
      <button onClick={handleNewQuote}>New Quote</button>
    </div>
  );

}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DisplayQuote />
  </React.StrictMode>
);
