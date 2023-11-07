import React, { useEffect, useState } from "react";

import "./LineChart.scss";

function LineChart({ chartdata }) {

  let [maxValue, setMaxValue] = useState(false);

  useEffect(() => {
    let chartvalues = [].concat(...chartdata.data.map(s => s.values));
    let max_value = Math.max(...chartvalues);
    setMaxValue(max_value);
  }, [chartdata]);


  return (
    <div className="line-chart">
      <h2>{ chartdata.title }</h2>
      <div className="chart-inner">
        <div className="chart-lines">
          <div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
        {
          chartdata.data.map((data, key) =>{
            return (
              <div key={ key } className={ `chart-item${(data.label === chartdata.active) ? ' active':'' }`  }>
                <div className="item-line-outer">
                  { maxValue && (
                    <div className="lines-wrapper">
                      {
                        data.values.map((value, key) => {
                          return (<div key={key} className="bar" style={{ backgroundColor: chartdata.colors[key], height: ((100/maxValue)*value)+'%' }}><span className="bar-value">{ value }</span></div>)
                        })
                      }
                    </div>
                  ) }
                </div>
                { data.label_image && <div style={{ backgroundImage: 'url('+data.label_image+')' }} className="item-label-image" /> }
                { data.label && <div className="item-label">{ data.label }</div> }
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default LineChart;