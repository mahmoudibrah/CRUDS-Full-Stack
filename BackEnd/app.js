/*
add 
read => show
update
deleted
*/

const express = require("express");
const app = express();
const cors = require('cors')
const port = 8080;
const mysql = require("mysql2");

app.use(cors())

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodedb1",
});
app.use(express.json())

app.post("/addProduct", (req, res) => {
  const { title, price, taxes, ads, discount, total , category  } = req.body;
  connection.execute(
    `insert into products (title ,price , taxes , ads ,  discount,  total ,category ) values ('${title}' , '${price}' ,  '${taxes}'  , '${ads}'  ,'${discount}' , '${total}'  , '${category}'  )`
  );
  res.json({message: 'success'})
});

app.get("/allProducts" , (req , res)=> {
    connection.execute(`select * from products` , (err , result)=> {
        res.json({message : 'success' , result})
    })
})

app.put ('/update' , (req , res)=> {
  const { id , title, price, taxes, ads, discount, total , category  } = req.body;
    connection.execute(`UPDATE products SET title='${title}', price='${price}', taxes='${taxes}', ads='${ads}', discount='${discount}', total='${total}' , category='${category}' where id=${id}`)
    res.json({message : 'success'})
})
app.delete('/delete' , (req , res)=> {
    const { id } = req.body;
    connection.execute(`DELETE FROM products where id=${id}`)
    res.json({message : 'success'})
})


app.listen(port, () => {
  console.log("welcom server");
});
