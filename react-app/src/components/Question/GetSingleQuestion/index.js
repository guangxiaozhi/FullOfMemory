import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { fetchOneQuestion, fetchAllQuestions, deleteOneQuestionThunk } from '../../../store/question';
import { fetchAnswerOneQuestion, fetchAllAnswersByQuestionId } from '../../../store/answer'
import OpenModalButton from "../../OpenModalButton";
import UpdateQuestion from '../UpdateQuestionModal';
import GetAllAnswers from '../../Answer/GetAllAnswers'
import AnswerQuestion from '../../Answer/AnserQuestionModal'
import GetAllLikes from '../../QuestionLike/GetAllLikes'
import LoginFormModal from '../../LoginFormModal';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './singleQuestion.css'

function GetSingleQuestion() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { questionId } = useParams();
  let [answer_body, setAnser_body] = useState("")
  const [errors, setErrors] = useState([])

  const [value, setValue] = useState('');
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

  const sessionUser = useSelector(state => state.session.user)

  const singleQuestion = useSelector(state => {
    // console.log("state from get single question component", state)
    return state.question.singleQuestion
  })

  const allAnswersForCurrentQuestion = useSelector(state => state.answer)

  // console.log("allAnswersForCurrentQuestion", allAnswersForCurrentQuestion)
  // console.log("allAnswersForCurrentQuestion", Object.values(allAnswersForCurrentQuestion))

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
  console.log("???????? question", question)
  // console.log("???????? sessionUser", sessionUser)

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    // console.log("%%%%%% start fetchONeQuestion")
    const result = await dispatch(fetchOneQuestion(+questionId))
    console.log("result form fetchOneQuestion", result, typeof (result))
    if (typeof (result) === "number") {
      setIsLoaded(true)
    } else {
      // console.log("result form fetchOneQuestion", result, typeof(result))
      history.push('questions/*')
    }
  }, [dispatch, questionId])

  const handleDelete = (questionId) => async (e) => {
    // console.log("handle delete ")
    // console.log("delete question 1")
    await dispatch(deleteOneQuestionThunk(questionId))
      .then(() => dispatch(fetchAllQuestions()))
      .then(history.push('/'))

  }


  let answerQuestionSession

  // if(!sessionUser ){
  //   answerQuestionSession = (
  //     <div className="answer-question-model"><OpenModalButton buttonText = "Answer Question" modalComponent={<AnswerQuestion singleQuestion={question}/>}/></div>
  //   )
  // }else {
  //   if (question.user_id !== sessionUser.id && !hasAnswer){
  //     answerQuestionSession = (<div className="answer-question-model"><OpenModalButton buttonText = "Answer Question" modalComponent={<AnswerQuestion singleQuestion={question}/>}/></div>)
  //   }
  // }


  const jumpingToUpdateQuestion = (e) => {
    e.preventDefault()
    history.push(`/questions/${question.id}/edit`)
  }
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

  const postYourQuestion = async (e) => {

    e.preventDefault()
    const plainText = document.getElementsByClassName("ql-editor")[0].innerText;
    console.log("plainText", plainText);
    answer_body = plainText;
    setValue("")
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
      console.log("errors", errors)
    }
  }

  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

  // let errorContainer
  // if (!sessionUser){
  //   errorContainer = "hasError"
  // }else{
  //   errorContainer = "noError"
  // }

  return (
    isLoaded && (
      <div key={question.id} className="single-question-root-container">
        <div className="single-question-container">
          <div className="single-like-answer">
            <div> <GetAllLikes questionId={question.id} /> </div>
            <div className='single-answer'>{question.answer_count} answers</div>
          </div>
          <div className='single-question-body'>
            <div className='single-title'>{question.title}</div>
            <div className='single-time'>
              <p className='time'>Asked {new Date(question.createdAt).toLocaleDateString("en-US", options)}</p>
              <p className='time'>Modified {new Date(question.updatedAt).toLocaleDateString("en-US", options)}</p>
            </div>
            <div className='single-description'> {question.description}</div>
            <div className="single-tags">{question.tags}</div>
            {/* {answerQuestionSession} */}
          </div>
        </div>
        <div className='update-delete-button-container'>
          <div className='update-delete-button'>
            {sessionUser && question.user_id === sessionUser.id ? <div className="delete-update-question"><button onClick={handleDelete(question.id)}>Delete</button></div> : ""}
            {/* {sessionUser && question.user_id === sessionUser.id ? <div className="delete-update-question"><OpenModalButton buttonText = "Update Question" modalComponent={<UpdateQuestion singleQuestion={question}/>}/></div> : ""} */}
            {sessionUser && question.user_id === sessionUser.id ? <div className="delete-update-question"><button onClick={jumpingToUpdateQuestion}>Edit</button></div> : ""}

          </div>
          <div className="single-tag-username">
            <Link className='single-user-profile' to={`/users/${question.user.id}`}>
              <img src={`${question.user.portrait}`} alt="" />
              <div className="single-username">{question.user.username}</div>
            </Link>
          </div>
        </div>

        <div className='single-question-related-answers-container'>
          <div className='all-answers-owned-by-current-question'>
            {question.answer_count ? <GetAllAnswers questionId={questionId} /> : ""}
          </div>
          {sessionUser
            ? (question.user_id !== sessionUser.id && !hasAnswer
              ? <div className='ansers-and-package'>
                <div className='answer-question-title-error-package'>
                  <h2>Your Answer</h2>
                  <ul className="">
                    {errors.map((error, idx) => (
                      <li className='create-question-package-errors-item' key={idx}>{error}</li>
                    ))}
                  </ul>
                  <ReactQuill value={value} onChange={setValue} modules={modules} className='answer-question-package' />
                </div>
                <div><button onClick={postYourQuestion}>Post Your Answer</button></div>
              </div> : "")
            : <div className='ansers-and-package'>
              <div>
                <h2>Your Answer</h2>
                <ul className="">
                  {errors.map((error, idx) => (
                    <li className='create-question-package-errors-item' key={idx}>{error}</li>
                  ))}
                </ul>
                <ReactQuill value={value} onChange={setValue} modules={modules} />
              </div>
              <div>
                Sign up or <OpenModalButton
                  buttonText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                /> first to answer question
              </div>
              <div><button onClick={postYourQuestion}>Post Your Answer</button></div>
            </div>
          }

        </div>

      </div>
    )
  )

}

export default GetSingleQuestion
