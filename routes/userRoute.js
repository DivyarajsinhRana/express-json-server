const { json } = require("express/lib/response");

const userRoutes = (app, fs) => {
    const path = './data/user.json';   // data file path

    // refactored helper methods
    const readFile = (
        callback,
        returnJson = false,
        filePath = path,
        encoding = 'utf8'
    ) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (
        fileData,
        callback,
        filePath = path,
        encoding = 'utf8'
    ) => {
        fs.writeFile(filePath, fileData, encoding, err => {
            if (err) {
                throw err;
            }

            callback();
        });
    };
    // READ
    app.get('/users', (req, res) => {
        // fs.readFile(path,'utf-8',(e,data)=>{
        //     if(e) {
        //         throw e;
        //     }
        //     res.send(JSON.parse(data));
        // })
        readFile((data) => {
            res.send(data)
        }, true)
    });

    // CREATE
    app.post('/users', (req, res) => {
        readFile((data) => {
            const newUserId = Date.now().toString();   // create new user ID
            // add the new user
            data[newUserId] = req.body;
            writeFile(JSON.stringify(data, null, 2), () => {
                // res.status(200).send('new user added');
                // res.status(200).send({"message":"new user added","data":data});
                res.status(200).send(data);
              });
        }, true)
    });

    // UPDATE 
    app.put('/users/:id', (req, res) => {
        console.log('calles')
        readFile((data)=>{
            const id = req.params['id'];
            data[id] = req.body
            writeFile(JSON.stringify(data,null,2),()=>{
                // res.status(200).send(`user id:${id} is updated`);
                res.status(200).send(data);
            });
        },true)
    });

    // DELETE
    app.delete('/users/:id', (req, res) => {
        readFile((data)=>{
            const id = req.params['id'];
            delete data[id];
            writeFile(JSON.stringify(data,null,2),()=>{
                res.status(200).send(data)
            })
        },true);
    });

}
module.exports = userRoutes