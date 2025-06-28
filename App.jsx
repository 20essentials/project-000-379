/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import { css, Global } from "@emotion/react";
import ReactDOM from "react-dom/client";

const globalStyles = css`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue";
    -webkit-tap-highlight-color: transparent;
  }
  html,
  body {
    width: 100%;
    height: 100%;
  }
  body {
    min-height: 100vh;
  }
  canvas {
    position: fixed;
    inset: 0;
  }
`;

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let rows = Math.floor(height / 26);
    let columns = Math.floor(width / 26);

    const randomColor = () => {
      const [r, g, b] = [...Array(3)].map(() =>
        Math.floor(Math.random() * 255)
      );
      return { r, g, b };
    };

    const drawCanvas = () => {
      for (let i = 0; i < rows; i++) {
        const { r, g, b } = randomColor();
        for (let j = 0; j < columns; j++) {
          const rowOpacity = (i + 1) / rows;
          const cellOpacity = (j + 1) / columns;
          const combinedOpacity = Math.max(0.3, cellOpacity + rowOpacity);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${combinedOpacity})`;
          ctx.fillRect(30 * j, 30 * i, 30, 30);
        }
      }
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      rows = Math.floor(height / 26);
      columns = Math.floor(width / 26);
      drawCanvas();
    };

    drawCanvas();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <Global styles={globalStyles} />
      <canvas ref={canvasRef}></canvas>
    </>
  );
}

const rootElementId = "root-react-app";
let rootElement = document.getElementById(rootElementId);
if (!rootElement) {
  rootElement = document.createElement("div");
  rootElement.id = rootElementId;
  document.body.appendChild(rootElement);
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
