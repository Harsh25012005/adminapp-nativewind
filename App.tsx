import React, { useState } from 'react';
import "./global.css";
import Home from './components/Home';
import Tenant from './components/Tenant';
import Payment from './components/Payment';
import Room from './components/Room';
import ComplaintsManagement from './components/ComplaintsManagement';
import MealsManagement from './components/MealsManagement';
import NoticesManagement from './components/NoticesManagement';
import More from './components/More';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onTabChange={setCurrentPage} />;
      case 'tenant':
        return <Tenant onTabChange={setCurrentPage} />;
      case 'room':
        return <Room onTabChange={setCurrentPage} />;
      case 'complaints':
        return <ComplaintsManagement onTabChange={setCurrentPage} />;
      case 'meals':
        return <MealsManagement onTabChange={setCurrentPage} />;
      case 'notices':
        return <NoticesManagement onTabChange={setCurrentPage} />;
      case 'payment':
        return <Payment onTabChange={setCurrentPage} />;
      case 'more':
        return <More onTabChange={setCurrentPage} />;
      default:
        return <Home onTabChange={setCurrentPage} />;
    }
  };

  return renderCurrentPage();
}