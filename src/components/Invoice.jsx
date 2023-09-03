import React from "react";

const getBaseCost = (size) => {
  const sizeToCostMap = {
    Personal: 7.0,
    Mediana: 10.0,
    Grande: 12.0,
  };
  return sizeToCostMap[size] || 0;
};

const getIndividualPrice = (size, extraIngredients) => {
  const sizeToPriceMap = {
    Personal: [1.0, 0.75, 0.5, 0.25],
    Mediana: [2.0, 1.0, 0.75, 0.5],
    Grande: [2.5, 2.0, 1.0, 0.75],
  };
  const prices = sizeToPriceMap[size] || [];
  if (extraIngredients === 1) return prices[0] || 0;
  if (extraIngredients === 2) return prices[1] || 0;
  if (extraIngredients === 3) return prices[2] || 0;
  if (extraIngredients > 3) return prices[3] || 0;
  return 0;
};

const calculateCost = (size, extraIngredients) => {
  const baseCost = getBaseCost(size);
  const individualPrice = getIndividualPrice(size, extraIngredients);
  const additionalCost = individualPrice * extraIngredients;

  return {
    baseCost,
    additionalCost,
    total: baseCost + additionalCost,
  };
};

function Invoice({ data, onBack }) {
  const { name, size, extraIngredients } = data;
  const { baseCost, additionalCost, total } = calculateCost(
    size,
    extraIngredients
  );

  return (
    <div className="max-w-5xl mx-auto py-16 bg-white">
      {/* Add back icon */}
      <button
        className="flex items-center text-slate-700 hover:text-slate-600"
        onClick={onBack}
      >
        <svg
          className="w-4 h-4 mr-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M15 18l-6-6 6-6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <span>Regresar</span>
      </button>

      <article className="overflow-hidden">
        <div className="bg-[white] rounded-b-md">
          <div className="p-9">
            <div className="space-y-6 text-slate-700">
              <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                La Italiana Pizzeria
              </p>
            </div>
          </div>
          <div className="p-9">
            <div className="flex w-full">
              <div className="grid grid-cols-4 gap-12">
                <div className="text-sm font-light text-slate-500">
                  <p className="text-sm font-normal text-slate-700">Cliente:</p>
                  <p>{name}</p>
                </div>
                <div className="text-sm font-light text-slate-500">
                  <p className="text-sm font-normal text-slate-700">
                    Tipo de Pizza
                  </p>
                  <p>{size}</p>

                  <p className="mt-2 text-sm font-normal text-slate-700">
                    Total de ingredientes adicionales
                  </p>
                  <p>{extraIngredients}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-9">
            <div className="flex flex-col mx-0 mt-8">
              <table className="min-w-full divide-y divide-slate-500">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                    >
                      Descripción
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                    >
                      Cantidad
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                      <div className="font-medium text-slate-700">
                        Pizza {size}
                      </div>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                      1
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                      ${baseCost.toFixed(2)}
                    </td>
                  </tr>

                  {Array(extraIngredients)
                    .fill()
                    .map((_, index) => (
                      <tr className="border-b border-slate-200" key={index}>
                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                          <div className="font-medium text-slate-700">
                            Ingrediente extra #{index + 1}
                          </div>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                          1
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                          ${getIndividualPrice(size, extraIngredients)}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      scope="row"
                      colSpan="2"
                      className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                    >
                      Costo base
                    </th>
                    <th
                      scope="row"
                      className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                    >
                      Costo base
                    </th>
                    <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      ${baseCost.toFixed(2)}
                    </td>
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      colSpan="2"
                      className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                    >
                      Costo ingredientes extras
                    </th>
                    <th
                      scope="row"
                      className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                    >
                      Costo ingredientes extras
                    </th>
                    <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      ${additionalCost.toFixed(2)}
                    </td>
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      colSpan="2"
                      className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                    >
                      Total
                    </th>
                    <th
                      scope="row"
                      className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                    >
                      Total
                    </th>
                    <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                      ${total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Invoice;
