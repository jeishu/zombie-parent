import API from "./API";
const util = require("util");

let initUser = (userCredential, dispatch) => {
  let user = userCredential.user;
  API.getUserByUid(user.uid)
    .then((existingUser) => {
      // console.log("Joey request:" + JSON.stringify(existingUser.data));
      if (!existingUser.data) {
        console.log("user not found, creating new user");
        API.createUser({ uid: user.uid, email: user.email, child: [], activeChild: [], lastViewedChild: "" })
          .then((newUserResult) => {
            dispatch({
              type: "setUser",
              user: newUserResult.data,
            });
          })
          .catch((error) => console.error(error));
      } else {
        console.log(
          "user found = " + JSON.stringify(existingUser.data, null, 2)
        );
        dispatch({ type: "setUser", user: existingUser.data });
        if (existingUser.data.lastViewedChild) {
          API.getChild(existingUser.data.lastViewedChild)
            .then((childData) => {
              dispatch({ type: "setChild", child: childData.data });
          });
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

initUser = util.promisify(initUser);

let setUser = (user, dispatch) => {
  console.log("user before setUser dispatch" + JSON.stringify(user, null, 2));
  dispatch({
    type: "setUser",
    user: user,
  });
};

setUser = util.promisify(setUser);

function loginChecklist(state, dispatch) {
  console.log(state);
  if (state.user.lastViewedChild) {
    API.getChild(state.user.lastViewedChild)
      .then((childResult) => {
        if (!childResult) {
          console.log("no last viewed Result");
        } else {
          console.log(JSON.stringify(childResult));
          dispatch({
            type: "setChild",
            child: childResult,
          })
            .then(
              API.getUnfinished(childResult._id).then((actionsResult) => {
                console.log(actionsResult);
                //dispatch actions here
                //  let actionArr = ["sleep", "feeding", "diaper"]

                //  actionsResult.filter(item => item.name )
              })
            ) // after this run other login get requests
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export { initUser, setUser, loginChecklist };
