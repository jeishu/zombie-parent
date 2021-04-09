import React, { useEffect, useState } from 'react';
import "./index.scss";
import API from "../../utils/API";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import moment from "moment";
import { useStoreContext } from "../../utils/GlobalState"
import Fire from "../../Fire";
import { initUser } from "../../utils/loginFunctions";


const TimeData = () => {
    const [diaper, setDiaper] = useState({ name: [] });
    const [feeding, setFeeding] = useState({ name: [] });
    const [sleep, setSleep] = useState({ name: [] });
    const [state, dispatch] = useStoreContext();

    // "606e47ca5394d53a2ce4c0d3", "diaper" ObjectId("606f7a611b9c8749e4bf9a9e") state.user.lastViewedChild
    
    useEffect(() => {
        API.getActionsLastDayByName("606e76158b0f207cd492903f", "diaper").then(res => {
            setDiaper({
                name: res.data.reverse()
            })
            console.log(res.data)
        });
        API.getActionsLastDayByName("606e76158b0f207cd492903f", "sleep").then(res => {
            setSleep({
                name: res.data.reverse()
            })
        });
        API.getActionsLastDayByName("606e76158b0f207cd492903f", "bottle").then(bottleRes => {
            API.getActionsLastDayByName("606e76158b0f207cd492903f", "nurse").then(nurseRes => {
                setFeeding({
                    name: bottleRes.data.reverse().concat(nurseRes.data.reverse())
                })
            })
        });
    }, [])

    return (
        <React.Fragment>
            <Timeline>
                <h1>Diaper</h1>
                {diaper.name.map(action => {
                    return (
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography color="textSecondary">{action.name}</Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>{moment(action.endTime).format("hh mm a")}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    )
                })}
            </Timeline>
            <Timeline>
                <h1>Feeding</h1>
                {feeding.name.map(action => {
                    return (
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography color="textSecondary">{action.name}</Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>{moment(action.endTime).format("hh mm a")}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    )
                })}
            </Timeline>
            <Timeline>
                <h1>Sleep</h1>
                {sleep.name.map(action => {
                    return (
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography color="textSecondary">{action.name}</Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>{moment(action.endTime).format("hh mm a")}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    )
                })}
            </Timeline>
        </React.Fragment>
    )
}

export default TimeData;
