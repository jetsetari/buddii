//libs
import React, { useState, useEffect } from "react";

//styling
import "./ClientsTable.scss";
import { getContactLogsReports } from "@data/firebase/firestore/getData";

import moment from "moment";

function ClientsTable({ currentSlideshow }) {

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getContactLogsReports(currentSlideshow.id, (response) =>{
      setClients(response);
      setLoading(false);
    });
  }, [currentSlideshow])

  return (
    <div className="clients-table">
      <div className="table-wrapper">
          <h2>Best contacts</h2>
          { loading ? <span className="message">Loading data...</span> : (
            <>
              { clients.length ? (
                <table>
                  <thead>
                    <tr className="tbl-header"><th>Contact</th><th align="center">Opens</th><th align="center">Views</th></tr>
                  </thead>
                  <tbody>
                    { clients.map((client, key) => {
                      return (
                        <tr key={key}>
                          <td>
                            <div className="client">
                              <div className="avatar" style={{backgroundImage: 'url('+client.image+')' }}></div>
                              <div className="client-details">
                                <span className="client-name">{ client.firstName } { client.lastName }</span>
                                <span className="client-email">{ client.email }</span>
                              </div>
                            </div>
                          </td>
                          <td align="center">{ client.opens }</td>
                          <td align="center">{ moment("2015-01-01").startOf('day').seconds(client.total_time).format('mm:ss')}</td>
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

export default ClientsTable;