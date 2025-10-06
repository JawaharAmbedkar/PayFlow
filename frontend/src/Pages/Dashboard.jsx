import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Footer } from "../components/Footer";
import { API_URL } from "../../config";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [transactions, setTx] = useState([]);
  const [txPage, setTxPage] = useState(1);
  const [txTotalPages, setTxTotalPages] = useState(1);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/v1/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(await res.json());
    };
    fetchUser();
  }, []);

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API_URL}/api/v1/transaction?page=${txPage}&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setTx(data.transactions || []);
      setTxTotalPages(data.totalPages || 1);
    };
    fetchTransactions();
  }, [txPage]);

  // Delete transaction
  const deleteTransaction = async (txId) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axios.delete(`${API_URL}/api/v1/transaction/${txId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTx((prev) => prev.filter((t) => t._id !== txId));
      } catch (err) {
        console.error("Failed to delete transaction:", err);
        alert("Failed to delete transaction");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-50">
      <Appbar firstName={user?.firstName} />
      <div className="flex-1 mx-6 sm:mx-12 mt-8">
        {/* Balance */}
        <div className="flex justify-center">
          <Balance value={user?.balance || 0} />
        </div>
        

        {/* Transfer Money Button */}
        <div className="mb-6 flex justify-center sm:justify-start">
          <button
            onClick={() => navigate("/TransferMoney")}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full shadow-md hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 hover:shadow-lg"
          >
            💸 Transfer Money
          </button>
        </div>

        {/* Transactions Section */}
        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transactions</h2>
          <div className="space-y-3">
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <div
                  key={tx._id}
                  className="p-4 border rounded-lg flex justify-between items-center bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition"
                >
                  <div className="text-gray-700 text-sm sm:text-base">
                    <p><strong>From:</strong> {tx.from?.firstName} {tx.from?.lastName}</p>
                    <p><strong>To:</strong> {tx.to?.firstName} {tx.to?.lastName}</p>
                    <p><strong>Amount:</strong> ₹{tx.amount}</p>
                  </div>
                  <button
                    onClick={() => deleteTransaction(tx._id)}
                    className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-sm hover:from-red-600 hover:to-red-700 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No transactions found</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-6 ">
            <button
              disabled={txPage === 1}
              onClick={() => setTxPage(txPage - 1)}
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium shadow hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>
            <span className="text-gray-800 font-medium">
              Page {txPage} of {txTotalPages}
            </span>
            <button
              disabled={txPage === txTotalPages}
              onClick={() => setTxPage(txPage + 1)}
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium shadow hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>         
          </div>

          {/* About App Image */}
          <div className="mt-8 hidden sm:block ">
            <img
              src="/dashboard.jpg"
              alt="About App"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>

          <div className="mt-8 sm:hidden">
            <img
              src="/mobile.png"
              alt="About App"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
