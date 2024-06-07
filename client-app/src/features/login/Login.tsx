import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import budgetLogo from '../../../public/assets/logo-placeholder.png';

const LoginForm = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' textAlign='center' style={{ color: '#1b1c1d' }}>
        <Image src={budgetLogo} /> Logg inn 
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail addresse' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Passord'
            type='password'
          />

          <Button fluid size='large' style={{ backgroundColor: '#1b1c1d', color: 'white' }}>
            Logg inn
          </Button>
        </Segment>
      </Form>
      <Message>
        Er du ny? <a href='#'>Registrer</a>
      </Message>
    </Grid.Column>
  </Grid>
)

export default LoginForm