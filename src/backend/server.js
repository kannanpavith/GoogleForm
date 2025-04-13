const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 9000;
const filePath = 'questions_data.json';

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// POST endpoint to add/update questions
app.post('/add_questions/:doc_id', (req, res) => {
  const docs_data = req.body;
  const doc_id = req.params.doc_id;

  fs.readFile(filePath, (err, data) => {
    let questions_data = [];

    if (err) {
      if (err.code === 'ENOENT') {
        questions_data = [];
      } else {
        return res.status(500).send('Error reading data file');
      }
    } else {
      try {
        questions_data = JSON.parse(data);
      } catch (e) {
        questions_data = [];
      }
    }

    // Check if doc already exists and update, or add new
    const existingDocIndex = questions_data.findIndex(q => q.doc_id === doc_id);
    if (existingDocIndex !== -1) {
      questions_data[existingDocIndex].questions = docs_data.questions;
      questions_data[existingDocIndex].document_name = docs_data.document_name;
      questions_data[existingDocIndex].document_desc = docs_data.document_desc;
    } else {
      questions_data.push({
        doc_id,
        document_name: docs_data.document_name,
        document_desc: docs_data.document_desc,
        questions: docs_data.questions,
      });
    }

    fs.writeFile(filePath, JSON.stringify(questions_data, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing data file');
      }
      res.status(200).send({ message: 'Questions saved successfully' });
    });
  });
});

// ✅ GET endpoint to fetch questions by doc_id
app.get('/get_questions/:doc_id', (req, res) => {
  const doc_id = req.params.doc_id;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data file');
    }

    try {
      const questions_data = JSON.parse(data);
      const document = questions_data.find(q => q.doc_id === doc_id);

      if (document) {
        res.status(200).send(document);
      } else {
        res.status(404).send({ message: 'Document not found' });
      }
    } catch (e) {
      res.status(500).send('Error parsing data file');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
