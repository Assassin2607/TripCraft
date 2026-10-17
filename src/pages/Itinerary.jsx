import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { Trash2, Plus, AlertCircle } from 'lucide-react';

const Itinerary = () => {
  const { selectedTrips, removeActivity, addActivity } = useTrip();
  const [activeDestId, setActiveDestId] = useState(null);
  const [actName, setActName] = useState('');
  const [actCost, setActCost] = useState('');

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!actName || !actCost) return;

    addActivity(activeDestId, {
      id: `act-${Date.now()}`,
      name: actName,
      cost: parseFloat(actCost)
    });

    setActName('');
    setActCost('');
    setActiveDestId(null);
  };

  if (selectedTrips.length === 0) {
    return (
      <div className="page-container empty-state">
        <h2>No Itinerary Planned Yet</h2>
        <p>Please add destinations first from the Explore section.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Itinerary Management</h2>
        <p>Add or remove scheduled activities. Budget updates dynamically.</p>
      </div>

      <div className="itinerary-timeline">
        {selectedTrips.map((trip, idx) => (
          <div key={trip.id} className="timeline-node">
            <div className="node-marker">{idx + 1}</div>
            <div className="node-content card">
              <div className="node-header">
                <div>
                  <h3 className="node-title">{trip.name}, {trip.country}</h3>
                  <span className="badge">{trip.category}</span>
                </div>
                <button
                  className="btn btn-outline-sm"
                  onClick={() => setActiveDestId(activeDestId === trip.id ? null : trip.id)}
                >
                  <Plus size={14} /> Add Activity
                </button>
              </div>

              {activeDestId === trip.id && (
                <form onSubmit={handleAddActivity} className="quick-add-form">
                  <input
                    type="text"
                    placeholder="Activity name (e.g. Scuba Tour)"
                    value={actName}
                    onChange={(e) => setActName(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Cost (₹)"
                    value={actCost}
                    onChange={(e) => setActCost(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary btn-sm">Save</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setActiveDestId(null)}>Cancel</button>
                </form>
              )}

              <div className="activity-list">
                <h4>Activities:</h4>
                {trip.activities.length === 0 ? (
                  <p className="no-act-text"><AlertCircle size={14} /> No activities added for this spot.</p>
                ) : (
                  trip.activities.map((act) => (
                    <div key={act.id} className="activity-item">
                      <span className="act-name">{act.name}</span>
                      <div className="act-right">
                        <span className="act-cost">₹{act.cost.toLocaleString()}</span>
                        <button
                          className="btn-trash-inline"
                          title="Remove activity"
                          onClick={() => removeActivity(trip.id, act.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;