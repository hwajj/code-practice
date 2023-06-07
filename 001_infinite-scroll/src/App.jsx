import { useState } from "react";
import "./App.scss";

const TAGS = [
  "HTML",
  "CSS",
  "JavaScript",
  "Typescript",
  "Tailwind",
  "React",
  "Next.js",
  "Gatsby",
  "UI/UX",
  "SVG",
  "animation",
  "webdev",
];
// const TAGS = ["A", "B", "C", "D", "E"];
const DURATION = 15000;
const ROWS = 5;
const TAGS_PER_ROW = 5;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const InfiniteLoopSlider = ({ children, duration, reverse = false }) => {
  return (
    <div
      className="loop-slider"
      style={{
        "--duration": `${duration}ms`,
        "--direction": reverse ? "reverse" : "normal",
      }}
    >
      <div className="inner">
        {children}
        {children}
      </div>
    </div>
  );
};

const Tag = ({ text }) => (
  <div className="tag">
    <span>#</span> {text}
  </div>
);
function App() {
  return (
    <>
      <div className="app">
        <div className="tag-list">
          {[...new Array(ROWS)].map((_, i) => {
            const r = random(DURATION - 5000, DURATION + 5000);
            console.log(DURATION, r);
            return (
              <InfiniteLoopSlider key={i} duration={r} reverse={i % 2}>
                {shuffle(TAGS)
                  .slice(0, TAGS_PER_ROW)
                  .map((tag) => (
                    <Tag text={tag} key={tag} />
                  ))}
              </InfiniteLoopSlider>
            );
          })}
          <div className="fade" />
        </div>
      </div>
    </>
  );
}

export default App;
