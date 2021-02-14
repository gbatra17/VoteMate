import React, { useEffect, useCallback, useState } from "react";
import "./styles.css";

const cardItems = [
  {
    id: 1,
    title: "Question of 1 of 5",
    copy:
      "UK should be less reliant on other countries for its goods and services."
  },
  {
    id: 2,
    title: "Question of 2 of 5",
    copy: "People should be allowed to change the sex listed on their birth certificate, without having to undergo a medical treatment to change their gender."
  },
  {
    id: 3,
    title: "Question of 3 of 5",
    copy:
      "The government should impose a royalty on companies that export UK products."
  },
  {
    id: 4,
    title: "Question of 4 of 5",
    copy: "The government should ease restrictions on property developers."
  },
  {
    id: 5,
    title: "Question of 5 of 5",
    copy: "The government should guarantee a minimum income for all UK citizens regardless of whether or not they have a job."
  }
];

function determineClasses(indexes, cardIndex) {
  if (indexes.currentIndex === cardIndex) {
    return "active";
  } else if (indexes.nextIndex === cardIndex) {
    return "next";
  } else if (indexes.previousIndex === cardIndex) {
    return "prev";
  }
  return "inactive";
}

const CardCarousel = () => {
  const [indexes, setIndexes] = useState({
    previousIndex: 0,
    currentIndex: 0,
    nextIndex: 1
  });


  const handleCardTransition = useCallback(() => {
    // If we've reached the end, start again from the first card,
    // but carry previous value over
    if (indexes.currentIndex >= cardItems.length - 1) {
      setIndexes({
        // previousIndex: cardItems.length - 1,
        // currentIndex: 0,
        // nextIndex: 1
      });
    } 
    else {
      setIndexes(prevState => ({
        previousIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex + 1,
        nextIndex:
          prevState.currentIndex + 2 === cardItems.length
            ? 0
            : prevState.currentIndex + 2
      }));
    }
  }, [indexes.currentIndex]);

  // Moving back to the previous card.
  const previousCard = useCallback(() => {
    if (indexes.currentIndex >= cardItems.length + 1) {
      setIndexes({
        previousIndex: cardItems.length + 1,
        currentIndex: 0,
        nextIndex: 1
      });
    } else {
      setIndexes(prevState => ({
        previousIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex - 1,
        nextIndex:
          prevState.currentIndex - 2 === cardItems.length
            ? 0
            : prevState.currentIndex - 2
      }));
    }
  }, [indexes.currentIndex]);

  return (
    <div className="container">
      <ul className="card-carousel">
        {cardItems.map((card, index) => (
          <li
            key={card.id}
            className={`card ${determineClasses(indexes, index)}`}
          >
            <h2>{card.title}</h2>
            <p>{card.copy}</p>
            <br/>
            <button onClick={handleCardTransition}>Strongly Disgree</button>
            <button onClick={handleCardTransition}>Somewhat disagree</button>
            <button onClick={handleCardTransition}>Neutral</button>
            <button onClick={handleCardTransition}>Somewhat Agree</button>
            <button onClick={handleCardTransition}>Strongly Agree</button>
            <br/>
            <br/>
            <button onClick={previousCard}>Go Back</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardCarousel;