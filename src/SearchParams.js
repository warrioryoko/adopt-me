import React, { useState } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";

// ANIMALS is a list of strings. ANIMALS.map(animal => (<option></option>))
// is generating individual select/dropdown selections with individual animals
const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown] = useDropdown("Breed", "", breeds);

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            // value={location} guarantees that "location" is the current state of "location"
            // from the input of the user
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
            // Any time there is a change within the input, an event "e" occurs,
            // calls "setLocation" and changes the input value to whatever the user types in
            // Using implicit return for this arrow function, with the parenthesis
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
