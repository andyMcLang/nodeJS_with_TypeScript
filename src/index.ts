import express from 'express'
import { Request, Response } from 'express'
import mysql from 'mysql'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/details/:id', (req: Request, res: Response) => {
  var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'salasana',
    database: 'andyl',
    connectionLimit: 10,
    multipleStatements: true,
  })

  pool.getConnection(function (err: any, conn: any) {
    if (err) {
      console.log('Entered into error')
      console.log(err)
      res.send({
        success: false,
        statusCode: 500,
        message: 'Getting error during the connection',
      })

      return
    }

    console.log('The id: ' + req.params.id)

    // if you got a connection...
    conn.query(
      'SELECT * FROM andyl.users WHERE user_id=?',
      [req.params.id],
      function (err: any, rows: any) {
        if (err) {
          conn.release()
          return res.send({
            success: false,
            statusCode: 400,
          })
        }

        // for simplicity, just send the rows
        res.send({
          message: 'Success',
          statusCode: 200,
          data: rows,
        })

        // CLOSE THE CONNECTION
        conn.release()
      }
    )
  })

  //   res.send({
  //     message: 'Hellou maailma!',
  //     data: req.params.id,
  //     name: req.params.name,
  //   })
})

app.post('/Id/:id/Name/:name', (req: Request, res: Response) => {
  res.send({
    data: req.body,
    params: {
      id: req.params.id,
      name: req.params.name,
    },
  })
})

app.listen(3000, () => {
  console.log('Kuunnellaan porttia 3000!')
})
