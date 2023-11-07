//libs
import React, { useEffect, useState } from "react";

//styling
//import "./Audience.scss"

//components
import Pager from "@components/_default/Pager";
import Cards from "@components/_default/Cards";
import DeletePopup from "@components/_default/DeletePopup";


// import { useStores } from "../../../../backend/hooks/useStores";
// import { observer } from 'mobx-react-lite';

//cards
import EditAudience from "./Cards/EditAudience";
//import Label from "../../../../backend/models/labels";

//assets

const Audience = (props) => {
  //const {labelStore, uiStore} = useStores();
  const [editAudienceOpen, setEditAudienceOpen] = useState(false);
  const [deleteAudiencePopup, setDeleteAudiencePopup] = useState(false);

  const [audience, setAudience] = useState(false);
  const [pager, setPager] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editAudienceOpen === true) {
      // const audienceModel = new Label({
      //   titel: audience.titel,
      //   description: audience.description,
      //   color: audience.color,
      //   contacts: audience.contacts,
      //   audience: true,
      //   //company: uiStore?.currentCompany?.id
      // });

      // const result = await labelStore.createLabel(audienceModel);
      // console.log(result);
    } else {
      // const update = await labelStore.updateLabel(audience);
      // console.log(update);
    }

    setEditAudienceOpen(false);
  }

  const handleDeleteAudience = (item) => {
    //labelStore.deleteLabel(item)
  };

  return (
    <div id="audiences">
      <h1>Audience</h1>
      <Cards title="Edit Audience" active={editAudienceOpen} save={ true } onSubmit={handleSubmit} closeCard={setEditAudienceOpen}>
        <EditAudience audience={ editAudienceOpen } setAudience={ setAudience}/>
      </Cards>
      <DeletePopup title="audience" onChange={handleDeleteAudience} subject={deleteAudiencePopup.titel} item={deleteAudiencePopup} closePopup={ setDeleteAudiencePopup } active={ deleteAudiencePopup.titel } />
      <div id="btn-add" onClick={ () => setEditAudienceOpen(true) }>Add audience</div>
      <div className="table-wrapper">
        <table>
          <tr className="tbl-header"><th>Name</th><th>Description</th><th align="center">Contacts</th><th></th></tr>
          {/* labelStore?.audience?.filter((item ,idx) => 10*(pager-1) < idx+1 && idx < 10*pager).map((audienceItem, key) => {
            return (<tr key={ key }>
              <td><span className="label" style={{backgroundColor: audienceItem.color}}>{ audienceItem.titel }</span></td>
              <td><span className="description">{ audienceItem.description }</span></td>
              <td align="center">
                {audienceItem.contactsObj.map((contact, key) => (
                  <>{ contact.firstName + ' ' + contact.lastName } { (key != (audienceItem.contactsObj.length-1)) ? ', ':'' }</>
                ))}
              </td>
              
              <td className="actions">
                <div className="btn-delete" onClick={ () => setDeleteAudiencePopup(audienceItem) }></div>
                <div className="btn-edit" onClick={ () => setEditAudienceOpen(audienceItem) }></div>
              </td>
            </tr>)
          })*/}
        </table>
      </div>
      {/*labelStore.audience.length > 10 &&
        <Pager current={pager} max={Math.ceil(labelStore.audience.length / 10)} setPager={setPager} />
      */}
    </div>
  );
};

export default Audience