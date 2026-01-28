const db = require("../db")

exports.create = (u)=>{
 return db.prepare(
  "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)"
 ).run(u.name,u.email,u.password,"student")
}

exports.find = (email)=>{
 return db.prepare("SELECT * FROM users WHERE email=?").get(email)
}
