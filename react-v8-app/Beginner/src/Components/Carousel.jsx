import { useState } from "react"

const Carousel = ({ images = ["http://pets-images.dev-apis.com/pets/none.jpg"] }) => {
    // throw new Error("lollfa"); // testing errorBoundary
    const [active, setActive] = useState(0);

    const handleIndexClick = (event) => {
      // console.log(+event.target.dataset.index)
      setActive(+event.target.dataset.index) //turns a string to a number
    };

    return (
        <div className="carousel">
            <img src={images[active]} alt="animal" />
            <div className="carousel-smaller">
            {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              onClick={handleIndexClick}
              data-index={index}
            />
          ))}
            </div>
        </div>
    )
}

export default Carousel