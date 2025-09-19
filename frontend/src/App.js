import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskStats from './components/TaskStats';
import { getTasks, createTask, updateTask, deleteTask, getTaskStats } from './services/taskService';

function App() {
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState({
        status: '',
        priority: '',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    });

    // Fetch tasks and stats
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [tasksData, statsData] = await Promise.all([
                getTasks(filter),
                getTaskStats()
            ]);

            setTasks(tasksData.data || []);
            setStats(statsData.data || {});
        } catch (err) {
            setError('Failed to fetch tasks. Please try again.');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filter]);

    // Handle task creation
    const handleCreateTask = async (taskData) => {
        try {
            const response = await createTask(taskData);
            setTasks([response.data, ...tasks]);
            setShowForm(false);
            fetchData(); // Refresh stats
        } catch (err) {
            setError('Failed to create task. Please try again.');
            console.error('Error creating task:', err);
        }
    };

    // Handle task update
    const handleUpdateTask = async (taskId, taskData) => {
        try {
            const response = await updateTask(taskId, taskData);
            setTasks(tasks.map(task =>
                task._id === taskId ? response.data : task
            ));
            setEditingTask(null);
            fetchData(); // Refresh stats
        } catch (err) {
            setError('Failed to update task. Please try again.');
            console.error('Error updating task:', err);
        }
    };

    // Handle task status update
    const handleStatusUpdate = async (taskId, status) => {
        try {
            console.log('Updating task status:', { taskId, status });
            const response = await updateTask(taskId, { status });
            console.log('Update response:', response);
            setTasks(tasks.map(task =>
                task._id === taskId ? { ...task, status: status } : task
            ));
            fetchData(); // Refresh stats
        } catch (err) {
            setError('Failed to update task status. Please try again.');
            console.error('Error updating task status:', err);
        }
    };

    // Handle task deletion
    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(taskId);
                setTasks(tasks.filter(task => task._id !== taskId));
                fetchData(); // Refresh stats
            } catch (err) {
                setError('Failed to delete task. Please try again.');
                console.error('Error deleting task:', err);
            }
        }
    };

    // Handle filter change
    const handleFilterChange = (newFilter) => {
        setFilter({ ...filter, ...newFilter });
    };

    // Clear error
    const clearError = () => {
        setError(null);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>📋 Task Manager</h1>
                <p>Organize your tasks efficiently</p>
            </header>

            <main className="App-main">
                {error && (
                    <div className="error-banner">
                        <span>{error}</span>
                        <button onClick={clearError} className="close-btn">&times;</button>
                    </div>
                )}

                <div className="dashboard">
                    <div className="dashboard-header">
                        <TaskStats stats={stats} loading={loading} />
                        <div className="dashboard-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowForm(true)}
                            >
                                + Add New Task
                            </button>
                        </div>
                    </div>

                    <div className="filters">
                        <select
                            value={filter.status}
                            onChange={(e) => handleFilterChange({ status: e.target.value })}
                            className="filter-select"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>

                        <select
                            value={filter.priority}
                            onChange={(e) => handleFilterChange({ priority: e.target.value })}
                            className="filter-select"
                        >
                            <option value="">All Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                        <select
                            value={`${filter.sortBy}-${filter.sortOrder}`}
                            onChange={(e) => {
                                const [sortBy, sortOrder] = e.target.value.split('-');
                                handleFilterChange({ sortBy, sortOrder });
                            }}
                            className="filter-select"
                        >
                            <option value="createdAt-desc">Newest First</option>
                            <option value="createdAt-asc">Oldest First</option>
                            <option value="title-asc">Title A-Z</option>
                            <option value="title-desc">Title Z-A</option>
                            <option value="dueDate-asc">Due Date (Earliest)</option>
                            <option value="dueDate-desc">Due Date (Latest)</option>
                        </select>
                    </div>

                    <TaskList
                        tasks={tasks}
                        loading={loading}
                        onEdit={setEditingTask}
                        onStatusUpdate={handleStatusUpdate}
                        onDelete={handleDeleteTask}
                    />
                </div>

                {showForm && (
                    <TaskForm
                        onSubmit={handleCreateTask}
                        onCancel={() => setShowForm(false)}
                        title="Add New Task"
                    />
                )}

                {editingTask && (
                    <TaskForm
                        task={editingTask}
                        onSubmit={(taskData) => handleUpdateTask(editingTask._id, taskData)}
                        onCancel={() => setEditingTask(null)}
                        title="Edit Task"
                    />
                )}
            </main>
        </div>
    );
}

export default App;
