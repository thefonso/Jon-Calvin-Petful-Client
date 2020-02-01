import React from "react";
import "./Adoption.css";
import PeopleHelper from "./RouteHelpers/PeopleHelper";
import DogHelper from "./RouteHelpers/DogHelper";
import CatHelper from "./RouteHelpers/CatHelper";

export default class Adoption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      dog: [],
      cat: [],
      queue: [],
      isLoading: true
    };
  }
  componentDidMount() {
    this.getDog();
    this.getCat();
    this.getQueue();
  }

  getDog = () => {
    DogHelper.getDog()
      .then(res => res.json())
      .then(dog => this.setState({ dog }))
      .catch(error => {
        this.setState({ error });
      });
  };

  deleteDog = () => {
    DogHelper.deleteDog();
    this.deletePerson();
  };

  getCat = () => {
    CatHelper.getCat()
      .then(res => res.json())
      .then(cat => this.setState({ cat }))
      .catch(error => {
        this.setState({ error });
      });
  };

  deleteCat = () => {
    CatHelper.deleteCat();
    this.deletePerson();
  };

  // getDogs = () => {
  //   fetch("http://localhost:8080/api/dog")
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         console.log(result);
  //         this.setState({
  //           isLoaded: true,
  //           dog: result
  //         });
  //       },
  //       error => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     );
  // };

  // getCats = () => {
  //   fetch("http://localhost:8080/api/cat")
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         this.setState({
  //           isLoaded: true,
  //           cat: result
  //         });
  //       },
  //       error => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     );
  // };

  // deleteCats = () => {
  //   fetch("http://localhost:8080/api/cat/remove", { method: "DELETE" })
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         this.setState({
  //           isLoaded: true,
  //           cat: result
  //         });
  //       },
  //       error => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     );
  // };

  // deleteDogs = () => {
  //   fetch("http://localhost:8080/api/dog/remove", { method: "DELETE" })
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         this.setState({
  //           isLoaded: true,
  //           dog: result
  //         });
  //       },
  //       error => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     );
  // };

  getQueue = () => {
    PeopleHelper.getQueue()
      .then(res => res.json())
      .then(queue => this.setState({ queue, isLoading: false }))
      .catch(error => {
        this.setState({ error });
      });
  };

  deletePerson = () => {
    PeopleHelper.deletePerson();
  };

  display = q => {
    let str = "";
    let currNode = q.first;
    while (currNode !== null) {
      str += currNode.value.name + ", ";
      currNode = currNode.next;
    }
    return str;
  };

  Loading = () => {
    return this.state.isLoading ? (
      <h3 className="Loading">Loading...</h3>
    ) : (
      this.display(this.state.queue)
    );
  };

  render() {
    const dog = this.state.dog;
    const cat = this.state.cat;
    // const { error, isLoaded, cat, dog } = this.state;
    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //   return <div>Loading...</div>;
    // } else {

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
          <button onClick={this.deleteDog()}>Adopt Dog</button>
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
            <button onClick={this.deleteCat()}>Adopt Cat</button>
          </div>
        </div>
        <div className="queue">
          <h3>Place in line</h3>
          {this.Loading()}
        </div>
      </div>
    );
  }
}
