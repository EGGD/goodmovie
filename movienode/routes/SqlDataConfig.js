var getColor = require('../api/getColor');
var getHeanSeen = require('../api/getHeanSeen');
var postMovie = require('../api/postMovie');
var postUser = require('../api/postUser');
var postSetMovie = require('../api/postSetMovie');

var SqlDataConfig={
    getColor:getColor,
    getHeanSeen:getHeanSeen,
    postMovie:postMovie,
    postUser:postUser,
    postSetMovie:postSetMovie
};
module.exports = SqlDataConfig;