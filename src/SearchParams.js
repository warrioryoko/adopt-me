import React, { useState } from "react";
import { ANIMALS } from "@frontendmasters/pet";

// ANIMALS is a list of strings. ANIMALS.map(animal => (<option></option>))
// is generating individual select/dropdown selections with individual animals
const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, setAnimal] = useState("dog");
  const [breed, setBreed] = useState("");
  const [breeds, setBreeds] = useState([]);
  // breeds has an initial state set to an empty array. Likewise, breed is set to an empty string
  // breed will be filled with whatever option the user chooses after selecting an animal.
  // breeds will be filled with whatever sub-breeds of the animal selected by the user.
  // breeds will request against the API - "I have an {animal}, give me all of the {animal.breeds}"

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
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={e => setAnimal(e.target.value)}
            onBlur={e => setAnimal(e.target.value)}
          >
            <option>All</option>
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={e => setBreed(e.target.value)}
            onBlur={e => setBreed(e.target.value)}
            disabled={breeds.legnth === 0}
          >
            <option>All</option>
            {breeds.map(breedString => (
              <option key={breedString} value={breedString}>
                {breedString}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
