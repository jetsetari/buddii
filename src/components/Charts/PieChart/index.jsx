import React, { useEffect, useRef, useState } from "react";

import "./PieChart.scss";

function PieChart({ chartdata }) {

  let [maxValue, setMaxValue] = useState(false);

  useEffect(() => {
    let chartvalues = [].concat(...chartdata.data.map(s => s.values));
    let max_value = Math.max(...chartvalues);
    setMaxValue(max_value);
  }, []);


  return (
    <div className="pie-chart">
      <h2>{ chartdata.title }</h2>
      <div className="pie-inner">
        {
          chartdata.data.map((data, key) =>{
            return (
              <div id={ `slice-${key}`} className="hold">
                <div className="pie"></div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default PieChart;

    <div class="pieContainer">
      <div class="pieBackground"></div>
      <div id="pieSlice1" class="hold"><div class="pie"></div></div>
      <div id="pieSlice2" class="hold"><div class="pie"></div></div>
      <div id="pieSlice3" class="hold"><div class="pie"></div></div>
      <div id="pieSlice4" class="hold"><div class="pie"></div></div>
      <div id="pieSlice5" class="hold"><div class="pie"></div></div>
      <div id="pieSlice6" class="hold"><div class="pie"></div></div>
      <div class="innerCircle"><div class="content"><b>Data</b><br>from 16<sup>th</sup> April, 2014</div></div>
    </div>
   .pieContainer {
      height: 150px;
      position: relative;
    }
    
    .pieBackground {
      position: absolute;
      width: 150px;
      height: 150px;
      border-radius: 100%;
      box-shadow: 0px 0px 8px rgba(0,0,0,0.5);
    } 
    
    .pie {
      transition: all 1s;
      position: absolute;
      width: 150px;
      height: 150px;
      border-radius: 100%;
      clip: rect(0px, 75px, 150px, 0px);
    }
    
    .hold {
      position: absolute;
      width: 150px;
      height: 150px;
      border-radius: 100%;
      clip: rect(0px, 150px, 150px, 75px);
    }
    
    #pieSlice1 .pie {
      background-color: #1b458b;
      transform:rotate(30deg);
    }
    
    #pieSlice2 {
      transform: rotate(30deg);
    }
    
    #pieSlice2 .pie {
      background-color: #0a0;
      transform: rotate(60deg);
    }
    
    #pieSlice3 {
      transform: rotate(90deg);
    }
    
    #pieSlice3 .pie {
      background-color: #f80;
      transform: rotate(120deg);
    }
    
    #pieSlice4 {
      transform: rotate(210deg);
    }
    
    #pieSlice4 .pie {
      background-color: #08f;
      transform: rotate(10deg);
    }
    
    #pieSlice5 {
      transform: rotate(220deg);
    }
    
    #pieSlice5 .pie {
      background-color: #a04;
      transform: rotate(70deg);
    }
    
    #pieSlice6 {
      transform: rotate(290deg);
    }
    
    #pieSlice6 .pie {
      background-color: #ffd700;
      transform: rotate(70deg);
    }
    
    .inn