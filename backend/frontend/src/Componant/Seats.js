// Import the React library and the seats data from "Data.js"
import React from 'react';
import { seats } from './Data';

// Define the Seats component using a functional component
const Seats = ({ setSelectedSeat, selectedInput, selectedSeat, setSelectedInput, change, setChange }) => {
  // Define the event handler for clicking on a seat
  const handleSeatClick = (seat) => {
    setSelectedSeat(seat); // Set the selected seat
    setSelectedInput(seat); // Set the selected input
    setChange(''); // Reset the change value
  };

  // Define the event handler for changing the input value
  const handleOnChange = (e) => {
    setChange(e.target.value); // Set the change value to the input value
  };

  // Define the event handler for clicking on the input
  const handleInputClick = () => {
    setSelectedInput(''); // Clear the selected input
  };

  return (
    // Container for the seat selection section
    <div className="container-fluid seat-selection" style={{ border: '1px solid grey', borderRadius: '7px', padding: '10px' }}>
      {/* Display the heading for selecting the seat */}
      <h3 className="text-start">Select the Seat</h3>
      
      {/* Display the row of seat options */}
      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-3">
        {/* Map through the seats array */}
        {seats.map((seatItem, index) => (
          <div className="col" key={index}>
            {/* Display the seat option */}
            <div
              className={`seat-type-item ${selectedSeat === seatItem.seat ? 'selected' : ''}`}
              style={{ border: '1px solid grey', borderRadius: '7px', padding: '10px', textAlign: 'center' }}
              onClick={() => handleSeatClick(seatItem.seat)} // Call handleSeatClick on click
            >
              {/* Display the seat label */}
              <h4>{seatItem.label}</h4>
              
              {/* Display the input field */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* Input field for entering the number of seats */}
                <input
                  type="number"
                  value={selectedInput === seatItem.seat ? change : ''} // Set value based on selected input
                  className={`seat-type-item ${selectedInput === seatItem.seat ? 'selecteds' : ''}`}
                  style={{ border: '1px solid grey', borderRadius: '7px', padding: '10px', width: '150px' }}
                  min={0} // Set the minimum value
                  max={10} // Set the maximum value
                  onChange={handleOnChange} // Call handleOnChange on input change
                  onClick={handleInputClick} // Call handleInputClick on input click
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the Seats component
export default Seats;
