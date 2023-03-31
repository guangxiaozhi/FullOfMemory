import { useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './editAnswerPackage.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchEditAnswer } from "../../../store/answer"
import ReactMarkdown from 'react-markdown'

export default function UpdateAnswerPackage() {
  const dispatch = useDispatch()
  const history = useHistory()

  const {questionId, answerId} = useParams()
  const oldAnswer = useSelector(state => state.answer[`${answerId}`])
  const [errors, setErrors] = useState([])

  const [value, setValue] = useState(oldAnswer.answer_body);
  console.log("value from react-quill package?", value)
  const toolbarOptions = [['bold', 'italic', 'link', 'blockquote', 'code', 'image', 'snippet'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  ['horizontal'],
  ['undo', 'redo']
  ];

  const modules = {
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: false
    }
  }

  const handleUpdate = async() => {
    const newAnswer = {
      answer_body: document.getElementsByClassName("ql-editor")[0].innerText
    }
    // console.log("new answer", newAnswer)
    const editAnswerRes = await dispatch(fetchEditAnswer(newAnswer, answerId))
    // console.log("editAnswerRes", editAnswerRes)
    if(typeof(editAnswerRes) == "number"){
      history.push(`/questions/${questionId}`)
    }else{
      setErrors(editAnswerRes)
    }
  }
  return (
    <div className="update-answer-package-container">
      <div>
        <span>Answer</span>
        <div><ReactQuill value={<ReactMarkdown>{value}</ReactMarkdown>} onChange={setValue} modules={modules}/></div>
        <div>
          <button onClick={handleUpdate}>Save edits</button>
          <Link to={`/questions/${parseInt(questionId)}`}>Cancel</Link>
        </div>
      </div>
      <div className="update-answer-fixed-container">
        <div className="side-bar">
          <div className="update-answer-fixed-title">How to Edit</div>
          <div className="update-answer-fixed-list">
            <ul>
              <li>Correct minor typos or mistakes</li>
              <li>Clarify meaning without changing it</li>
              <li>Add related resources or links</li>
              <li>Always respect the author's intent</li>
              <li>Don't use edits to reply to the author</li>
            </ul>
          </div>
        </div>
        <div className="side-bar">
          <div className="update-answer-fixed-title">How to Format</div>
          <div className="update-answer-fixed-list">
            <ul>
              <li>create code fences with backticks ` or tildes ~<div><p> ```</p>  <div>like so</div>  <p>```</p></div></li>
              <li>add language identifier to highlight code<div><p> ```python</p>  <div>def function(foo):<div>print(foo)</div></div>  <p>```</p></div></li>
              <li>put returns between paragraphs</li>
              <li>for linebreak add 2 spaces at end</li>
              <li>_italic_ or **<b>bold</b>**</li>
              <li>indent code by 4 spaces</li>
              <li>backtick escapes `like _so_`</li>
              <li>quote by placing {">"} at start of line</li>
              <li>to make links (use https whenever possible)
              {"<"}https://example.com&gt;
                  [example](https://example.com)
                  <a href="https://example.com">example</a></li>

            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}
