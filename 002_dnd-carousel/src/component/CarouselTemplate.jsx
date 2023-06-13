import React, { useState } from "react";

const CarouselTemplate = () => {
  const SLIDER_WIDTH = 400;
  const SLIDER_HEIGHT = 400;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);
  const imageList = [
    "https://cdn.pixabay.com/photo/2023/03/27/14/24/british-shorthair-7880908_640.jpg",
    "https://cdn.pixabay.com/photo/2023/06/08/22/35/foxtail-grass-8050497_640.jpg",
    "https://cdn.pixabay.com/photo/2023/05/30/15/43/koala-8028992_1280.jpg",
  ];
  return (
    <>
      {/* Viewer */}
      <div
        className="overflow-hidden"
        style={{
          width: SLIDER_WIDTH,
          height: SLIDER_HEIGHT,
        }}
      >
        {/* Slider */}
        <div
          className="flex"
          style={{
            transform: `translateX(${-currentIndex * SLIDER_WIDTH + transX}px)`,
          }}
        >
          {/* Slide */}
          {imageList.map((url, i) => (
            <div key={i} className="flex-shrink-0">
              <img src={url} alt="img" width={SLIDER_WIDTH} draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CarouselTemplate;
