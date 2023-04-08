import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllAnswersByQuestionId, fetchDeleteAnswer, fetchAnswerOneQuestion } from '../../../store/answer'
import { fetchOneQuestion } from "../../../store/question"
import { useHistory, useParams } from "react-router-dom"
import {Link} from 'react-router-dom'
import GetAllAnswerLikes from "../../AnswerLike/GetAllAnswerLike"

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import './getAllAnswer.css'


import LoginFormModal from '../../LoginFormModal';
import SignupFormModal from '../../SignupFormModal';
import OpenModalButton from "../../OpenModalButton";
import { StacksEditor } from "@stackoverflow/stacks-editor";
// don't forget to include the styles as well
import "@stackoverflow/stacks-editor/dist/styles.css";
// include the Stacks js and css as they're not included in the bundle
import "@stackoverflow/stacks";
import "@stackoverflow/stacks/dist/css/stacks.css";



export default function GetAllAnswers({questionId, answerAccount}) {
  // console.log("answerAccount from single question page", answerAccount)
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false);
  // console.log("GetAllAnswers component questionId", questionId)

  const sessionUser = useSelector(state => state.session.user)

  const allAnswers = useSelector(state => {
    // console.log("state from GetAllAnswers Component", state)
      return state.answer})

  useEffect(() => {
    dispatch(fetchAllAnswersByQuestionId(questionId)).then(() => setIsLoaded(true));
  }, [dispatch, questionId])

  // console.log("allAnswers", allAnswers)
  const answers = allAnswers? Object.values(allAnswers): []
  // console.log("answers", answers)

  const options = { year: 'numeric', month: 'numeric', day:'numeric' };

  const handleDelete = (answerId) => async (e) => {
    // console.log("handle delete ")
    await dispatch(fetchDeleteAnswer(answerId))
      .then(() => dispatch(fetchOneQuestion(questionId)))
      .then(() => {
        if (editorContainerRef.current) {
          const editorInstance = new StacksEditor(
            editorContainerRef.current,
            ""
          );

          setEditor(editorInstance);
        }
      })
      .then(() => setErrors(""))
    history.push(`/questions/${questionId}`)
  }




  let [answer_body, setAnser_body] = useState("")
  const [errors, setErrors] = useState([])
  const [editor, setEditor] = useState(null);

  const editorContainerRef = useRef(null);

  useEffect(() => {
    if (!editor) {
      if (editorContainerRef.current) {
        const editorInstance = new StacksEditor(
          editorContainerRef.current,
          ""
        );

        setEditor(editorInstance);
      }
    }

  }, [isLoaded]);


  const singleQuestion = useSelector(state => {
    // console.log("state from get single question component", state)
    return state.question.singleQuestion
  })
  const allAnswersForCurrentQuestion = useSelector(state => state.answer)
  const allId = []
  for (let answer of Object.values(allAnswersForCurrentQuestion)) {
    // console.log("anser", answer)
    // console.log("answer.user_id", answer.user_id)
    allId.push(answer.user_id)
  }
  // console.log("allId", allId)
  // console.log("sessionUser.id", sessionUser.id)
  let hasAnswer

  hasAnswer = sessionUser ? allId.includes(sessionUser.id) : true
  // console.log("hasAnswer", hasAnswer)
  // console.log("singleQuestion????????", singleQuestion)
  const question = singleQuestion ? singleQuestion : []


  const closeMenu = () => setShowMenu(false);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const postYourAnswer = async (e) => {

    e.preventDefault()
    const plainText = editor.content;
    // console.log("plainText", plainText);
    answer_body = plainText;
    editor.content = ""
    const newAnswer = {
      answer_body
    }
    const newAnswerThunkRes = await dispatch(fetchAnswerOneQuestion(newAnswer, singleQuestion.id))

    // console.log("newAnswerThunkRes", newAnswerThunkRes)
    if (typeof (newAnswerThunkRes) == "number") {
      dispatch(fetchOneQuestion(singleQuestion.id))
        .then(() => dispatch(fetchAllAnswersByQuestionId(singleQuestion.id)))
        // .then(() => closeModal())
        .catch(async (res) => {
          if (res && res.errors) setErrors(res.errors)
        });

      if (errors.length === 0) {
        history.push(`/questions/${singleQuestion.id}`)
      }
    } else {
      setErrors(newAnswerThunkRes)
      // console.log("errors", errors)
    }
  }




  return (
    isLoaded && (
      <div className="all-answer-container">
        <h2>{answerAccount} Answers</h2>
        {
          answers.map(answer => (
            <div key={answer.id} className="single-answer-container">
              {/* <div className="single-answer-likes">
                {answer.like_count} likes
              </div> */}
              <div className="get-all-answer-like-container"> <GetAllAnswerLikes answer={answer} questionId={questionId}/></div>
              <div className="single-answer-body-container">
                <div className="single-answer-body">
                <ReactMarkdown  plugins={[gfm]}>{answer.answer_body}</ReactMarkdown>
                </div>
                <div>
                  <div className="delete-update-answer-container">
                    {/* {sessionUser && sessionUser.id === answer.user_id ? <Link  className="delete-update-answer" to={`/questions/${questionId}/answers/${answer.id}`}>Edit Answer</Link>:""} */}

                    {sessionUser && sessionUser.id === answer.user_id ? <Link  className="delete-update-answer" to={`/questions/${questionId}/answers/${answer.id}/edit`}>Edit</Link>:""}
                    {sessionUser && sessionUser.id === answer.user_id ? <Link className="delete-update-answer" to={`/questions/${questionId}`} onClick ={handleDelete(answer.id)}>Delete</Link>:""}
                  </div>
                  <div className="single-answer-time-user">
                    <div className="single-answer-time">edited: {new Date(answer.updatedAt).toLocaleDateString("en-US", options)}</div>
                    <Link className="single-answer-user-profile" to={`/users/${answer.user.id}`}>
                      <img src={`${answer.user.portrait}`} alt="" />
                      <div className="single-answer-user"> {answer.user.username} </div>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))
        }


        {sessionUser
          ? (question.user_id !== sessionUser.id && !hasAnswer
            ? <div className='ansers-and-package'>
              <div className='answer-question-title-error-package'>
                <h2>Your answer</h2>
                <ul className="">
                  {errors.length > 0 && errors.map((error, idx) => (
                    <li className='create-question-package-errors-item' key={idx}>{error}</li>
                  ))}
                </ul>
                <div ref={editorContainerRef} />
              </div>
              <div className="post-answer-button"><button onClick={postYourAnswer}>Post Your Answer</button></div>
            </div> : "")
          : <div className='ansers-and-package'>
            <div>
              <h2>Your answer</h2>
              <ul className="">
                  {errors.length > 0 && errors.map((error, idx) => (
                    <li className='create-question-package-errors-item' key={idx}>{error}</li>
                  ))}
                </ul>
              <div ref={editorContainerRef} className="answer-question-package-no-login" />
            </div>
            <div className='let-you-signup-or-login-first'>
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              <span> or </span>
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              /> first to answer question
            </div>
          </div>
        }

      </div>
    )

  )
}
