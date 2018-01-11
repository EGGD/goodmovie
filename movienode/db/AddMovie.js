function selectMovie(){
  return `SELECT * FROM movie WHERE Name LIKE ? `;
}
function postAddMovie(){
  return `INSERT INTO movie (Name,Name_Title,Category,Director,Decsription,Date_Time,Create_Time,Create_User,Is_Delete,sys_user_ID) VALUES(?,?,?,?,?,?,?,?,?,?)`
}
function postAddMovieImage(){
  return `INSERT INTO image (Movie_Id,Image_Url) VALUES(?,?)`;
}
function postAddMovieDownload(){
  return `INSERT INTO download (Movie_Id,Sownload_Url) VALUES(?,?)`;
}
var AddMovie={
  selectMovie:selectMovie,
  postAddMovie:postAddMovie,
  postAddMovieImage:postAddMovieImage,
  postAddMovieDownload:postAddMovieDownload
}
module.exports = AddMovie;