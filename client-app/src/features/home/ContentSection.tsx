import { Container, Header, Image, Grid, Segment } from 'semantic-ui-react';
import BudgetForm from '../../app/form/BudgetForm';
import HeaderImg from '../../../public/assets/image.png';

const ContentSection = () => (
  <Segment style={{ padding: '8em 0em' }} vertical>
    <Container>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={10}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Din personlige økonomiske veileder
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            Med ØkonomiPilot kan du enkelt få full kontroll over din personlige økonomi. 
            Logg inn, legg inn dine inntekter og utgifter, og lag skreddersydde budsjetter 
            som hjelper deg å nå dine økonomiske mål. Alle dataene dine er trygt lagret 
            og kun tilgjengelig for deg. 
            Start din reise mot økonomisk frihet med ØkonomiPilot i dag!
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Hvordan det fungerer:
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            ØkonomiPilot gir deg en enkel og brukervennlig plattform hvor du kan holde oversikt 
            over alle dine økonomiske transaksjoner. Når du registrerer dine inntekter 
            og utgifter, vil verktøyet automatisk oppdatere dine budsjetter og gi deg en 
            tydelig oversikt over din økonomiske situasjon. 
            Med ØkonomiPilot får du detaljert innsikt i dine forbruksvaner, noe som gjør 
            det enklere å ta smarte økonomiske beslutninger.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='medium' src={HeaderImg} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    <BudgetForm />
  </Segment>
);

export default ContentSection;
