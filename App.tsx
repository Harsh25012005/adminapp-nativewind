import React, { useState } from 'react';
import "./global.css";
import Home from './components/Home';
import Tenant from './components/Tenant';
import Payment from './components/Payment';
import Room from './components/Room';
import More from './components/More';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onTabChange={setCurrentPage} />;
      case 'tenant':
        return <Tenant onTabChange={setCurrentPage} />;
      case 'payment':
        return <Payment onTabChange={setCurrentPage} />;
      case 'room':
        return <Room onTabChange={setCurrentPage} />;
      case 'more':
        return <More onTabChange={setCurrentPage} />;
      default:
        return <Home onTabChange={setCurrentPage} />;
    }
  };

  return renderCurrentPage();
}