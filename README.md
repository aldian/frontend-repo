# frontend-repo

A `Next.js` example app that provides UI to access internal API endpoints. Those endpoints are exemplified [here](https://github.com/aldian/backend-repo).

It uses Firebase login.

## Local manual test

To test the frontend locally, you need to specify some environment variables. To do that easily, add a `.env.local` file with content similar to the following:
```
USERS_API_TOKEN=your-secret-token
USERS_API_BASE_URL=http://localhost:3000
APP_BASE_URL=http://localhost
APP_PORT=3001
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-web-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=localhost
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_APP_ID=fake-app-id
NEXT_PUBLIC_FIREBASE_EMULATOR_HOST=localhost:9099
```