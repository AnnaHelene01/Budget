import { Container, Header, Segment, Grid, Icon } from "semantic-ui-react";

export default function About() {
    return (
        <Container>
            <Header as='h1' textAlign="center" style={{ marginTop: '5em', marginBottom: '2em' }}>
                Om oss
            </Header>

            <Segment style={{ padding: '4em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as='h2'>Vår Historie</Header>
                            <p>
                                Vi startet vårt selskap med en enkel visjon: å gjøre økonomisk planlegging enklere og mer tilgjengelig for alle. 
                                Gjennom årene har vi vokst og utviklet oss, men vår grunnleggende forpliktelse til våre kunders økonomiske velvære har forblitt uforandret.
                            </p>
                        </Grid.Column>
                        <Grid.Column floated='right' width={6} textAlign='center'>
                            <Icon name='history' size='huge' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: '4em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column floated='left' width={6} textAlign='center'>
                            <Icon name='users' size='huge' />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as='h2'>Vårt Team</Header>
                            <p>
                                Vårt team består av engasjerte og erfarne fagfolk innen økonomi og teknologi. Vi jobber sammen for å utvikle innovative løsninger som 
                                hjelper våre brukere med å administrere sine personlige budsjetter og økonomiske mål.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: '4em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as='h2'>Vår Misjon</Header>
                            <p>
                                Vår misjon er å gi brukerne våre verktøyene de trenger for å oppnå økonomisk suksess. Vi tror at ved å tilby brukervennlige og 
                                effektive løsninger, kan vi bidra til å forbedre livskvaliteten for folk over hele verden.
                            </p>
                        </Grid.Column>
                        <Grid.Column floated='right' width={6} textAlign='center'>
                            <Icon name='target' size='huge' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: '4em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column floated='left' width={6} textAlign='center'>
                            <Icon name='phone' size='huge' />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as='h2'>Kontakt oss</Header>
                            <p>
                                Vi vil gjerne høre fra deg! Hvis du har spørsmål, tilbakemeldinger eller ønsker å komme i kontakt med oss, vennligst send en e-post til 
                                kontakt@eksempel.com eller ring oss på +47 123 45 678.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    );
};
