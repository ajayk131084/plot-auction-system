import React, { useState, useEffect } from "react";
import Home from "./home/Home";
import { type PlotType } from "./types/types";
import "./App.css";

const App: React.FC = () => {
  const [plotDetails, setPlotDetails] = useState<Array<PlotType>>([]);

  const getDetails = () => {
    // Get the plot Details and store them in state
    fetch("/api/plotDetails")
      .then((res) => res.json())
      .then((details) => setPlotDetails(details));
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="app-container">
      <div className="nav-bar">
        <h1>Plot Auction</h1>
      </div>

      <Home plotDetails={plotDetails} />
    </div>
  );
};

export default App;
