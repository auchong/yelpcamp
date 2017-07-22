var mongoose = require('mongoose');

//db schema setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
       {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
       }
   ]
});

//compile into db model
module.exports = mongoose.model("Campground", campgroundSchema);