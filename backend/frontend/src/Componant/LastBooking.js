// Import the React library
import React from 'react';

// Define the LastBooking component using a functional component
const LastBooking = ({ selectedMovie, selectedTimeSlot, selectedSeat, showBookingDetails, change, seats }) => {
  return (
    <div className="container-fluid" style={{ border: '1px solid grey', borderRadius: '5px' }}>
      {/* Display the heading for Last Booking Detail */}
      <h4 className="text-start">Last Booking Detail:</h4>

      {/* Conditional rendering based on whether booking details are available */}
      {showBookingDetails ? (
        <div>
          {/* Display the list of selected seats */}
          <h5> Seat:</h5>
          <div>
            <ul>
              {/* Map through seats and display details */}
              {seats.map((seat, index) => (
                <li key={index}>
                  {seat.label}: {seat.seat === selectedSeat ? change : '0'}
                </li>
              ))}
            </ul>
          </div>
          {/* Display the selected time slot */}
          <p className='strong'><strong>Slot:</strong> {selectedTimeSlot}</p>
          {/* Display the selected movie */}
          <p className='strong'><strong>Movie:</strong> {selectedMovie}</p>
        </div>
      ) : (
        <p>No Previous Detail Available</p> // Display message when no booking details available
      )}
    </div>
  );
};

// Export the LastBooking component
export default LastBooking;
