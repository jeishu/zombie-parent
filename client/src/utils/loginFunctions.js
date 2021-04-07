// import React, { useState } from "react"; 
import { useStoreContext } from "../../utils/GlobalState";
import API from "./API";

const [state, dispatch] = useStoreContext();

const initUser = (userCredential) => {
  let user = userCredential.user;
  API.getUserByUid(user.uid)
    .then((result) => {
      if (!result.data) {
        API.createUser({ uid: user.uid, email: user.email })
          .then((result) => {
            setUser(result.data);
          })
          .catch((error) => console.error(error));
      } else {
        setUser(result.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const setUser = (user) => {
  dispatch({
    type: "setUser",
    user,
  })
    .then(() => {
      loginChecklist();
    })
    .catch((error) => {
      console.error(error);
    });
};

function loginChecklist() {
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

export default { initUser, loginChecklist, setUser };
