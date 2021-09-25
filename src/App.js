import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "./containers/Admin";
import Home from "./containers/Home";
import Auth from "./containers/Auth";
import { routeAdmin, routeAuth, routeHome } from "./routes";
import Error from "./containers/Error";
//
import Login from "containers/shared/Auth/Login/Login";
import PageNotFound from "containers/shared/PageNotFound/PageNotFound";
import AdminLayout from "layouts/AdminLayout";
// import { Route, Switch } from "react-router-dom";
import { adminRoutes, clientRoutes } from "routes/index";
import ClientLayout from "layouts/ClientLayout";
// const showLayoutAdmin = (routes) => {
//   if (routes && routes.length > 0) {
//     return routes.map((item, index) => {
//       return (
//         <Admin
//           key={index}
//           exact={item.exact}
//           path={item.path}
//           component={item.component}
//           isPrivate={item.isPrivate}
//         />
//       );
//     });
//   }
// };

const showLayoutHome = (routes) => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <Home
          key={index}
          exact={item.exact}
          path={item.path}
          component={item.component}
          isPrivate={item.isPrivate}
        />
      );
    });
  }
};

const showLayoutAuth = (routes) => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <Auth
          key={index}
          exact={item.exact}
          path={item.path}
          component={item.component}
          isPrivate={item.isPrivate}
        />
      );
    });
  }
};

function App() {
  const renderLayout = (routes, Layout) => {
    return routes.map((route) => {
      const { path, component, exact, isPrivate } = route;
      return (
        <Layout
          key={component}
          path={path}
          component={component}
          exact={exact}
          isPrivate={isPrivate}
        />
      );
    });
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* {showLayoutAdmin(routeAdmin)} */}

          {showLayoutHome(routeHome)}

          {showLayoutAuth(routeAuth)}
          {/* {renderLayout(clientRoutes, ClientLayout)} */}
          {renderLayout(adminRoutes, AdminLayout)}
          <Route path="/login" component={Login} />
          <Route path="*" component={PageNotFound} />
          {/* Không tìm ra trang nào */}
          <Route path="" component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
