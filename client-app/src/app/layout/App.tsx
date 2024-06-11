import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import HomepageHeading from '../../features/home/HomepageHeading';
import ContentSection from '../../features/home/ContentSection';
import LoginForm from '../../features/login/Login';
import RegisterForm from '../../features/register/Register';
import BudgetDetails from '../../features/details/BudgetDetails';
import { useEffect, useState } from "react";
import axios from "axios";
import { Budget } from '../models/budget';
import BudgetForm from '../form/BudgetForm';
import BudgetList from '../../features/budgets/BudgetList';

function App() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>(undefined);

  useEffect(() => {
    axios.get<Budget[]>('http://localhost:5000/api/budget')
      .then(response => {
        setBudgets(response.data);
      })
      .catch(error => {
        console.error("Error fetching budgets:", error);
      });
  }, []);

  function handleSelectBudget(id: string) {
    setSelectedBudget(budgets.find(x => x.id === id));
  }

  //function handleCancelSelect() {
  //  setSelectedBudget(undefined);
  //}

  function handleDeleteBudget(id: string) {
    setBudgets(budgets.filter(b => b.id !== id));
  }


 

  return (
    <Router>
    <NavBar fixed={null} />
    <Routes>
      <Route path="/" element={
        <HomePage
          selectedBudget={selectedBudget}
        />
      } />
      <Route path="/budget" element={
        <BudgetList 
          budgets={budgets}
          selectedBudget={selectedBudget}
          selectBudget={handleSelectBudget}
          deleteBudget={handleDeleteBudget}
        />
      } />
      <Route path="/budget/:id" element={
        selectedBudget && 
        <BudgetDetails 
          budget={selectedBudget}
          cancelSelectBudget={() => setSelectedBudget(undefined)}
        />
      } /> 
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  </Router>
  );
}

interface HomePageProps {
  selectedBudget: Budget | undefined;
}

const HomePage = ({ selectedBudget }: HomePageProps) => (
  <>
    <HomepageHeading mobile={false} />
    <ContentSection />
    <BudgetForm 
      budget={selectedBudget}
    />
  </>
);

export default App;
