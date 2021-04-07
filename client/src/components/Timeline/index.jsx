import React, { useEffect, useState } from 'react';
import { Bar } from '@reactchartjs/react-chart.js'
import "./timeline.scss";
import API from "../../utils/API";
import { Timeline } from '@material-ui/lab';
// import {TimelineItem} from '@material-ui/lab';
// import {TimelineSeparator} from '@material-ui/lab';
// import {TimelineConnector} from '@material-ui/lab';
// import {TimelineContent} from '@material-ui/lab';
// import {TimelineDot} from '@material-ui/lab';

// const data = {
//     labels: ["Diapers", "Feeding", "Napping"],
//     datasets: [
//         {
//             label: 'Actions',
//             data: [24, 24, 24],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)'
//             ],
//             borderWidth: 1,
//             barThickness: 10
//         },
//     ],
// }

// const options = {
//     scales: {
//         yAxes: [
//             {
//                 type: "time",
//                 time: {
//                     unit: "hour",
//                     displayFormat: {
//                         hour: "HH"
//                     }
//                 },
//                 ticks: {
//                     min: "12AM",
//                     max: "11:59PM"
//                 },
//             },
//         ],
//     },
// }

const TimelineData = () => {

    // useEffect(() => {
    //     API.getActionsLastDay. 
    // }, [])

    return (
        <>
        <div className="timeline">
            <h1>Timeline</h1>
            <Timeline>
            </Timeline>
            {/* <Timeline>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Eat</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Code</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>Sleep</TimelineContent>
                </TimelineItem>
            </Timeline> */}
            {/* <Bar data={data} options={options} /> */}
        </div>
        </>
    )
}

export default TimelineData;
