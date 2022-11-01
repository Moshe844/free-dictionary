import React from "react";

const WordItem = ({ word, handleClick, addedClassname }) => {
  return (
    <div
      className={`word-suggestion-dropdown-item ${addedClassname}`}
      onClick={() => handleClick(word)}
    >
      {word}
    </div>
  );
};

export default WordItem;
