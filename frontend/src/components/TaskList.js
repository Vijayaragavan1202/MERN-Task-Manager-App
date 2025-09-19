import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, loading, onEdit, onStatusUpdate, onDelete }) => {
    if (loading) {
        return (
            <div className="task-list-loading">
                <div className="loading-spinner"></div>
                <p>Loading tasks...</p>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="task-list-empty">
                <div className="empty-icon">📝</div>
                <h3>No tasks found</h3>
                <p>Create your first task to get started!</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            <div className="task-list-header">
                <h2>Your Tasks ({tasks.length})</h2>
            </div>

            <div className="task-items">
                {tasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onEdit={onEdit}
                        onStatusUpdate={onStatusUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
