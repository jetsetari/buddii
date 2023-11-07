//Libs
import React, { useState, useEffect } from "react";

//Styling
import './Reports.scss';

//Components
import Slideshow from "./Components/Slideshow";
import ClientsTable from "./Components/ClientsTable";
import SlidesTable from "./Components/SlidesTable";
import QuestionsTable from "./Components/QuestionsTable";
import Loading from "@components/_default/Loading";

//Data
import { getSlideshows } from "@data/firebase/firestore/getData";
import { useSelector } from "react-redux";
import { getUser } from "@data/redux/usersSlice";


const Reports = () => {
  const [currentSlideshow, setCurrentSlideshow] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [slideshows, setSlideshows] = useState([])
  const user_store = useSelector(getUser);
  

  useEffect(() => {
    setLoading(true);
    user_store && getSlideshows(user_store.companies[0], (response) => {
      setLoading(false);
      setSlideshows(response);
    })
  }, [user_store]);
  
  return (
    loading ? <Loading /> : (
      <div id="reports">
        { slideshows && slideshows.length ? (
          <>
            <div id="report-presentation">
              { slideshows.map((slideshow, key) => <Slideshow key={key} iSlide={key} currentSlideshow={ currentSlideshow } setCurrentSlideshow={ setCurrentSlideshow } item={ slideshow } />) }
            </div>
            <div id="report-main">
              <ClientsTable currentSlideshow={slideshows[currentSlideshow]} />
              <SlidesTable currentSlideshow={slideshows[currentSlideshow]} />
            </div>
            <div id="report-questions">
              <QuestionsTable currentSlideshow={slideshows[currentSlideshow]} questions={ questions } />
            </div>
          </>
        ) : <span className="error-message">You need to create a slideshow before you can see the reporting</span> }
      </div>
    )
  );
};

export default Reports;