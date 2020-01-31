import React from "react";
import "./Adoption.css";

export default class Adoption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      dog: [],
      cat: [],
      person: []
    };
  }
  componentDidMount() {
    this.getDogs();
    this.getCats();
  }

  getDogs = () => {
    fetch("http://localhost:8080/api/dog")
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          this.setState({
            isLoaded: true,
            dog: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  getCats = () => {
    fetch("http://localhost:8080/api/cat")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            cat: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  deleteCats = () => {
    fetch("http://localhost:8080/api/cat/remove", { method: "DELETE" })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            cat: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  deleteDogs = () => {
    fetch("http://localhost:8080/api/dog/remove", { method: "DELETE" })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            dog: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  render() {
    // const dog = this.state.dog;
    // const cat = this.state.cat;
    const { error, isLoaded, cat, dog } = this.state;
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
            {/* when a pet is adopted, remove/delete that index and rerender */}
            <div>
              <img src={dog.imageURL} alt={dog.imageDescription}></img>
              <p> Name: </p>
              {dog.name} <br />
              <p> Breed: </p>
              {dog.breed} <br />
              <p> Age: </p>
              {dog.age} <br />
              <p> Sex: </p>
              {dog.sex} <br />
              <p> Description: </p>
              {dog.description} <br />
              <p> Story: </p>
              {dog.story}
            </div>
            <button onClick={this.deleteDogs}>Adopt Dog</button>
          </div>

          <div className="cat">
            <h2>Cats</h2>
            <div>
              <img src={cat.imageURL} alt={cat.imageDescription}></img>
              <p> Name: </p>
              {cat.name} <br />
              <p> Breed: </p>
              {cat.breed} <br />
              <p> Age: </p>
              {cat.age} <br />
              <p> Sex: </p>
              {cat.sex} <br />
              <p> Description: </p>
              {cat.description} <br />
              <p> Story: </p>
              {cat.story}
              <button onClick={this.deleteCats}>Adopt Cat</button>
            </div>
          </div>
        </div>
      );
    }
  }
}
