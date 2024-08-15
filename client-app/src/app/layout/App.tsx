import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content="Loading app..." />

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
