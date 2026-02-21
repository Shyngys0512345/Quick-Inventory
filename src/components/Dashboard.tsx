import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, Button } from './ui/Shared';
import { TrendingUp, TrendingDown, DollarSign, Package, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  const { sales, products, navigateTo } = useApp();

  // Calculate stats
  const totalIncome = sales.reduce((acc, sale) => acc + sale.total, 0);
  // Mock expense calculation (e.g., 60% of income + fixed costs)
  const totalExpenses = totalIncome * 0.6;
  const totalProfit = totalIncome - totalExpenses;
  const lowStockProducts = products.filter(p => p.stock < 10).length;

  const stats = [
    { label: 'Total Income', value: `$${totalIncome.toFixed(2)}`, icon: DollarSign, color: 'bg-green-100 text-green-600', trend: '+12.5%' },
    { label: 'Total Expenses', value: `$${totalExpenses.toFixed(2)}`, icon: TrendingDown, color: 'bg-red-100 text-red-600', trend: '-2.4%' },
    { label: 'Net Profit', value: `$${totalProfit.toFixed(2)}`, icon: TrendingUp, color: 'bg-blue-100 text-blue-600', trend: '+8.2%' },
    { label: 'Low Stock Items', value: lowStockProducts, icon: Package, color: 'bg-orange-100 text-orange-600', trend: 'Needs Attention' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Overview of your business performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigateTo('products')}>Manage Products</Button>
          <Button onClick={() => navigateTo('sales')}>New Sale</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trend.includes('+') ? 'bg-green-50 text-green-700' : stat.trend.includes('-') ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'}`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Sales</h3>
            <Button variant="ghost" size="sm" onClick={() => navigateTo('sales')}>View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Quantity</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {sales.slice(0, 5).map((sale) => (
                  <tr key={sale.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-gray-900 font-medium">{sale.productName}</td>
                    <td className="py-3 text-gray-600">{sale.quantity}</td>
                    <td className="py-3 text-gray-500">{new Date(sale.date).toLocaleDateString()}</td>
                    <td className="py-3 text-gray-900 font-medium text-right">${sale.total.toFixed(2)}</td>
                  </tr>
                ))}
                {sales.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">No sales recorded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button onClick={() => navigateTo('sales')} className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-md text-blue-600 group-hover:bg-blue-200">
                    <DollarSign size={18} />
                  </div>
                  <span className="font-medium text-gray-900">Record Sale</span>
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-500" />
              </div>
            </button>
            <button onClick={() => navigateTo('products')} className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-md text-purple-600 group-hover:bg-purple-200">
                    <Package size={18} />
                  </div>
                  <span className="font-medium text-gray-900">Add Product</span>
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-500" />
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-md text-green-600 group-hover:bg-green-200">
                    <Calendar size={18} />
                  </div>
                  <span className="font-medium text-gray-900">Close Day</span>
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-500" />
              </div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
