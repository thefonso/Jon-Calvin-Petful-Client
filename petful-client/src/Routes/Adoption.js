import React from "react";
import "./Adoption.css";

export default class Adoption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      dogs: [],
      cats: []
    };
  }
  componentDidMount() {
    this.getDogs();
    this.getCats();
  }

  getDogs = () => {
    fetch("http://localhost:8000/dogs")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            dogs: result.dogs
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  };

  getCats = () => {
    fetch("http://localhost:8000/cats")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            dogs: result.dogs
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  };

  render() {
    const { error, isLoaded, cats, dogs } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="Adoption">
          <h1>Adoption Process</h1>
          <div className="dog">
            <h2>Dogs</h2>
            dog info here
        </div>

          <div className="cat">
            <h2>Cats</h2>
            cat info here
        </div>

          <div>
            <h3>Place in line</h3>
            queue info goes here
        </div>
        </div>
      );
    }
  }
}
