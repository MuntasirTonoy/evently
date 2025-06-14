# Evently - Event Management Platform

## Overview

Evently is a modern web application for managing and attending events. It provides a seamless experience for users to discover events, register for them, and manage their attendance.

## Live URL

[Visit Evently](https://evently-tonoy.web.app)

## Purpose

Evently serves as a centralized platform for event organizers and attendees, connecting people with events that match their interests. The application simplifies the process of finding, registering, and managing event participation.

## Key Features

### User Authentication

- Email/password registration with email verification
- Google authentication integration
- Password recovery functionality
- Protected routes for authenticated users

### Event Discovery

- Featured event carousel on homepage
- Comprehensive listing of upcoming events
- Detailed event pages with complete information
- Event categorization (Technology, Music, Business, Sports, etc.)

### User Profile

- Personal profile management
- View registered events
- Event history

### Event Details

- Comprehensive information about each event
  - Date, time, and location
  - Price and capacity
  - Description and agenda
  - Organizer information
- Seat reservation system

### Responsive Design

- Mobile-first approach
- Seamless experience across all device sizes

## Technologies Used

### Core Framework

- React 19
- Vite 6 for build tooling

### Routing

- React Router 7

### Authentication

- Firebase Authentication

### UI/Styling

- Tailwind CSS 4
- DaisyUI 5
- React Icons
- Lucide React for additional icons
- Swiper for carousel components

### Additional Packages

- React Helmet Async for document head management
- React Hot Toast for notifications

## Installation and Setup

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation Steps

1. Clone the repository

   ```
   git clone https://github.com/yourusername/evently.git
   cd evently
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your Firebase configuration

   ```
   VITE_API_KEY=your_api_key
   VITE_AUTH_DOMAIN=your_auth_domain
   VITE_PROJECT_ID=your_project_id
   VITE_STORAGEBUCKET=your_storage_bucket
   VITE_MESSANGING_SENDERID=your_messaging_sender_id
   VITE_APPID=your_app_id
   ```

4. Start the development server

   ```
   npm run dev
   ```

5. Build for production
   ```
   npm run build
   ```

## Deployment

The project is configured for Firebase hosting. After building:

```
firebase login
firebase init (if not already initialized)
firebase deploy
```

## Future Enhancements

- Event search functionality
- User event reviews and ratings
- Event creation for organizers
- Payment integration
- Calendar integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
