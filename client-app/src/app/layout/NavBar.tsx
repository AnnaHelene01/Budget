import { Menu, Container, Button } from 'semantic-ui-react';

interface NavBarProps {
  fixed: "right" | "left" | "top" | "bottom" | null;
}

const NavBar = ({ fixed }: NavBarProps) => (
  <Menu fixed={fixed || undefined} inverted={!fixed} pointing={!fixed} secondary={!fixed} size='large' style={{ backgroundColor: '#1b1c1d', padding: '1rem 3rem', margin: '0'  }}>
    <Container>
      <Menu.Item as='a' active >
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
      <Menu.Item position='right'>
        <Button as='a' inverted={!fixed}>
          Logg inn
        </Button>
        <Button as='a' inverted={!fixed} primary={fixed !== null} style={{ marginLeft: '0.5em' }}>
          Registrer
        </Button>
      </Menu.Item>
    </Container>
  </Menu>
);

export default NavBar;
