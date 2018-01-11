// var HeanSeen={
//     queryAll:'SELECT * FROM color'
// }
function getHeanSeen() {
    return `SELECT * FROM movie where Is_Delete=?`
}
function getHeanSeenTotal() {
    return `select count(*) Total from movie where Is_Delete=?`
}
function getHeanSeenImage() {
    return `SELECT * FROM image where Movie_Id=?`
}
function getHeanSeenDownload() {
    return `SELECT * FROM download where Movie_Id=?`
}
var HeanSeen = {
    getHeanSeen: getHeanSeen,
    getHeanSeenTotal:getHeanSeenTotal,
    getHeanSeenImage: getHeanSeenImage,
    getHeanSeenDownload: getHeanSeenDownload
}
module.exports = HeanSeen;