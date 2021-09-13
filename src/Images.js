import React from 'react';

class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: [],
      liked: false,
    }
  }

  makeApiCall = () => {
    fetch(`https://images-api.nasa.gov/search?q=planets%20exploration&media_type=image&year_start=2000`)
    .then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        this.setState({
          isLoaded: true,
          images: [...jsonifiedResponse.collection.items.slice(0,9)]
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        })
      })
  }

  componentDidMount() {
    this.makeApiCall()
    console.log(this.state.images)
  }

  isLiked = () => {
    this.setState({
      liked: !this.state.liked
    })
  }

  render() {
    const { error, isLoaded, images, liked } = this.state;
    let buttonText = "🤍 Like"
    let buttonClass = "unliked"
    if (liked) {
      buttonText = "💜 Liked"
      buttonClass = "liked"
    }
    if(error) {
      return <>Error: {error.message}</>
    } else if (!isLoaded) {
      return <>Loading...</>
    } else {
      return (
        <div className="container">
          <h2>Photos:</h2>
          {images.map((image, index) =>
            <div className="images">
              <img src={image.links[0].href} alt={image.data[0].title} key={index} />
              <button onClick={this.isLiked} class={buttonClass}>{buttonText}</button>
              <p>Title: {image.data[0].title}</p>
              <p>Date: {image.data[0].date_created.slice(0,10)}</p>
              <p>Description: {image.data[0].description}</p>
            </div>
          )}
        </div>
      )
    }
  }

}

export default Images;