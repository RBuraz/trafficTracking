"use client";

import { useState, useEffect } from "react";

const cars = ["Mercedes C-Class", "Opel Vivaro"];

const getDayName = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("hr-HR", { weekday: "long" });
};

const formatToTwoDecimals = (value: string) => {
  const num = parseFloat(value);
  return isNaN(num) ? "0.00" : num.toFixed(2);
};

export default function MyTrafficClient() {
  const now = new Date();
  const defaultStart = new Date(now.getTime() - 8 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16); // 8 hours ago
  const defaultEnd = now.toISOString().slice(0, 16);

  const [shiftStart, setShiftStart] = useState(defaultStart);
  const [shiftEnd, setShiftEnd] = useState(defaultEnd);
  const [selectedCar, setSelectedCar] = useState(cars[0]);

  // Earnings
  const [uberBruto, setUberBruto] = useState("0.00");
  const [uberNeto, setUberNeto] = useState("0.00");
  const [uberManca, setUberManca] = useState("0.00");
  const [boltBruto, setBoltBruto] = useState("0.00");
  const [boltNeto, setBoltNeto] = useState("0.00");
  const [boltManca, setBoltManca] = useState("0.00");

  // Live rides
  const [cardPaid, setCardPaid] = useState("0.00");
  const [cashPaid, setCashPaid] = useState("0.00");
  const [otherPaid, setOtherPaid] = useState("0.00");

  // Expenses
  const [fuelCost, setFuelCost] = useState("0.00");
  const [otherVehicleCost, setOtherVehicleCost] = useState("0.00");
  const [otherCost, setOtherCost] = useState("0.00");

  useEffect(() => {
    const bruto = parseFloat(uberBruto) || 0;
    setUberNeto((bruto * 0.75).toFixed(2));
  }, [uberBruto]);

  useEffect(() => {
    const neto = parseFloat(uberNeto) || 0;
    setUberBruto((neto / 0.75).toFixed(2));
  }, [uberNeto]);

  useEffect(() => {
    const bruto = parseFloat(boltBruto) || 0;
    setBoltNeto((bruto * 0.75).toFixed(2));
  }, [boltBruto]);

  useEffect(() => {
    const neto = parseFloat(boltNeto) || 0;
    setBoltBruto((neto / 0.75).toFixed(2));
  }, [boltNeto]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      shiftStart,
      shiftEnd,
      car: selectedCar,
      uber: {
        bruto: parseFloat(uberBruto) || 0,
        neto: parseFloat(uberNeto) || 0,
        manca: parseFloat(uberManca) || 0,
      },
      bolt: {
        bruto: parseFloat(boltBruto) || 0,
        neto: parseFloat(boltNeto) || 0,
        manca: parseFloat(boltManca) || 0,
      },
      liveRides: {
        card: parseFloat(cardPaid) || 0,
        cash: parseFloat(cashPaid) || 0,
        other: parseFloat(otherPaid) || 0,
      },
      expenses: {
        fuel: parseFloat(fuelCost) || 0,
        otherVehicle: parseFloat(otherVehicleCost) || 0,
        other: parseFloat(otherCost) || 0,
      },
    };
    console.log(data);
    // Here you can send to server or save locally
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Praćenje prometa
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Smjena od:
          </label>
          <div className="flex items-center">
            <input
              type="datetime-local"
              value={shiftStart}
              onChange={(e) => setShiftStart(e.target.value)}
              className="border border-gray-300 p-3 rounded-md flex-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="ml-2 text-gray-600 font-medium">
              {getDayName(shiftStart)}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Smjena do:
          </label>
          <div className="flex items-center">
            <input
              type="datetime-local"
              value={shiftEnd}
              onChange={(e) => setShiftEnd(e.target.value)}
              className="border border-gray-300 p-3 rounded-md flex-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="ml-2 text-gray-600 font-medium">
              {getDayName(shiftEnd)}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Auto:
          </label>
          <select
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
            className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {cars.map((car) => (
              <option key={car} value={car}>
                {car}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Zarada</h2>

          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="text-lg font-medium mb-2">Uber</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bruto:
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={uberBruto}
                  onChange={(e) => setUberBruto(e.target.value)}
                  onBlur={(e) => setUberBruto(formatToTwoDecimals(e.target.value))}
                  placeholder="0.00"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Neto:
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={uberNeto}
                  onChange={(e) => setUberNeto(e.target.value)}
                  onBlur={(e) => setUberNeto(formatToTwoDecimals(e.target.value))}
                  placeholder="0.00"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manča i ostalo:
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={uberManca}
                  onChange={(e) => setUberManca(e.target.value)}
                  onBlur={(e) => setUberManca(formatToTwoDecimals(e.target.value))}
                  placeholder="0.00"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Bolt</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bruto:
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={boltBruto}
                  onChange={(e) => setBoltBruto(e.target.value)}
                  onBlur={(e) => setBoltBruto(formatToTwoDecimals(e.target.value))}
                  placeholder="0.00"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Neto:
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={boltNeto}
                  onChange={(e) => setBoltNeto(e.target.value)}
                  onBlur={(e) => setBoltNeto(formatToTwoDecimals(e.target.value))}
                  placeholder="0.00"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manča i ostalo:
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={boltManca}
                  onChange={(e) => setBoltManca(e.target.value)}
                  onBlur={(e) => setBoltManca(formatToTwoDecimals(e.target.value))}
                  placeholder="0.00"
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Vožnje uživo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Naplaćeno karticom:
              </label>
              <input
                type="number"
                step="0.01"
                value={cardPaid}
                onChange={(e) => setCardPaid(e.target.value)}
                onBlur={(e) => setCardPaid(formatToTwoDecimals(e.target.value))}
                placeholder="0.00"
                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Naplaćeno gotovinom:
              </label>
              <input
                type="number"
                step="0.01"
                value={cashPaid}
                onChange={(e) => setCashPaid(e.target.value)}
                onBlur={(e) => setCashPaid(formatToTwoDecimals(e.target.value))}
                placeholder="0.00"
                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Naplaćeno ostalo:
              </label>
              <input
                type="number"
                step="0.01"
                value={otherPaid}
                onChange={(e) => setOtherPaid(e.target.value)}
                onBlur={(e) => setOtherPaid(formatToTwoDecimals(e.target.value))}
                placeholder="0.00"
                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Troškovi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Troškovi goriva:
              </label>
              <input
                type="number"
                step="0.01"
                value={fuelCost}
                onChange={(e) => setFuelCost(e.target.value)}
                onBlur={(e) => setFuelCost(formatToTwoDecimals(e.target.value))}
                placeholder="0.00"
                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ostali troškovi (auto):
              </label>
              <input
                type="number"
                step="0.01"
                value={otherVehicleCost}
                onChange={(e) => setOtherVehicleCost(e.target.value)}
                placeholder="0.00"
                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ostali troškovi:
              </label>
              <input
                type="number"
                step="0.01"
                value={otherCost}
                onChange={(e) => setOtherCost(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
        >
          Sačuvaj
        </button>
      </form>
    </div>
  );
}
