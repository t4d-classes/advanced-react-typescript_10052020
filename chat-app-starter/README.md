# Socket.io Chat Server and React Chat Client

## Setup

To start the Node.js application, change into the `server-app` folder, and run the following command.

```bash
npm start
```

To run the React application, open a new terminal window, change into the `client-app` folder, and run the following command.

```bash
npm start
```

To view the React application, open a web browser and browse to `http://localhost:5000`. The Node.js server app will reverse proxy to the React application running on port 3000.

> Note: Do not load `http://localhost:3000` directly into the web browser. The chat application will not work because it cannot access the Socket.io web socket chat server on port 5000. When starting the React application, the Webpack Development server will open your default browser and load the port 3000 web page. Close this tab, and open a new tab loading `http://localhost:5000`.

## Lab Exercise

1. Clone this repository to your computer. Follow the instructions above to ensure the non-React version of the chat server and client works. No changes will be made to the `server-app` during the exercise.

2. Read the comments in the following files:

- `public/index.html`
- `src/index.tsx`
- `src/App.tsx`

3. Using the JavaScript code from the `public/index.html` file as a guide, re-implement the chat client in React using hooks. All of the stateful data and logic should be managed within a custom hook named `useChatsStore`.

4. Ensure it works.

5. Bonus: Review your `useChatsStore` custom hook code. Is there a way to move some of your callback hook functions out of the store using techniques such as a call-by-name, currying and partial functions? Use the Lodash library to setup curry and partial functions.
