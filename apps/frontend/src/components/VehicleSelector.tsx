// file: apps/frontend/src/components/VehicleSelector.tsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Model, Engine, FinalSelection } from "@fullsend/types";

const API_BASE_URL = "http://localhost:3000";

interface VehicleSelectorProps {
  onVehicleSelect: (selection: FinalSelection | null) => void;
}

export function VehicleSelector({ onVehicleSelect }: VehicleSelectorProps) {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [engines, setEngines] = useState<Engine[]>([]);

  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/vehicles`)
      .then((response) => {
        setMakes(response.data);
      })
      .catch((error) => console.error("Failed to fetch makes:", error));
  }, []);

  useEffect(() => {
    const resetModels = () => {
      setModels([]);
      setSelectedModel("");
      setYears([]);
      setSelectedYear("");
      setEngines([]);
      setSelectedEngine("");
    };

    if (selectedMake) {
      // This is the clean, correct URL that fixes the 404 error
      const urlToFetch = `${API_BASE_URL}/vehicles/${selectedMake}/models`;
      console.log(urlToFetch);
      axios
        .get(urlToFetch)
        .then((response) => {
          resetModels();
          setModels(response.data);
        })
        .catch((error) => {
          console.error(`Failed to fetch models for ${selectedMake}:`, error);
          resetModels();
        });
    } else {
      resetModels();
    }
  }, [selectedMake]);

  useEffect(() => {
    if (selectedModel && selectedYear && selectedEngine) {
      onVehicleSelect({
        model: selectedModel,
        year: selectedYear,
        engine: selectedEngine,
      });
    } else {
      onVehicleSelect(null);
    }
  }, [selectedModel, selectedYear, selectedEngine, onVehicleSelect]);

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelName = e.target.value;
    setSelectedModel(modelName);
    const modelData = models.find((m) => m.name === modelName);
    setYears(modelData ? modelData.years : []);
    setSelectedYear("");
    setEngines([]);
    setSelectedEngine("");
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setSelectedYear(year);
    const modelData = models.find((m) => m.name === selectedModel);
    setEngines(modelData ? modelData.engines : []);
    setSelectedEngine("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-lg">
      <h2 className="text-white text-xl font-bold mb-4">
        Pronađite delove za Vaš automobil
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="p-3 rounded-md bg-gray-700 text-white border-transparent focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="">Proizvođač</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
        <select
          value={selectedModel}
          onChange={handleModelChange}
          disabled={!selectedMake}
          className="p-3 rounded-md bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Model</option>
          {models.map((model) => (
            <option key={model.name} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          disabled={!selectedModel}
          className="p-3 rounded-md bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Godište</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          value={selectedEngine}
          onChange={(e) => setSelectedEngine(e.target.value)}
          disabled={!selectedYear}
          className="p-3 rounded-md bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Motor</option>
          {engines.map((engine) => (
            <option key={engine.type} value={engine.type}>
              {engine.type} ({engine.horsepower} KS)
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
