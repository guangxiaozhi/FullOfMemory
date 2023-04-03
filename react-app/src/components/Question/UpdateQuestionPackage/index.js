import { useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";

import { updateQuestionThunk, fetchOneQuestion } from "../../../store/question"

import './updateQuestionPackage.css'

import { StacksEditor } from "@stackoverflow/stacks-editor";
// don't forget to include the styles as well
import "@stackoverflow/stacks-editor/dist/styles.css";
// include the Stacks js and css as they're not included in the bundle
import "@stackoverflow/stacks";
import "@stackoverflow/stacks/dist/css/stacks.css";


export default function UpdateQuestionPackage(){
  const { questionId } = useParams()
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch()

  let question = useSelector(state => state.question.singleQuestion)
  question ? console.log(Object.values(question)): console.log("no question")


  const [title, setTitle] = useState(question?.title || localStorage.getItem("title") || "");
  const [description, setDescription] = useState(question?.description || localStorage.getItem("description") || "");
  console.log("description", description)
  const [tags, setTags] = useState(question?.tags || localStorage.getItem("tags") || "")
  const [editor, setEditor] = useState(null);

  const [errors, setErrors] = useState([]);
  const history = useHistory()

  // console.log("description", description)
  const editorContainerRef = useRef(null);
  // const tryContainerRef = useRef(null);


  const editorRef = useRef(null);
  useEffect(() => {
    if (editorContainerRef.current) {
      const editorInstance = new StacksEditor(
        editorContainerRef.current,
        description
      );
      return () => {
        if (editorRef.current) {
          editorRef.current.destroy();
          editorRef.current = null;
        }
      };
    }
  }, [description]);

  useEffect(() => {
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("tags", tags);

  }, [title, description, tags]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const editorInstance = editorRef.current;
    if (editorInstance) {
      description = editorInstance.content;
    }
    const questionId = question.id;
    // const userId = sessionUser.id
    const updatedQuestion = {
      title,
      description,
      tags,
    }

    const updatedQuestionRes = await dispatch(updateQuestionThunk(updatedQuestion,questionId))
    if(typeof(updatedQuestionRes) == "number"){
      dispatch(fetchOneQuestion(questionId))
        // .then(closeModal())
        // .catch(
        //   async (res) => {
        //       // const data = await res.json();
        //       // console.log("data", data.errors)
        //       if (res && res.errors) setErrors(res.errors);
        //   }
        // )
        // .then(() => setIsLoaded(true))
        .then(() => history.push(`/questions/${question.id}`))
    }else{
      // setIsLoaded(true)
      setErrors(updatedQuestionRes)
    }

  }

  return (
    <div className="update-package-container">
      <form className="update-question-container" onSubmit={handleUpdate}>
        <div className="update-question-title">
          <label className='question-body-item'>
            <span >Title:</span>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="update-question-description">
          <span> Body </span>
          <div ref={editorContainerRef} id="editor-container"  />
        </div>
        <div className="update-question-tags">
          <label className='question-body-item'>
            <span>Tags:</span>
            <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
          </label>
        </div>

        <div className="update-question-package">
          <button  type="submit">Save edits</button>
          <Link to={`/questions/${parseInt(question.id)}`}>Cancel</Link>
        </div>
      </form>
      <div className="fixed-container">
        <div className="fixed-title">How to Edit</div>
        <div className="fixed-list">
          <ul>
          <li>Correct minor typos or mistakes</li>
          <li>Clarify meaning without changing it</li>
          <li>Add related resources or links</li>
          <li>Always respect the author's intent</li>
          <li>Don't use edits to reply to the author</li>
        </ul>
        </div>

      </div>
    </div>
  )
}
