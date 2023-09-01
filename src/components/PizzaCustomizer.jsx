import React, { useState } from 'react';

function PizzaCustomizer({ onSubmit }) {
  const [name, setName] = useState('');
  const [size, setSize] = useState('Personal');
  const [extraIngredients, setExtraIngredients] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, size, extraIngredients });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 text-md tracking-tight font-body">
      <label className="block mb-2">
        Nombre del cliente:
      </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 w-full border border-[#eee]"
        />

      <label className="block mb-2">
        Tipo de pizza:
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="mt-1 p-2 w-full border border-[#eee]"
        >
          <option value="Personal">Personal</option>
          <option value="Mediana">Mediana</option>
          <option value="Grande">Grande</option>
        </select>
      </label>

      <label className="block mb-2">
        Ingredientes adicionales:
        <input
          type="number"
          value={extraIngredients}
          onChange={(e) => setExtraIngredients(Number(e.target.value) < 0 ? 0 : Number(e.target.value))}
          className="mt-1 p-2 w-full border border-[#eee]"
          min={0}
        />
      </label>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Calcular
      </button>
    </form>
  );
}

export default PizzaCustomizer;
