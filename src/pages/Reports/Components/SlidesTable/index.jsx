//libs
import React, { useState, useEffect } from "react";

//styling
import "./SlidesTable.scss";
import { getSlideshowLogsReports } from "@data/firebase/firestore/getData";

import moment from "moment";

function SlidesTable({ currentSlideshow }) {
  
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSlideshowLogsReports(currentSlideshow.id, (response) =>{
      setSlides(response);
      setLoading(false);
    });
  }, [currentSlideshow])

  return (
    <div className="slides-table">
      <div className="table-wrapper">
          <h2>Best slides</h2>
          { loading ? <span className="message">Loading data...</span> : (
            <>
              { slides.length ? (
                <table>
                  <thead>
                    <tr className="tbl-header"><th>Slide</th><th align="center">Opens</th><th align="center" width="200">Total Time</th></tr>
                  </thead>
                  <tbody>
                    { slides.map((slide, key) => {
                      return (
                        <tr key={key}>
                          <td>
                            <div className="slide">
                              <div className="image" style={{backgroundImage: 'url('+slide.image+')' }}></div>
                              <div className="slide-details">
                                <span className="slide-name">Slide { slide.slide_i }</span>
                                <span className="slideshow-name">{ currentSlideshow.name }</span>
                              </div>
                            </div>
                          </td>
                          <td align="center">{ slide.opens }</td>
                          <td align="center">{ moment("2015-01-01").startOf('day').seconds(slide.total_time).format('mm:ss')}</td>
                        </tr>
                      )
                    })}
                  </tbody>
              </table>
              ) : <span className="message">No data yet</span>
            }
          </>
        )}
      </div>
    </div>
  );
}

export default SlidesTable;