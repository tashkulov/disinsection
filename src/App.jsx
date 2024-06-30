import './App.css';
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram.js";
import Header from "./components/Header/Header.jsx";
import { Route, Routes } from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList.jsx";
import Form from "./components/Form/Form.jsx";
import MastersStat from "./pages/MastersStat/MasterStat.jsx";
import CitiesStat from "./pages/CitiesStat/CitiesStat.jsx";
import UnclaimedOrders from "./pages/UnclaimedOrders/UnclaimedOrders.jsx";
import OrdersInProgress from "./pages/OrdersInProgress/OrdersInProgress.jsx";

function App() {
    const { tg } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, []);

    return (
        <div>
            <Header />
            <Routes>
                <Route index element={<ProductList />} />
                <Route path="form" element={<Form />} />
                <Route path="my-masters" element={<MastersStat />} />
                <Route path="my-cities" element={<CitiesStat />} />
                <Route path="unclaimed-orders" element={<UnclaimedOrders />} />
                <Route path="orders-in-progress" element={<OrdersInProgress/>} />
            </Routes>
        </div>
    );
}

export default App;
