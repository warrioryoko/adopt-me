import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";

// ANIMALS is a list of strings. ANIMALS.map(animal => (<option></option>))
// is generating individual select/dropdown selections with individual animals
const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]); //When you first request things from API, there will be no pets in state

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []); //If I send a request and no "animals" come back, set to empty array

    console.log(animals); //I just want to see what I'm getting back from the API query
  } //Could do a pet.animals({}).then() but this is a good opportunity to use async

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
    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      //This returns a list of objects, that I then want to make into a list of strings
      //I really just want to extract the breed names from the objects
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error); //implicit to pass the error into console.error if the request fails
  }, [animal, setBreed, setBreeds]); //ONLY update when "animal" selected changes
  //Otherwise, without declaring dependencies, every single time there's a re-render, useEffect is called
  //Technically, setBreed and setBreeds will never change... but, they're used in the function definition

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
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
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
