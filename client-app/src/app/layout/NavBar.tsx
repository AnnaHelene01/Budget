import { useEffect, useState } from "react";
import { Menu, Container, Button, Icon, Image, Dropdown } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import '../../App.css';
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import userPlaceholder from '../../assets/user.png'

export default observer(function NavBar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showSidebar, setShowSidebar] = useState(windowWidth <= 768);
  const location = useLocation();
  const { userStore: { user, logout } } = useStore();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setShowSidebar(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Menu className="navbar">
        <Container>
          <Menu.Item as={Link} to='/' active={location.pathname === '/'}>
            Hjem
          </Menu.Item>
          {windowWidth > 768 && (
            <>
              {user && (
                <>
                  <Menu.Item as={Link} to='/createBudget' active={location.pathname === '/createBudget'}>
                    Lag Budsjett
                  </Menu.Item>
                  <Menu.Item as={Link} to='/budget' active={location.pathname === '/budget'}>
                    Mine Budsjett
                  </Menu.Item>
                </>
              )}
              <Menu.Item as={Link} to='/about' active={location.pathname === '/about'}>
                Om Oss
              </Menu.Item>
              <Menu.Item as={Link} to='/errors' active={location.pathname === '/errors'}>
                Errors
              </Menu.Item>
            </>
          )}
          <Menu.Item position='right'>
            {user ? (
              <>
                {windowWidth > 768 ? (
                  <>
                    <Image src={user.image || `${userPlaceholder}`} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user.displayName}>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profile/${user.username}`} text='My Profile' icon='user' />
                        <Dropdown.Item onClick={logout} text='Logg ut' icon='power' />
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <Icon name='bars' onClick={handleToggleSidebar} style={{ cursor: 'pointer', color: 'white' }} />
                )}
              </>
            ) : (
              <>
                {windowWidth > 768 ? (
                  <>
                    <Button as={Link} to="/login" inverted>
                      Logg inn
                    </Button>
                    <Button as={Link} to="/register" inverted primary style={{ marginLeft: '0.5em' }}>
                      Registrer
                    </Button>
                  </>
                ) : (
                  <Icon name='bars' onClick={handleToggleSidebar} style={{ cursor: 'pointer', color: 'white' }} />
                )}
              </>
            )}
          </Menu.Item>
        </Container>
      </Menu>
      <div className={showSidebar ? 'sidebar open' : 'sidebar'}>
        <Menu inverted vertical>
          <Menu.Item as={Link} to='/' active={location.pathname === '/'}>
            Hjem
          </Menu.Item>
          {user && (
            <>
              <Menu.Item as={Link} to='/createBudget' active={location.pathname === '/createBudget'}>
                Lag Budsjett
              </Menu.Item>
              <Menu.Item as={Link} to='/budget' active={location.pathname === '/budget'}>
                Mine Budsjett
              </Menu.Item>
            </>
          )}
          <Menu.Item as={Link} to='/about' active={location.pathname === '/about'}>
            Om oss
          </Menu.Item>
          {!user ? (
            <>
              <Menu.Item>
                <Button as={Link} to='/login' inverted onClick={() => setShowSidebar(false)}>
                  Logg inn
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button as={Link} to='/register' inverted primary onClick={() => setShowSidebar(false)}>
                  Registrer
                </Button>
              </Menu.Item>
            </>
          ) : (
            <Menu.Item>
              <Image src={user.image || `${userPlaceholder}`} avatar spaced='right' />
              <Dropdown pointing='top left' text={user.displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/profile/${user.username}`} text='My Profile' icon='user' />
                  <Dropdown.Item onClick={logout} text='Logg ut' icon='power' />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </>
  );
});
