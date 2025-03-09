# PS Suite Paste Service

A simple web service that provides paste functionality for PS Suite toolbar integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Usage

The service will run on port 3000 by default. You can change this by setting the PORT environment variable.

### Endpoints:

- `/` - Main endpoint that triggers the paste functionality
- `/health` - Health check endpoint

## Deployment

This service can be deployed to any Node.js hosting platform like:
- Render.com
- Heroku
- DigitalOcean
- AWS

## Security Note

This service uses CORS to allow cross-origin requests. In production, you may want to restrict this to specific domains. 