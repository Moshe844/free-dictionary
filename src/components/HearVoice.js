import { speakWord } from "../api/voice";

const HearVoice = ({ word }) => {
  return (
    <button
      type="button"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
      onClick={() => speakWord(word)}
    >
      Listen {word}
    </button>
  );
};

export default HearVoice;
