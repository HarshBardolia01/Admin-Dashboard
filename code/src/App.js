import './App.css';
import React from 'react';
import Header from './components/Header.js';
import Dashboard from './components/Dashboard.js';
import Footer from './components/Footer.js';

function App() {
    return (
        <div className="App">
            <Header />
            <Dashboard />
            <Footer />
        </div>
    );
}

export default App;
