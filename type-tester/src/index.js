import React, {
  useState,
  useEffect
} from 'react';
import ReactDOM from 'react-dom/client';


const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "This is a type tester game. It is my second React game and I hope that you enjoy it!"
];

const TypeTester = () => {
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [sentence, setSentence] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      startGame();
    }
  }, [gameStarted]);

  useEffect(() => {
    if (time > 0 && !gameOver && gameStarted) {
      const timer = setTimeout(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (time === 0 && gameStarted) {
      setGameOver(true);
    }
  }, [time, gameOver, gameStarted]);

  const startGame = () => {
    generateRandomSentence();
    setTime(20);
    setGameOver(false);
  }

  const handleChange = (e) => {
    if (!gameOver && gameStarted) {
      setInput(e.target.value);
      if (e.target.value === sentence) {
        setScore((prevScore) => prevScore + 1);
        setInput('');
        generateRandomSentence();
      }
    }
  }

  const handleStartGame = () => {
    setGameStarted(true);
  }

  const generateRandomSentence = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    setSentence(sentences[randomIndex]);
  };

  const SentenceDisplay = ({sentence, input}) => (
    <div className='sentence'>
      {sentence.split('').map((char, index) => {
        const typedChar = input[index];
        let colour;
        
        if (typedChar == null) {
          colour = 'black';
        } else if (typedChar === char) {
          colour = 'green'
        } else {
            colour = 'red'
        }

        return (
          <React.Fragment key={index}>
            {index === input.length && <span className='cursor'>|</span>}
            <span style={{color: colour}}>
              {char}
            </span> 
          </React.Fragment>



          
        )
      })}
    </div>
  );

  return (
    <div className='container'>
      <h1 className='title'>Type Tester Game!</h1>
      {!gameStarted && (
        <button onClick={handleStartGame} className='start-button'>Start Game</button>
      )}
      {gameStarted && (
        <>
          <div className='timer'>Time Left: {time}</div>
          <SentenceDisplay sentence={sentence} input={input} />
          {!gameOver && (
            <div className='input-container'>
              <input 
                type="text"
                value={input}
                onChange={handleChange}
                className='input-field'
                placeholder="Type Here..."
                autoFocus
                disabled={gameOver}
                />
            </div>
          )}
        </>
      )}

      {gameOver && (
        <div className='game-over'>
          <p>Game Over!</p>
          <p>Your Score: {score}</p>
        </div>
      )}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TypeTester />
  </React.StrictMode>
);

