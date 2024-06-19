import { useEffect, useState } from "react";
import { Menu, Container, Button, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import '../../App.css';

const NavBar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showSidebar, setShowSidebar] = useState(windowWidth <= 768);
  const location = useLocation();

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
               <Menu.Item as={Link} to='/createBudget' active={location.pathname === '/creatBudget'}>
                Lag Budsjett
              </Menu.Item>
              <Menu.Item as={Link} to='/budget' active={location.pathname === '/budgt'}>
                Mine Budsjett
              </Menu.Item>
              <Menu.Item as={Link} to='/about' active={location.pathname === '/about'}>
                Om Oss
              </Menu.Item>
              <Menu.Item as={Link} to='/errors' active={location.pathname === '/errors'}>
                Errors
              </Menu.Item>
            </>
          )}
          <Menu.Item position='right'>
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
          </Menu.Item>
        </Container>
      </Menu>
      <div className={showSidebar ? 'sidebar open' : 'sidebar'}>
        <Menu inverted vertical>
          <Menu.Item as={Link} to='/' active={location.pathname === '/'}>
            Hjem
          </Menu.Item>
          <Menu.Item as={Link} to='/createBudget' active={location.pathname === '/creatBudget'}>
                Lag Budsjett
              </Menu.Item>
          <Menu.Item as={Link} to='/budget' active={location.pathname === '/budget'}>
            Mine Budsjett
          </Menu.Item>
          <Menu.Item as={Link} to='/about' active={location.pathname === '/about'}>
            Om oss
          </Menu.Item>
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
        </Menu>
      </div>
    </>
  );
};

export default NavBar;
