function login(){
  return `SELECT id,name,permissions FROM sys_user WHERE name=? AND password=? `;
}
var PostUser={
  login:login,
}
module.exports = PostUser;