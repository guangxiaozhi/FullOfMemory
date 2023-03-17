import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory,  useParams} from 'react-router-dom';
import {fetchOneQuestion, fetchAllQuestions, deleteOneQuestionThunk} from '../../../store/question';
import OpenModalButton from "../../OpenModalButton";
import UpdateQuestion from '../UpdateQuestionModal';
import GetAllAnswers from '../../Answer/GetAllAnswers'
import AnswerQuestion from '../../Answer/AnserQuestionModal'
import GetAllLikes from '../../QuestionLike/GetAllLikes'
import './singleQuestion.css'

function GetSingleQuestion() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {questionId} = useParams();
  // const [errors, setErrors] = useState([])

  const sessionUser = useSelector(state => state.session.user)

  const singleQuestion = useSelector(state => {
    // console.log("state from get single question component", state)
    return state.question.singleQuestion})

  const allAnswersForCurrentQuestion = useSelector(state => state.answer)

  // console.log("allAnswersForCurrentQuestion", allAnswersForCurrentQuestion)
  // console.log("allAnswersForCurrentQuestion", Object.values(allAnswersForCurrentQuestion))

  const allId = []
  for (let answer of Object.values(allAnswersForCurrentQuestion)){
    // console.log("anser", answer)
    // console.log("answer.user_id", answer.user_id)
    allId.push(answer.user_id)
  }
  // console.log("allId", allId)
  // console.log("sessionUser.id", sessionUser.id)
  let hasAnswer

  hasAnswer = sessionUser ? allId.includes(sessionUser.id): true
  // console.log("hasAnswer", hasAnswer)
  // console.log("singleQuestion????????", singleQuestion)
  const question = singleQuestion?singleQuestion:[]
  // console.log("???????? question", question)
  // console.log("???????? sessionUser", sessionUser)

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect( async () => {
    // console.log("%%%%%% start fetchONeQuestion")
    const result = await dispatch(fetchOneQuestion(+questionId))
    // console.log("result form fetchOneQuestion", result, typeof(result))
    if (typeof(result) === "number"){
      setIsLoaded(true)
    }else{
      // console.log("result form fetchOneQuestion", result, typeof(result))
      history.push('questions/*')
    }
  }, [dispatch, questionId])

  const handleDelete = (questionId) => async (e) => {
    // console.log("handle delete ")
    // console.log("delete question 1")
    await dispatch(deleteOneQuestionThunk(questionId))
      .then(() => dispatch(fetchAllQuestions()))
      .then( history.push('/'))

  }


  let answerQuestionSession

  if(!sessionUser ){
    answerQuestionSession = (
      <div className="answer-question-model"><OpenModalButton buttonText = "Answer Question" modalComponent={<AnswerQuestion singleQuestion={question}/>}/></div>
    )
  }else {
    if (question.user_id !== sessionUser.id && !hasAnswer){
      answerQuestionSession = (<div className="answer-question-model"><OpenModalButton buttonText = "Answer Question" modalComponent={<AnswerQuestion singleQuestion={question}/>}/></div>)
    }
  }



  const options = { year: 'numeric', month: 'numeric', day:'numeric' };
  return (
    isLoaded && question && (
      <div key={question.id} className="single-question-root-container">
        <div className="single-question-container">
          <div className="single-like-answer">
          <div> <GetAllLikes questionId = {question.id}/> </div>
          <div className='single-answer'>{question.answer_count} answers</div>
        </div>
        <div className='single-question-body'>
          <div className='single-title'>{question.title}</div>
          <div className= 'single-time'>
            <p className= 'time'>createdAt: {new Date(question.createdAt).toLocaleDateString("en-US", options)}</p>
            <p className= 'time'>updatedAt: {new Date(question.updatedAt).toLocaleDateString("en-US", options)}</p>
          </div>
          <div className='single-description'> {question.description}</div>
          <div className="single-tag-username">
            <div className="single-tags">{question.tags}</div>
            <Link className='single-user-profile' to={`/users/${question.user.id}`}>
              <img src={`${question.user.portrait}`} alt="" />
              <div className="single-username">{question.user.username}</div>
            </Link>

          </div>
          {answerQuestionSession}
        </div>
        <div className='update-delete-button-container'>
          {sessionUser && question.user_id === sessionUser.id ? <div className="delete-update-question"><button onClick={handleDelete(question.id)}>Delete Question</button></div> : ""}
          {sessionUser && question.user_id === sessionUser.id ? <div className="delete-update-question"><OpenModalButton buttonText = "Update Question" modalComponent={<UpdateQuestion singleQuestion={question}/>}/></div> : ""}
        </div>
        </div>

        <div className='all-answers-owned-by-current-question'>
          {question.answer_count? <GetAllAnswers questionId={question.id}/> : ""}
        </div>
      </div>
    )
  )

}

export default GetSingleQuestion
