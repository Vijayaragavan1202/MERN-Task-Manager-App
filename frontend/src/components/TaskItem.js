import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onEdit, onStatusUpdate, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#f39c12';
            case 'in-progress': return '#3498db';
            case 'completed': return '#27ae60';
            default: return '#95a5a6';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#e74c3c';
            case 'medium': return '#f39c12';
            case 'low': return '#27ae60';
            default: return '#95a5a6';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isOverdue = (dueDate) => {
        if (!dueDate) return false;
        return new Date(dueDate) < new Date() && task.status !== 'completed';
    };

    const handleStatusChange = (e) => {
        onStatusUpdate(task._id, e.target.value);
    };

    const handleCheckboxChange = (e) => {
        e.stopPropagation();
        const newStatus = e.target.checked ? 'completed' : 'pending';
        console.log('Checkbox changed:', { taskId: task._id, newStatus, checked: e.target.checked });
        onStatusUpdate(task._id, newStatus);
    };

    return (
        <div className={`task-item ${task.status} ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
            <div className="task-header" onClick={(e) => {
                // Don't expand if clicking on checkbox or its container
                if (e.target.closest('.checkbox-container')) return;
                setIsExpanded(!isExpanded);
            }}>
                <div className="task-title-section">
                    <div className="task-title-row">
                        <label className="checkbox-container" onClick={(e) => e.stopPropagation()}>
                            <input
                                type="checkbox"
                                checked={task.status === 'completed'}
                                onChange={handleCheckboxChange}
                                className="task-checkbox"
                            />
                            <span className="checkmark"></span>
                        </label>
                        <h3 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
                            {task.title}
                        </h3>
                    </div>
                    <div className="task-meta">
                        <span
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(task.status) }}
                        >
                            {task.status.replace('-', ' ')}
                        </span>
                        <span
                            className="priority-badge"
                            style={{ backgroundColor: getPriorityColor(task.priority) }}
                        >
                            {task.priority}
                        </span>
                        {task.dueDate && (
                            <span className={`due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
                                📅 {formatDate(task.dueDate)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="task-actions">
                    <select
                        value={task.status}
                        onChange={handleStatusChange}
                        className="status-select"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    <button
                        className="btn btn-edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(task);
                        }}
                        title="Edit task"
                    >
                        ✏️
                    </button>

                    <button
                        className="btn btn-delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task._id);
                        }}
                        title="Delete task"
                    >
                        🗑️
                    </button>

                    <button
                        className="expand-btn"
                        title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? '▲' : '▼'}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="task-details">
                    {task.description && (
                        <div className="task-description">
                            <h4>Description:</h4>
                            <p>{task.description}</p>
                        </div>
                    )}

                    {task.tags && task.tags.length > 0 && (
                        <div className="task-tags">
                            <h4>Tags:</h4>
                            <div className="tags">
                                {task.tags.map((tag, index) => (
                                    <span key={index} className="tag">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="task-timestamps">
                        <small>
                            Created: {formatDate(task.createdAt)}
                            {task.updatedAt !== task.createdAt && (
                                <span> • Updated: {formatDate(task.updatedAt)}</span>
                            )}
                        </small>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
