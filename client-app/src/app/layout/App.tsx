import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import HomepageHeading from '../../features/home/HomepageHeading';
import ContentSection from '../../features/home/ContentSection';
import LoginForm from '../../features/login/Login';
import RegisterForm from '../../features/register/Register';
import BudgetDetails from '../../features/details/BudgetDetails';
import BudgetDashboard from '../../features/dashboard/BudgetDashboard';
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from 'uuid';
import { Budget } from '../models/budget';

function App() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Budget[]>('http://localhost:5000/api/budget')
      .then(response => {
        //console.log("Budgets fetched successfully:", response.data);
        setBudgets(response.data);
      })
      .catch(error => {
        console.error("Error fetching budgets:", error);
      });
  }, []);

  function handleSelectBudget(id: string) {
    setSelectedBudget(budgets.find(x => x.id === id));
    // Navigerer til detaljsiden for budsjettet
  }

  function handleCancelSelect() {
    setSelectedBudget(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectBudget(id) : handleCancelSelect();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleDeleteBudget(id: string) {
    setBudgets(budgets.filter(b => b.id !== id));
  }

  function handleCreateOrEditBudget(budget: Budget) {
    if (budget.id) {
      setBudgets([...budgets.filter(x => x.id !== budget.id), budget]);
    } else {
      setBudgets([...budgets, { ...budget, id: uuid() }]);
    }
    setEditMode(false);
    setSelectedBudget(budget);
  }

  return (
    <Router>
      <NavBar fixed={null} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/budget" element={
          <BudgetDashboard 
            budgets={budgets}
            selectedBudget={selectedBudget}
            selectBudget={handleSelectBudget}
            editMode={editMode}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditBudget}
            deleteBudget={handleDeleteBudget}
          />
        } />
        <Route path="/budget/:id" element={
          selectedBudget && 
          <BudgetDetails 
            budget={selectedBudget}
            cancelSelectBudget={handleCancelSelect}
            openForm={handleFormOpen}
          />
        } /> 
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

const HomePage = () => (
  <>
    <HomepageHeading mobile={false} />
    <ContentSection />
  </>
);

export default App;
