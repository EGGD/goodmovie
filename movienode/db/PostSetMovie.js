function setMovie() {
  return `UPDATE movie SET Is_Delete = ? WHERE Decsription = ? `
}
var postSetMovie = {
  setMovie: setMovie,
}
module.exports = postSetMovie;