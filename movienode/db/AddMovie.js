function postAddMovie(is_Delete){
  return `SELECT * FROM movie where Is_Delete=${is_Delete}`
}
var AddMovie={
  postAddMovie:postAddMovie,
}
module.exports = AddMovie;