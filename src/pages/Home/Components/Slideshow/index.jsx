//libs
import React, {useEffect, useState} from "react";
import { NavLink } from 'react-router-dom';
import { deleteDocFromCollection } from "@data/firebase/firestore/deleteData";


//styling
import "./Slideshow.scss";

function Slideshow({item, onSelectSlideshow, getSlideshowThumbs}) {

  const [submenu, setSubmenu] = useState(false);

  const removeSlideshow = (id) => {
    if (window.confirm('Are you sure you wish to delete this slideshow?')){
      deleteDocFromCollection('slideshows', id, (callback) => {
        getSlideshowThumbs();
      })
    }
  }

  return (
    <div className="slideshow-wrapper">
      <div className="btn-submenu"  onClick={() => setSubmenu(prevVal => (!prevVal ? item.id : false) ) }></div>
     {
        (submenu == item.id) && (
          <div className="submenu">
            <div className="sub-item item-delete" onClick={ () => { removeSlideshow(item.id) } }>Delete</div>
            { item.pdf && <a className="sub-item item-download" target="_blank" href={item.pdf}>Download pdf</a> }
          </div>
        )
      }
      <div onClick={ () => onSelectSlideshow(item.id, false) } className="slideshow">
        <div className="s-image" style={{backgroundImage: 'url('+item.cover?.replace('.jpg', '_1360x1024.jpg')+')' }}>
          {/*<div className={ item.locked + ' access' }></div>
          
          <div className="action-group">
              <NavLink to={"/slideshows/" + item.id} className="slideshow">

            <div className="btn-watch"></div>
            <div className="btn-play"></div>
          </div>*/}
        </div>
        <div className="s-description">
          <span className="title">{ item.name }</span>
          <span className="description">{ item.description }</span>
        </div>
      </div>
    </div>
  );
}

export default Slideshow;