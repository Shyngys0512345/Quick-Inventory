import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { LoginPage, SignupPage } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { ProductManagement } from './components/ProductManagement';
import { DailySales } from './components/DailySales';
import { ProfilePage } from './components/ProfilePage';

const AppContent: React.FC = () => {
  const { currentPage, user } = useApp();

  if (!user) {
    if (currentPage === 'signup') {
      return <SignupPage />;
    }
    return <LoginPage />;
  }

  return (
    <Layout>
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'products' && <ProductManagement />}
      {currentPage === 'sales' && <DailySales />}
      {currentPage === 'profile' && <ProfilePage />}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
