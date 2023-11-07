//libs
import React, { useState, useEffect } from "react";

//styling
//import "./Audience.scss"

//components
import Pager from "@components/_default/Pager";
import Cards from "@components/_default/Cards";
import DeletePopup from "@components/_default/DeletePopup";
import { getCollectionFromCompany } from "@data/firebase/firestore/getData";
import { saveExtCompany } from "@data/firebase/firestore/saveData";
import { deleteDocFromCollection } from "@data/firebase/firestore/deleteData";
import Loading from "@components/_default/Loading";

//cards
import EditCompany from "./Cards/EditCompany";

const Companies = (props)=> {
  const [editCompanyOpen, setEditCompanyOpen] = useState(false);
  const [deleteCompanyPopup, setDeleteCompanyPopup] = useState(false);
  const [company, setCompany] = useState(false);
  const [pager, setPager] = useState(1);
  const [companies, setCompanies] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if(!company || company.name == '' || company.vat == '' || !company.location.address){
      setError('Please fill in all fields');
    } else {
      let data = {
        name: company.name,
        address: company.location.address,
        vat: company.vat, lat: company.location.lat, lng: company.location.lng
      }
      let id = (company.id) ? company.id : false;
      saveExtCompany(id, data, (repsonse) => {
        loadCompanies();
      })
    }
  }

  const loadCompanies = () => {
    getCollectionFromCompany('extCompanies', (response) => {
      setDeleteCompanyPopup(false);
      setEditCompanyOpen(false);
      setCompanies(response);
    })
  }

  const handleDeleteCompany = (item) => {
    deleteDocFromCollection('extCompanies', item.id, (callback)=> {
      loadCompanies();
    })
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    companies ? (
      <div id="companies">
        <h1>Contacts companies</h1>
        <Cards title="Edit Company" active={editCompanyOpen} onSubmit={handleSubmit} save={true} closeCard={() => setEditCompanyOpen(false) }>
          <EditCompany company={editCompanyOpen} error={error} setData={ setCompany} />
        </Cards>
        <DeletePopup onChange={handleDeleteCompany} title="company" subject={deleteCompanyPopup.name} item={deleteCompanyPopup} closePopup={ setDeleteCompanyPopup } active={ deleteCompanyPopup.name } />
        <div id="btn-add" onClick={ () => setEditCompanyOpen(true) }>Add company</div>
        <div className="table-wrapper">
          <table>
            <tbody>
              <tr className="tbl-header"><th>Name</th><th>VAT</th><th>Address</th><th align="center">Contacts</th><th></th></tr>
              { companies.map((company, key) => {
                return (<tr key={ key }>
                  <td>{ company.name }</td>
                  <td>{ company.vat }</td>
                  <td><span className="description">{ company?.address }</span></td>
                  <td></td>
                  {/*contactStore.contacts.map((contact, key) => (
                    company.id === contact.extCompany.id && <td align="center">{ contact.firstName + ' ' + contact.lastName }</td>
                  ))*/}
                  <td className="actions">
                    <div className="btn-delete"  onClick={ () => setDeleteCompanyPopup(company) }></div>
                    <div className="btn-edit" onClick={ () => setEditCompanyOpen(company) }></div>
                  </td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    ) : <Loading position="admin" />
  );
};

export default Companies