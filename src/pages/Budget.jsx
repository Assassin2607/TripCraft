import React from 'react';
import { useTrip } from '../context/TripContext';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

const Budget = () => {
  const {
    selectedTrips,
    budgetLimit,
    setBudgetLimit,
    totalBaseCost,
    totalActivityCost,
    grandTotal,
    remainingBudget
  } = useTrip();

  const percentUsed = budgetLimit > 0 ? Math.min(Math.round((grandTotal / budgetLimit) * 100), 100) : 0;
  const isOverBudget = grandTotal > budgetLimit;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Budget Planner & Cost Breakdown</h2>
        <p>Live, automatic recalculation whenever destinations or activities change.</p>
      </div>

      <div className="budget-metrics-grid">
        <div className="metric-card">
          <small>Target Travel Budget (Editable)</small>
          <div className="metric-input-wrap">
            <span>₹</span>
            <input
              type="number"
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(Number(e.target.value))}
              className="budget-limit-input"
            />
          </div>
        </div>

        <div className="metric-card">
          <small>Total Estimated Cost</small>
          <h3>₹{grandTotal.toLocaleString()}</h3>
        </div>

        <div className={`metric-card ${isOverBudget ? 'danger' : 'success'}`}>
          <small>{isOverBudget ? 'Budget Exceeded' : 'Remaining Balance'}</small>
          <h3>₹{Math.abs(remainingBudget).toLocaleString()}</h3>
        </div>
      </div>

      <div className="budget-progress-container card">
        <div className="progress-labels">
          <span>Budget Utilized: <strong>{percentUsed}%</strong></span>
          {isOverBudget ? (
            <span className="text-danger flex-align"><AlertTriangle size={15} /> Over Planned Budget</span>
          ) : (
            <span className="text-success flex-align"><ShieldCheck size={15} /> Within Budget</span>
          )}
        </div>
        <div className="progress-track">
          <div
            className={`progress-fill ${isOverBudget ? 'fill-danger' : 'fill-primary'}`}
            style={{ width: `${percentUsed}%` }}
          />
        </div>
      </div>

      <div className="budget-details card">
        <h3>Trip Cost Itemization</h3>
        <table className="budget-table">
          <thead>
            <tr>
              <th>Destination</th>
              <th>Base Cost</th>
              <th>Activities Count</th>
              <th>Activity Expenses</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {selectedTrips.map((trip) => {
              const actTotal = trip.activities.reduce((s, a) => s + (a.cost || 0), 0);
              return (
                <tr key={trip.id}>
                  <td><strong>{trip.name}</strong>, {trip.country}</td>
                  <td>₹{trip.baseCost.toLocaleString()}</td>
                  <td>{trip.activities.length}</td>
                  <td>₹{actTotal.toLocaleString()}</td>
                  <td><strong>₹{(trip.baseCost + actTotal).toLocaleString()}</strong></td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td><strong>Grand Total</strong></td>
              <td><strong>₹{totalBaseCost.toLocaleString()}</strong></td>
              <td>-</td>
              <td><strong>₹{totalActivityCost.toLocaleString()}</strong></td>
              <td><strong>₹{grandTotal.toLocaleString()}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Budget;