import { useState, useEffect } from 'react';
import { Menu, Container, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../App.css';

interface NavBarProps {
  fixed: "right" | "left" | "top" | "bottom" | null;
}

const NavBar = ({ fixed }: NavBarProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showSidebar, setShowSidebar] = useState(windowWidth <= 768);

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
      <Menu fixed={fixed || undefined} className="navbar">
        <Container>
          <Menu.Item as={Link} to='/' active>
            Hjem
          </Menu.Item>
          {windowWidth > 768 && (
            <>
              <Menu.Item as={Link} to='/budgets'>
                Budsjett
              </Menu.Item>
              <Menu.Item as={Link} to='/profile'>
                Min Profil
              </Menu.Item>
              <Menu.Item as={Link} to='/about'>
                Om Oss
              </Menu.Item>
            </>
          )}
          <Menu.Item position='right'>
            {windowWidth > 768 ? (
              <>
                <Button as={Link} to="/login" inverted={!fixed}>
                  Logg inn
                </Button>
                <Button as={Link} to="/register" inverted={!fixed} primary={fixed !== null} style={{ marginLeft: '0.5em' }}>
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
          <Menu.Item as={Link} to='/' active>
            Hjem
          </Menu.Item>
          <Menu.Item as={Link} to='/budgets'>
                Budsjett
          </Menu.Item>
          <Menu.Item as={Link} to='/profile'>
            Min Profil
          </Menu.Item>
          <Menu.Item as={Link} to='/about'>
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
