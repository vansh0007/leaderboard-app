// resources/js/components/WinnerStats.jsx
import { useContext } from 'react';
import { WinnersContext } from '../contexts/WinnersContext';

const WinnerStats = () => {
    const { stats } = useContext(WinnersContext);

    return (
        <div className="winner-stats">
            <h2>Leaderboard Champions</h2>
            <ul>
                {stats.map(stat => (
                    <li key={stat.user_id}>
                        <strong>{stat.user.name}</strong>
                        <span>Wins: {stat.wins}</span>
                        <span>Highest Score: {stat.highest_score}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WinnerStats;