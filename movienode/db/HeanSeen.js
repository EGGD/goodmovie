// var HeanSeen={
//     queryAll:'SELECT * FROM color'
// }
function getHeanSeen(is_Delete) {
    return `SELECT * FROM movie where Is_Delete=?`
}
function getHeanSeenTotal(is_Delete) {
    return `select count(*) Total from movie where Is_Delete=?`
}
function getHeanSeenImage(ID) {
    return `SELECT * FROM image where Movie_Id=?`
}
function getHeanSeenDownload(ID) {
    return `SELECT * FROM download where Movie_Id=?`
}
var HeanSeen = {
    getHeanSeen: getHeanSeen,
    getHeanSeenTotal:getHeanSeenTotal,
    getHeanSeenImage: getHeanSeenImage,
    getHeanSeenDownload: getHeanSeenDownload
}
module.exports = HeanSeen;