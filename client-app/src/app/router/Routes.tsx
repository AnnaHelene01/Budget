import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import BudgetList from "../../features/budgets/BudgetList";
import BudgetDetails from "../../features/details/BudgetDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'budget', element: <BudgetList /> },
            {path: 'budget/:id', element: <BudgetDetails /> },
        ]
    }
]

export const router = createBrowserRouter(routes);