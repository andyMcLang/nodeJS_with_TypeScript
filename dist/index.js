"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get('/details/:id', (req, res) => {
    var pool = mysql_1.default.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'salasana',
        database: 'andyl',
        connectionLimit: 10,
        multipleStatements: true,
    });
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('Entered into error');
            console.log(err);
            res.send({
                success: false,
                statusCode: 500,
                message: 'Getting error during the connection',
            });
            return;
        }
        console.log('The id: ' + req.params.id);
        // if you got a connection...
        conn.query('SELECT * FROM andyl.users WHERE user_id=?', [req.params.id], function (err, rows) {
            if (err) {
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 400,
                });
            }
            // for simplicity, just send the rows
            res.send({
                message: 'Success',
                statusCode: 200,
                data: rows,
            });
            // CLOSE THE CONNECTION
            conn.release();
        });
    });
    //   res.send({
    //     message: 'Hellou maailma!',
    //     data: req.params.id,
    //     name: req.params.name,
    //   })
});
app.post('/Id/:id/Name/:name', (req, res) => {
    res.send({
        data: req.body,
        params: {
            id: req.params.id,
            name: req.params.name,
        },
    });
});
app.listen(3000, () => {
    console.log('Kuunnellaan porttia 3000!');
});
