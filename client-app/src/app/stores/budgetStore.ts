import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { Budget } from "../models/budget";

export default class BudgetStore {
    budgetRegistry = new Map<string, Budget>();
    selectedBudget: Budget | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadBudgets = async () => {
        try {
             const budgets = await agent.Budgets.list();
             budgets.forEach((budget: Budget) => {
                this.budgetRegistry.set(budget.id, budget);
             })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectBudget = (id: string) => {
        this.selectedBudget = this.budgetRegistry.get(id);
    }

    cancelSelectBudget = () => {
        this.selectedBudget = undefined;
    }


    createBudget = async (budget: Budget) => {
        this.loading = true;
        budget.id = uuid();
        try {
            await agent.Budgets.create(budget);
            runInAction(() => {
                this.budgetRegistry.set(budget.id, budget)
                this.selectedBudget = budget;
                this.editMode = false;
                this.loading = false;
            })
            
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateBudget = async (budget: Budget) => {
        this.loading = true;
        try {
            await agent.Budgets.update(budget)
            runInAction(() => {
                this.budgetRegistry.set(budget.id, budget)
                this.selectedBudget = budget;
                this.editMode = false;
                this.loading = false;
            })
            
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    deleteBudget = async (id: string) => {
        this.loading = true;
        try {
            await agent.Budgets.delete(id);
            runInAction(() => {
                this.budgetRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}

