import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "@data/redux/usersSlice";
import { saveSlideshow } from "@data/firebase/firestore/saveData";
import { getSlideshows, getAppointments, getDropdownData, getCollectionFromCompany } from "@data/firebase/firestore/getData";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

//styling
import './Home.scss';

//data
import { optionsList, sortList } from './data';

//components
import Calendar from "./Components/Calendar";
import Appointment from "./Components/Appointment";
import Slideshow from "./Components/Slideshow";
import AddAppointment from "./Cards/AddAppointment";
import UserDetails from "./Cards/UserDetails";
import SmallDropdown from "@components/_default/SmallDropdown";
import DropDown from "@components/_default/DropDown";
import Search from "@components/_default/Search";
import Cards from "@components/_default/Cards";
import Popup from "@components/_default/Popup";
import AddSlideshow from "./Popup/AddSlideshow";

const Home = () => {
  const user_store = useSelector(getUser);
  const [listfilter, setListfilter] = useState('');
  const [sortListfilter, setSortListfilter] = useState('');
  const [userfilter, setUserfilter] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [userOpen, setUserOpen] = useState(false);
  const [userData, setUserData] = useState(false);
  const [addSlideshow, setAddSlideshow] = useState(false);
  const [slideshowId, setSlideshowId] = useState(false);
  const [slideshows, setSlideshows] = useState([]);
  const [date, setDate] = useState(moment().format('DD/MM/YYYY'));
  const [search, setSearch] = useState('');
  const [slideshow, setSlideshow] = useState({});

  const [contactPopup, setContactPopup] = useState(false);
  const [contactsList, setContactsList] = useState([]);
  const [contacts, setContacts] = useState(false);
  const [currentContact, setCurrentContact] = useState(false);
  const [currentSlideshow, setCurrentSlideshow] = useState(false);
  let navigate = useNavigate();


  // const openai = new OpenAIApi({
  //   apiKey: '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', 
  //   dangerouslyAllowBrowser: true
  // });
  


  const getSlideshowThumbs = () => {
    user_store && getSlideshows(user_store.companies[0], (response) => {
      setSlideshows(response);
    })
  }

  const saveSlideshowData = () => {
    getSlideshowThumbs();
    setAddSlideshow();
  }
  
  useEffect(() => {
    getSlideshowThumbs();
    getAppointments((response) => {
      setAppointments(response);
    })
    getCollectionFromCompany('contacts', (response) => {
      setContacts(response);
    })
    getDropdownData('contacts', ['firstName', 'lastName'], (response) => {
      setContactsList(response);
    })
  }, [user_store]);


  useEffect(async () => {
    console.log('Doing');
    
  }, []);

  const closeAppointments = () => {
    getAppointments((response) => {
      setAppointments(response);
      setAppointmentOpen(false);
    })
  }

  const onSubmitPdf = async (e) => {
    e.preventDefault();
    if(!slideshowId){
        const slideshowData = {
        ownerId: '',
        name: slideshow.name,
        companyId: user_store.companies[0],
        //locked: slideshow.locked.value,
        description: slideshow.description,
      };
      saveSlideshow(slideshowData, (response) => {
        setSlideshowId(response);
      })
    } else {
      setAddSlideshow(false);
    }
  }

  const onSelectSlideshow = (slideshow, client) => {
    setCurrentSlideshow(slideshow);
    if(!client){
      setContactPopup(true);
    } else {
      navigate('/slideshows/'+slideshow+'?c='+client)
    }
  }

  return(
    <div id="home" className={ isEmpty ? 'empty' : '' }>
      <Popup title="Add pdf" saveTitle={ !slideshowId ? 'Next' : false } savePopup={!slideshowId ? true : false} cancel={!slideshowId ? true : false} active={ addSlideshow } onChange={onSubmitPdf}  closePopup={ setAddSlideshow }>
        <AddSlideshow saveSlideshowData={ saveSlideshowData } setSlideshow={setSlideshow}  slideshowId={ slideshowId } slideshow={slideshow}/>
      </Popup>
      <Popup title="Select contact to who you present" saveTitle={ 'Select' } active={ contactPopup } onChange={ () => onSelectSlideshow(currentSlideshow, currentContact.value) }  closePopup={ setContactPopup }>
        <DropDown options={contactsList} value={currentContact} onChange={(e) => { setCurrentContact(e) } } label="Client" placeholder="Select contact" />
        <a href="#" className="sublink" onClick={ () => onSelectSlideshow(currentSlideshow, '_none') }>Continue without client</a>
      </Popup>
      <Cards title="Add apointment" active={appointmentOpen} closeCard={ () => { setAppointmentOpen(false); } }>
        <AddAppointment closeAppointments={closeAppointments} />
      </Cards>
      <Cards title={ userData.name } active={userOpen} closeCard={() => { setUserOpen(false); }}>
        <UserDetails user={ userData } />
      </Cards>
      <div className="btn-add" onClick={() => { setSlideshow({ name:'', description: '', image: '' }); setSlideshowId(false); setAddSlideshow(!addSlideshow)}}></div>
      <section className="calendar-side">
        <Calendar setDate={setDate}/>
        <div className="appointments">
          <div className="a-actions">
            <button onClick={ (e) => { setUserOpen(false); setAppointmentOpen(true); } }>Add appointment</button>
          </div>
          <div className="a-calendar">
            { appointments.map((appointment, index) => (
                <Appointment date={date} openSlideshow={onSelectSlideshow} closeAppointments={closeAppointments} slideshows={slideshows} contacts={contacts} key={index} item={appointment} />
            )) }
          </div>
        </div>
      </section>
      <section className="slideshows-side">
        <div className="slideshows-actions">
          <Search callback={setSearch}/>
        </div>
        <div className="slideshows">
          { slideshows.map((item, index) => {
            if ( item.name?.toLowerCase().includes(search?.toLowerCase())
            || search === '') {
              if(item?.locked?.toLowerCase() === listfilter?.value?.toLowerCase()
              || listfilter?.value?.toLowerCase() === 'all'
              || !listfilter?.value?.toLowerCase()) {
                return (
                  <Slideshow getSlideshowThumbs={getSlideshowThumbs} key={index} item={item} onSelectSlideshow={ onSelectSlideshow } />
                )
              }
            }
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;