'use client';
import React, { useState } from 'react';

const Page = () => {
  const [fromPlanet, setFromPlanet] = useState('');
  const [toPlanet, setToPlanet] = useState('');
  const [travelDate, setTravelDate] = useState('');

  const planets = [
    { id: 'mercury', name: 'Mercury' },
    { id: 'venus', name: 'Venus' },
    { id: 'earth', name: 'Earth' },
    { id: 'mars', name: 'Mars' },
    { id: 'jupiter', name: 'Jupiter' },
    { id: 'saturn', name: 'Saturn' },
    { id: 'uranus', name: 'Uranus' },
    { id: 'neptune', name: 'Neptune' }
  ];

  const handleSearchRoutes = () => {

    console.log('Searching routes:', { fromPlanet, toPlanet, travelDate });
  };

  return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4 py-8">
        <form
            onSubmit={handleSearchRoutes}
            className="w-full max-w-xl bg-white/10 backdrop-blur-lg p-6 rounded-xl space-y-6 border border-white/20"
        >
          {/* From Planet */}
          <div>
            <label className="block text-sm font-medium mb-2">From Planet</label>
            <select
                value={fromPlanet}
                onChange={(e) => setFromPlanet(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="" className="text-black">Select departure planet</option>
              {planets.map((planet) => (
                  <option key={planet.id} value={planet.id} className="text-black">
                    {planet.name}
                  </option>
              ))}
            </select>

          </div>
          <div>
            <label className="block text-sm font-medium mb-2">To Planet</label>
            <select
                value={toPlanet}
                onChange={(e) => setToPlanet(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="" className="text-black">Select destination planet</option>
              {planets.map((planet) => (
                  <option key={planet.id} value={planet.id} className="text-black">
                    {planet.name}
                  </option>
              ))}

            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Departure Date</label>
            <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex justify-center">
            <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 font-semibold transition-all"
            >
              Search Routes
            </button>
          </div>
        </form>
      </div>
  );
};

export default Page;
