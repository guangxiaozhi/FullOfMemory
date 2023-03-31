// import ReactQuill from "react-quill"
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import './createQuestionPackage.css'
import { createQuestionThunk, fetchAllQuestions } from "../../../store/question";
import LoginFormModal from '../../LoginFormModal';

import { StacksEditor } from "@stackoverflow/stacks-editor";
// don't forget to include the styles as well
import "@stackoverflow/stacks-editor/dist/styles.css";
// include the Stacks js and css as they're not included in the bundle
import "@stackoverflow/stacks";
import "@stackoverflow/stacks/dist/css/stacks.css";

const pencilSVG = (<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m19 20.25c0-.402-.356-.75-.75-.75-2.561 0-11.939 0-14.5 0-.394 0-.75.348-.75.75s.356.75.75.75h14.5c.394 0 .75-.348.75-.75zm-7.403-3.398 9.124-9.125c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-9.143 9.103c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 7.651-7.616 2.335 2.327-7.637 7.638z" fill-rule="nonzero"/></svg>)

export default function CreateQuestionPackage() {
  const [title, setTitle] = useState("")
  let [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [editor, setEditor] = useState(null);

  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch()
  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user);

  const editorContainerRef = useRef(null);
  // const tryContainerRef = useRef(null);

  useEffect(() => {
    if (editorContainerRef.current) {
      const editorInstance = new StacksEditor(
        editorContainerRef.current,
        ""
      );

      setEditor(editorInstance);
      // editorInstance.editor.commands.addHelpCommand("https://stackoverflow.com/editing-help");

    }
  }, []);

  useEffect(() => {
    const helpButtonElement = document.querySelector(
      ".stacks-editor .toolbar .help"
    );
    if (helpButtonElement) {
      helpButtonElement.setAttribute(
        "href",
        "https://full-of-memory.onrender.com/"
      );
    }
  }, []);
  // useEffect(() => {
  //   if (editorContainerRef.current) {
  //     const editorInstance = new StacksEditor(editorContainerRef.current, "");
  //     editorInstance.commands.updateToolbar = () => {
  //       const helpButtonElement = document.querySelector(
  //         ".stacks-editor .toolbar .help"
  //       );
  //       if (helpButtonElement) {
  //         helpButtonElement.setAttribute(
  //           "href",
  //           "https://stackoverflow.com/editing-help"
  //         );
  //       }
  //     };
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editor) {
      console.log("has editor")
      console.log("editor", editor)
      console.log("editor content", editor.content)
      description = editor.content
    }
    // setDescription(editor.getContent());
    // alert(description)
    const newQuestion = {
      title,
      description,
      tags
    }
    // console.log("handle submit newQuestion", newQuestion)
    const createdQuestionRes = await dispatch(createQuestionThunk(newQuestion))
    // console.log("createdQuestionRes", createdQuestionRes)
    if (typeof(createdQuestionRes) == "number"){
      dispatch(fetchAllQuestions())
        .then(() => history.push('/'))
    }else{
      setErrors(createdQuestionRes)
    }

  }

    let errorContainer = errors.length > 0 ? "create-question-package-errors-container" : "no-boder"

    let sessionLinks
    if(sessionUser){
      sessionLinks =(
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

        <form className="about-question"  onSubmit={handleSubmit}>
          <ul className={errorContainer}>
              {errors.map((error, idx) => (
                  <li  className='create-question-package-errors-item' key={idx}>{error}</li>
              ))}
          </ul>
          <div className="about-title">
            <div className="create-question-package-title">
              <div className="create-question-title-label">
                <div className="create-question-title-title">Title</div>
                <div className="create-question-title-descripe">Be specific and imagine you're asking a question to another person.</div>
              </div>
              <div className="create-question-title-input"><input placeholder="e.g. Is there an R function for finding the index of an element in a vector?" onChange={(e) => setTitle(e.target.value)}/></div>
            </div>
            <div className="title-description-container">
                <div className="title-description-title">Writing a good title</div>
                <div className="title-description">
                  <div className="icon">{pencilSVG}</div>
                  <div className="description-about-title">
                    <p>Your title should summarize the problem.</p>
                    <p>You might find that you have a better idea of your title after writing out the rest of the question.</p>
                  </div>
                </div>
            </div>
          </div>

          <div className="about-description">
            <div className="real-description">
              <div className="description">
                <label className="description-lable">What are the details of your problem? <p className="description-p">Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p></label>
              </div>

              <div className="description-editor" ref={editorContainerRef} id="editor-container"  />

            </div>
            <div className="explain-of-description">
              <div className="explain-description-title">Introduce the problem</div>
              <div className="explain-description-container">
                {/* <i class="fas fa-pencil"></i> */}
                <div className="icon">{pencilSVG}</div>
                <div className="explain-description-description">Explain how you encountered the problem you're trying to solve, and any difficulties that have prevented you from solving it yourself.</div>
              </div>
            </div>
          </div>

          {/* <div className="about-try-expecting">
            <div className="real-description">
              <div>
                <label>"What did you try and what were you expecting?" <p>"Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters."</p></label>
              </div>
              <div ref={tryContainerRef} id="editor-container" />
              <button className="next-button">Next</button>
            </div>
          </div> */}

          <div className="about-tags">
            <div className="real-tags">
              <div className="real-tags-title-descript">
                <div className="real-tags-title">Tags</div>
                <div className="real-tags-descript">Add up to 5 tags to describe what your question is about.</div>
              </div>
              <div className="real-tags-input">
                <input placeholder="e.g. (ios ruby objective-c)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}></input>
              </div>
            </div>
            <div className="tags-description-container">
            <div className="title-description-title"> Adding tags </div>
                <div className="title-description">
                  <div className="icon">{pencilSVG}</div>
                  <div className="description-about-title">
                    <p>Tags help ensure that your question will get attention from the right people.</p>
                    <p>Tag things in more than one way so people can find them more easily. Add tags for product lines, projects, teams, and the specific technologies or languages used.</p>
                  </div>
                </div>
            </div>
          </div>
          <button className="ask-question-package-button" type="submit">Post your question</button>


        </form>


        </div>
            )
    }else {
            sessionLinks = (
              <div>
                <LoginFormModal />
              </div>
            )
          }
    // console.log("errorContainer", errorContainer)
  return (
    sessionLinks
  )
}
