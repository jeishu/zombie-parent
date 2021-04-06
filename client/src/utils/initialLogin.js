import API from "./API";

function initialLogin(userCredential, state, dispatch) {
    let user = userCredential.user;
    API.createUser({
      uid: user.uid,
      email: user.email
    })
    .then((dbModel) => {
      console.log(JSON.stringify(dbModel));
      dispatch({
        type: "setUser",
        user: dbModel
      })
      .then(console.log(JSON.stringify()))  // after this run other login get requests
      .catch((error) => {console.error(error)})
    })
    .catch((error) => {
      console.log(error);
    });
}

export default initialLogin;