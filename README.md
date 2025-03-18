# Hiiro API Integration Demo

This repository demonstrates how to integrate with the Hiiro API, a powerful document processing and data extraction service. The demo showcases how to upload documents, manage templates, organize groups, and handle webhook events.

## Project Structure

The project consists of two main parts:

- **Frontend**: An Angular application that provides a user interface for interacting with the Hiiro API
- **Backend**: A NestJS application that serves as a proxy to the Hiiro API and handles webhook events

## Features

- Document upload and management
- Template creation and management
- Group organization
- Real-time webhook event handling
- Clean, modern UI built with Tailwind CSS

## Prerequisites

- Node.js (v16+)
- npm or yarn
- Angular CLI
- NestJS CLI

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure your Hiiro API credentials:
   - Copy `.env.example` to `.env`
   - Update the `HIIRO_API_KEY` with your actual API key

4. Start the backend server:
   ```
   npm run start:dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the Angular development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Webhook Testing

To test webhook functionality:

1. Ensure your backend is running
2. Use a tool like [ngrok](https://ngrok.com/) to expose your local server:
   ```
   ngrok http 3000
   ```
3. Configure the webhook URL in your Hiiro dashboard to point to:
   ```
   https://your-ngrok-url.ngrok.io/api/hiiro/webhook
   ```

## API Documentation

For detailed information about the Hiiro API, refer to the [official API documentation](https://api.fsco.io/docs).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Environment Configuration

The application is configured to work with different environments:

### Backend

The API URL can be configured in the `.env` file:

- For local development: `HIIRO_API_URL=http://localhost:5001/v2`
- For production: `HIIRO_API_URL=https://api.fsco.io/v2`

### Frontend

The frontend uses environment files to configure the API URL:

- Development (`environment.ts`): Points to the local backend proxy
- Production (`environment.prod.ts`): Points to the production backend proxy

To build for production:

```
cd frontend
npm run build -- --configuration=production
```
