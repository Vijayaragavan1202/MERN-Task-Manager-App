import React from 'react';
import './TaskStats.css';

const TaskStats = ({ stats, loading }) => {
    if (loading) {
        return (
            <div className="task-stats loading">
                <div className="loading-spinner"></div>
                <p>Loading stats...</p>
            </div>
        );
    }

    const getStatusCount = (status) => {
        if (!stats.byStatus) return 0;
        const statusData = stats.byStatus.find(item => item._id === status);
        return statusData ? statusData.count : 0;
    };

    const getPriorityCount = (priority) => {
        if (!stats.byPriority) return 0;
        const priorityData = stats.byPriority.find(item => item._id === priority);
        return priorityData ? priorityData.count : 0;
    };

    const totalTasks = stats.total || 0;
    const completedTasks = getStatusCount('completed');
    const inProgressTasks = getStatusCount('in-progress');
    const pendingTasks = getStatusCount('pending');
    const highPriorityTasks = getPriorityCount('high');

    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="task-stats">
            <div className="stats-grid">
                <div className="stat-card total">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <h3>{totalTasks}</h3>
                        <p>Total Tasks</p>
                    </div>
                </div>

                <div className="stat-card completed">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <h3>{completedTasks}</h3>
                        <p>Completed</p>
                    </div>
                </div>

                <div className="stat-card in-progress">
                    <div className="stat-icon">🔄</div>
                    <div className="stat-content">
                        <h3>{inProgressTasks}</h3>
                        <p>In Progress</p>
                    </div>
                </div>

                <div className="stat-card pending">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-content">
                        <h3>{pendingTasks}</h3>
                        <p>Pending</p>
                    </div>
                </div>

                <div className="stat-card high-priority">
                    <div className="stat-icon">🔥</div>
                    <div className="stat-content">
                        <h3>{highPriorityTasks}</h3>
                        <p>High Priority</p>
                    </div>
                </div>

                <div className="stat-card completion-rate">
                    <div className="stat-icon">📈</div>
                    <div className="stat-content">
                        <h3>{completionRate}%</h3>
                        <p>Completion Rate</p>
                    </div>
                </div>
            </div>

            {totalTasks > 0 && (
                <div className="progress-bar">
                    <div className="progress-label">
                        <span>Overall Progress</span>
                        <span>{completionRate}%</span>
                    </div>
                    <div className="progress-track">
                        <div
                            className="progress-fill"
                            style={{ width: `${completionRate}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskStats;
