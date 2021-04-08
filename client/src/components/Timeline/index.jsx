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

const TimeData = () => {
    const [diaper, setDiaper] = useState({name: []});
    const [feeding, setFeeding] = useState({name: []});
    const [sleep, setSleep] = useState({name: []});

    useEffect(() => {
        API.getActionsLastDayByName("606e47ca5394d53a2ce4c0d3", "diaper").then(res => {
            setDiaper({
                name: res.data.reverse()
            })
        });
        API.getActionsLastDayByName("606e47ca5394d53a2ce4c0d3", "sleep").then(res => {
            setSleep({
                name: res.data.reverse()
            })
        });
        API.getActionsLastDayByName("606e47ca5394d53a2ce4c0d3", "bottle").then(bottleRes => {
            API.getActionsLastDayByName("606e47ca5394d53a2ce4c0d3", "nurse").then(nurseRes => {
                setFeeding({
                    name: bottleRes.data.reverse().concat(nurseRes.data.reverse())
                })
            })
        });
    }, [])

    return (
        <>
        <Timeline>
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
        </>
    )
}

export default TimeData;
