import { withTheme } from '@material-ui/core';
import React from 'react'
import {Doughnut} from 'react-chartjs-2';







const PieChart = () => {
    return (
        <div>
            <Doughnut
            data={{
                labels: ['Nap Time', 'Meal', 'Breast Feeding', 'Bathroom', 'Bathing', 'Play'],
                datasets: [
                    {
                        label: '# of votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        hoverBackgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 2,
                    }
                ]
            }}
            height={400}
            width={600}
            options={{
                legend:{
                    labels: {
                        fontSize: 17,
                        fontColor: 'white',
                        fontFamily: 'Rubik',
                        fontStyle: '300 italic',
                    }
                }
            }}
            
            />
        </div>
    )
}

export default PieChart
