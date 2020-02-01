import config from "../../config";
const PeopleHelper = {
  getQueue() {
    return fetch(`${config.REACT_APP_API_BASE}/people`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    });
  },
  deletePerson() {
    return fetch(`${config.REACT_APP_API_BASE}/people/remove`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    });
  }
};
export default PeopleHelper;
