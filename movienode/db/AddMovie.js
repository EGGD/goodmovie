function postAddMovie(data){
  return `INSERT INTO movie (Name,Name_Title,Category,Director,Decsription,Date_Time,Create_Time,Create_User,Is_Delete)  VALUES('${data.Name}','${data.Name_Title}','${data.Category}','${data.Director}','${data.Decsription}','${data.Date_Time}','${data.Create_Time}',${data.Create_User},${data.Is_Delete})`
}
function postAddMovieImage(id,data){
  return `INSERT INTO image (Image_Url,Movie_Id) VALUES('${data}',${id})`;
}
function postAddMovieDownload(id,data){
  return `INSERT INTO download (Sownload_Url,Movie_Id) VALUES('${data}',${id})`;
}
var AddMovie={
  postAddMovie:postAddMovie,
  postAddMovieImage:postAddMovieImage,
  postAddMovieDownload:postAddMovieDownload
}
module.exports = AddMovie;