export const getWordSuggestions = async (word) => {
  try {
    const res = await fetch(
      `https://api.datamuse.com/words?sp=${word}*&max=10`
    );

    const data = await res.json();

    const wordSuggestions = data.map((wordObj) => wordObj.word);

    return wordSuggestions;
  } catch (error) {
    return [];
  }
};
