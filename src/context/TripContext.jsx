import React, { createContext, useContext, useState, useEffect } from 'react';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [selectedTrips, setSelectedTrips] = useState(() => {
    const saved = localStorage.getItem('tripcraft_trips');
    return saved ? JSON.parse(saved) : [];
  });

  const [budgetLimit, setBudgetLimit] = useState(250000);

  useEffect(() => {
    localStorage.setItem('tripcraft_trips', JSON.stringify(selectedTrips));
  }, [selectedTrips]);

  const addDestination = (destination) => {
    if (selectedTrips.some((item) => item.id === destination.id)) {
      alert(`${destination.name} is already added to your trips.`);
      return;
    }
    const newTrip = {
      ...destination,
      activities: destination.availableActivities ? [...destination.availableActivities] : []
    };
    setSelectedTrips((prev) => [...prev, newTrip]);
  };

  const removeDestination = (destinationId) => {
    setSelectedTrips((prev) => prev.filter((item) => item.id !== destinationId));
  };

  const removeActivity = (destinationId, activityId) => {
    setSelectedTrips((prev) =>
      prev.map((trip) => {
        if (trip.id === destinationId) {
          return {
            ...trip,
            activities: trip.activities.filter((act) => act.id !== activityId)
          };
        }
        return trip;
      })
    );
  };

  const addActivity = (destinationId, newActivity) => {
    setSelectedTrips((prev) =>
      prev.map((trip) => {
        if (trip.id === destinationId) {
          return {
            ...trip,
            activities: [...trip.activities, newActivity]
          };
        }
        return trip;
      })
    );
  };

  const totalBaseCost = selectedTrips.reduce((acc, trip) => acc + (trip.baseCost || 0), 0);
  const totalActivityCost = selectedTrips.reduce(
    (acc, trip) => acc + trip.activities.reduce((sum, act) => sum + (act.cost || 0), 0),
    0
  );
  const grandTotal = totalBaseCost + totalActivityCost;
  const remainingBudget = budgetLimit - grandTotal;

  return (
    <TripContext.Provider
      value={{
        selectedTrips,
        budgetLimit,
        setBudgetLimit,
        addDestination,
        removeDestination,
        removeActivity,
        addActivity,
        totalBaseCost,
        totalActivityCost,
        grandTotal,
        remainingBudget
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);