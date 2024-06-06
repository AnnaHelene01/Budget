import { Container, Header, Button, Icon } from 'semantic-ui-react';

interface Props {
    mobile: any;
}

const HomepageHeading = ({ mobile }: Props) => (
  <Container fluid textAlign='center' style={{ backgroundColor: '#1b1c1d', padding: '3rem 0', color: 'white', marginBottom: '0rem' }}>
    <Header
      as='h1'
      content='Få kontroll på økonomien!'
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
      content='Do whatever you want when you want to.'
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
