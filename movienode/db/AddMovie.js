function selectMovie(){
  return `SELECT * FROM movie WHERE Name LIKE ? `;
}
function postAddMovie(data){
  return `INSERT INTO movie (Name,Name_Title,Category,Director,Decsription,Date_Time,Create_Time,Create_User,Is_Delete) VALUES(?,?,?,?,?,?,?,?,?)`
}
function postAddMovieImage(id,data){
  return `INSERT INTO image (Movie_Id,Image_Url) VALUES(?,?)`;
}
function postAddMovieDownload(id,data){
  return `INSERT INTO download (Movie_Id,Sownload_Url) VALUES(?,?)`;
}
var AddMovie={
  selectMovie:selectMovie,
  postAddMovie:postAddMovie,
  postAddMovieImage:postAddMovieImage,
  postAddMovieDownload:postAddMovieDownload
}
module.exports = AddMovie;