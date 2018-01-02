var getColor = require('../api/getColor');
var getHeanSeen = require('../api/getHeanSeen');
var postMovie = require('../api/postMovie');
var SqlDataConfig={
    getColor:getColor,
    getHeanSeen:getHeanSeen,
    postMovie:postMovie
};
module.exports = SqlDataConfig;