import React, { useEffect, useState } from "react";

import TextInput from "@components/_default/TextInput";

import "./EditCompany.scss";
import { users } from './data';
import GoogleMapReact from 'google-map-react';
import GooglePlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import MaskedInput from 'react-text-mask';
import createVatIdMask from 'text-mask-vat-id';
import { useRef } from "react";
import marker from './images/marker.svg';

const EditCompany = ({ company, setData, error }) => {

  const mask = createVatIdMask({localeFormat: true});
  const [editName, setEditName] = useState('');
  const [editVat, setEditVat] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [location, setLocation] = useState({lat: company.location?.lat, lng: company.location?.lng});
  const [zoom, setZoom] = useState(8);

  const [formValues, setFormValues] = useState(false);
  const changeData = (value, key) => {
    let save = { ...formValues };
    save[key] = value;
    setFormValues(save);
  } 

  const predictions = (item) => {
    setEditAddress(item);
  }

  useEffect(()=> {
    if(company.name){
      setEditName(company.name);
      setEditVat(company.vat);
      setEditAddress(company.address);
      setLocation({ lat: company.lat, lng: company.lng, zoom: 14 });
      setZoom(14);
    } else {
      setEditName('');
      setEditVat('');
      setEditAddress('');
      setLocation({ lat: 51.219448, lng: 4.402464 });
      setZoom(8);
    }
  }, [company])

  useEffect(async () => {
    let coords = false;
    if(editAddress){
      coords = await geocodeByAddress(editAddress?.label).then(results => getLatLng(results[0])).then(({ lat, lng }) => {
        setZoom(14);
        setLocation({lat: lat, lng: lng, zoom: 14})
        return ({lat: lat, lng: lng, zoom: 14})
      });
    }
    setData({...company,
      name: editName,
      vat: editVat,
      location: {
        address: editAddress.label, 
        ...coords, 
        value: editAddress.value
      },
    })
  }, [editVat, editName, editAddress])

  return (
      <div className="company-edit">

        <TextInput label="Name" value={ editName } onChange={ (e) => setEditName(e)} placeholder="Name of your company" />
        <div className="input text">
          <label>VAT number</label>
          <MaskedInput className="in-input"  value={ editVat } guide={false} name="vat" type="text" id="vat" required mask={mask} placeholder="BE 1234 567 890" onChange={ (e) => setEditVat(e.target.value.toUpperCase())} />
        </div>
        <div className="input text search-map">
          <label>Find Address</label>
          <GooglePlacesAutocomplete selectProps={{
            value: editAddress,
            onChange: (e) => setEditAddress(e)
          }}/>
        </div>
          <div id="map" style={{ height: '200px', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyDbOkflzFX2y8DqZS4E1uf5rPcFfhxkubk" }}
              defaultCenter={{ lat: 51.219448, lng: 4.402464 }}
              defaultZoom={zoom}
              zoom={zoom}
            >
              {location &&
                <div
                  className="marker"
                  zoom={zoom}
                  lat={location.lat}
                  lng={location.lng}> <img src={marker} alt="Marker" />
                </div>
              }
            </GoogleMapReact>
        </div>
        { error && <span className="main-error">{error}</span> }
        {/*
        <div className="userlist-wrapper">
          <label>Contacts</label>
          <div className="user-list">
            
              contactStore.contacts.map((user, key) => {
                return (<div key={key} className="user" style={{backgroundImage: 'url('+user.image+')' }}>
                  <span>{ user.firstName } { user.lastName }<i></i></span>
                </div>)
              })
            
          </div>
        </div>
        */}
        
      </div>
  );
};

export default EditCompany;
