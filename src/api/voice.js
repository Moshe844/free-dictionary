export function speakWord(text) {
  const synth = window.speechSynthesis;
  const textToSpeak = new SpeechSynthesisUtterance(text);
  synth.speak(textToSpeak);
}
