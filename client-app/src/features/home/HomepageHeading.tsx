import { Container, Header, Button, Icon } from 'semantic-ui-react';
import '../../App.css';

interface Props {
  mobile: any;
}

const HomepageHeading = ({ mobile }: Props) => (
  <Container fluid textAlign='center' style={{ backgroundColor: '#1b1c1d', padding: '3rem 0', color: 'white' }}>
    <Header
      as='h1'
      content='Få kontroll på økonomien'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: '0',
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Bli din beste ØkonomiPilot'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      Kom i gang!
      <Icon />
    </Button>
  </Container>
);

export default HomepageHeading;
