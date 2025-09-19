# Task Manager - MERN Stack Application

A modern, responsive task management application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features a beautiful UI with real-time task management capabilities.

## Features

- ✅ Create, read, update, and delete tasks
- 📊 Real-time task statistics and progress tracking
- 🏷️ Task categorization with tags
- 📅 Due date management with overdue indicators
- 🔍 Advanced filtering and sorting
- 📱 Fully responsive design
- 🎨 Modern, beautiful UI with smooth animations
- ⚡ Fast and efficient API with proper error handling

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication (ready for future implementation)
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling with modern features
- **Responsive Design** - Mobile-first approach

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd mern-task-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/task-manager
PORT=5001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod
```

## Running the Application

### Development Mode

1. **Start the backend server:**
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5001`

2. **Start the frontend development server:**
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000`

### Production Mode

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Start the backend in production:**
```bash
cd backend
npm start
```

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks (with optional filtering)
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id/status` - Update task status
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/stats/summary` - Get task statistics

### Health Check
- `GET /api/health` - API health check

## Task Model

```javascript
{
  title: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  status: String (pending|in-progress|completed),
  priority: String (low|medium|high),
  dueDate: Date (optional),
  tags: [String] (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## Features in Detail

### Task Management
- Create tasks with title, description, priority, due date, and tags
- Update task status with a simple dropdown
- Edit task details in a modal form
- Delete tasks with confirmation
- Visual indicators for overdue tasks

### Filtering & Sorting
- Filter by status (pending, in-progress, completed)
- Filter by priority (low, medium, high)
- Sort by creation date, title, or due date
- Real-time filtering without page refresh

### Statistics Dashboard
- Total task count
- Tasks by status
- Tasks by priority
- Completion rate with progress bar
- High priority task count

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Smooth animations and transitions

## Project Structure

```
mern-task-manager/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Task.js
│   │   └── routes/
│   │       └── taskRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.js
│   │   │   ├── TaskItem.js
│   │   │   ├── TaskForm.js
│   │   │   └── TaskStats.js
│   │   ├── services/
│   │   │   └── taskService.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Task sharing and collaboration
- [ ] File attachments
- [ ] Task templates
- [ ] Email notifications
- [ ] Dark mode
- [ ] Task categories/projects
- [ ] Time tracking
- [ ] Export/Import functionality
- [ ] Advanced search
- [ ] Task dependencies
- [ ] Recurring tasks

## Support

If you have any questions or need help, please open an issue in the repository.
