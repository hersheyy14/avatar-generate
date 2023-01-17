import React from "react";
import { useState } from "react";
import Axios from "axios";
import "./avatar.css";
import Button from "../button/Button";

export const Avatar = () => {
  const avatars = [
    "avataaars",
    "human",
    "bottts",
    "jdenticon",
    "identicon",
    "gridy",
    "micah",
  ];
  const [sprite, setSprite] = useState("botts");
  const [seed, setSeed] = useState(1000);
  const handleSprite = (spritetype) => {
    setSprite(spritetype);
  };
  const handleGenerator = () => {
    let x = Math.floor(Math.random() * 1000);
    setSeed(x);
  };

  const download = () => {
    Axios({
      method: "get",
      url: `https://avatars.dicebear.com/api/${sprite}/${seed}.svg`,
      responseType: "arraybuffer",
    })
      .then((response) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/octet-stream" })
        );
        link.download = `${seed}.svg`;
        document.body.appendChild(link);
        link.click();
        setTimeout(function () {
          window.URL.revokeObjectURL(link);
        }, 200);
      })
      .catch((error) => {});
  };

  return (
    <div className="container">
      <div className="nav">
        <h2>Random Avatar Generator</h2>
      </div>
      <div className="home">
        <div className="btns">
          {avatars.map((item) => {
            return (
              <Button key={item} onClick={() => handleSprite(item)}>
                {item}
              </Button>
            );
          })}
        </div>
        <div className="avatar">
          <img
            src={`https://avatars.dicebear.com/api/${sprite}/${seed}.svg`}
            alt="Sprite"
          />
        </div>
        <div className="generate">
          <Button
            id="gen"
            onClick={() => {
              handleGenerator();
            }}
          >
            Next
          </Button>
          <Button
            id="down"
            onClick={() => {
              download();
            }}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};
