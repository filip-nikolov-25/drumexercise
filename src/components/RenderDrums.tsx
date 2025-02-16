import { css } from "@emotion/css";
import { DrumPadGridProps } from "../types";
import Image from "next/image";

const RenderDrums = ({ arr, onEdit }: DrumPadGridProps) => {
  return (
    <div
      className={css`
        padding: 2rem;
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
            width: 15%;
            height: 23vh;
            background-color: #161515;
            border: 2px solid white;
            margin-right: 1rem;
            margin-bottom: 1rem;
            border-radius: 1rem;
            padding: 20px;
            position: relative;
          `}
          onClick={() => onEdit(index)}
        >
          <span
            className={css`
              font-size: 2rem;
              color: gray;
            `}
          >
            {audio.key}
          </span>
          <div
            className={css`
              position: relative;
              top: 40%;
              right: 42%;
            `}
          >
            {!audio.key && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  onEdit(index);
                }}
                className={css`
                  color: white;
                  top: 0.2rem;
                  left: 87%;
                  position: absolute;
                  background: none;
                  border: none;
                  cursor: pointer;
                `}
              >
                <Image src="/+Icon.svg" width={30} height={30} alt="Add icon" />
              </div>
            )}
            <div
              onClick={(e) => {
                e.preventDefault();
                onEdit(index);
              }}
              className={css`
                position: absolute;
                ${!audio.key
                  ? css`
                      bottom: -6.2rem;
                      right: -55%;
                    `
                  : css`
                      top: 0.7rem;
                      right: -5.8rem;
                    `}
                background-color: white;
                height: 7vh;
                border-radius: 30%;
                width: 30%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              `}
            >
              <Image src="/edit.svg" width={30} height={30} alt="Edit icon" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderDrums;