const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const app = express()




app.use(bodyParser.urlencoded(
    { extended: true }
))




app.post("/", (req, res) => {



    ////! fetching data out from an api
    const query = req.body.cityName
    const apiKey = "7eeb45de73a7784eb92a09045cb41ba7";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, (response) => {
        console.log(response.statusCode)

        response.on("data", (data) => {
            const weatherData = JSON.parse(data) //converting data from hexidecimal to json format
            const temp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const city = weatherData.name

            res.send(`
            
    <div class="container"
    style="margin: 50px; box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.26); padding: 20px; border-radius: 10px; width:30%">
    <h2 style="margin: 50px 0 50px 0; text-shadow: 1px 4px 8px rgba(214, 3, 3, 0.26);">Weather Application : </h2>
    <div style="display:flex;" class="container>
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">

                <form action="" method="post">
                
                        <input type="text" class="form-control" name="cityName" placeholder="Enter City Name">
                        <button type="submit" class="btn btn-primary">Check</button>

                    </form>





                        <p>The temperatur in <b>${city}</b> is <b> ${temp}</b> degrees Celcius.</p>
                        <p>The weather currently is <b>${weatherDesc}.</b>

                </div>
            </div>
        </div>

        <div class="col-md-6>
        <div class="card">
                <div class="card-body">
        <img style="box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.26); padding:5px;border-radius:10px; margin-left:20px" src="http://openweathermap.org/img/wn/${icon}@2x.png" width=80>

        </div>
        </div>
        </div>
        </div>

    </div>
    
    
    `)

        })
    })
})


app.listen(4000, () => {
    console.log("Server is running on port 4000")
})