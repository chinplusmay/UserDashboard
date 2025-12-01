sample video
https://github.com/user-attachments/assets/960b7d38-39c5-4503-8d6a-5bc98ef7fb45


# User Dashboard Application

A responsive web application built with Next.js featuring user authentication (Sign In/Sign Up) and a dashboard for viewing and editing user profiles.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Testing**: Jest + React Testing Library
- **HTTP Client**: Native Fetch API

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
```bash
cd UserDashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
UserDashboard/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API Routes (Backend)
│   │   ├── auth/
│   │   │   ├── login/        # POST /api/auth/login
│   │   │   └── signup/       # POST /api/auth/signup
│   │   └── user/             # GET & PUT /api/user
│   ├── dashboard/            # Dashboard page (protected)
│   ├── login/                # Login page
│   ├── signup/               # Sign up page
│   ├── globals.css           # Global styles
│   ├── layout.js             # Root layout
│   └── page.js               # Home page
├── components/               # Reusable UI components
│   ├── Button.js             # Button component
│   ├── Input.js              # Input component with validation
│   └── Navbar.js             # Navigation bar
├── lib/                      # Utility functions
│   └── db.js                 # Mock database
├── __tests__/                # Test files
│   ├── login.test.js         # Login page tests
│   └── dashboard.test.js     # Dashboard page tests
├── jest.config.js            # Jest configuration
├── jest.setup.js             # Jest setup file
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # This file
```

## API Documentation

### Authentication

#### POST `/api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "2",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST `/api/auth/login`
Authenticate a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "mock_token_xxx",
  "user": {
    "id": "2",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### User

#### GET `/api/user`
Get current user details. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": "2",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### PUT `/api/user`
Update current user details. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "2",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

## Mock Database

This application uses an in-memory mock database for demonstration purposes. The database is implemented in `lib/db.js` and includes:

- A pre-populated demo user:
  - **Email**: `demo@example.com`
  - **Password**: `password123`

**Important Notes:**
- Data persists only during server runtime
- Restarting the server will reset all data
- In production, this would be replaced with a real database

## Features

### Authentication
- ✅ User registration with validation
- ✅ User login with token-based authentication
- ✅ Form validation using Zod
- ✅ Error handling and user feedback

### Dashboard
- ✅ Protected route (redirects to login if unauthenticated)
- ✅ View user profile
- ✅ Edit profile with inline editing
- ✅ Save changes with API integration
- ✅ Logout functionality

### UI/UX
- ✅ Responsive design (mobile and desktop)
- ✅ Consistent design system (Tailwind CSS)
- ✅ Loading states and animations
- ✅ Error notifications
- ✅ Success notifications

## Testing

Run the test suite:

```bash
npm run test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

### Test Coverage

The test suite includes:
- Login form rendering tests
- Form validation tests
- API integration tests
- Dashboard functionality tests
- Error handling tests

## Design System

The application follows a consistent design system:

| Element | Style |
|---------|-------|
| Page Background | `bg-gray-50` |
| Cards | `bg-white shadow-md rounded-lg` |
| Primary Color | `blue-600` (hover: `blue-700`) |
| Error Color | `red-500` |
| Success Color | `green-500` |

## License

This project is for educational/assignment purposes.

