import cardsData from "./cardsArray.json";
import "../src/App.css";
import { useEffect, useState } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const maxClickCount = 10;
  const totalPairs = cardsData.length;

  useEffect(() => {
    initalizeCards();
  }, []);

  const initalizeCards = () => {
    const shuffledCards = [...cardsData, ...cardsData].sort(
      () => Math.random() - 0.5
    );
    setCards(shuffledCards);
    setClickCount(0);
    setSolved([]);
  };

  const handleClick = (id) => {
    if (flipped.length < 2 && !flipped.includes(id) && !solved.includes(id)) {
      setFlipped([...flipped, id]);
      if (flipped.length === 0) {
        setClickCount(clickCount + 1);
      }
    }
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const timer = setTimeout(() => {
        checkForMatch();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [flipped]);

  const checkForMatch = () => {
    const [first, second] = flipped;
    if (cards[first].name === cards[second].name) {
      setSolved([...solved, first, second]);
    }
    setFlipped([]);
  };

  const isFlipped = (index) => flipped.includes(index);
  const isSolved = (index) => solved.includes(index);

  useEffect(() => {
    if (solved.length === totalPairs * 2) {
      alert("축하드려요 성공하셨습니다.");
      initalizeCards();
    }
  }, [solved]);

  useEffect(() => {
    if (clickCount >= maxClickCount) {
      alert("기회를 다 사용하셨어요..😭");
      initalizeCards();
    }
  }, [clickCount]);

  return (
    <div className="container">
      <div className="cards-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`card ${
              isFlipped(index) || isSolved(index) ? "flipped" : ""
            }`}
          >
            <div className="card-back">{card.name}</div>
          </div>
        ))}
      </div>
      <div className="click-count">
        Clicks: {clickCount}/{maxClickCount}
      </div>
    </div>
  );
}

export default App;
