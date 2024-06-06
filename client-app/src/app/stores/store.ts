import { createContext, useContext } from "react";
import BudgetStore from "./budgetStore";

interface Store {
    budgetStore: BudgetStore
}

export const store : Store = {
    budgetStore: new BudgetStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}