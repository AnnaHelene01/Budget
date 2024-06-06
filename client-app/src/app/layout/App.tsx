import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import HomepageHeading from '../../features/home/HomepageHeading';
import ContentSection from '../../features/home/ContentSection';

const App = () => (
  <Router>
    <NavBar fixed={null} />
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Legg til andre ruter her hvis du har flere sider */}
    </Routes>
  </Router>
);

const HomePage = () => (
  <>
    <HomepageHeading mobile={false} />
    <ContentSection />
    {/* Legg til andre seksjoner her hvis nødvendig */}
  </>
);

export default App;
