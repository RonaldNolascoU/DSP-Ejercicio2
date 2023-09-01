import './App.css';

import React, { useState } from 'react';
import PizzaCustomizer from './components/PizzaCustomizer';
import Invoice from './components/Invoice';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleFormSubmit = (data) => {
    setInvoiceData(data);
  };

  const onBack = () => {
    setInvoiceData(null);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">La Italiana Pizzería</h1>
      {!invoiceData && <PizzaCustomizer onSubmit={handleFormSubmit} /> }
      {invoiceData && <Invoice data={invoiceData} onBack={onBack} />}
    </div>
  );
}

export default App;