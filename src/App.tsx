import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Catalog } from './components/Catalog';
import { Orders } from './components/Orders';
import { AgentsHub } from './components/AgentsHub';
import { Analytics } from './components/Analytics';
import { MakerAPIDashboard } from './components/MakerAPIDashboard';
import { MakerAPIModal } from './components/MakerAPIModal';
import { OnboardingModal } from './components/OnboardingModal';
import { AuthProvider } from '../lib/auth/AuthContext';
import { mockUserProfiles, mockProducts, mockOrders, mockAgentTasks } from './data/mockData';
import { UserProfile, ProductCatalogItem, Order, AgentTask, ApiKey } from '../types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(mockUserProfiles[0]);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [products, setProducts] = useState<ProductCatalogItem[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>(mockAgentTasks);

  const [selectedProductForOrder, setSelectedProductForOrder] = useState<ProductCatalogItem | null>(null);

  // Modal state
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [apiModalKey, setApiModalKey] = useState<ApiKey | null>(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const handleAddNewProduct = (newProd: ProductCatalogItem) => {
    setProducts([newProd, ...products]);
  };

  const handleCreateOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
  };

  const handleAddTask = (newTask: AgentTask) => {
    setAgentTasks([newTask, ...agentTasks]);
  };

  const openApiModal = (key?: ApiKey) => {
    setApiModalKey(key ?? null);
    setApiModalOpen(true);
  };

  return (
    <AuthProvider fallbackUser={currentUser}>
      <div className="min-h-screen bg-[#171717] text-white flex flex-col">
        <Header
          currentUser={currentUser}
          onSwitchUser={setCurrentUser}
          allUsers={mockUserProfiles}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenApiModal={() => openApiModal()}
          onOpenOnboarding={() => setOnboardingOpen(true)}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {activeTab === 'dashboard' && (
            <Dashboard
              currentUser={currentUser}
              products={products}
              orders={orders}
              agentTasks={agentTasks}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'catalog' && (
            <Catalog
              products={products}
              currentUser={currentUser}
              onOpenOrderModal={(prod) => {
                setSelectedProductForOrder(prod);
                setActiveTab('orders');
              }}
              onAddNewProduct={handleAddNewProduct}
            />
          )}

          {activeTab === 'orders' && (
            <Orders
              orders={orders}
              products={products}
              currentUser={currentUser}
              onCreateOrder={handleCreateOrder}
              selectedProductForOrder={selectedProductForOrder}
              onCloseOrderModal={() => setSelectedProductForOrder(null)}
            />
          )}

          {activeTab === 'agents' && (
            <AgentsHub
              tasks={agentTasks}
              onAddTask={handleAddTask}
            />
          )}

          {activeTab === 'analytics' && (
            <Analytics
              orders={orders}
              products={products}
            />
          )}

          {activeTab === 'api' && (
            <MakerAPIDashboard onOpenModal={openApiModal} />
          )}
        </main>

        {/* Maker API Modal */}
        <MakerAPIModal
          isOpen={apiModalOpen}
          onClose={() => { setApiModalOpen(false); setApiModalKey(null); }}
          apiKey={apiModalKey}
        />

        {/* Onboarding / Help Modal */}
        <OnboardingModal
          isOpen={onboardingOpen}
          onClose={() => setOnboardingOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}
