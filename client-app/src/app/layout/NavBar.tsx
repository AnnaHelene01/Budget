import { useState, useEffect } from 'react';
import { Menu, Container, Button, Icon } from 'semantic-ui-react';
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
      <Menu fixed={fixed || undefined} inverted={!fixed} pointing={!fixed} secondary={!fixed} size='large' className="navbar">
        <Container>
          <Menu.Item as='a' active >
            Hjem
          </Menu.Item>
          {windowWidth > 768 && (
            <>
              <Menu.Item as='a'>
                Work
              </Menu.Item>
              <Menu.Item as='a'>
                Company
              </Menu.Item>
              <Menu.Item as='a'>
                Careers
              </Menu.Item>
            </>
          )}
          <Menu.Item position='right'>
            {windowWidth > 768 ? (
              <>
                <Button as='a' inverted={!fixed}>
                  Logg inn
                </Button>
                <Button as='a' inverted={!fixed} primary={fixed !== null} style={{ marginLeft: '0.5em' }}>
                  Registrer
                </Button>
              </>
            ) : (
              <Icon name='bars' onClick={handleToggleSidebar} style={{ cursor: 'pointer' }} />
            )}
          </Menu.Item>
        </Container>
      </Menu>
      <div className={showSidebar ? 'sidebar open' : 'sidebar'}>
        <Menu inverted vertical>
          <Menu.Item as='a' active>
            Hjem
          </Menu.Item>
          <Menu.Item as='a'>
            Work
          </Menu.Item>
          <Menu.Item as='a'>
            Company
          </Menu.Item>
          <Menu.Item as='a'>
            Careers
          </Menu.Item>
          <Menu.Item as='a'>
            <Button as='a' inverted onClick={() => setShowSidebar(false)}>
              Logg inn
            </Button>
          </Menu.Item>
          <Menu.Item as='a'>
            <Button as='a' inverted primary onClick={() => setShowSidebar(false)}>
              Registrer
            </Button>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default NavBar;
