import { useContext, useState } from "react";
import { InputContext } from "../App";
import { getWordSuggestions } from "../api/getWordSuggestions";
import WordItem from "./WordItem";

const Header = () => {
  const [value, setValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const { inputValue, setInputValue } = useContext(InputContext);

  const handleSubmit = (word) => {
    setInputValue(word);
    setValue("");
    setSearchSuggestions([]);
    setIsDropdownOpen(false);
  };

  // On change of search field
  const handleInputChange = async (e) => {
    setValue(e.target.value);
    const suggestions = await getWordSuggestions(e.target.value);

    setSearchSuggestions(suggestions);
  };

  // To submit the form
  const handleShowResult = (e) => {
    e.preventDefault();
    // if (!value) return;

    handleSubmit(value);
  };

  return (
    <div className="bg-gray-700">
      <div className="container mx auto py-8">
        <h1 className="text-3xl font-bold text-center text-white">
          My Free Dictionary
        </h1>
        <p className="text-center mt-1 mb-10 text-white text-lg">
          Find Definitions for word
        </p>

        <div className="flex itmes-center justify-center mt-5">
          <form
            className="LOOK relative flex border-2 border-gray-200 rounded"
            onSubmit={handleShowResult}
          >
            <input
              className="px-4 py-2 md:w-80"
              type="text"
              placeholder="Search.."
              onChange={handleInputChange}
              value={value}
              onFocus={() => setIsDropdownOpen(true)}
            />
            <button className="bg-blue-400 border-l px-4 py-2 text-white">
              Search
            </button>
            {isDropdownOpen === true && (
              <div className="word-suggestion-dropdown should-be-in-a-container absolute top-full bg-gray-50 w-full z-10">
                {searchSuggestions.map((word) => {
                  return (
                    <WordItem
                      key={word}
                      word={word}
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
