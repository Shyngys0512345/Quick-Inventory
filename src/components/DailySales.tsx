import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Card, Button, Input } from './ui/Shared';
import { ShoppingCart, Plus, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export const DailySales: React.FC = () => {
  const { products, sales, addSale } = useApp();
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [successMsg, setSuccessMsg] = useState('');

  // Get today's sales
  const today = new Date().toDateString();
  const todaysSales = sales.filter(s => new Date(s.date).toDateString() === today);
  
  const dailyTotal = todaysSales.reduce((sum, s) => sum + s.total, 0);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    if (quantity > selectedProduct.stock) {
      alert('Insufficient stock!');
      return;
    }

    addSale({
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity: quantity,
      total: quantity * selectedProduct.sellPrice
    });

    setSuccessMsg(`Sold ${quantity} x ${selectedProduct.name}`);
    setTimeout(() => setSuccessMsg(''), 3000);
    
    // Reset
    setSelectedProductId('');
    setQuantity(1);
  };

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daily Sales</h1>
          <p className="text-gray-500">Record transactions and track daily revenue</p>
        </div>
        <div className="bg-green-100 px-4 py-2 rounded-lg border border-green-200">
          <span className="text-xs text-green-800 font-bold uppercase tracking-wider">Today's Revenue</span>
          <div className="text-xl font-bold text-green-700">${dailyTotal.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 border-t-4 border-t-blue-600">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShoppingCart size={20} className="text-blue-600" /> New Transaction
            </h3>
            
            <form onSubmit={handleAddSale} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Select Product</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  required
                >
                  <option value="">-- Choose a product --</option>
                  {sortedProducts.map(p => (
                    <option key={p.id} value={p.id} disabled={p.stock === 0}>
                      {p.name} (${p.sellPrice}) {p.stock === 0 ? '- Out of Stock' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-gray-50 p-3 rounded-lg text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">${selectedProduct.sellPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Stock:</span>
                    <span className={`font-medium ${selectedProduct.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                      {selectedProduct.stock}
                    </span>
                  </div>
                </motion.div>
              )}

              <Input 
                label="Quantity" 
                type="number" 
                min="1" 
                max={selectedProduct?.stock || 100}
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value))} 
                disabled={!selectedProductId}
              />

              <div className="pt-2">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-900 font-bold">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${(quantity * (selectedProduct?.sellPrice || 0)).toFixed(2)}
                  </span>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={!selectedProductId || (selectedProduct?.stock || 0) < quantity}>
                  Confirm Sale
                </Button>
              </div>
            </form>

            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-green-50 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-medium"
              >
                <CheckCircle size={16} /> {successMsg}
              </motion.div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Today's Transactions</h3>
              <Button variant="secondary" size="sm">Export Report</Button>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-sm text-gray-500 sticky top-0 bg-white">
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium text-center">Qty</th>
                    <th className="pb-3 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {todaysSales.map((sale) => (
                    <tr key={sale.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-3 text-gray-500">{new Date(sale.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                      <td className="py-3 text-gray-900 font-medium">{sale.productName}</td>
                      <td className="py-3 text-gray-600 text-center">{sale.quantity}</td>
                      <td className="py-3 text-gray-900 font-bold text-right">${sale.total.toFixed(2)}</td>
                    </tr>
                  ))}
                  {todaysSales.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-gray-400 flex flex-col items-center gap-2">
                        <ShoppingCart size={48} className="opacity-20" />
                        <p>No sales recorded today yet.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {todaysSales.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                 <Button variant="danger">Close Day & Reset</Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
