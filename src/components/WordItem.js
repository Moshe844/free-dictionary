import React from "react";

const WordItem = ({ word, handleClick }) => {
  return (
    <div
      className="word-suggestion-dropdown-item"
      onClick={() => handleClick(word)}
    >
      {word}
    </div>
  );
};

export default WordItem;
