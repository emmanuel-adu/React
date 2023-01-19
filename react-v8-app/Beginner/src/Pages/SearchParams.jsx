import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "../Utility/AdoptedPetContext";
import Results from "../Components/Results";
import useBreedList from "../Utility/useBreedList";
import fetchSearch from "../Utility/fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  // eslint-disable-next-line no-unused-vars
  const [adoptedPet, _] = useContext(AdoptedPetContext); // Reading from Adopted pet context

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {
          adoptedPet ? (
            <div className="pet image-container">
              <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
            </div>
          ) : null
        }
        <label htmlFor="location">
          Location
          <input type="text" id="location" name="location" placeholder="Location" className="search-input" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            className="search-input"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed" className="search-input grayed-out-disabled">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button className="rounded px-6 py-2 color text-white hover:opacity-50 border-none bg-orange-500">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;


// import { useEffect, useState } from "react";
// import Results from "./Results";
// import useBreedList from "./useBreedList";
// const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

// const SearchParams = () => {
//   const [pets, setPets] = useState([]);
//   const [location, setLocation] = useState("");
//   const [animal, setAnimal] = useState("");
//   const [breed, setBreed] = useState("");
//   const [breeds] = useBreedList(animal);

//   useEffect(() => {
//     requestPets();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   async function requestPets() {
//     const res = await fetch(
//       `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
//     );
//     const json = await res.json();

//     setPets(json.pets);
//   }

//   return (
//     <div className="search-params">
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           requestPets();
//         }}
//       >
//         <label htmlFor="location">
//           Location
//           <input
//             id="location"
//             value={location}
//             placeholder="Location"
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         </label>

//         <label htmlFor="animal">
//           Animal
//           <select
//             id="animal"
//             value={animal}
//             onChange={(e) => {
//               setAnimal(e.target.value);
//               setBreed("");
//             }}
//             onBlur={(e) => {
//               setAnimal(e.target.value);
//               setBreed("");
//             }}
//           >
//             <option />
//             {ANIMALS.map((animal) => (
//               <option key={animal} value={animal}>
//                 {animal}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label htmlFor="breed">
//           Breed
//           <select
//             disabled={!breeds.length}
//             id="breed"
//             value={breed}
//             onChange={(e) => setBreed(e.target.value)}
//             onBlur={(e) => setBreed(e.target.value)}
//           >
//             <option />
//             {breeds.map((breed) => (
//               <option key={breed} value={breed}>
//                 {breed}
//               </option>
//             ))}
//           </select>
//         </label>

//         <button>Submit</button>
//       </form>
//       <Results pets={pets} />
//     </div>
//   );
// };

// export default SearchParams;
