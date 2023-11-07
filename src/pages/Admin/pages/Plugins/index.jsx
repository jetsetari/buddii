//libs
import React, { useEffect } from "react";
import axios from 'axios';

//styling
import "./Plugins.scss"


//assets

function Invoices(props) {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');

  useEffect(() => {
    // axios.get('https://api.focus.teamleader.eu/companies.list',  {
    //   headers: {'Content-Type': 'application/json'}, 
    //   // body: "{  \"filter\": {    \"email\": {      \"type\": \"primary\",      \"email\": \"info@piedpiper.eu\"    },    \"ids\": [      \"cb8da52a-ce89-4bf6-8f7e-8ee6cb85e3b5\",      \"f8a57a6f-dd1e-41a3-b8d3-428663f1d09e\"    ],    \"term\": \"Acme\",    \"updated_since\": \"2016-02-04T16:44:33+00:00\",    \"tags\": [      \"expo\",      \"lead\"    ]  },  \"page\": {    \"size\": 20,    \"number\": 1  },  \"sort\": [    {      \"field\": \"name\"    }  ]}"
    // })
    //   .then(res => {
    //     console.log(res.data);
    //     console.log('Status:', res.statusCode);
    //     console.log('Headers:', JSON.stringify(res.headers));
    //     // console.log('Response:', body);
    // })
  }, [])

  const connectAccesTeamLeader = () => {
    const url = `https://focus.teamleader.eu/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_teamleader_clientId}&redirect_uri=${process.env.REACT_APP_teamleader_redirectUri}`;
    window.open(url , '_blank').focus();
  }

  useEffect(() => {
    if(code){
      axios.post(`https://focus.teamleader.eu/oauth2/access_token?client_id=${process.env.REACT_APP_teamleader_clientId}&client_secret=${process.env.REACT_APP_teamleader_clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_teamleader_redirectUri}`)
        .then(res => {
          console.log(res.data);
          // console.log('Response:', body);
      })
    }
  }, [code])

  return (
    <div id="plugins">
      <h1>Plugins</h1>
      <div className="plugin-list">
        <div className="plugin" >
          <h2>Teamleader</h2>
          <span className="description">
            Start met versturen van campagnes vanuit Buddii of....
          </span>
          <div className="btn-manage" onClick={() => connectAccesTeamLeader()}>Manage</div>
        </div>
      </div>
    </div>
  );
}

export default Invoices