const mongoose = require('mongoose');
const  articleSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    authorId:{type:mongoose.Schema.Types.ObjectId,ref:'Author',required:true},
   author:{type: String, required: true},
    title: {type: String, required: true},
    Url: {type: String, required: true},
    Content: {type: String, required: true},
    CreatedAt: {type: Date},
    UpdatedAt: {type: Date}


});
/*// Virtual for duration of the project
articleSchema
    .virtual('duration')
    .get(function ()
    {
        var date1 = this.CreatedAt;
        var date2 = this.UpdatedAt;
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    });

// Virtual for URL of project
articleSchema
    .virtual('url')
    .get(function () {
        return '/catalog/articles/' + this._id;
    });*/
module.exports = mongoose.model('Article',articleSchema);