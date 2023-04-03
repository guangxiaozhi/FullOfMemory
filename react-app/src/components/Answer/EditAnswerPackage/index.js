import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

import './editAnswerPackage.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchEditAnswer } from "../../../store/answer"

import { StacksEditor } from "@stackoverflow/stacks-editor";
// don't forget to include the styles as well
import "@stackoverflow/stacks-editor/dist/styles.css";
// include the Stacks js and css as they're not included in the bundle
import "@stackoverflow/stacks";
import "@stackoverflow/stacks/dist/css/stacks.css";

export default function UpdateAnswerPackage() {
  const dispatch = useDispatch()
  const history = useHistory()

  const {questionId, answerId} = useParams()
  const oldAnswer = useSelector(state => state.answer[`${answerId}`])
  const [errors, setErrors] = useState([])

  const [answer_body, setAnser_body] = useState(oldAnswer?.answer_body || localStorage.getItem("answer_body") || "");

  const [editor, setEditor] = useState(null);
  const editorContainerRef = useRef(null);

  useEffect(() => {
    if (editorContainerRef.current) {
      const editorInstance = new StacksEditor(
        editorContainerRef.current,
        answer_body
      );
      setEditor(editorInstance);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("answer_body", answer_body);

  }, [answer_body]);

  const handleUpdate = async() => {
    let plaint
    if (editor){
      plaint = editor.content
    }
    const newAnswer = {
      answer_body:plaint
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
      <div className='update-answer-package'>
        <div className='anser-title'><span>Answer</span></div>
        <div ref={editorContainerRef} id="editor-container"  />
        <div className='button-and-cancel'>
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
