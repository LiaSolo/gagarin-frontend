import "./styles.css";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "Пасспорт РФ",
        uv: 0.6,
    },
    {
        name: "Заграничный паспорт",
        uv: 0.4,
    },
    {
        name: "Водительское удостоверение",
        uv: 0.2,
    },
];

const CustomizedLabel = (props) => {
    const { x, y, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                fill="#666"
                transform="rotate(-45)"
            >
                {payload.value}
            </text>
        </g>
    );
}
const Chart = () => {
    return (
        <ResponsiveContainer width={600} height={500}>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick="" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
}


export default Chart;