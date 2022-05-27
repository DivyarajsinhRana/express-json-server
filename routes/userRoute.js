
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
            // data[newUserId] = req.body;
            data.push(req.body);
            writeFile(JSON.stringify(data, null, 2), () => {
                // res.status(200).send('new user added');
                // res.status(200).send({"message":"new user added","data":data});
                res.status(200).send(data);
              });
        }, true)
    });

    // UPDATE 
    app.put('/users/:id', (req, res) => {
        readFile((data)=>{
            const id = req.params['id'];
            let item = data.map((item)=>{
                if(item.id == id){
                    item = req.body
                }
                return item
        })
            writeFile(JSON.stringify(item,null,2),()=>{
                // res.status(200).send(`user id:${id} is updated`);
                res.status(200).send(item);
            });
        },true)
    });

    // DELETE
    app.delete('/users/:id', (req, res) => {
        readFile((data)=>{
            const id = req.params['id'];
            let item = data.filter((item)=>{
                return (
                    item.id != id
                )
        })
            data.pop(item);
            writeFile(JSON.stringify(item,null,2),()=>{
                res.status(200).send(item)
            })
        },true);
    });

}
module.exports = userRoutes