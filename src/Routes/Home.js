import Background from "./Home-Image.jpg";
import React from "react";
import "./Home.css";
import PeopleHelper from "./RouteHelpers/PeopleHelper";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      people: "",
      queue: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getQueue();
    console.log("componentMounted");
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
      console.log('current node', currNode)
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

  firstInLine = () => {
    return this.state.isLoading ? (
      <h3 className="Loading">Loading...</h3>
    ) : (
        this.display(this.state.queue.first)
      );
  };

  onAdopt = () => {
    const { history } = this.props;
    history.push("/adoption");
  };
  render() {
    const people = this.state;
    console.log("people", people);
    // issue where it tries to parse json before it has the object to parse and therefore throws an error. Fix issue by somehow making it wait to parse until componentDidMount.

    // '{"first":{"value":{"id":1,"name":"Bethany","age":"1"},"next":{"value":{"id":2,"name":"Calvin","age":"2"},"next":{"value":{"id":3,"name":"Mandee","age":"3"},"next":{"value":{"id":4,"name":"David","age":"4"},"next":{"value":{"id":5,"name":"Skyler","age":"5"},"next":null}}}}},"last":{"value":{"id":5,"name":"Skyler","age":"5"},"next":null}}';
    // const foo = JSON.parse(people);
    // console.log(foo.first.value.name);
    console.log('here is this.state', this.state)
    return (
      <div>
        <img
          alt="Adoption Agency Homepage"
          className="home-background"
          src={Background}
        />
        <header>
          <h1>FIFO Adoption Agency</h1>
        </header>
        <p className="intro">
          Hello and welcome to Petful! If you are here to adopt a pet, then you
          are in the right place! If you are new, here's how it works: The
          adoption process is on a first come first serve basis so there may be
          a wait, but you will be able to see where you are in line. Once it is
          your turn to adopt you will be presented with 2 animals, a cat and a
          dog. You can adopt the cat, the dog or both! The 2 animals that you
          will be presented with are a cat and a dog that have been here the
          longest. We do this to ensure that animals find a home as quick as
          possible. If you would like 2 of the same animal then you will have to
          adopt one and wait in line until it is your turn again to adopt.
        </p>
        {/* The site has a description of the adoption process */}
        <div className="home-queue">
          <div className="person">
            <div className="home-queue">
              <h3>Next in line</h3>
              {this.Loading()}
            </div>
          </div>
        </div>
        <br></br>
        <button type="click" className="adopt-button" onClick={this.onAdopt}>
          Start Adoption Process
        </button>
      </div>
    );
  }
}

export default Home;
