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
        this.setLoadingInitial(true);
        try {
            const budgets = await agent.Budgets.list();
            runInAction(() => {
                budgets.forEach((budget: Budget) => {
                    this.budgetRegistry.set(budget.id, budget);
                });
                this.setLoadingInitial(false);
            });
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadBudget = async (id: string) => {
        let budget = this.getBudget(id);
        if (budget) {
            this.selectedBudget = budget;
            return budget;
        } else {
            this.setLoadingInitial(true);
            try {
                budget = await agent.Budgets.details(id);
                runInAction(() => {
                    this.setBudget(budget!);
                    this.selectedBudget = budget;
                    this.setLoadingInitial(false);
                });
                return budget;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
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

    private setBudget = (budget: Budget) => {
        this.budgetRegistry.set(budget.id, budget);
    }

    private getBudget = (id: string) => {
        return this.budgetRegistry.get(id);
    }

    createBudget = async (budget: Budget) => {
        this.loading = true;
        budget.id = uuid();
        console.log('Generated ID:', budget.id);
        try {
            await agent.Budgets.create(budget);
            runInAction(() => {
                this.budgetRegistry.set(budget.id, budget);
                this.selectedBudget = budget;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateBudget = async (budget: Budget) => {
        this.loading = true;
        try {
            await agent.Budgets.update(budget);
            runInAction(() => {
                this.budgetRegistry.set(budget.id, budget);
                this.selectedBudget = budget;
                this.editMode = false;
                this.loading = false;
            });
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
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}
