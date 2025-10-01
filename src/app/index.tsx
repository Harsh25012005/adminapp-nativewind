import React, { useState } from 'react';
import "~/global.css";
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

