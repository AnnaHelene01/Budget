import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <NavBar />
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <Container style={{ marginTop: '7em'}}>
          <Outlet />
        </Container>
      )}
    </>
  );
}

export default observer(App);
