import { createContext, useContext } from "react";
import BudgetStore from "./budgetStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store {
    budgetStore: BudgetStore;
    commonStore: CommonStore;
    userStore: UserStore;
}

export const store : Store = {
    budgetStore: new BudgetStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}   