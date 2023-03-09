import { useEffect, useState } from "react";
import "./App.css";
import Flashcard from "./components/Flashcard";

import data from "../src/data.json";

function App() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [seenCards, setSeenCards] = useState({});

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  const handleNextQuestion = () => {
    if (currentCard < data.length - 1) {
      setCurrentCard(currentCard + 1);
    }
    const unseenCards = data.filter((card, index) => !seenCards[index]);

    // If there are no more unseen cards, reset the seen cards map
    if (unseenCards.length === 0) {
      setSeenCards({});
      setCurrentCard(0);
    } else {
      // Get a random index of an unseen card and set it as the current card
      setCurrentCard((currentCard) => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * data.length);
        } while (seenCards[randomIndex]);
        return randomIndex;
      });

      // Add the current card index to the seen cards map
      setSeenCards((prev) => ({ ...prev, [currentCard]: true }));
    }

    // Flip the card back over
    setIsFlipped(false);
  };

  const handlePrevQuestion = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
    setIsFlipped(false);
  };

  const handleReset = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setSeenCards({});
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Learn Python!</h1>
        <h3>
          Test your knowlege or practice what you already know! <br />
          {data.length} Cards
        </h3>
        <h3></h3>
      </div>
      <span style={{ margin: "10px 10px", height: "100px" }} />
      <Flashcard
        data={data[currentCard]}
        isFlipped={isFlipped}
        handleFlip={handleFlip}
      />
      <div className="btn-container">
        <button onClick={handlePrevQuestion}>{"<-"}</button>
        <span style={{ margin: "0 10px" }} />
        <button onClick={handleNextQuestion}>{"->"}</button>
        <span style={{ margin: "0 10px" }} />
        <button onClick={handleReset}>{"↻"}</button>
      </div>
    </div>
  );
}

export default App;
