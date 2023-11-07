//libs
import React, { useState } from "react";

//styling
//import "./Labels.scss"

//components
import Pager from "@components/_default/Pager";
import Cards from "@components/_default/Cards";
import DeletePopup from "@components/_default/DeletePopup";
import { deleteDocFromCollection } from "@data/firebase/firestore/deleteData";

//cards
import EditLabel from "./Cards/EditLabel";
import { getCollectionFromCompany } from "@data/firebase/firestore/getData";
import { saveLabel } from "@data/firebase/firestore/saveData";
import Loading from "@components/_default/Loading";

const Labels = (props) => {
  const [editLabelOpen, setEditLabelOpen] = useState(false);
  const [deleteLabelPopup, setDeleteLabelPopup] = useState(false);
  const [label, setLabel] = useState(false);
  const [labels, setLabels] = useState(false);
  const [pager, setPager] = useState(1);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if(!label || label.name == '' || label.description == '' || label.color == ''){
      setError('Please fill in all fields');
    } else {
      let data = {
        name: label.name,
        description: label.description,
        color: label.color
      }
      let id = (label.id) ? label.id : false;
      saveLabel(id, data, (repsonse) => {
        loadLabels();
      })
    }
  }

  const loadLabels = () => {
    getCollectionFromCompany('labels', (response) => {
      setEditLabelOpen(false);
      setDeleteLabelPopup(false);
      setLabels(response);
    })
  }

  const handleDeleteLabel = () => {
    console.log(deleteLabelPopup);
    deleteDocFromCollection('labels', deleteLabelPopup.id, (callback)=> {
      loadLabels();
    })
  };

  useState(() => {
    loadLabels();
  }, []);

  return (
    labels ? (
      <div id="labels">
        <h1>Labels</h1>
        <div id="btn-add" onClick={ () => setEditLabelOpen(true) }>Add label</div>
        <Cards title="Edit Label" active={editLabelOpen} save={ true } onSubmit={handleSubmit}  closeCard={setEditLabelOpen}>
          <EditLabel error={ error } label={ editLabelOpen } setLabel={ setLabel}/>
        </Cards>
        <DeletePopup onChange={handleDeleteLabel} title="label" subject={deleteLabelPopup.titel} closePopup={ setDeleteLabelPopup } active={ deleteLabelPopup.name } />
        <div className="table-wrapper">
          <table>
            <tbody>
              <tr className="tbl-header"><th>Label</th><th>Description</th><th></th></tr>
              { labels.map((label, key) => {
                return (<tr key={ key }>
                  <td><span className="label" style={{backgroundColor: label.color}}>{ label.name }</span></td>
                  <td><span className="description">{ label.description }</span></td>
                  <td className="actions">
                    <div className="btn-delete"  onClick={ () => setDeleteLabelPopup(label) }></div>
                    <div className="btn-edit" onClick={ () => setEditLabelOpen(label) }></div>
                  </td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
        {/*{labelStore.labels.length > 10 &&
           <Pager current={pager} max={Math.ceil(labelStore.labels.length / 10)} setPager={setPager} />
        }*/}
      </div>
    ) : <Loading position="admin" />
  );
};

export default Labels