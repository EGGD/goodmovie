function login(){
  return `SELECT * FROM sys_user WHERE name=? AND password=? `;
}
var PostUser={
  login:login,
}
module.exports = PostUser;