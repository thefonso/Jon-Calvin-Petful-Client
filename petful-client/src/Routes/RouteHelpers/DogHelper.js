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
