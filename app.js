var express     = require("express"),
    app         = express(),
    bodyParser  = require('body-parser'),
    request     = require("request"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/camp_spot");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
//Database Schema 
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create({
    name: "Cool",
    image: "http://www.wildnatureimages.com/images%203/060731-346..jpg"
}, function(err, campground){
    if(err){
        console.log("Theres been an error");
        console.log(err);
    } else {
        console.log("New campground!");
        console.log(campground);
    }
});*/
///////
//////Routes
app.get("/", function(req, res){
    res.render("landing");
});
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("There has been an error!");
            console.log(err);
        } else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newGround = {name: name, image: image, description: description};
    Campground.create(newGround, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
});
app.get("/campgrounds/new", function(req,res){
    res.render("new");
});
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("show", {campground: foundCampground});
        }
    });
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