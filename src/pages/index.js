// pages/index.js
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export default function Home() {
    const [events, setEvents] = useState([]);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/getAnalytics");
                const data = await response.json();
                setEvents(data);

                // Prepare data for the chart
                // const eventCounts = data.reduce((acc, event) => {
                //     acc[event.event] = (acc[event.event] || 0) + 1;
                //     return acc;
                // }, {});

                // setChartData({
                //     labels: Object.keys(eventCounts),
                //     datasets: [
                //         {
                //             label: "Event Counts",
                //             data: Object.values(eventCounts),
                //             backgroundColor: "rgba(75, 192, 192, 0.6)",
                //             borderColor: "rgba(75, 192, 192, 1)",
                //             borderWidth: 1,
                //         },
                //     ],
                // });
            } catch (error) {
                console.error("Error fetching analytics:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Analytics Dashboard</h1>

            {/* <div style={{ width: "600px", margin: "0 auto" }}>
                {chartData.labels && (
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: "top" },
                                title: { display: true, text: "Event Counts" },
                            },
                        }}
                    />
                )}
            </div> */}

            <h2>Event Logs</h2>
            <table border="1" style={{ width: "100%", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Data</th>
                        <th>Timestamp</th>
                        <th>User-Agent</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={index}>
                            <td>{event.event}</td>
                            <td>{JSON.stringify(event.data)}</td>
                            <td>{new Date(event.timestamp).toLocaleString()}</td>
                            <td>{event.userAgent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
