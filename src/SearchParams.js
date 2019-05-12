import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";

// ANIMALS is a list of strings. ANIMALS.map(animal => (<option></option>))
// is generating individual select/dropdown selections with individual animals
const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  // useEffect(() => {
  //   pet.breeds("dog").then(console.log, console.error);
  //   //This is disconnected from the render; is scheduled to run after the render happens
  //   //After SearchParams renders for the first time, it will then run useEffect
  //   //This is just meant to log what breeds I'm getting back from the API after rendering
  // });

  useEffect(() => {
    //useEffect should get run whenever changing sets of breeds (from changing animals)
    setBreeds([]); //Clear whatever breeds might have been in "Breeds", when changing types of animal
    setBreed(""); //Clearing specific breed user may have selected to empty string

    //Fetches breeds for a specific type of selected animal from the petfinder API
    pet.breeds(animal).then(({ breeds }) => {
      //This returns a list of objects, that I then want to make into a list of strings
      //I really just want to extract the breed names from the objects
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error); //implicit to pass the error into console.error if the request fails
  }, [animal, setBreed, setBreeds]); //ONLY update when "animal" selected changes
  //Otherwise, without declaring dependencies, every single time there's a re-render, useEffect is called
  //Technically, setBreed and setBreeds will never change... but, they're used in the function definition

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
