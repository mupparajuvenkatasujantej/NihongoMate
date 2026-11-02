export const speakJapanese = (
  text: string,
  notify: (message: string) => void
) => {
  if (!("speechSynthesis" in window)) {
    notify("Audio playback is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  utterance.rate = 0.82;

  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith("ja")
  );

  if (preferred) utterance.voice = preferred;

  utterance.onerror = () => notify("Could not play audio on this device.");
  window.speechSynthesis.speak(utterance);
};