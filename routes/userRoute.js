const userRoutes = (app,fs) => {
    const path = './data/user.json';   // data file path

    // READ
    app.get('/users', (req, res) => {
        fs.readFile(path,'utf-8',(e,data)=>{
            if(e) {
                throw e;
            }
            res.send(JSON.parse(data));
        })
    });
}
module.exports = userRoutes