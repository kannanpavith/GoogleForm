const fs = require('fs');
const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept');
  next();
});

app.listen(9000, () => {
  console.log('Server is running on port 9000');
});

app.post('/add_questions/:doc_id', (req, res) => {
  const docs_data = req.body;
  const doc_id = req.params.doc_id;
  const filePath = 'questions_data.json';

  fs.readFile(filePath, (err, data) => {
    let questions_data = [];
    if (err) {
      if (err.code === 'ENOENT') {
        // File doesn't exist, initialize with an empty array
        questions_data = [];
      } else {
        res.status(500).send('Error reading data file');
        return;
      }
    } else {
      try {
        questions_data = JSON.parse(data);
      } catch (e) {
        // If JSON is invalid, initialize with an empty array
        questions_data = [];
      }
    }

    questions_data.push({
      doc_id,
      ...docs_data,
    });

    fs.writeFile(filePath, JSON.stringify(questions_data, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing data file');
        return;
      }

      res.status(200).send({ message: 'Questions saved successfully' });
    });
  });
});