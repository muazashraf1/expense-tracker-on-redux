import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addExpense, addIncome } from '../actions/expense';

function MainPage() {

    const dispatch = useDispatch();
    const { expense, income } = useSelector((state) => state.expenses);
    console.log("Expense is:", expense);
    console.log("Income is:", income);

    const [rupee, setRupee] = useState("");
    const [type, setType] = useState("");



    const handleCreate = () => {
        if (!type || !rupee) {
            alert("Please enter your type & amount!")
        }

        if(type === "income") {
            dispatch(addIncome(rupee))
        } else if (type === "expense") {
            dispatch(addExpense(rupee))
        }

        setRupee("");
        setType("");
    }

    const totalBalance = income - expense
    return (
        <div className="min-h-screen bg-[url('/bg-image.png')] bg-cover flex items-center justify-center">

            <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl px-4 py-10 border">

                <div className="bg-white rounded-2xl shadow-md p-6 w-full sm:w-80 text-center border-b-4 border-green-400">
                    <h2 className="text-2xl font-semibold mb-2">Income</h2>
                    <p className="text-3xl font-bold text-gray-700">${income}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-8 w-full sm:w-[420px] text-center">
                    <h2 className="text-2xl font-bold mb-2">Expense Tracker</h2>
                    <h3 className="text-xl font-semibold text-gray-600 mb-6">
                        Total Balance $ {totalBalance}
                    </h3>

                    <div className="space-y-4 text-left">

                        <div>
                            <label className="block text-sm text-gray-500">Type</label>
                            <select onChange={(e) => setType(e.target.value)} value={type} className="w-full border border-gray-300 rounded-lg p-2 mt-1">
                                <option value="">Select Type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-500">Amount</label>
                            <input type="number" value={rupee} onChange={(e) => setRupee(e.target.value)} placeholder='Enter amount' className='w-full border border-gray-300 rounded-lg p-2 mt-1' />
                        </div>

                        <button onClick={handleCreate} className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">CREATE</button>


                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 w-full sm:w-80 text-center border-b-4 border-red-400">
                    <h2 className="text-2xl font-semibold mb-2">Expense</h2>
                    <p className="text-3xl font-bold text-gray-700">${expense}</p>
                </div>

            </div>

        </div>
    )
}

export default MainPage