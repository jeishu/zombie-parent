import API from "./API";

// const [state, dispatch] = useStoreContext();

const initUser = (userCredential, state, dispatch) => {
  let user = userCredential.user;
  API.getUserByUid(user.uid)
    .then((existingUser) => {
      console.log(existingUser.data);
      if (!existingUser.data) {
        console.log("user not found, creating new user");
        API.createUser({ uid: user.uid, email: user.email })
          .then((newUserResult) => {
            setUserWrapper(newUserResult.data, state, dispatch);
          })
          .catch((error) => console.error(error));
      } else {
        console.log("user found, updating state");
        setUserWrapper(existingUser.data, state, dispatch);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
const setUser = async (user, dispatch) => {
  return dispatch({
    type: "setUser",
    user,
  });
};
const setUserWrapper = (user, state, dispatch) => {
  setUser(user, dispatch)
    .then(() => {
      loginChecklist(state, dispatch);
    })
    .catch((error) => {
      console.error(error);
    });
};

function loginChecklist(state, dispatch) {
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

export { initUser, loginChecklist, setUser };
