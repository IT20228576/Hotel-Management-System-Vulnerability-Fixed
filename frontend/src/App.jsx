import axios from "axios";
import Router from "./components/routers/Router";
import { AuthContextProvider } from "./components/userManagement/context/UserContext";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
};

export default App;
