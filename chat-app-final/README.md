# Socket.io Chat Server and React Chat Client

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
