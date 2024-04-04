import React, { useState, useEffect } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import ReportSection from "./ReportSection";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [flightsData, setFlightsData] = useState({});
  const [selectedConnectingFlightNumber, setSelectedConnectingFlightNumber] =
    useState("");
  const handleSelectConnectingFlight = (flightNum) => {
    setSelectedConnectingFlightNumber(flightNum);
  };
  const [flightSchedules, setFlightSchedules] = useState({});
  const [newArrivalTime, setNewArrivalTime] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const onSearch = async (
    flightNumber,
    newTime,
    includeIATCIFlights,
    showPassengerNames
  ) => {
    const fixedDate = "01"; // Ensure this is dynamically updated if necessary
    setNewArrivalTime(newTime);
    setFlightNumber(flightNumber);
    console.log(newTime);
    const apiURL = `https://systems-design-scoot-backend.vercel.app/flight/${flightNumber}/2023-04-${fixedDate}/${newTime}`;

    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Store the entire response for later use
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]); 
    }
  };

  const FIXED_DATE = "01";

  useEffect(() => {
    fetch("/connecting_flights_dict.json")
      .then((response) => response.json())
      .then((data) => {
        setFlightsData(data[FIXED_DATE]);
      })
      .catch((error) => console.error("Error fetching flights data:", error));
    fetch("/flights_schedule.json")
      .then((response) => response.json())
      .then((data) => {
        setFlightSchedules(data[FIXED_DATE]);
      })
      .catch((error) =>
        console.error("Error fetching flight schedules data:", error)
      );
  }, []);

  return (
    <div className="App w-screen h-screen">
      <Header />
      <div className="flex flex-row justify-center w-full mt-4 max-h-full">
        <div className="max-w-[1200px] w-full flex flex-row">
          <FilterBar
            onSearch={onSearch}
            searchResults={searchResults}
            flightsData={flightsData}
            // onFlightSelect={handleFlightSelect}
            fixedDate={FIXED_DATE}
            newArrivalTime={newArrivalTime}
            flightNumber={flightNumber}
          />
          <ReportSection
            newArrivalTime={newArrivalTime}
            searchResults={searchResults}
            fixedDate={FIXED_DATE}
            flightSchedules={flightSchedules}
            connectingFlightData={searchResults}
            selectedConnectingFlightNumber={selectedConnectingFlightNumber}
            setSelectedConnectingFlightNumber={
              setSelectedConnectingFlightNumber
            }
            flightNumber={flightNumber}
            connectingFlightsData={
              flightNumber ? flightsData[flightNumber]?.connecting_flights : {}
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
