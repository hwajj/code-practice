import { useState } from "react";
import "./App.scss";
//
// const TAGS = [
//   "HTML",
//   "CSS",
//   "JavaScript",
//   "Typescript",
//   "Tailwind",
//   "React",
//   "Next.js",
//   "Gatsby",
//   "UI/UX",
//   "SVG",
//   "animation",
//   "webdev",
// ];
const TAGS = ["A", "B", "C", "D", "E"];
const DURATION = 5000;
const ROWS = 2;
const TAGS_PER_ROW = 5;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const Tag = ({ children }) => {
  return <span className={"tag"}>{children}</span>;
};

const InfiniteSlider = ({ children, duration, reverse }) => {
  console.log(duration);

  return (
    <div className={"slide-container"}>
      <div
        className="inner"
        style={{
          "--duration": `${duration}ms`,
          "--reverse": reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};

function App() {
  let tagListArr;
  let duration;

  return (
    <>
      <div className="app">
        <div className="tag-list">
          {[...new Array(ROWS)].map((e, i) => {
            // const tagListNum = random(2, TAGS)
            tagListArr = shuffle(TAGS);
            console.log(tagListArr);
            duration = random(DURATION - 2000, DURATION + 2000);
            return (
              <InfiniteSlider duration={duration} reverse={i % 2}>
                {tagListArr.map((e, i) => (
                  <Tag>{e}</Tag>
                ))}
              </InfiniteSlider>
            );
          })}
        </div>
        <div className="fade"></div>
      </div>
    </>
  );
}

export default App;
