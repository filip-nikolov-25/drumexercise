import { css } from "@emotion/css";
import { useEffect, useState, useMemo } from "react";
import { AudioItem, SavedWord } from "../../types";
import RenderDrums from "../RenderDrums";

const HomePage = () => {
    const [play, setPlay] = useState<boolean>(false);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState<string>("");
  const [currentPressedKey, setCurrentPressedKey] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [savedWord, setSavedWord] = useState<SavedWord>({
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: "",
    seventh: "",
    eighth: "",
    ninth: "",
    tenth: "",
  });

  const [sounds, setSounds] = useState<string[]>([
    "/1.mp3",
    "/2.mp3",
    "/3.mp3",
    "/4.mp3",
    "/5.mp3",
    "/1.mp3",
    "/2.mp3",
    "/3.mp3",
    "/4.mp3",
    "/5.mp3",
  ]);

  const arr = useMemo(() => {
    const tempArr: AudioItem[] = [];
    let index = 0;
    for (const key in savedWord) {

      tempArr.push({
        key: savedWord[key as keyof SavedWord],
        sound: sounds[index],
      });
      index++;
    }
    return tempArr;
  }, [savedWord, sounds]);

  useEffect(() => {
    const addEventListenerOnKeyDown = (e: KeyboardEvent) => {
      if (isAdding) {
        return; // checks if it is adding or is the pop up
      }
      const foundIndex = arr.findIndex((item) => item.key === e.key); // founds and check for the clicked key
      if (foundIndex !== -1) {
        setCurrentPlayingAudio(arr[foundIndex].sound);
        setPlay(true);
      }
    };
    window.addEventListener("keydown", addEventListenerOnKeyDown);
    return () => {
      window.removeEventListener("keydown", addEventListenerOnKeyDown);
    };
  }, [arr, isAdding]);

  useEffect(() => {
    if (play) {
      const audioElement = new Audio(currentPlayingAudio);
      audioElement.play();
      setPlay(false);
    }
  }, [currentPlayingAudio, play]);

  return (
    <div
      className={css`
        padding: 2rem;
        height: 100vh;
        background-color: ${isAdding ? "gray" : "black"};
      `}
    >
      {!isAdding && (
        <h1
          className={css`
            font-size: 3rem;
            color: white;
            padding: 5rem 0 0 2rem;
          `}
        >
          DRUM MACHINE
        </h1>
      )}
      {!isAdding ? (
        <RenderDrums
          arr={arr}
          onEdit={(index) => {
            setEditingIndex(index);
            setIsAdding(true);
          }}
        />
      ) : (
        <div
          className={css`
            width:25%;
            padding: 20px;
            position: absolute;
            left: 37%;
            background-color: black;
            top: 20%;
            display: flex;
            flex-direction: column;
            border-radius: 20px;
          `}
        >
          <h3>Drum Sample</h3>
          <input
            className={css`
              background-color: black;
              color: white;
              border: 2px solid white;
              border-radius: 10px;
              padding: 15px;
              margin-bottom: 20px;
              margin-top: 20px;
            `}
            type="text"
            value={currentPressedKey}
            //@ts-expect-error property data does not exist on type Event
            onChange={(e) => setCurrentPressedKey(e.nativeEvent.data || "")}
          />
          <h3>Keyboard Shortcut</h3>
              <div
                     className={css`
              width:2rem;
              position:absolute;
              top:2%;
              right:2%;  
              height:2rem;
              border-radius:50%;
              background-color:white;
              display:flex;
              justify-content:center;
              align-items:center;
              color:black; 
              cursor:pointer;
              `}
              onClick={() => setIsAdding(false)}>
                  <span>X</span>
              </div>
          <select
            className={css`
              background-color: black;
              color: white;
              border: 2px solid white;
              border-radius: 10px;
              padding: 10px 20px;
              margin-bottom: 20px;
              margin-top: 20px;
              `}
            value={sounds[editingIndex!]}
            onChange={(e) =>
              setSounds((prev) => {
                const newSounds = [...prev];
                newSounds[editingIndex!] = e.target.value;
                return newSounds;
              })
            }
          >
            <option value="/1.mp3">First Drum</option>
            <option value="/2.mp3">SEcond Drum</option>
            <option value="/3.mp3">Third Drum</option>
            <option value="/4.mp3">Fourth Drum</option>
            <option value="/5.mp3">Fifth Drum</option>
          </select>
          <button
            className={css`
              background-color: cyan;
              border-radius: 20px;
              color: white;
              padding: 10px;
              border: none;
              cursor: pointer;
            `}
            onClick={() => {
              if (editingIndex !== null) {
                const keys = Object.keys(savedWord);
                const newSavedWord = {
                  ...savedWord,
                  [keys[editingIndex]]: currentPressedKey,
                };
                setSavedWord(newSavedWord);
              }
              setIsAdding(false);
            }}
          >
            SAVE
          </button>
        </div>
      )}
    </div>
  );
}
export default HomePage