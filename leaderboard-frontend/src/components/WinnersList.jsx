import { useContext } from 'react';
import { WinnersContext } from '../contexts/WinnersContext';

const WinnersList = () => {
    const { winners, loading, error } = useContext(WinnersContext);

    if (loading) return <div>Loading winners...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!Array.isArray(winners)) return <div>No winners data available</div>;
    if (winners.length === 0) return <div>No winners yet</div>;

    return (
        <div className="winners-list">
            <h2>Recent Winners</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {winners.map(winner => (
                        <tr key={winner.id}>
                            <td>{winner.user?.name || 'Unknown'}</td>
                            <td>{winner.points}</td>
                            <td>{new Date(winner.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default WinnersList;