import { makeObservable, observable } from "mobx";

export default class BudgetStore {
    title = 'Hello from MobX!';

    constructor() {
        makeObservable(this, {
            title: observable
        })
    }
}