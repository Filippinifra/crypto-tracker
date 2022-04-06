## Introduction

This app is built with Next.js, React.js, and Typescript.

The app's logic is to track a cryptocurrency wallet and provide a rebalancing asset allocation tool.

This is a screenshot of the home page (which could not be updated):

![screenshot-home](/screenshot-home.png)

## Getting Started

Install dependencies when you fork/clone the project by using:

```bash
npm
```

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

### Folder structure:

```
src
├── components      # All components (piece of reusable code)
├── contexts        # React contexts for handling global state
├── hooks
├── images
├── mappers         # Methods for converting API layer objects to Internal layer objects
├── pages           # Next.js pages (routes)
├── types           # Internal layer types and API layer types
└── utils
```

### Logics for app:

The user can create an account, login, and reset their password.
When logged in or out, the user has access to an info page (how the software works).
A logged-in user can access a dashboard (home) that allows him to:

- Calculate his profit/loss by setting a total vest.
- Create a wallet group allocation and assign a name and percentage to each piece.
- Add new coins to be tracked in the wallet.
- Set for each coin a typology (group allocation), an asset allocation related to the typology, and the quantity of coins owned.
- See which moves he may do to rebalance the wallet.
- Change favorite currency (euro or dollar).

### Other

Mobile, tablet, and desktop versions of the app are all responsive.
The app is only available in Italian.
Errors and loaders are handled by the app.
To obtain data about the user, the app uses a Firebase setup server as a backend.
Coinjecko API is used by the app to retrieve coin prices and available coins on the market.
