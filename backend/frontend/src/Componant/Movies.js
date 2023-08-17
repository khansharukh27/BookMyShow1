// Import the React library and the movies data from "Data.js"
import React from "react";
import { movies } from "./Data";

// Define the Movies component using a functional component
const Movies = ({ setSelectedMovie, selectedMovie }) => {
  // Define the event handler for selecting a movie
  const handleMovieSelect = (setItem) => {
    setSelectedMovie(setItem);
  };

  return (
    <div className="container-fluid" style={{ border: "1px solid grey", borderRadius: "5px" }}>
      {/* Display the heading for selecting a movie */}
      <h4 className="text-start">Select A Movie</h4>
      
      {/* Display the list of movies */}
      <div className="row row-cols-lg-4 row-cols-md-4 row-cols-sm-1 g-3" style={{ width: "" }}>
        {movies.map((setItem, index) => (
          <div className="col" key={index}>
            <div
              onClick={() => handleMovieSelect(setItem.name)}
              className={`movies ${selectedMovie === setItem.name ? "selected" : ""}`}
              style={{ border: "1px solid grey", borderRadius: "5px", margin: "5px", textAlign: "center", padding: "5px" }}
            >
              {/* Display the movie card */}
              <div className="card" style={{ width: "", height: "15rem" }}>
                {/* Display the movie image */}
                <img src={`${process.env.PUBLIC_URL}/images/${setItem.image}`} className="card-img-top" alt={setItem.name} style={{ width: "", height: "10rem" }} />
                <div className="card-body">
                  {/* Display the movie title */}
                  <h5 className="card-title" style={{ maxHeight: "50px", overflow: "hidden" }}>{setItem.name}</h5>
                  {/* Display the movie description (commented out) */}
                  {/* <p className="card-text" style={{ maxHeight: "100px", overflow: "hidden" }}>{setItem.description}</p> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the Movies component
export default Movies;
