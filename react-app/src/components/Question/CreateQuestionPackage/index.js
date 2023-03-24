// import ReactQuill from "react-quill"
import { useState, useRef, useEffect } from "react"
import './createQuestionPackage.css'
import askQuestionImg from './question.png'

import { StacksEditor } from "@stackoverflow/stacks-editor";
// don't forget to include the styles as well
import "@stackoverflow/stacks-editor/dist/styles.css";
// include the Stacks js and css as they're not included in the bundle
import "@stackoverflow/stacks";
import "@stackoverflow/stacks/dist/css/stacks.css";

export default function CreateQuestionPackage() {
  const [description, setDescription] = useState("")
  const editorContainerRef = useRef(null);
  const tryContainerRef = useRef(null);

  useEffect(() => {
    if (editorContainerRef.current) {
      new StacksEditor(
        editorContainerRef.current,
        " "
      );
    }

    if (tryContainerRef.current) {
      new StacksEditor(
        tryContainerRef.current,
        " "
      );
    }
  }, []);


  return (
    <div className="question-package-container">

      <div className="ask-writing-container">
        <div className="ask-img-container">
          <h1 className="ask-h1">Ask a pulblic question</h1>
          {/* <img src={askQuestionImg}></img> */}
          <img src="https://cdn.sstatic.net/Img/ask/background.svg?v=2e9a8205b368"></img>
        </div>

        <div className="writing-container">
          <h2>Writing a good question</h2>
          <p>You’re ready to ask a programming-related question and this form will help guide you through the process.</p>
          <p>Looking to ask a non-programming question? See the topics here to find a relevant site.</p>
          <h5>Steps</h5>
          <ul>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Add “tags” which help surface your question to members of the community.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
      </div>

      <div className="about-question">
        <div className="about-title">
          <div>
            <div>
              <div><label>Title</label></div>
              <div><label>Be specific and imagine you’re asking a question to another person.</label></div>
            </div>
            <div><input placeholder="e.g. Is there an R function for finding the index of an element in a vector?" /></div>
          </div>
          <button className="next-button">Next</button>
        </div>

        <div className="about-description">
          <div className="real-description">
            <div>
              <label>"What are the details of your problem?" <p>"Introduce the problem and expand on what you put in the title. Minimum 20 characters."</p></label>
            </div>
            <div ref={editorContainerRef} id="editor-container" />
            <button className="next-button">Next</button>
          </div>
          <div className="explain-of-description">
            <div>Introduce the problem</div>
            <div>
              <i class="fas fa-pencil"></i>
              <div>Explain how you encountered the problem you're trying to solve, and any difficulties that have prevented you from solving it yourself.</div>
            </div>
          </div>
        </div>

        <div className="about-try-expecting">
          <div className="real-description">
            <div>
              <label>"What did you try and what were you expecting?" <p>"Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters."</p></label>
            </div>
            <div ref={tryContainerRef} id="editor-container" />
            <button className="next-button">Next</button>
          </div>
        </div>

        <div className="about-tags">
          <div>
            <label>Tags<div>Add up to 5 tags to describe what your question is about.</div></label>
          </div>
          <input placeholder="e.g. (ios ruby objective-c)"></input>
        </div>
      </div>

      <button>Post your question</button>

    </div>
  )
}
