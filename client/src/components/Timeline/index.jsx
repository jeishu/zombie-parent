import React, { useEffect, useState } from "react";
import "./index.scss";
import API from "../../utils/API";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { useStoreContext } from "../../utils/GlobalState";
import Fire from "../../Fire";
import { initUser, initUser2 } from "../../utils/loginFunctions";

const TimeData = () => {
  const [diaper, setDiaper] = useState({ name: [] });
  const [feeding, setFeeding] = useState({ name: [] });
  const [sleep, setSleep] = useState({ name: [] });
  const [state, dispatch] = useStoreContext();

  // "606e47ca5394d53a2ce4c0d3", "diaper" ObjectId("606f7a611b9c8749e4bf9a9e") state.user.lastViewedChild

  useEffect(() => {
    let Im = Fire.auth().currentUser;
    console.log(Im.uid);
    let userCredential = { user: { uid: Im.uid } };

    initUser2(userCredential, dispatch, setDiaper, setFeeding, setSleep);

    // .then(() => {
    //   API.getActionsLastDayByName(state.user.lastViewedChild, "diaper").then(
    //     (res) => {
    //       setDiaper({
    //         name: res.data.reverse(),
    //       });
    //       console.log(res.data);
    //     }
    //   );
    //   API.getActionsLastDayByName(state.user.lastViewedChild, "sleep").then(
    //     (res) => {
    //       setSleep({
    //         name: res.data.reverse(),
    //       });
    //     }
    //   );
    //   API.getActionsLastDayByName(state.user.lastViewedChild, "bottle").then(
    //     (bottleRes) => {
    //       API.getActionsLastDayByName(state.user.lastViewedChild, "nurse").then(
    //         (nurseRes) => {
    //           setFeeding({
    //             name: bottleRes.data.reverse().concat(nurseRes.data.reverse()),
    //           });
    //         }
    //       );
    //     }
    //   );
    // });
  }, []);

  return (
    <React.Fragment>
      <Timeline>
        <h1>Diaper</h1>
        {diaper.name.map((action) => {
          return (
            <TimelineItem key={action._id}>
              <TimelineOppositeContent>
                <Typography color="textSecondary">
                  {moment(action.endTime).local().format("dddd")}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography>
                  {moment(action.endTime).local().format("hh mm a")}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
      <Timeline>
        <h1>Feeding</h1>
        {feeding.name.map((action) => {
          return (
            <TimelineItem key={action._id}>
              <TimelineOppositeContent>
                <Typography color="textSecondary">
                  {moment(action.endTime).local().format("dddd")}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography>
                  {moment(action.endTime).local().format("hh mm a")}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
      <Timeline>
        <h1>Sleep</h1>
        {sleep.name.map((action) => {
          return (
            <TimelineItem key={action._id}>
              <TimelineOppositeContent>
                <Typography color="textSecondary">{moment(action.endTime).local().format("dddd")}</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography>
                  {moment(action.endTime).local().format("hh mm a")}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </React.Fragment>
  );
};

export default TimeData;
