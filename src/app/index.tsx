import React, { useState } from 'react';
import "../../global.css";
import Home from './screens/Home';
import Tenant from './screens/Tenant';
import Payment from './screens/Payment';
import Room from './screens/Room';
import ComplaintsManagement from './screens/ComplaintsManagement';
import MealsManagement from './screens/MealsManagement';
import NoticesManagement from './screens/NoticesManagement';
import More from './screens/More';
import type { TabType } from '~/types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<TabType>('home');

  const handleTabChange = (tab: TabType) => {
    setCurrentPage(tab);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onTabChange={handleTabChange} />;
      case 'tenant':
        return <Tenant onTabChange={handleTabChange} />;
      case 'room':
        return <Room onTabChange={handleTabChange} />;
      case 'complaints':
        return <ComplaintsManagement onTabChange={handleTabChange} />;
      case 'meals':
        return <MealsManagement onTabChange={handleTabChange} />;
      case 'notices':
        return <NoticesManagement onTabChange={handleTabChange} />;
      case 'payment':
        return <Payment onTabChange={handleTabChange} />;
      case 'more':
        return <More onTabChange={handleTabChange} />;
      default:
        return <Home onTabChange={handleTabChange} />;
    }
  };

  return renderCurrentPage();
}

