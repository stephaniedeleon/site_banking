import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import TransactionDetail from "../TransactionDetail/TransactionDetail";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import "./App.css";

export default function App() {

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [filterInputValue, setFilterInputValue] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {

    setIsFetching(true);

    const fetchTransactions = async () => {
      try {

        const res = await axios.get("http://localhost:3001/bank/transactions");
        const transactions = res?.data?.transactions;

        if(transactions) {
          setTransactions(transactions);
        }


      } catch(err) {
        console.log(err);
        setError(err);
      }
    }

    const fetchTranfers = async () => {
      try {

        const res = await axios.get("http://localhost:3001/bank/transfers");
        const transfers = res?.data?.transfers;

        if(transfers) {
          setTransfers(transfers);
        }

        console.log(transfers)

      } catch(err) {
        console.log(err);
        setError(err);
      }
    }

    fetchTransactions();
    fetchTranfers();
    setIsFetching(false);

  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home transactions={transactions} transfers={transfers} />} />
          <Route path="/bank/transactions/:transactionId" element={<TransactionDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
