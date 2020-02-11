import React from "react";
import "./Adoption.css";
import { Link } from "react-router-dom";
import PeopleHelper from "./RouteHelpers/PeopleHelper";
import DogHelper from "./RouteHelpers/DogHelper";
import CatHelper from "./RouteHelpers/CatHelper";

export default class Adoption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      dog: {},
      cat: {},
      queue: [],
      adoptedDogs: [],
      adoptedCats: [],
      isLoading: true
    };
  }
  componentDidMount() {
    this.getQueue();
    this.getDog();
    this.getCat();
  }
  

//new getDog()
  getDog = () => {
    DogHelper.getDog()
      .then(res => res.json())
      .then(dog => {
        console.log('dog' ,dog)
        this.setState({...this.state, dog, isLoading: false })
      })
      
      .catch(error => {
        this.setState({ error });
      });
      console.log('dog array', this.state.dog)
  };


  deleteDog = () => {
   
    //this.addToAdoptedDogs()
    DogHelper.deleteDog().then(res => res.json()).then(dogsdelete => {this.setState({
      adoptedDogs: [...this.state.adoptedDogs, dogsdelete]
    });console.log('delete dog', dogsdelete) })
    .catch(e => console.log('error', e))
    this.deletePerson();
    this.getDog();
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
    this.addToAdoptedCats();
  };

  // addToAdoptedDogs = () => {
  //   DogHelper.getDog()
  //     .then(res => res.json())
  //     .then(adoptedDogs => this.setState({ adoptedDogs }))
  //     .catch(error => {
  //       this.setState({ error });
  //     });
  // }




  addToAdoptedCats = () => {
    CatHelper.getCat()
      .then(res => res.json())
      .then(adoptedCats => {this.setState({ adoptedCats: [...this.state.adoptedCats, adoptedCats] });})
      .catch(error => {
        this.setState({ error });
      });
  }



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
    console.log('q', q)
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
    const adoptedDog = this.state.adoptedDogs;
    const adoptedCat = this.state.adoptedCats;


    { console.log('adoptedDogs array: ', this.state.adoptedDogs) }
    return (
      <div className="Adoption">
        <h1>Adoption Process</h1>
        <Link type="button" className="home-button" to="/">
          <h2>Cancel</h2>
        </Link>
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
            <button onClick={this.deleteDog}>Adopt this Dog!</button>
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
            <br></br>
            <br></br>
              <button onClick={this.deleteCat}>Adopt this Cat!</button>
          </div>
        </div>
        <div className="queue">
          <h3 className="waitingLine">People waiting in line</h3>
          {this.Loading()}
        </div>
        <div className="adopted-pets">
          <h3>Adopted Pets:</h3>

          {this.state.adoptedDogs.map(dog => <li>{dog.name}</li>)}
          <br></br>
          {this.state.adoptedCats.map(cat => <li>{cat.name}</li>)}
        </div>
      </div>
    );
  }
}