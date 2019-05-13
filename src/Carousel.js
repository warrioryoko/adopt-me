import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  }; // Public Class Properties
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];
    // Default image if there is none

    if (media.length) {
      photos = media.map(({ large }) => large);
      // "media" object will have small, medium, large and full images
      // Just grabbing the large photos
      // photos will just be an array of URL strings
    }

    // This component will never see the "media" prop, it's only going to receive
    // the "photos" as state.
    return { photos };
  }
  // Whenever passing functions into children, or using event handlers... use an arrow function!!!
  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index // This comes from the API as a string; this coerces it to a number
    });
  };
  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // DON'T DO THIS IN PRODUCTION. MAKE THIS A BUTTON.
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              onKeyUp
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
