const { faker } = require('@faker-js/faker');
const mysql=require('mysql2');

const express=require("express");
const app=express();
const path = require("path");

const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

const { v4: uuidv4 } = require("uuid");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    database:'delta_app',
    password:'Sachin@123'
});

// show table commendts of sql with node
/* 
q='show tables';

try{
   connection.query(q,(err,result) =>{
    if(err) throw err;
     console.log(result[1]);
 });
}catch(err){
  console.log(err);
}

connection.end();
*/

// insert data into user table
/*
let q1='insert into user(id,username,email) values ?';
let user=[
         ['123b','sachin2','sachin@123'],
         ['123c','sachin3','sachinks@123'],
];
try{
connection.query(q1,[user], (err,result)  => {
  if(err) throw err;
    console.log(result);
});
}catch(err){
  console.log(err);
}
connection.end();
*/

// insert into bulk data

/*
let  getRandomUser =()=> {
  return [
     faker.string.uuid(),
     faker.internet.username(), // before version 9.1.0, use userName()
     faker.internet.email(),
     faker.internet.password(),
  ];
};

let q1='insert into user(id,username,email,password) values ?';
let data=[];
 for(let i=0;i<=100;i++){
  data.push(getRandomUser()); //100 afake data store in data obj 
 }

 try{
connection.query(q1,[data], (err,result)  => {
  if(err) throw err;
    console.log(result);
});
}catch(err){
  console.log(err);
}
connection.end();

*/

// ROUTINGS

// HOME ROUTE show no of user in db
app.get("/",(req,res)=>{
  let q1='select count(*) from user';
  
 try{
       connection.query(q1, (err,result)  => {
  if(err) throw err;
    // console.log(result[0]["count(*)"]);
    let count=result[0]["count(*)"]
    res.render("home",{count});
});
}catch(err){
  console.log(err);
  res.send("some error i db");
}

  
});

// show route
 
app.get("/user",(req,res)=>{
  let q2='select * from user';
  try{
       connection.query(q2, (err,users)  => {
  if(err) throw err;
     
     res.render("show",{users});
});
}catch(err){
  console.log(err);
  res.send("some error i db");
}

});

// edit 
  
app.get("/user/:id/edit",(req,res) =>{
   let {id}=req.params;
   let q=`select * from user where id='${id}'`;
     try{
         connection.query(q, (err,result)  => {
         if(err) throw err;
           let user=result[0];
           res.render("edit",{user});
         });
}catch(err){
  console.log(err);
}

});

// update (db ) route
app.patch("/user/:id",(req,res) =>{
  //  res.send("updated");
  //  console.log(req.body);
   let {id}=req.params;
   let {password:formpass,username:newusername}=req.body;
   let q=`select * from user where id='${id}'`;
     try{
         connection.query(q, (err,result)  => {
         if(err) throw err;
           let user=result[0];
          //  res.send(user);

           if(formpass!=user.password){
               res.send("wrong password");
           }
           else{
            let q=`update user set username='${newusername}' where id='${id}'`;
             connection.query(q, (err,result)  => {
                  if(err) throw err;
                  res.redirect("/user");
           });
           
         };
        });
       }catch(err){
           console.log(err);
         };


});


// add new username id pass routhing


app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/user/new", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();
  //Query to Insert New User
  let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log("added new user");
      res.redirect("/user");
    });
  } catch (err) {
    res.send("some error occurred");
  }
});




app.listen("8080",()=>{
    console.log("server listion port :8080");
});