//libs
import React from "react";

//styling
import "./Slideshow.scss";


function Slideshow({ iSlide, item, currentSlideshow, setCurrentSlideshow }) {
  return (
    <div onClick={ () => setCurrentSlideshow(iSlide) } className={`slideshow ${((iSlide)==currentSlideshow) ? 'active' : ''}`}>
      <div className="s-image" style={{backgroundImage: 'url('+item.cover?.replace('.jpg', '_1360x1024.jpg')+')' }} />
      <div className="s-description">
        <span className="title">{ item.name }</span>
      </div>
    </div>
  );
}

export default Slideshow;
