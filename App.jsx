import { useState } from 'react';

const MENU_ITEMS = [
  { id: '1', name: 'Cheese Burger', price: 150 },
  { id: '2', name: 'Margherita Pizza', price: 299 },
  { id: '3', name: 'French Fries', price: 90 },
  { id: '4', name: 'Cold Coffee', price: 80 }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState('1');
  const [activeOrders, setActiveOrders] = useState([]);
  const [selectedBillOrder, setSelectedBillOrder] = useState(null);

  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const existing = cart.find(i => i.id === id);
    if (!existing) return;
    if (existing.quantity === 1) {
      setCart(cart.filter(i => i.id !== id));
    } else {
      setCart(cart.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return alert("Cart khali hai!");
    const newOrder = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      tableNumber: tableNumber,
      items: [...cart],
      totalAmount: cartTotal,
      createdAt: new Date().toLocaleTimeString()
    };
    setActiveOrders([newOrder, ...activeOrders]);
    setCart([]);
    alert("Table " + tableNumber + " ke liye order place ho gaya hai!");
  };

  const openBillModal = (order) => {
    const subTotal = order.totalAmount;
    const tax = parseFloat((subTotal * 0.05).toFixed(2));
    const grandTotal = subTotal + tax;
    setSelectedBillOrder({ ...order, subTotal, tax, grandTotal });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#2563eb', color: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>TechnoCart POS System Dashboard</h1>
      </header>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Menu list */}
        <div style={{ flex: 2, backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2>Menu List</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {MENU_ITEMS.map(item => (
              <div key={item.id} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                  <p style={{ margin: 0, color: 'green', fontWeight: 'bold' }}>INR {item.price}</p>
                </div>
                <button onClick={() => addToCart(item)} style={{ padding: '6px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+ Add</button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart panel */}
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2>Current Cart</h2>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>CHOOSE TABLE</label>
            <select value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px' }}>
              <option value="1">Table 01</option>
              <option value="2">Table 02</option>
              <option value="3">Table 03</option>
            </select>
          </div>

          <div style={{ minHeight: '150px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{item.name}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>INR {item.price} x {item.quantity}</p>
                </div>
                <div>
                  <button onClick={() => removeFromCart(item.id)} style={{ padding: '2px 6px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '3px' }}>-</button>
                  <span style={{ margin: '0 8px', fontWeight: 'bold' }}>{item.quantity}</span>
                  <button onClick={() => addToCart(item)} style={{ padding: '2px 6px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '3px' }}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '2px solid #ddd', paddingTop: '15px', marginTop: '15px' }}>
            <h3 style={{ display: 'flex', justifyContent: 'space-between', margin: '0 0 15px 0' }}>
              <span>Total:</span>
              <span style={{ color: 'green' }}>INR {cartTotal}</span>
            </h3>
            <button onClick={handlePlaceOrder} style={{ width: '100%', padding: '10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Place Order</button>
          </div>
        </div>

        {/* Active Orders panel */}
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2>Active Orders</h2>
          {activeOrders.map(order => (
            <div key={order.id} style={{ padding: '12px', backgroundColor: '#fef9c3', border: '1px solid #fef08a', borderRadius: '6px', marginBottom: '10px' }}>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Order: {order.id}</p>
              <p style={{ margin: '0 0 10px 0' }}>Table: {order.tableNumber}</p>
              <button onClick={() => openBillModal(order)} style={{ width: '100%', padding: '6px', background: '#ea580c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Generate Bill</button>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Receipt Modal */}
      {selectedBillOrder && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '320px' }}>
            <h3 style={{ textAlign: 'center', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>FINAL RECEIPT</h3>
            <p><strong>Order:</strong> {selectedBillOrder.id}</p>
            <p><strong>Table:</strong> {selectedBillOrder.tableNumber}</p>
            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
              {selectedBillOrder.items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>{item.name} (x{item.quantity})</span>
                  <span>INR {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <p style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}><span>Subtotal:</span><span>INR {selectedBillOrder.subTotal}</span></p>
            <p style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0', fontSize: '13px', color: '#666' }}><span>GST (5%):</span><span>INR {selectedBillOrder.tax}</span></p>
            <h4 style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ddd', paddingTop: '10px' }}><span>Grand Total:</span><span>INR {selectedBillOrder.grandTotal}</span></h4>
            <button onClick={() => setSelectedBillOrder(null)} style={{ width: '100%', padding: '8px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', marginTop: '15px', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}