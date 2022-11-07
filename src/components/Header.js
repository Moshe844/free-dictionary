import { useContext, useEffect, useState } from "react";
import { InputContext } from "../Context/Input.context";
import { getWordSuggestions } from "../api/getWordSuggestions";
import WordItem from "./WordItem";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [value, setValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [searchSuggestions, setSearchSuggestions] = useState({
    suggestions: [],
    suggestionsState: [],
  });
  const { inputValue, setInputValue } = useContext(InputContext);

  const handleSubmit = (word) => {
    const index = searchSuggestions.suggestionsState.indexOf("active");
    setInputValue(searchSuggestions.suggestions[index]);
    setValue("");
    setSearchSuggestions({
      suggestions: [],
      suggestionsState: [],
    });
    setIsDropdownOpen(true);
  };

  // On change of search field
  const handleInputChange = async (e) => {
    console.log(e);
    if (!e.target.value) {
      setIsDropdownOpen(false);
    } else if (e.target.value) {
      setIsDropdownOpen(true);
    }
    setValue(e.target.value);
  };

  // To submit the form
  const handleShowResult = (e) => {
    e.preventDefault();
    // if (!value) return;

    handleSubmit(value);
  };

  const handleSuggestions = async (value) => {
    const suggestions = await getWordSuggestions(value);
    const suggestionsState = Array(suggestions.length).fill("inActive", 1);
    suggestionsState[0] = "active";
    setSearchSuggestions({
      suggestions: suggestions,
      suggestionsState: suggestionsState,
    });
    console.log(suggestions);
    console.log(suggestionsState);
    let onArrowPress = 0;
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        if (typeof suggestionsState[onArrowPress + 1] !== "undefined") {
          suggestionsState[onArrowPress + 1] = "active";
          if (onArrowPress >= 0) {
            suggestionsState[onArrowPress] = "inActive";
          }
          onArrowPress++;
        }
      }
      if (e.key === "ArrowUp") {
        if (typeof suggestionsState[onArrowPress - 1] !== "undefined") {
          suggestionsState[onArrowPress - 1] = "active";
          if (onArrowPress - 1 >= 0) {
            suggestionsState[onArrowPress] = "inActive";
          }
          onArrowPress--;
        }
      }
      setSearchSuggestions({
        suggestions: suggestions,
        suggestionsState: suggestionsState,
      });
    });
  };

  useEffect(() => {
    if (value) handleSuggestions(value);
  }, [value]);

  //first fix the position of the login container

  return (
    <div className="bg-gray-700">
      <div className="nav">
        <div className="nav-Link">
          <Link to="/login">Login</Link>
        </div>
        <div className="nav-Link">
          <Link to="/register">Signup</Link>
        </div>

        <div className="nav-Link">signOut</div>
      </div>

      <div className="container mx auto py-8">
        {/* <h1 className="text-3xl font-bold text-center text-white">
          My Free Dictionary
        </h1> */}

        <p className="text-center mt-1 mb-10 text-white text-lg">
          Find Definitions for word
        </p>

        <div className="flex itmes-center justify-center mt-5">
          <form
            className="LOOK relative flex border-2 border-gray-200 rounded"
            onSubmit={handleShowResult}
            onFocus={() => setInputValue(false)}
            onBlur={() => setIsDropdownOpen(false)}
          >
            <input
              className="pw-96 px-4 py-2 md:w-80"
              type="text"
              placeholder="Search.."
              onChange={handleInputChange}
              value={value}
            />
            <button className="bg-blue-400 border-l px-4 py-2 text-white">
              Search
            </button>
            {isDropdownOpen === true && (
              <div className="word-suggestion-dropdown should-be-in-a-container absolute top-full bg-gray-50 w-full z-10">
                {searchSuggestions.suggestions.map((word, onArrowPress) => {
                  return (
                    <WordItem
                      key={word}
                      word={word}
                      addedClassname={
                        searchSuggestions.suggestionsState[onArrowPress]
                      }
                      handleClick={handleSubmit}
                    />
                  );
                })}
              </div>
            )}
          </form>
        </div>
        {inputValue && (
          <h3 className="text-gray-50 text-center mt-4">
            Results for:{" "}
            <span className="text-white font-bold">{inputValue}</span>
          </h3>
        )}
      </div>
    </div>
  );
};

export default Header;
