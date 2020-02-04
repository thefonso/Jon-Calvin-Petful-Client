import config from "../../config";
const DogHelper = {
  getDog() {
    return fetch(`${config.REACT_APP_API_BASE}/dog`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    });
  },

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

  
  deleteDog() {
    return fetch(`${config.REACT_APP_API_BASE}/dog/remove`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    });
  }
};
export default DogHelper;
