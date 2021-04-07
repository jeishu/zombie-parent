import API from "./API";

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

export default loginChecklist;
