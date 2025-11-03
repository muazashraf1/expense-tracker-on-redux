export const addIncome = (amount) => {
    return {type: "ADD_INCOME", payload: Number(amount)};
};

export const addExpense = (amount) => {
    return {type: "ADD_EXPENSE", payload: Number(amount)}
};