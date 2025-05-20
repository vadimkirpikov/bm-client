import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MonthReport from "./MonthReport";
import FinalPortfolio from "./CheckBag";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path="/monthreport" element={<MonthReport />} />
                    <Route path="/" element={<App />} />
                    <Route path="/main" element={<App />} />
                    <Route path="/bag" element={<FinalPortfolio />} />
                </Routes>
            </Router>
        </ChakraProvider>
    </React.StrictMode>
);