const mongoose = require('mongoose');
const Program = mongoose.model('Program');

exports.homePage = (req, res) => {
  res.render('intro');
};

exports.addProgram = (req, res) => {
  res.render('editProgram', { title: 'Add Program'});
}

exports.createProgram = async (req, res) => {
  const program = await (new Program(req.body)).save();
  req.flash('success', `Successfully Created ${program.name}.`);
  res.redirect(`/program/{$program.slug}`);
}

exports.getPrograms = async (req, res) => {
  const programs = await Program.find();
  res.render('programs', {title: 'Programs', programs: programs});
};


exports.editProgram = async (req, res) => {
  const program = await Program.findOne({ _id: req.params.id });
  res.render('editProgram', {title: `Edit ${program.name}`, program});
}

exports.updateProgram = async (req, res) => {
  const program = await Program.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true, //return new program
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated ${program.name} <a href="/programs/${program.slug}">View Program</a>`);
  res.redirect(`/programs/${program._id}/edit`);
}

exports.getProgramBySlug = async (req, res, next) => {
  const program = await Program.findOne({ slug: req.params.slug });
  if(!program) return next();
  const squatWeight = program.squat * 0.72;
  const benchWeight = program.benchpress * 0.72;
  const deadliftWeight = program.deadlift * 0.72;

  function roundUp(num) {
    return Math.ceil(num * 2) / 2;
  }
  const squatRound = roundUp(squatWeight);
  const benchRound = roundUp(benchWeight);
  const deadliftRound = roundUp(deadliftWeight);
  res.render('program', { program, title: program.name, squatRound, benchRound, deadliftRound });
}