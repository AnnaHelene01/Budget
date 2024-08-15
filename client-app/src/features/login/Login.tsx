import { Button, Form, Grid, Header, Image, Label, Message, Segment } from 'semantic-ui-react';
import budgetLogo from '../../../public/assets/logo-placeholder.png';
import { ErrorMessage, Formik } from 'formik';
import MyTextInput from '../../common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function Login() {
  const { userStore } = useStore();

  return (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' textAlign='center' style={{ color: '#1b1c1d' }}>
        <Image src={budgetLogo} /> Logg inn 
      </Header>
      <Formik 
           initialValues={{email: '', password: '', error: null}}
           onSubmit={(values, {setErrors}) => userStore.login(values).catch(() => 
              setErrors({error: 'Invalid email or password!'}))}
      >
      
          {({handleSubmit, isSubmitting, errors}) => (
              <Form size='large' onSubmit={handleSubmit} autoComplete='off'>
                  <Segment stacked>
                      <MyTextInput 
                          placeholder='E-mail addresse' 
                          name='email' 
                      />
                      <MyTextInput
                        placeholder='Passord'
                        type='password'
                        name='password'
                      />
                      <ErrorMessage
                        name='error' render={() => 
                        <Label style={{ marginBottom: 10}} basic color='red' content={errors.error} />} 
                      />
                      <Button 
                        loading={isSubmitting} 
                        fluid 
                        size='large' 
                        type='submit' 
                        style={{ backgroundColor: '#1b1c1d', color: 'white' 
                        }}>
                        Logg inn
                      </Button>
                  </Segment>
            </Form>
          )}

      </Formik>
      <Message>
        Er du ny? <a href='#'>Registrer</a>
      </Message>
    </Grid.Column>
  </Grid>
)

})
