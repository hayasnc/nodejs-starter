const Joi = require('joi');
const express = require('express');
const app = express();

// Adding middleware.
// Enable parsing of json object
app.use(express.json());

//Sample data
var courses = [
  {
    id: 1,
    name: 'Course1'
  },
  {
    id: 2,
    name: 'Course2'
  },
  {
    id: 3,
    name: 'Course3'
  }
];

// https://expressjs.com/en/4x/api.html#req
app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body); // Object destructuring {error} => result.error
  if (error) return res.status(400).send(error.detail[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  // res.send(req.params); //To get all params
  // res.send(req.query); // To get all query parameter
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('No course with given id not found');
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('No course with given id not found');

  const { error } = validateCourse(req.body); // Object destructuring {error} => result.error
  if (error) return res.status(400).send(error.detail[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('No course with given id not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// on mac set envieonment variable from terminal -> $ export PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// To run  on terminal => node app.je

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}
