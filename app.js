var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var request = require("request");
var React = require('react');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});
app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name:"Creek Lake", image:"http://dismalscanyon.com/campsites/images/sleeping_water_5177_900px.jpg"},
        {name:"Yosemite", image:"http://dismalscanyon.com/campsites/images/sleeping_water_5177_900px.jpg"},
        {name:"Cedar", image:"http://dismalscanyon.com/campsites/images/sleeping_water_5177_900px.jpg"}
    ];
    res.render("campgrounds", {campgrounds: campgrounds});
});
app.post("/campgrounds", function(req, res){
    res.send("Youve hit the post route");
    //get data from form and send it back to campgrounds page
});
app.get("/campgrounds/new", function(req,res){
    res.render("new");
});
app.get("*", function(req, res){
    var image={
        pic: "https://i.imgflip.com/663zn.jpg"
    };
    res.render("404", {image:image});
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Your server has started!!");
});

/*app.get("/yahoo", function(req, res){
    request("https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(error, responce, body){
    if(!error && responce.statusCode === 200) {
        var data = JSON.parse(body);
        
        console.log("Sunset time in Hawaii is at " + data["query"]["results"]["channel"]["astronomy"]["sunset"]);
    } 
    });
});*/