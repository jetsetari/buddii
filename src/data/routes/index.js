import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";


/*#####REGISTRATION
########################################*/
import Invite from "@pages/Registration/Invite";
import Expired from "@pages/Registration/Expired";
import ChoosePass from "@pages/Registration/ChoosePass";
import Forgotpass from "@pages/Registration/Forgotpass/";
import Resetpass from "@pages/Registration/Resetpass/";
import Login from "@pages/Registration/Login";
import Terms from "@pages/Registration/Terms";
import CreateAdmin from "@pages/Registration/Signup/CreateAdmin";
import CompanyDetails from "@pages/Registration/Signup/CompanyDetails";
import RegisterMail from "@pages/Registration/RegisterMail";

/*#####TOOL
########################################*/
import Home from "@pages/Home"; 
import Slideshows from "@pages/Home/pages/Slideshows";
import Admin from "@pages/Admin";
import Contacts from "@pages/Contacts";
import Reports from "@pages/Reports";
import Nav from "@components/Layout/Menu";
import Loading from "@components/_default/Loading";
import EditCompany from "@pages/Admin/pages/Company";
import Profile from "@pages/Admin/pages/Profile";
import Users from "@pages/Admin/pages/Users";
import Questions from "@pages/Admin/pages/Questions";
import Audience from "@pages/Admin/pages/Audience";
import Companies from "@pages/Admin/pages/Companies";
import Labels from "@pages/Admin/pages/Labels";
import Invoices from "@pages/Admin/pages/Invoices";
import Plugins from "@pages/Admin/pages/Plugins";


export default function Authentication({ signed }) {

	const RenderLayout = (layout, element) => {
		return (layout == 'tool' ? <><Nav />{ element }</> : layout == 'admin' ? <><Nav/><Admin>{ element }</Admin></> : <>{ element }</>)
	}

	return (
		<Routes>
			{ signed ? (<>
				<Route exact path={'/'} element={RenderLayout('tool', <Home/>)} />
				<Route path={'/slideshows/:id'} element={RenderLayout('tool', <Slideshows/>)} />
				<Route exact path={'/contacts'} element={RenderLayout('tool', <Contacts/>)} />
				<Route path={'/contacts/:id'} element={RenderLayout('tool', <Contacts/>)} />
				<Route exact path={'/reports'} element={RenderLayout('tool', <Reports/>)} />
				<Route exact path={'/admin'} element={RenderLayout('admin', <EditCompany />)} />
				<Route exact path={'/admin/company'} element={RenderLayout('admin', <EditCompany />)} />
				<Route exact path={'/admin/companies'} element={RenderLayout('admin', <Companies />)} />
				<Route exact path={'/admin/profile'} element={ RenderLayout('admin', <Profile />) }/>
				<Route exact path={'/admin/users'} element={ RenderLayout('admin', <Users />) }/>
				<Route exact path={'/admin/questions'} element={ RenderLayout('admin', <Questions />) }/>
				<Route exact path={'/admin/audience'} element={ RenderLayout('admin', <Audience />) }/>
				<Route exact path={'/admin/companies'} element={ RenderLayout('admin', <Companies />) }/>
				<Route exact path={'/admin/labels'} element={ RenderLayout('admin', <Labels />) }/>
				<Route exact path={'/admin/plugins'} element={ RenderLayout('admin', <Plugins />) }/>
				<Route exact path={'/admin/invoices'} element={ RenderLayout('admin', <Invoices />) }/>
			</>):(<>
				<Route exact path={'/'} element={RenderLayout(false, <Login />)} />
				<Route exact path={'/login'} element={RenderLayout(false, <Login />)} />
				<Route exact path={'/register'} element={RenderLayout(false, <CreateAdmin />)} />
				<Route exact path={'/register/companydetails'} element={RenderLayout(false, <CompanyDetails />)} />
				<Route exact path={'/forgotpass'} element={RenderLayout(false, <Forgotpass />)} />
				<Route exact path={'/registermail'} element={RenderLayout(false, <RegisterMail />)} />
				<Route exact path={'/terms'} element={RenderLayout(false, <Terms/>)} />
				<Route exact path={'/invite'} element={RenderLayout(false, <Invite/>)} />
				<Route exact path={'/expired'} element={RenderLayout(false, <Expired/>)} />
				<Route exact path={'/choosepass'} element={RenderLayout(false, <ChoosePass/>)} />
			</>)}
		</Routes>
  );
}
