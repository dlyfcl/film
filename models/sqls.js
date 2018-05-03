module.exports = {
  sqlSelectUser: "select * from user where account = ?;",
  sqlUserReg: "insert into user(account, password, name, phone) values(?,?,?,?);",
}
