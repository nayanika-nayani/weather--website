const request = require("request")

const geocode = (address , callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoibmF5YW5pa2ExOTk5IiwiYSI6ImNrOXNyNXViMTE3Mzkza3Fjc2E1Y2F5MjAifQ.8wh1AzmC8Pe4rwbmlNxVBw&limit=1"
//  error,{body}={} -> if we are not doing this  ,whenever we get an error back it is referencing an undefined object and so it throws an error
    request({url, json : true},(error,{body}={}) => {
            if(error) {
                callback("Unable to connect to the network")
            } else if (body.features.length === 0) {
                callback("no such place found,try another search    ")
            }
            else {
            callback(undefined,{
                latitude : body.features[0].geometry.coordinates[1] ,
                longitude : body.features[0].geometry.coordinates[0] ,
                location : body.features[0].place_name
            })
            }

})
}

module.exports = geocode





//original code before applying shorthand object destructing syntax


// const request = require("request")

// const geocode = (address , callback) => {

//     const url1 = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoibmF5YW5pa2ExOTk5IiwiYSI6ImNrOXNyNXViMTE3Mzkza3Fjc2E1Y2F5MjAifQ.8wh1AzmC8Pe4rwbmlNxVBw&limit=1"

//     request({url : url1 , json : true},(error,response) => {
//             if(error) {
//                 callback("Unable to connect to the network")
//             } else if (response.body.features.length === 0) {
//                 callback("no such place found,try another set of coordinates")
//             }
//             else {
//             const data = response.body
//             callback(undefined,{
//                 latitiude : data.features[0].geometry.coordinates[1] ,
//                 longitude : data.features[0].geometry.coordinates[0] ,
//                 location : data.features[0].place_name
//             })
//             }

// })
// }

// module.exports = geocode