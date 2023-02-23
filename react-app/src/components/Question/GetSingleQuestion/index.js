import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory,  useParams} from 'react-router-dom';
import {fetchOneQuestion, deleteOneQuestionThunk} from '../../../store/question';
import OpenModalButton from "../../OpenModalButton";
import UpdateQuestion from '../UpdateQuestionModal';
import './singleQuestion.css'

function GetSingleQuestion() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {questionId} = useParams();

  const sessionUser = useSelector(state => state.session.user)

  const singleQuestion = useSelector(state => {
    // console.log("state from get single question component", state)
    return state.question.singleQuestion})

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
      <div key={question.id} className="single-question-container">
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
        </div>
        <div>
          {sessionUser && question.user_id === sessionUser.id ? <button className="delete-update-question" onClick={handleDelete(question.id)}>Delete Question</button> : ""}
          {sessionUser && question.user_id === sessionUser.id ? <OpenModalButton className="delete-update-question" buttonText = "Update Question" modalComponent={<UpdateQuestion singleQuestion={question}/>}/> : ""}
        </div>
      </div>
    )
  )

}

export default GetSingleQuestion
