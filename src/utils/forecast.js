const request = require("request")

const forecast = (latitiude,longitude,callback) => {

    const url = "http://api.weatherstack.com/current?access_key=812ae553a9d7385420ace79e87d5d94a&query="+latitiude+","+longitude+"&units=f"

    request({url : url,json : true},(error,{body}) => {

        if(error) {
            callback("unable to connect to the network")
        } else if(body.error) {
            callback(body.error.info)
        } else {
            const temp = body.current.temperature
            const app_temp = body.current.feelslike
            const humidity = body.current.humidity

            callback(undefined,body.current.weather_descriptions[0] + ". it is currently " + temp + " degrees out.But feels like " + app_temp + " and humidity is " + humidity)

        }
})
}

module.exports = forecast

////original code before applying shorthand object destructing syntax

// const request = require("request")

// const forecast = (latitiude,longitude,callback) => {

//     const url = "http://api.weatherstack.com/current?access_key=812ae553a9d7385420ace79e87d5d94a&query="+latitiude+","+longitude+"&units=f"

//     request({url : url,json : true},(error,response) => {

//         if(error) {
//             callback("unable to connect to the network")
//         } else if(response.body.error) {
//             callback(response.body.error.info)
//         } else {
//             const temp = response.body.current.temperature
//             const app_temp = response.body.current.feelslike

//             callback(undefined,response.body.current.weather_descriptions[0] + ". it is currently " + temp + " degrees out.But feels like " + app_temp)

//         }
// })
// }

// module.exports = forecast