// Import the React library
import React from 'react';

// Define the SubmitButton component using a functional component
const SubmitButton = ({ onSubmit }) => {
  return (
    // Container for the submit button
    <div>
      {/* Button for booking the show */}
      <button type="button" class="btn btn-primary btn-lg" onClick={onSubmit}>Book Your Show</button>
    </div>
  );
};

// Export the SubmitButton component
export default SubmitButton;
