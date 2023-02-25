import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory,  useParams} from 'react-router-dom';
import {fetchOneQuestion, deleteOneQuestionThunk} from '../../../store/question';
import OpenModalButton from "../../OpenModalButton";
import UpdateQuestion from '../UpdateQuestionModal';
import GetAllAnswers from '../../Answer/GetAllAnswers'
import AnswerQuestion from '../../Answer/AnserQuestionModal'
import './singleQuestion.css'

function GetSingleQuestion() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {questionId} = useParams();

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
  const isHave = allId.includes(sessionUser.id)
  // console.log("isHave", isHave)
  // console.log("singleQuestion????????", singleQuestion)
  const question = singleQuestion?singleQuestion:[]
  // console.log("???????? question", question)
  // console.log("???????? sessionUser", sessionUser)

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect( () => {
    // console.log("%%%%%% start fetchONeQuestion")
    dispatch(fetchOneQuestion(+questionId)).then(() => setIsLoaded(true));
  }, [dispatch, questionId])

  const handleDelete = (questionId) => async (e) => {
    // console.log("handle delete ")
    await dispatch(deleteOneQuestionThunk(questionId))
    history.push(`/`)
  }

  const handleUpdate = (questionId) => async (e) => {
    history.push(`/questions/${questionId}/update`)
  }

  const options = { year: 'numeric', month: 'numeric', day:'numeric' };
  return (
    isLoaded && (
      <div key={question.id} className="single-question-root-container">
        <div className="single-question-container">
          <div className="single-like-answer">
          <div>{question.like_count} likes</div>
          <div className='single-answer'>{question.answer_count} answers</div>
        </div>
        <div className='single-question-body'>
          <div className='single-title'>{question.title}</div>
          <div className= 'single-time'>
            <p className= 'time'>createdAt: {new Date(question.createdAt).toLocaleDateString("en-US", options)}</p>
            <p className= 'time'>updatedAt: {new Date(question.updatedAt).toLocaleDateString("en-US", options)}</p>
          </div>
          <div className='single-description'> {question.description}</div>
          <div className="tags">{question.tags}</div>
          <div>{sessionUser && question.user_id !== sessionUser.id && !isHave? <div className="answer-question-model"><OpenModalButton buttonText = "Answer Question" modalComponent={<AnswerQuestion singleQuestion={question}/>}/></div> : ""}</div>
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
