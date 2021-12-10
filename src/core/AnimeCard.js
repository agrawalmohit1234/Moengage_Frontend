import React, { useState } from "react";
import StarsRating from "stars-rating";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function CardComponent({ movie }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  let date = new Date(movie.start_date);
  let dateMDY = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  function card() {
    return (
      <React.Fragment>
        <div className="card-content">
          <h3 className="card-title">{movie.title}</h3>
          <p>
            <small>RELEASE DATE: {dateMDY}</small>
          </p>
          <p>
            <small>RATING: {movie.score}</small>
          </p>
          <p>
            <small>No. of Episodes : {movie.episodes}</small>
          </p>
          <p>
            <small>Type: {movie.type}</small>
          </p>
          <p className="card-desc">{movie.synopsis}</p>
        </div>
      </React.Fragment>
    );
  }
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div className="card" key={movie.mal_id}>
      <Button onClick={toggleModal}>
        <img
          className="card-image"
          src={movie.image_url}
          alt={movie.title + " poster"}
        />
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <img
          className="card-image"
          src={movie.image_url}
          alt={movie.title + " poster"}
        />
        {card()}
        <p>
          <small>
            Rating :
            {
              <StarsRating
                count={5}
                onChange={ratingChanged}
                size={24}
                color2={"#ffd700"}
              />
            }
          </small>
        </p>
        <button onClick={toggleModal}>Close</button>
      </Modal>
      {card()}
    </div>
  );
}
