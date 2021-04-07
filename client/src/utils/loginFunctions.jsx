import API from "./API";

// const [state, dispatch] = useStoreContext();

const initUser = (userCredential, dispatch) => {
  let user = userCredential.user;
  API.getUserByUid(user.uid)
    .then((result) => {
      if (!result.data) {
        API.createUser({ uid: user.uid, email: user.email })
          .then((result) => {
            setUser(result.data, dispatch);
          })
          .catch((error) => console.error(error));
      } else {
        setUser(result.data, dispatch);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const setUser = (user, state, dispatch) => {
  dispatch({
    type: "setUser",
    user,
  })
    .then(() => {
      loginChecklist(state, dispatch);
    })
    .catch((error) => {
      console.error(error);
    });
};

function loginChecklist(state, dispatch) {
  API.getChild(state.user.lastViewedChild)
    .then((childResult) => {
      if (!childResult) {
          console.log("no last viewed Result")
      } else {
        console.log(JSON.stringify(childResult));
        dispatch({
          type: "setChild",
          child: childResult,
        })
          .then(
              API.getUnfinished(childResult._id)
              .then((actionsResult) => {
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

export { initUser, loginChecklist, setUser };
