//libs
import React, { useEffect, useState } from "react";
import {Route, Link, Routes, useLocation} from 'react-router-dom';

//styling
import './Admin.scss';

//assets
import Users from "./pages/Users"
import Questions from "./pages/Questions"
import Audience from "./pages/Audience"
import Companies from "./pages/Companies"
import Labels from "./pages/Labels"
import Invoices from "./pages/Invoices"
import Plugins from "./pages/Plugins"
import EditCompany from "./pages/Company";
import Profile from "./pages/Profile";
import { useNavigate } from "react-router-dom";

const adminPages = [
  { title: 'Company', name : 'company', component: <EditCompany /> },
  { title: 'Profile', name : 'profile', component: <Profile /> },
  { title: 'Companies', name : 'companies', component: <Companies /> },
  { title: 'Users', name : 'users', component: <Users /> },
  //{ title: 'Audience', name : 'audience', component: <Audience /> },
  { title: 'Questions', name : 'questions', component: <Questions /> },
  
  { title: 'Labels', name : 'labels', component: <Labels /> },
  //{ title: 'Plugins', name : 'plugins', component: <Plugins /> },
  //{ title: 'Subscription', name : 'subscription', component: <Subscription /> },
  //{ title: 'Invoices', name : 'invoices', component: <Invoices /> },
];

const Admin = ({children}) => {

  const location = useLocation();
  let current_page = location.pathname.replace('/admin/', '');
      current_page = (current_page == '/admin') ? 'company' : current_page;
  let current_comp = adminPages.filter(admin => admin.name == current_page);
      current_comp = (current_page == 'company') ? <EditCompany /> : adminPages.filter(admin => admin.name == current_page)[0].component;

  const [page, setPage] = useState({name: current_page, component: current_comp});
  let navigate = useNavigate();

  let goToPage = (name, component) => {
    navigate(`/admin/${name}`);
    setPage({ name: name, component: component });
  }

  return (
    <div id="admin">
      <nav className="admin-nav">
        <h2>Admin</h2>
        {
          adminPages.map(( adminpage, key ) => {
            return (<button 
              key={key}
              className={page.name === adminpage.name ? "active" : ""}
              onClick={() => goToPage(adminpage.name, adminpage.component )}>
              { adminpage.title }
            </button>)
          })
        }
      </nav>
      <div id={ 'admin-'+page.name } className="admin-page">
        {children}
      </div>
    </div>
  );
}

export default Admin;