import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import HomepageHeading from '../../features/home/HomepageHeading';
import ContentSection from '../../features/home/ContentSection';
import LoginForm from '../../features/login/Login';
import RegisterForm from '../../features/register/Register';
import DisplayBudget from '../../features/budgets/DisplayBudget';
import BudgetDetails from '../../features/details/BudgetDetails';

const App = () => (
  <Router>
    <NavBar fixed={null} />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/budgets" element={<DisplayBudget />} />
      <Route path="/budgets/:id" element={<BudgetDetails />} /> 
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
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
