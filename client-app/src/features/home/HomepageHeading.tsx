import { Container, Header, Button, Icon } from 'semantic-ui-react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';

interface Props {
  mobile: any;
}

export default observer(function HomepageHeading(mobile: Props) {
  const { userStore } = useStore(); 

  return (
  <Container fluid textAlign='center' style={{ backgroundColor: '#1b1c1d', padding: '9rem 0', color: 'white' }}>
    <Header
      as='h1'
      content='Få kontroll på økonomien med ØkonomiPilot!'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: '0',
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    {userStore.isLoggedIn ? (
        <>
        <Button primary size='huge' as={Link} to={`/budget`} style={{ marginTop: '4rem'}}>
             Gå til mine budsjetter!
            <Icon name='arrow right'/>
        </Button>
        </>
    ) : (
        <Button primary size='huge' as={Link} to={`/login`}>
            Logg inn!
            <Icon name='arrow right'/>
        </Button>
    )}
 
  </Container>
)
})