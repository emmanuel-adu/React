import { useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "../Utility/AdoptedPetContext";
import ErrorBoundary from "../Error/ErrorBoundary";
import Carousel from "../Components/Carousel";
import fetchPet from "../Utility/fetchPet";
import Modal from "../Components/Modal";

const Details = () => {
  const { id } = useParams(); // UseParams gets the id from the browserRouter (this is required to use this hook)
  const navigate = useNavigate(); // lets you navigate to another page instead of user clicking a botton
  
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext); // Writing to Adopted Pet Context
  const [ showModal, setShowModal ] = useState(false);
  const results = useQuery(["details", id], fetchPet); // Using react Query instead of useEffect will keep a cache

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    )
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button onClick={() => {
                  setAdoptedPet(pet);
                  navigate("/");
                }}>Yes</button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};


export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary errorComponent=
      {<h2>
        There was an error with this listing. <Link to="/">Click here</Link>
        to back to the home page.
      </h2>}>
      <Details {...props} />
    </ErrorBoundary>
  );
}