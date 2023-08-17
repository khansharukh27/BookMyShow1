// Import the React library and the timeSlots data
import React from 'react';
import { timeSlots } from './Data';

// Define the TimeSlot component using a functional component
const TimeSlot = ({ setSelectedTimeSlot, selectedTimeSlot }) => {
  // Function to handle time slot selection
  const handleTimeSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  return (
    // Container for the time slot selection
    <div className="container-fluid" style={{ border: '1px solid grey', borderRadius: '5px' }}>
      {/* Heading for time slot selection */}
      <h4 className="text-start">Select A Slot</h4>
      {/* Display time slots using a grid layout */}
      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-3">
        {/* Map through each time slot and create a slot element */}
        {timeSlots.map((slot, index) => (
          <div className="col" key={index}>
            {/* Time slot element with conditional styling */}
            <div
              onClick={() => handleTimeSelect(slot)}
              className={`time-slot ${selectedTimeSlot === slot ? 'selected' : ''}`}
              style={{ border: '1px solid grey', borderRadius: '5px', margin: '5px', textAlign: 'center', padding: '5px' }}
            >
              {slot}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the TimeSlot component
export default TimeSlot;
