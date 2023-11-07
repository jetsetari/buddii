//libs
import React from "react";
import Pager from "../../../../components/_default/Pager";

//styling
import "./Invoices.scss"

//assets
import { invoices } from './data';

function Invoices(props) {

  return (
    <div id="invoices">
      <h1>Invoices</h1>
      <div className="table-wrapper">
        <table>
          <tr className="tbl-header"><th>Period</th><th>Amount</th><th>Options</th><th>Status</th><th></th></tr>
          { invoices.map((invoice, key) => {
            return (<tr key={ key }>
              <td>{ invoice.period }</td>
              <td>{ '€ '+invoice.amount }</td>
              <td>{ invoice.options.join(', ') }</td>
              <td><span className={ `status ${ invoice.status }` }>{ invoice.status }</span></td>
              <td className="actions">
                <div className="btn-download"></div>
              </td>
            </tr>)
          })}
        </table>
      </div>
      <Pager current={1} max={4} />
    </div>
  );
}

export default Invoices