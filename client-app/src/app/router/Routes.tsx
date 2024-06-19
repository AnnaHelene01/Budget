import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import BudgetList from "../../features/budgets/BudgetList";
import BudgetDetails from "../../features/details/BudgetDetails";
import LoginForm from "../../features/login/Login";
import RegisterForm from "../../features/register/Register";
import BudgetForm from "../form/BudgetForm";
import About from "../../features/about/About";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'budget', element: <BudgetList /> },
            {path: 'budget/:id', element: <BudgetDetails /> },
            {path: 'createBudget', element: <BudgetForm key='create' /> },
            {path: 'manage/:id', element: <BudgetForm key='manage' /> },
            {path: 'about', element: <About /> },
            {path: 'login', element: <LoginForm /> },
            {path: 'register', element: <RegisterForm /> },
        ]
    }
]

export const router = createBrowserRouter(routes);