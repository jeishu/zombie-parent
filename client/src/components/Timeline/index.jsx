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

const TimeData = () => {
    // const [actions, setActions] = useState();
    // useEffect(() => {
    //     API.getActionsLastDay.then(res => {

    //     })
    // }, [])

    const arr = [
        {
            actions: "Eating",
            time: "9:30 AM"
        },
        {
            actions: "Napping",
            time: "10:00 AM"
        },
        {
            actions: "Diaper",
            time: "10:30 AM"
        },
        {
            actions: "Eating",
            time: "11:00 AM"
        },
        {
            actions: "Napping",
            time: "11:30 AM"
        },
        {
            actions: "Eating",
            time: "12:30 PM"
        },
    ]
    
    return (
        <Timeline>
            {arr.map(activities => {
                return (
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography color="textSecondary">{activities.time}</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>{activities.actions}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                )
            })}
        </Timeline>
    )
}

export default TimeData;
