//libs
import React, { useState, useEffect } from "react";

//styling
import './Reports.scss';
import { observer } from "mobx-react-lite";
//components
import SmallDropdown from "@components/_default/SmallDropdown";
import Slideshow from "./Components/Slideshow";
import ClientsTable from "./Components/ClientsTable";
import SlidesTable from "./Components/SlidesTable";
import QuestionsTable from "./Components/QuestionsTable";

import Pager from "@components/_default/Pager";
import LineChart from "@components/Charts/LineChart";
import { getSlideshows } from "@data/firebase/firestore/getData";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "@data/redux/usersSlice";
import Loading from "@components/_default/Loading";

//data
import { sortList, userList, slideshows, audience_avgtime, users_chart, clients_table, slides_table } from './data';

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
            <div id="report-filter">
              <div className="user-filter">
                {/*<SmallDropdown 
                options={userList} 
                // onChange={(e) => setUserFilter(e)} 
                placeholder="Select User" 
                value={'all'} />*/}
              </div>
              {/*<div className="sort-by">
                <SmallDropdown 
                options={sortList} 
                // onChange={(e) => setSortListfilter(e)} 
                placeholder="Sort By" value={'Sort by'} 
                />
              </div>*/}
            </div>
            <div id="report-presentation">
              { slideshows.map((slideshow, key) => <Slideshow key={key} iSlide={key} currentSlideshow={ currentSlideshow } setCurrentSlideshow={ setCurrentSlideshow } item={ slideshow } />) }
            </div>
            {/*<Pager current={1} max={4} />*/}
            
            {/*<div id="report-audience">
              <div className="dropdown-filter">
                <SmallDropdown 
                options={[{ label: "Opens", value: "opens" }, { label: "Avg. time", value: "avg_time" }, { label: "Contacts", value: "contacts" }]} 
                // onChange={(e) => setSortListfilter(e)} 
                placeholder="Sort By" 
                value={'opens'} />
              </div>
              <LineChart chartdata={ audience_avgtime[currentSlideshow] } />
              <span className="description"><strong>Total avg. Time:</strong> 23d 24h 12min</span>
            </div>*/}
            <div id="report-main">
              <ClientsTable currentSlideshow={slideshows[currentSlideshow]} clients={ clients_table } />
              <SlidesTable currentSlideshow={slideshows[currentSlideshow]} />
            </div>
            {/*
            <div id="report-users">
              <div className="dropdown-filter">
                <SmallDropdown 
                options={[{ label: "Views", value: "views" }, { label: "Avg. time", value: "avg_time" }]} 
                // onChange={(e) => setSortListfilter(e)} 
                placeholder="Sort By" 
                value={'Sort by'} />
              </div>
              {/*<Pager current={2} max={5} />
            </div>*/}
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