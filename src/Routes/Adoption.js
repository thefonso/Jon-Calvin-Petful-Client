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
  };

  //new getCat()
  getCat = () => {
    CatHelper.getCat()
      .then(res => res.json())
      .then(cat => {
        console.log('cat', cat)
        this.setState({...this.state, cat, isLoading: false })
      })
      .catch(error => {
        this.setState({ error });
      });
  };


  deleteDog = () => {
    DogHelper.deleteDog().then(res => res.json()).then(dogsdelete => {this.setState({
      adoptedDogs: [...this.state.adoptedDogs, dogsdelete]
    });console.log('delete dog', dogsdelete) })
    .catch(e => console.log('error', e))
    this.deletePerson();
    this.getDog();
  };


  deleteCat = () => {
    CatHelper.deleteCat().then(res => res.json()).then(catsdelete =>
      {this.setState({
        adoptedCats: [...this.state.adoptedCats, catsdelete]
      });console.log('delete cat', catsdelete)})
      .catch(e => console.log('error', e))
    this.deletePerson();
    this.getCat();
  };



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
      console.log('current node' , currNode)
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
            <p> <strong>Name: </strong>{dog.name} </p>
             <br />
            <p> <strong>Breed: </strong>{dog.breed} </p>
             <br />
            <p> <strong>Age: </strong>{dog.age} </p>
             <br />
            <p> <strong>Sex: </strong>{dog.sex} </p>
             <br />
            <p> <strong>Description: </strong> {dog.description} </p>
            <br />
            <p> <strong>Story: </strong>{dog.story} </p>
            
          </div>
            <button onClick={this.deleteDog}>Adopt this Dog!</button>
        </div>
        

        <div className="cat">
        <br></br><br></br>
          <h2>Cats</h2>
          <div>
            <img src={cat.imageURL} alt={cat.imageDescription}></img>
            <p> <strong>Name: </strong>{cat.name} </p>
             <br />
            <p> <strong>Breed: </strong>{cat.breed} </p>
             <br />
            <p> <strong>Age: </strong> {cat.age} </p>
            <br />
            <p> <strong>Sex: </strong> {cat.sex} </p>
            <br />
            <p> <strong>Description: </strong> {cat.description} </p>
            <br />
            <p> <strong>Story: </strong>{cat.story} </p>
            
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