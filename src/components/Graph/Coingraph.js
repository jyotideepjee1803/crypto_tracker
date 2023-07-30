import React, { useEffect, useState } from 'react'
import { HistoryGraph } from '../../Info/api'
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { Line } from 'react-chartjs-2';
import GraphButton from './GraphButton';
import Loading from '../Loading/Loading';
import './Coingraph.css'

const durations=[
    { head: "24 Hours", value: 1 },
    { head: "30 Days", value: 30 },
    { head: "3 Months", value: 90},
    { head: "1 Year", value: 365 },
];

const Coingraph = ({coinid}) => {

    const [graphData, setgraphData] = useState();
    const [duration_days, setDurationdays] = useState(1);
    const [flag,setflag] = useState(false);

    const fetchgraphData = async () => {
        const { data } = await axios.get(HistoryGraph(coinid, 'inr',duration_days));
        setflag(true);
        setgraphData(data.prices);
      };
    
      //console.log(coin);
    
      useEffect(() => {
        fetchgraphData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [duration_days]);

    const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
    
    return (
        <div className='graph-container'>
             {!graphData | flag===false ? (
                <Loading/>
            ):(
                <div>
                    <Line
                        data={{
                            labels: graphData.map((coin) => {
                            let date = new Date(coin[0]);
                            let time =
                                date.getHours() > 12
                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                : `${date.getHours()}:${date.getMinutes()} AM`;
                            return duration_days === 1 ? time : date.toLocaleDateString();
                            }),

                            datasets: [
                            {
                                data: graphData.map((coin) => coin[1]),
                                label: `Price ( Past ${duration_days} Days ) in INR`,
                                borderColor: 'rgb(75, 192, 192)',
                                segment: {
                                    borderColor: ctx => down(ctx, 'rgb(192,75,75)'),
                                },
                            },
                            ],
                        }}
                        options={
                            {
                                fill: false,
                                interaction: {
                                    intersect: false
                                },
                                radius: 0,
                                scales: {
                                    y: {
                                      grid: {
                                        color: 'grey'
                                      }
                                    },
                                    x: {
                                      grid: {
                                        color: 'grey'
                                      }
                                    }
                                  }
                            }
                        }

                        />
                        <div 
                            style={{
                                display: "flex",
                                marginTop: 10,
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                        {durations.map((d) => (
                            <GraphButton
                                key={d.value}
                                onClick={() => {setDurationdays(d.value);
                                    setflag(false);
                                }}
                                selected={d.value === duration_days}
                                >
                                {d.head}
                            </GraphButton>
                        ))}
                        </div>
                </div>
            )
            }

        </div>
    )
}

export default Coingraph