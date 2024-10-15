# TeleAuction Frontend

This is the frontend for the TeleAuction project, a Telegram mini-app for auctions.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Building for Production

To build the project for production, run:

```
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

- `src/`: Contains all the source code
  - `components/`: Reusable React components
  - `pages/`: Individual page components
  - `context/`: React context for state management
  - `types/`: TypeScript type definitions
- `public/`: Static assets

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React (for icons)

## Deployment

This frontend can be deployed to any static hosting service. Make sure to configure your hosting service to handle client-side routing.

## Telegram Integration

For details on how to integrate this frontend with Telegram as a mini-app, refer to the `DETAILED_TELEGRAM_INTEGRATION.md` file.