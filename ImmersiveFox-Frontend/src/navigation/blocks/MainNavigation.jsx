import { Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//blocks
import { Footer, Header, Project } from "../../blocks";
//components
import { PublicRoute } from "../components";
//routes
import { routes } from "../../navigation";

const MainNavigation = () => {
  return (
    <div className="immersive">
      <Header />
      <Switch>
        {routes.map((route) => (
          <PublicRoute
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
      <Project />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};

export default MainNavigation;
