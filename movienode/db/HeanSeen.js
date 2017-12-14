// var HeanSeen={
//     queryAll:'SELECT * FROM color'
// }
function getHeanSeen(is_Delete){
    return `SELECT * FROM movie where Is_Delete=${is_Delete}`
}
function getHeanSeenImage(ID){
    return `SELECT * FROM image where Movie_Id=${ID}`
}
function getHeanSeenDownload(ID){
    return `SELECT * FROM download where Movie_Id=${ID}`
}
var HeanSeen={
    getHeanSeen:getHeanSeen,
    getHeanSeenImage:getHeanSeenImage,
    getHeanSeenDownload:getHeanSeenDownload
}
module.exports = HeanSeen;