import { useState, useEffect } from "react";
import { Heading } from "../components/Heading";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../components/styles/loading.css";
import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import { API_URL } from "../../config";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(0);

  // Fetch current user balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/v1/account/balance`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        setBalance(data.balance);
      } catch (err) {
        console.error("Error fetching balance", err);
      }
    };
    fetchBalance();
  }, []);

  const handleTransfer = async () => {
    setError(""); // reset previous error

    // Validation
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid number");
      return;
    }

    if (amount <= 0) {
      setError("Amount must be greater than zero");
      return;
    }

    if (amount > balance) {
      setError("You don't have sufficient balance");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/api/v1/account/transfer`,
        { to: id, amount: Number(amount)  },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );

      setSuccess(true);
      setBalance((prev) => prev - amount); // update local balance
      setTimeout(resetForm, 2000);
    } catch (error) {
      console.error("Transaction failed:", error);
      setError(error?.response?.data?.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };


  const resetForm = () => {
    setAmount(0);
    setSuccess(false);
    setError("");
  };

  return (
    <div>
      <Appbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-300">
        {!loading && !success && (
          <div className="p-4 w-96 rounded-md ring-1 ring-slate-200 shadow-xl bg-slate-100">
            <Heading label={"Send Money"} />
            <div className="flex items-center mt-20">
              <div className="bg-green-400 rounded-full w-11 h-11 flex justify-center items-center text-2xl text-white">
                {name[0].toUpperCase()}
              </div>
              <div className="font-medium text-2xl m-3">{name}</div>
            </div>

            <p className="font-medium text-lg">Amount (in Rs)</p>
            <input
              value={amount}
              onChange={(e) => {
                const val = e.target.value.trim();

                // allow empty input
                if (val === "") {
                  setAmount("");
                  setError("");
                  return;
                }

                const numericVal = Number(val);

                // check if it’s a valid number
                if (isNaN(numericVal)) {
                  setError("Please enter a valid number");
                  return;
                }

                // check for zero or negative
                if (numericVal <= 0) {
                  setError("Amount must be greater than 0");
                } else {
                  setError("");
                }

                setAmount(val); // keep as string while typing
              }}
              type="number"
              placeholder="Enter amount"
              className="w-full shadow-2xl p-1 ring-1 ring-gray-200 rounded-md font-medium text-base hover:bg-gray-300 mt-2"
            />
            {error && <p className="text-red-600 mt-2">{error}</p>}

            {error && <p className="text-red-600 mt-2">{error}</p>}

            {error && <p className="text-red-600 mt-2">{error}</p>} {/* show errors */}

            <button
              onClick={handleTransfer}
              disabled={!amount || amount <= 0 || amount > balance}
              className={`bg-green-400 rounded-md w-full h-9 mt-5 mb-3 text-white font-medium text-lg hover:bg-green-600 ${(!amount || amount <= 0 || amount > balance) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Initiate Transfer
            </button>

          </div>
        )}

        {loading && (
          <div className="p-4 w-96 rounded-md ring-1 ring-slate-200 shadow-xl bg-slate-100">
            <div className="flex items-center justify-center">
              <div className="loader"></div>
            </div>
            <p className="text-2xl font-medium text-center">Transaction in progress...</p>
          </div>
        )}

        {success && (
          <div className="p-4 w-96 rounded-md ring-1 ring-slate-200 shadow-xl bg-slate-100">
            <p className="text-2xl font-medium text-center">Transaction successful!</p>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};
