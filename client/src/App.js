import {
	useRoutes
} from "hookrouter";

import { Profile } from "./components/profile/Profile";
import { RegisterUser } from "./components/registerPages/RegisterUser";
import { Login } from "./components/Login";
import {OptionalInfo } from "./components/registerPages/OptionalInfo";
import { Dashboard } from "./components/dashboard/dashboard";
//Context
import RegisterProvider from "./Context/RegisterProvider";

const routes = {
  "/": (props) => <Login props={props} />,
  "/register": (props) => <RegisterProvider ><RegisterUser props={props} /></RegisterProvider>,
  "/profile/:id": (props) => <RegisterProvider ><Profile props={props} /></RegisterProvider>,
  "/register/update-user/:id": (props) => <RegisterProvider ><OptionalInfo props={props} /></RegisterProvider>,
  "/dashboard": (props) => <Dashboard props={props} />
}


function App() {
    const match = useRoutes(routes);
  return (
    <>
      
      <h1>Nav</h1>
        {match}
    </>
	);
}

export default App;
