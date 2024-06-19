import { createContext, useContext } from "react";
import BudgetStore from "./budgetStore";
import CommonStore from "./commonStore";

interface Store {
    budgetStore: BudgetStore;
    commonStore: CommonStore;
}

export const store : Store = {
    budgetStore: new BudgetStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}   