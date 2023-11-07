import React, { useEffect, useRef, useState, useCallback } from "react";

import "./Stats.scss";
import moment from "moment";

//components
import LineChart from "@components/Charts/LineChart";

//data
import { slide_stats, slides_table } from './data';
import { getLogs, getContactsById} from "@data/firebase/firestore/getData";
import _ from "underscore";

const Stats = ({ currentSlide, currentSlideShow, currentSeconds, currentClient }) => {
  const [logData, setLogData] = useState([]);
  const [contacts, setContacts] = useState(false);

  useEffect(() => {
    getLogs(currentSlideShow, currentSlide, (response) =>{
      setLogData(response);
    });
    getContactsById((response) => {
      setContacts(response);
    })
  }, [currentSlide, currentSlideShow]);

  return (
    <div className="slide-stats">
      <div className="slide-charts">
        <div className="statistics-amount">
          <span className="amount">{ logData.length }</span>
          <h3>Total opens</h3>
          { 
            (currentClient !== '_none') && (
              <>
                <span className="amount">{currentSeconds && moment("2015-01-01").startOf('day').seconds(currentSeconds).format('mm:ss')}</span>
                <h3>Time on slide</h3>
              </>
            )
          }
          <span className="amount">{moment("2015-01-01").startOf('day').seconds(logData.reduce((s, f) => s + f.time, 0)).format('mm:ss')}</span>
          <h3>Total presentation time</h3>
        </div>
        <div className="statistics-chart">
          <LineChart chartdata={ slide_stats } />
        </div>
      </div>
      <div className="slide-logs">
        <div className="table-wrapper">
          <table>
            <tbody>
              <tr className="tbl-header"><th>Contact</th><th align="center">User</th><th align="center" width="230">Avg. Time</th></tr>
              { contacts && logData.map((log, key) => {
                return (<tr key={key}>
                  <td>
                    <div className="slide">
                      <div className="image" style={{backgroundImage: 'url('+contacts[log.contact].image+')' }}></div>
                      <div className="slide-details">
                        <span className="slide-name">{ contacts[log.contact].firstName+' '+contacts[log.contact].lastName }</span>
                      </div>
                    </div>
                  </td>
                  <td align="center">{ log.user }</td>
                  <td align="center">{moment("2015-01-01").startOf('day').seconds(log.time).format('mm:ss')}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stats;
