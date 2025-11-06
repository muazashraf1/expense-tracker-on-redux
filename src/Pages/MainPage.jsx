import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIncome, addExpense } from "../actions/expense";

function MainPage() {
  const dispatch = useDispatch();
  const { income, expense } = useSelector((state) => state.expenses);

  console.log(income);
  

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  const [editIndex, setEditIndex] = useState(null);
  const [editType, setEditType] = useState(null);

  const handleSubmit = () => {
    if (!type || !category || !amount || !date) {
      alert("Please fill all fields!");
      return;
    }

    const newEntry = {
      category,
      amount: Number(amount),
      date,
    };

    if (editIndex !== null && editType === type) {
    
      if (type === "income") {
        const updatedList = [...incomeList];
        updatedList[editIndex] = newEntry;
        setIncomeList(updatedList);
      } else if (type === "expense") {
        const updatedList = [...expenseList];
        updatedList[editIndex] = newEntry;
        setExpenseList(updatedList);
      }
      setEditIndex(null);
      setEditType(null);
    } else {
      if (type === "income") {
        // dispatch(addIncome(Number(amount)));
        setIncomeList([...incomeList, newEntry]);
      } else if (type === "expense") {
        // dispatch(addExpense(Number(amount)));
        setExpenseList([...expenseList, newEntry]);
      }
    }

    setType("");
    setCategory("");
    setAmount("");
    setDate("");
  };

  const handleDelete = (index, listType) => {
    if (listType === "income") {
      const updated = [...incomeList];
      updated.splice(index, 1);
      setIncomeList(updated);
    } else {
      const updated = [...expenseList];
      updated.splice(index, 1);
      setExpenseList(updated);
    }
  };

  const handleEdit = (index, listType) => {
    const item =
      listType === "income" ? incomeList[index] : expenseList[index];
    setType(listType);
    setCategory(item.category);
    setAmount(item.amount);
    setDate(item.date);
    setEditIndex(index);
    setEditType(listType);
  };

  const balance = income - expense;

  return (
    <div className="min-h-screen bg-[url('/bg-image.png')] bg-cover flex items-center justify-center">
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl px-4 py-10">

        <div className="bg-white rounded-2xl shadow-md p-6 w-full sm:w-80 text-center border-b-4 border-green-400">
          <h2 className="text-2xl font-semibold mb-2">Income</h2>
          <p className="text-3xl font-bold text-gray-700 mb-4">${income}</p>

          <div className="text-left space-y-2 max-h-48 overflow-y-auto">
            {incomeList.length === 0 ? (
              <p className="text-sm text-gray-400">No income entries yet</p>
            ) : (
              incomeList.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border border-gray-200 rounded-lg px-3 py-2 bg-green-50"
                >
                  <span className="text-sm text-gray-700">
                    <strong>{item.category}</strong> — ${item.amount} — {item.date}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleDelete(index, "income")}
                      className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(index, "income")}
                      className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 w-full sm:w-[420px] text-center">
          <h2 className="text-2xl font-bold mb-2">Expense Tracker</h2>
          <h3 className="text-xl font-semibold text-gray-600 mb-6">
            Total Balance ${balance}
          </h3>

          <div className="space-y-4 text-left">
            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-500">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Select Type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm text-gray-500">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  {type === "expense" ? (
                    <>
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Bills">Bills</option>
                    </>
                  ) : type === "income" ? (
                    <>
                      <option value="Salary">Salary</option>
                      <option value="Bonus">Bonus</option>
                      <option value="Interest">Interest</option>
                      <option value="Investment">Investment</option>
                    </>
                  ) : null}
                </select>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-500">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm text-gray-500">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors mt-4"
            >
              {editIndex !== null ? "Update Entry" : "Create Entry"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 w-full sm:w-80 text-center border-b-4 border-red-400">
          <h2 className="text-2xl font-semibold mb-2">Expense</h2>
          <p className="text-3xl font-bold text-gray-700 mb-4">${expense}</p>

          <div className="text-left space-y-2 max-h-48 overflow-y-auto">
            {expenseList.length === 0 ? (
              <p className="text-sm text-gray-400">No expense entries yet</p>
            ) : (
              expenseList.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border border-gray-200 rounded-lg px-3 py-2 bg-red-50"
                >
                  <span className="text-sm text-gray-700">
                    <strong>{item.category}</strong> — ${item.amount} — {item.date}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleDelete(index, "expense")}
                      className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(index, "expense")}
                      className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;


