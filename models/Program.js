const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const programSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a program name!'
    },
    squat: {
        type: Number,
        required: 'Supply a weight' 
    },
    benchpress: {
        type: Number,
        require: 'Supply a weight!'
    },
    deadlift: {
        type: Number,
        required: 'Supply a weight'      
    },
    slug: String,
    created: {
        type: Date,
        default: Date.now
    }
});

programSchema.pre('save', function(next) {
    if(!this.isModified('name')) {
        next();
        return;
    }
    this.slug = slug(this.name);
    next();
});

module.exports = mongoose.model('Program', programSchema);