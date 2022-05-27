const userRoutes = require("./userRoute");

const appRouter = (app,fs)=> {
    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
      });
    userRoutes(app,fs);  // called user route folder
}

module.exports = appRouter;