import { css } from "@emotion/css";
import { useEffect, useState } from "react";

export default function Home() {
  const [play, setPlay] = useState(false);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState("");
  const [currentPressedKey, setCurrentPressedKey] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [arr, setArr] = useState([
    {
      key: "",
      sound: "/1.mp3",
    },
    {
      key: "",
      sound: "/2.mp3",
    },
    {
      key: "",
      sound: "/3.mp3",
    },
    {
      key: "",
      sound: "/4.mp3",
    },
    {
      key: "",
      sound: "/5.mp3",
    },
  ]);
  if (isAdding) {
    arr[editingIndex!].key = currentPressedKey;
  }

  if (play === true) {
    const audioElement = new Audio(currentPlayingAudio);
    audioElement.play();
    console.log(currentPlayingAudio, "CURRENT PLAYING AUDIO");
    console.log(audioElement, "AUDIO ELEMENT");
    setPlay(false);
  }
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      console.log(currentPressedKey, "CURRENT PRESSED KEY INSIDE USEEFFECT");
      console.log(e.key, "PRESSED KEY");

      if (e.key === currentPressedKey) {
        console.log(e.key, "EVENT");
        setPlay(true);
      }
    });
  }, [currentPressedKey]);

  const hoverColor = "red";

  return (
    <div
      className={css`
        background-color: black;
        height: 100vh;
      `}
    >
      <div
        className={css`
          width: 90%;
          margin: 0 auto;
          padding: 3rem;
          display: flex;
          background-color: black;
          flex-wrap: wrap;
          position: relative;
          margin-right: -1rem;
        `}
      >
        {arr.map((audio, index) => (
          <div
            key={index}
            className={css`
              width: 30%;
              height: 20vh;
              background-color: black;
              border: 2px solid white;
              margin-right: 1rem;
              margin-bottom: 1rem;
              border-radius: 1rem;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
            onClick={() => {
              setPlay(true);
              setCurrentPlayingAudio(audio.sound);
              setEditingIndex(index);
            }}
          >
            <div
              className={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <span
                className={css`
                  font-size: 2rem;
                  color: white;
                `}
              >
                {audio.key}
              </span>
              <button
                onClick={() => setIsAdding(!isAdding)}
                className={css`
                  font-size: 2rem;
                `}
              >
                +
              </button>
            </div>
          </div>
        ))}
        <div>
          {isAdding && (
            <div
              className={css`
                background-color: gray;
                z-index: 100;
                height: 50vh;
                padding: 20px;
                position: absolute;
                left: 33%;
                top: 40%;
                display: flex;
                flex-direction: column;
                border-radius: 20px;
              `}
            >
              <input
                className={css`
                  background-color: black;
                  z-index: 100;
                `}
                type="text"
                value={currentPressedKey}
                onChange={(e) => setCurrentPressedKey(e.nativeEvent.data || "")}
              />
              <p
                className={css`
                  padding: 20px;
                `}
              >
                Enter the key you want to set your drum
              </p>
              <button
                className={css`
                  background-color: black;
                  border-radius: 20px;
                  z-index: 100;
                `}
                onClick={() => {
                  setIsAdding(false);
                  setCurrentPressedKey("");
                }}
              >
                SAVE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
