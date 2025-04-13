import { useState } from 'react';
import axios from 'axios';
import {
  Select,
  MenuItem,
  IconButton,
  Button,
  Checkbox,
  Grid,
  TextField,
  Radio
} from '@mui/material';
import { BsCopy, BsPlusCircle } from 'react-icons/bs';
import './Question_form.css';

const Question_form = ({ id }) => {
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      questionType: 'radio',
      options: [
        { optionText: '', selected: false },
        { optionText: '', selected: false },
      ],
      showAnswerKey: false,
      marks: 0,
      answer: ''
    },
  ]);

  const [documentName, setDocumentName] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex].optionText = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionSelect = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.map((opt, idx) => {
      if (updatedQuestions[qIndex].questionType === 'radio') {
        return { ...opt, selected: idx === oIndex };
      }
      if (updatedQuestions[qIndex].questionType === 'checkbox') {
        return idx === oIndex ? { ...opt, selected: !opt.selected } : opt;
      }
      return opt;
    });
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionTypeChange = (index, event) => {
    const updatedQuestions = [...questions];
    const type = event.target.value;
    updatedQuestions[index].questionType = type;
    if (['radio', 'checkbox', 'dropdown'].includes(type)) {
      updatedQuestions[index].options = [
        { optionText: '', selected: false },
        { optionText: '', selected: false },
      ];
    } else {
      updatedQuestions[index].options = [];
    }
    updatedQuestions[index].answer = '';
    setQuestions(updatedQuestions);
  };

  const handleCopyQuestion = (index) => {
    const updatedQuestions = [...questions];
    const copiedQuestion = {
      ...updatedQuestions[index],
      options: updatedQuestions[index].options.map((opt) => ({ ...opt })),
    };
    updatedQuestions.splice(index + 1, 0, copiedQuestion);
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText: '',
      questionType: 'radio',
      options: [
        { optionText: 'Option 1', selected: false },
        { optionText: 'Option 2', selected: false },
      ],
      showAnswerKey: false,
      marks: 0,
      answer: ''
    };
    setQuestions([...questions, newQuestion]);
  };

  const toggleAnswerKey = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].showAnswerKey = !updatedQuestions[index].showAnswerKey;
    setQuestions(updatedQuestions);
  };

  const handleMarksChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].marks = e.target.value;
    setQuestions(updatedQuestions);
  };

  const commitToDB = () => {
    axios
      .post(`http://localhost:9000/add_questions/${id}`, {
        document_name: documentName,
        document_desc: documentDescription,
        questions,
      })
      .then(() => alert('Questions saved successfully!'))
      .catch(() => alert('Failed to save questions!'));
  };

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <input
          type="text"
          placeholder="Untitled Document"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          className="header-title"
        />
        <input
          type="text"
          placeholder="Form Description"
          value={documentDescription}
          onChange={(e) => setDocumentDescription(e.target.value)}
          className="header-description"
        />
      </div>

      <div className="question-form">
        {questions.map((q, index) => (
          <div key={index} className="question-container">
            <input
              type="text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Enter question text"
              className="question-text-input"
            />

            <Select
              value={q.questionType}
              onChange={(e) => handleQuestionTypeChange(index, e)}
              displayEmpty
              className="question-type-select"
            >
              <MenuItem value="radio">Radio</MenuItem>
              <MenuItem value="checkbox">Checkbox</MenuItem>
              <MenuItem value="dropdown">Dropdown</MenuItem>
              <MenuItem value="short-answer">Short Answer</MenuItem>
              <MenuItem value="paragraph">Paragraph</MenuItem>
              <MenuItem value="file">File Upload</MenuItem>
              <MenuItem value="linear-scale">Linear Scale</MenuItem>
              <MenuItem value="grid">Multiple Choice Grid</MenuItem>
              <MenuItem value="checkbox-grid">Tick Box Grid</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="time">Time</MenuItem>
            </Select>

            {['radio', 'checkbox', 'dropdown'].includes(q.questionType) && (
              <div className="options-container">
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="option-item">
                    {q.questionType === 'radio' ? (
                      <Radio
                        checked={option.selected}
                        onClick={() => handleOptionSelect(index, oIndex)}
                      />
                    ) : q.questionType === 'checkbox' ? (
                      <Checkbox
                        checked={option.selected}
                        onClick={() => handleOptionSelect(index, oIndex)}
                      />
                    ) : null}
                    <input
                      type="text"
                      value={option.optionText}
                      onChange={(e) => handleOptionChange(index, oIndex, e)}
                      placeholder={`Option ${oIndex + 1}`}
                      className="option-text-input"
                    />
                  </div>
                ))}
                <Button
                  onClick={() => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].options.push({ optionText: '', selected: false });
                    setQuestions(updatedQuestions);
                  }}
                  variant="outlined"
                  size="small"
                  className="add-option-button"
                >
                  + Add Option
                </Button>
              </div>
            )}

            {q.questionType === 'short-answer' && (
              <TextField
                fullWidth
                placeholder="Your answer"
                value={q.answer}
                onChange={(e) => handleAnswerChange(index, e)}
              />
            )}

            {q.questionType === 'paragraph' && (
              <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder="Your paragraph answer"
                value={q.answer}
                onChange={(e) => handleAnswerChange(index, e)}
              />
            )}

            {q.questionType === 'file' && (
              <input type="file" onChange={(e) => handleAnswerChange(index, e)} />
            )}

            {q.questionType === 'linear-scale' && (
              <div className="scale-container">
                <span>Scale: 1 - 5</span>
                {[1, 2, 3, 4, 5].map((val) => (
                  <label key={val} style={{ margin: '0 8px' }}>
                    <input
                      type="radio"
                      name={`scale-${index}`}
                      value={val}
                      checked={q.answer === String(val)}
                      onChange={(e) => handleAnswerChange(index, e)}
                    />
                    {val}
                  </label>
                ))}
              </div>
            )}

            {q.questionType === 'grid' && (
              <div className="grid-container">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Col 1</th>
                      <th>Col 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Row 1</td>
                      <td><Radio name={`grid-${index}-row1`} /></td>
                      <td><Radio name={`grid-${index}-row1`} /></td>
                    </tr>
                    <tr>
                      <td>Row 2</td>
                      <td><Radio name={`grid-${index}-row2`} /></td>
                      <td><Radio name={`grid-${index}-row2`} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {q.questionType === 'checkbox-grid' && (
              <div className="grid-container">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Col 1</th>
                      <th>Col 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Row 1</td>
                      <td><Checkbox /></td>
                      <td><Checkbox /></td>
                    </tr>
                    <tr>
                      <td>Row 2</td>
                      <td><Checkbox /></td>
                      <td><Checkbox /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {q.questionType === 'date' && (
              <input
                type="date"
                value={q.answer}
                onChange={(e) => handleAnswerChange(index, e)}
              />
            )}

            {q.questionType === 'time' && (
              <input
                type="time"
                value={q.answer}
                onChange={(e) => handleAnswerChange(index, e)}
              />
            )}

            <Button onClick={() => toggleAnswerKey(index)} size="small" className="answer-key-button">
              Answer Key
            </Button>

            {q.showAnswerKey && (
              <TextField
                type="number"
                label="Points"
                value={q.marks}
                onChange={(e) => handleMarksChange(index, e)}
                size="small"
              />
            )}

            <IconButton onClick={() => handleCopyQuestion(index)} className="copy-question-button">
              <BsCopy />
            </IconButton>
          </div>
        ))}

        <IconButton onClick={handleAddQuestion} className="add-question-button">
          <BsPlusCircle className="add-icon" />
        </IconButton>
      </div>

      <div className="save_form">
        <Button variant="contained" color="primary" onClick={commitToDB} className="save-button">
          Save
        </Button>
      </div>
    </div>
  );
};

export default Question_form;
