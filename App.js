import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login'; 

const Game = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(0);

  // Titles state
  const [titles] = useState([
    {
      title: "Science",
      words: ["atom", "gravity", "osmosis", "catalyst", "photosynthesis"],
      hints: ["Smallest unit of chemical element",
              "Force that attracts object towards each other",
              "Movement of water through semi permeable membrane",
              "Substance that speeds up a chemical reaction",
              "A process plants used to convert sunlight into food"]
    },
    {
      title: "Space",
      words: ["astronomy", "light year", "constellation", "asteroid", "super nova"],
      hints: ["Scientific study of celestial body",
              "The distance light travels in one year",
              "Group of stars forming a recognizable pattern",
              "Small rocky body orbiting the sun",
              "Powerful explosion of star."]
    },
    {
      title: "Scientist",
      words: ["archimedes", "wright brothers", "graham bell", "stephen hawking", "salk"],
      hints: ["Known for principles of buoyancy",
              "Built and flew the first powered airplane",
              "Invented Telephone",
              "Known for work on black holes and cosmology",
              "Developed the first polio vaccine."]
    },
    {
      title: "Disorders",
      words: ["anxiety", "bipolar", "ocd", "hyper activity", "insomnia"],
      hints: ["Excessive worry or fear",
              "Extreme mood swings from high to low",
              "Repeatitive thoughts and behaviours",
              "Excessive activity and impulsiveness",
              "Difficulty falling or staying asleep."]
    },
    {
      title: "Mahabharat",
      words: ["arjuna", "draupadi", "karna", "dhritarashtra", "yudhishthira"],
      hints: ["The great archer and one of the Pandava brothers.",
              "The wife of the five Pandavas, whose insult leads to the great war.",
              "A great warrior and friend of Duryodhana",
              "The blind king of the Kauravas and father of Duryodhana.",
              "The eldest of the Pandava brothers, known for his righteousness."]
    }
  ]);

  // Game state
  const [targetWord, setTargetWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [hints, setHints] = useState([]);
  const [greetingMessage, setGreetingMessage] = useState('');
  const maxIncorrectAttempts = 6; // Define maxIncorrectAttempts

  // Random greetings array
  const greetings = [
    "Good luck!",
    "Have fun!",
    "Let's play!",
    "Guess away!",
    "Enjoy the game!"
  ];

  // Effect to start a new game when selectedTitleIndex changes
  useEffect(() => {
    startNewGame();
  }, [selectedTitleIndex]);

  // Function to start a new game
  const startNewGame = () => {
    const { words, hints } = titles[selectedTitleIndex];
    const randomWordIndex = Math.floor(Math.random() * words.length);
    setTargetWord(words[randomWordIndex]);
    setHints([...hints]); // Ensure hints are copied correctly
    setGuessedLetters(new Set());
    setIncorrectAttempts(0);

    // Select a random greeting message
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setGreetingMessage(randomGreeting);
  };

  // Function to handle user guesses
  const handleGuess = (letter) => {
    if (guessedLetters.has(letter)) {
      alert(`You have already guessed ${letter.toUpperCase()}`);
      return;
    }

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!targetWord.includes(letter)) {
      setIncorrectAttempts(incorrectAttempts + 1);
    }
  };

  // Function to check if the game is won
  const isGameWon = () => {
    return targetWord.split('').every(char => guessedLetters.has(char));
  };

  // Function to check if the game is lost
  const isGameLost = () => {
    return incorrectAttempts >= maxIncorrectAttempts;
  };

  // Function to render the word display
  const renderWordDisplay = () => {
    return (
      <div>
        <p>Number of letters: {targetWord.length}</p>
        {targetWord.split('').map((char, index) => (
          <span key={index}>
            {guessedLetters.has(char) ? char : '_'}
          </span>
        ))}
      </div>
    );
  };

  // Function to handle hint
  const handleHint = () => {
    const currentCategory = titles[selectedTitleIndex];
    const { words, hints } = currentCategory;
  
    // Find the index of the current target word
    const targetIndex = words.findIndex(word => word === targetWord);
  
    // If the target word is not found in the current category, handle appropriately
    if (targetIndex === -1) {
      alert('Error: Target word not found in the selected category.');
      return;
    }
  
    // Get the hint corresponding to the target word index
    const hint = hints[targetIndex];
  
    // Remove the hint from the array
    const updatedHints = [...hints];
    updatedHints.splice(targetIndex, 1); // Remove the used hint from the array
    setHints(updatedHints);
  
    // Display the hint to the user
    alert(`Hint: ${hint}`);
  };

  // Function to handle login
  const handleLogin = (name) => {
    setUsername(name);
    setLoggedIn(true);
    startNewGame(); // Start a new game after successful login
  };

  // Function to handle logout
  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setSelectedTitleIndex(0); // Reset selected title index
    setTargetWord('');
    setGuessedLetters(new Set());
    setIncorrectAttempts(0);
    setHints([]);
    alert(`Thanks for playing, ${username}! Come back soon.`);
  };
  

  // Render the game interface or login form based on loggedIn state
  return (
    <div>
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <h1>LETTER LASSO</h1>
          <h2>Welcome, {username}!</h2>
          <h3>{greetingMessage}</h3>
          <label><p1>Select the topic </p1></label>
          <select value={selectedTitleIndex} onChange={(e) => setSelectedTitleIndex(Number(e.target.value))}>
            {titles.map((title, index) => (
              <option key={index} value={index}>{title.title}</option>
            ))}
          </select>
          <p>{renderWordDisplay()}</p>
          <p>Incorrect Attempts: {incorrectAttempts} / {maxIncorrectAttempts}</p>
          <p>Guessed Letters: {Array.from(guessedLetters).join(', ')}</p>
          <button onClick={handleHint} disabled={hints.length === 0}>Get Hint</button>
          {isGameWon() && <p>Congratulations! You guessed the word: {targetWord.toUpperCase()}!</p>}
          {isGameLost() && <p>Sorry, you lost. The word was: {targetWord.toUpperCase()}.</p>}
          {!isGameWon() && !isGameLost() && (
            <LetterInput
            onGuess={handleGuess}/>)}
          <button onClick={startNewGame}>New Game</button>
          <button onClick={handleLogout}>Exit</button>
        </div>
      )}
    </div>
  );
};  

// LetterInput component (assuming it remains the same)
const LetterInput = ({ onGuess }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length === 1 && /^[a-zA-Z]+$/.test(inputValue)) {
      onGuess(inputValue.toLowerCase());
      setInputValue('');
    } else {
      alert('Please enter a valid single letter.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p1>
        Enter a letter:
        </p1>
        <input
          type="text"
          maxLength={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <button type="submit">Guess</button>
    </form>
  );
};

export default Game;