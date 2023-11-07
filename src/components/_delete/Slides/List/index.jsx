//libs
import { Link } from "react-router-dom"

//styling
import "./List.scss";

//assets
import Public from "../../../assets/images/icons/globe.svg";
import Private from "../../../assets/images/icons/private.svg";
import Friends from "../../../assets/images/icons/friends.svg";
import Play from "../../../assets/images/icons/play.svg";
import Edit from "../../../assets/images/icons/edit-slides.svg";

function List({ data, title }) {

  return (
    <article className='slides_box'>
      <div className='slides_box_nav'>
        <div className='slides_nav_content'>
          <h1 className='slides_nav_title'>{title}</h1>
          {/* dropdown */}
        </div>
        <p className='slides_nav_seeall'>see all</p>
      </div>

      <ul className='slides_list'>
        {data.map((item, index) => (
          <li key={index} className='slides_list_item'>
            <Link to="/slidesdetails">
              <div className='slides_item_img'>{/* background pfd foto */}
                <div className='slides_item_img_globe'>
                  {item.type === "public" &&
                    <img src={Public} alt="globe icon" />
                  }
                  {item.type === "private" &&
                    <img src={Private} alt="globe icon" />
                  }
                  {item.type === "friends" &&
                    <img src={Friends} alt="globe icon" />
                  }
                </div>

                {/* dropdown */}
                {item.buttons &&
                  <div className='slides_item_img_bottom'>
                    <img className='slides_item_img_play' src={Play} alt="play icon" />
                    <img className='slides_item_img_edit' src={Edit} alt="edit icon" />
                  </div>
                }
              </div>

              <h2 className='slides_item_title'>{item.title}</h2>
              <p className='slides_item_text'>{item.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default List;
