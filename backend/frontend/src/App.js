import React, { useState } from 'react';  // Import the React library and useState hook from 'react'
import './index.css';  // Import custom CSS styles
import Nav from './Componant/Nav';  // Import the Nav component
import Movies from './Componant/Movies';  // Import the Movies component
import TimeSlot from './Componant/TimeSlot';  // Import the TimeSlot component
import Seats from './Componant/Seats';  // Import the Seats component
import LastBooking from './Componant/LastBooking';  // Import the LastBooking component
import SubmitButton from './Componant/SubmitButton';  // Import the SubmitButton component
import { seats } from './Componant/Data';  // Import the 'seats' data from Data.js

function App() {
  // State variables to manage selected movie, time slot, seat, input, change, and showBookingDetails
  const [selectedMovie, setSelectedMovie] = useState('');  // Initialize state for selected movie
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');  // Initialize state for selected time slot
  const [selectedSeat, setSelectedSeat] = useState('');  // Initialize state for selected seat
  const [selectedInput, setSelectedInput] = useState('');  // Initialize state for selected input
  const [change, setChange] = useState('');  // Initialize state for change
  const [showBookingDetails, setShowBookingDetails] = useState(false);  // Initialize state for showing booking details

  // Update seat labels based on selected seat and change
  const updatedSeats = seats.map((seat, index) => ({  // Modify seat labels based on selected seat
    seat: seat.seat,
    label: seat.seat === selectedSeat ? change : '0'  // Set label to 'change' for selected seat, otherwise '0'
  }));

  // Function to handle booking submission
  const handleBookingSubmit = async () => {  // Define function to handle booking submission
    if (selectedTimeSlot && selectedMovie && selectedSeat && change) {  // Check if required fields are selected
      try {
        const bookingData = {  // Create booking data object
          movie: selectedMovie,
          timeSlot: selectedTimeSlot,
          seat: seats.map((seat, index) => ({  // Create seat data based on selected seat
            seat: seat.seat,
            label: seat.seat === selectedSeat ? change : '0'
          })),
        };

        // Send a POST request to backend to save booking data
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {  // Use REACT_APP_BACKEND_URL from environment
          method: 'POST',  // Set request method to POST
          headers: {
            'Content-Type': 'application/json',  // Set content type to JSON
          },
          body: JSON.stringify(bookingData),  // Convert booking data to JSON string
        });

        if (response.ok) {  // Check if response is successful
          const responseData = await response.json();  // Parse response data as JSON
          setShowBookingDetails(true);  // Show booking details
          console.log('Booking data saved:', responseData);  // Log success
          localStorage.setItem('movie', JSON.stringify({ selectedMovie }));  // Store selected movie in local storage
          localStorage.setItem('timeSlot', JSON.stringify({ selectedTimeSlot }));  // Store selected time slot in local storage
          localStorage.setItem('seatsData', JSON.stringify(updatedSeats));  // Store updated seats data in local storage
        } else {
          console.log('Failed to save booking data');  // Log failure to save booking data
        }
      } catch (error) {
        console.log('Error occurred while saving booking data:', error);  // Log error if saving data fails
      }
    } else {
      setShowBookingDetails(false);  // Hide booking details
      console.log('Please select a movie, time slot, seat, and input.');  // Log message if required fields not selected
    }
  };

  // Return JSX for rendering components and elements
  return (
    <div className="container-fluid" style={{ borderRadius: '1px', border: '1px solid grey' }}>
      <Nav />  {/* Render the Nav component */}
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-12 mt-4">
              <Movies
                setSelectedMovie={setSelectedMovie}
                selectedMovie={selectedMovie}
              />
            </div>
            <div className="col-12 mt-4">
              <TimeSlot
                setSelectedTimeSlot={setSelectedTimeSlot}
                selectedTimeSlot={selectedTimeSlot}
              />
            </div>
            <div className="col-12 mt-4">
              <Seats
                setSelectedSeat={setSelectedSeat}
                selectedInput={selectedInput}
                selectedSeat={selectedSeat}
                setSelectedInput={setSelectedInput}
                change={change}
                setChange={setChange}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mt-4">
           
          <LastBooking
            showBookingDetails={showBookingDetails}
            selectedMovie={selectedMovie}
            selectedTimeSlot={selectedTimeSlot}
            selectedSeat={selectedSeat}
            selectedInput={selectedInput}
            change={change}
            seats={seats}
          />
        </div>
      </div>
      <div className="mt-4">
        <SubmitButton onSubmit={handleBookingSubmit} />
      </div>
    </div>
  );
}

export default App;  // Export the App component
