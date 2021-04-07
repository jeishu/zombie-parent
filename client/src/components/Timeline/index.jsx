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
    return (
        <div className="timeline">
            <>
                <Timeline>
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography color="textSecondary">09:30 am</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>Eat</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </>
        </div>

    )
}

export default TimeData;
