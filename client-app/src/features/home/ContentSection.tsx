import { Container, Header, Image, Grid, Button, Segment } from 'semantic-ui-react';
import BudgetForm from '../../app/form/BudgetForm';
import HeaderImg from '../../../public/assets/image.png';

const ContentSection = () => (
  <Segment style={{ padding: '8em 0em' }} vertical>
    <Container>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={10}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Help Companies and Companions
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We can give your company superpowers to do things that they never thought possible.
              Let us delight your customers and empower your needs... through pure data analytics.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Make Bananas That Can Dance
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes that's right, you thought it was the stuff of dreams, but even bananas can be
              bioengineered.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='medium' src={HeaderImg} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>Check Them Out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    <BudgetForm />
  </Segment>
);

export default ContentSection;
