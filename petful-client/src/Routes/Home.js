import Background from "./Home-Image.jpg";
import React from "react";
import "./Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      person: ""
    };
  }
  componentDidMount() {
    this.getPeople();
  }

  getPeople = () => {
    fetch("http://localhost:8080/api/person")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            person: result
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

  onAdopt = () => {
    const { history } = this.props;
    history.push("/adoption");
  };
  render() {
    const { error, isLoaded, person } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log("loaded");
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
            Hello and welcome to Petful! If you are here to adopt a pet, then
            you are in the right place! If you are new, here's how it works: The
            adoption process is on a first come first serve basis so there may
            be a wait, but you will be able to see where you are in line. Once
            it is your turn to adopt you will be presented with 2 animals, a cat
            and a dog. You can adopt the cat, the dog or both! The 2 animals
            that you will be presented with are a cat and a dog that have been
            here the longest. We do this to ensure that animals find a home as
            quick as possible. If you would like 2 of the same animal then you
            will have to adopt one and wait in line until it is your turn again
            to adopt.
          </p>
          {/* The site has a description of the adoption process */}
          <div className="queue">
            <h3>Place in line</h3>
            <div className="person">
              <div>
                <h2>{person.name}</h2>
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
}
export default Home;
