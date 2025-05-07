import { createBrowserRouter } from "react-router";
import Root from "../Root";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import EventDetails from "../Pages/EventDetails";
import Profile from "../Pages/Profile";
import ErrorPage from "../Pages/ErrorPage";
import ForgotPass from "../Pages/ForgotPass";
import PrivateRoute from "../Private/PrivateRoute";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      {
        path: "contact",
        element: <div>im contact</div>,
      },
      {
        path: "myReserves",
        element: <div>im reserves</div>,
      },
      {
        path: "event-details/:id",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
        loader: () => fetch("/event.json"),
        hydrateFallbackElement: <h1>loading</h1>,
      },
    ],
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forgot-password",
    element: <ForgotPass />,
  },
]);
export default Router;
