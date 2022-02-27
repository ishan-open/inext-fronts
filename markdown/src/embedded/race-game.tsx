import { useEffect } from "react";
import "./reset.css";

// https://pixijs.com/
export const RaceGameBrilliant = () => {
  useEffect(() => {
    // @ts-ignore
    import("./dragging").then(() => {
      console.log("module has been loaded");
    });
    return () => {
      const dragGame = document.getElementById("drag-game");
      if (dragGame) dragGame.innerHTML = "";
    };
  });
  return <div id="drag-game" />;
};
