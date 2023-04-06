import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link, useHistory } from "react-router-dom"
import { fetchUserProfileInfo, deleteUserThunk } from "../../../store/userProfile"
import OpenModalButton from "../../OpenModalButton"
import UpdateProfile from "../UpdateProfileModal"
import { logout } from "../../../store/session"
import './getUserProfile.css'


export default function UserProfilePage(){
  const dispatch = useDispatch()
  const history = useHistory()
  // console.log("useParams", useParams())
  const {userId} = useParams()
  const [isLoaded, setIsLoaded] = useState(false)

  // const options = { year: 'numeric', month: 'long', day:'numeric' };
  const options = { year: 'numeric', month: 'long', day:'numeric' };



  useEffect(() => {
    // console.log("start fetch?")
    dispatch(fetchUserProfileInfo(userId))
      .then(() => {
        setIsLoaded(true)
      })
  }, [dispatch, userId])

  const sessionUser = useSelector(state => {
    // console.log("%%%%%%%%%%%%%%%############ state ", state)
    return state.session.user
  })
  const currentProfileUser = useSelector(state => {
    // console.log("user from userProfile", state.userProfile.user)
    return state.userProfile.user
  })


  const currentProfileUserQuestions = useSelector(state => {
    // console.log("questions from userProfile", state.userProfile.questions)
    return state.userProfile.questions
  })

  const currentProfileUserAnswers = useSelector(state => {
    // console.log("answers from userProfile", state.userProfile.answers)
    return state.userProfile.answers
  })

 let questionSession
 let answerSession

  if (isLoaded) {


  const questions = currentProfileUserQuestions? Object.values(currentProfileUserQuestions):[]
  // console.log("real questions from userProfile", Array.isArray(questions[0]), questions)


  if (Array.isArray(questions[0])){
    questionSession = (
      <div className="no-question-answer">{questions[0][0]}</div>
    )
  }else{
    questionSession = (
      <div>
        {questions.map(question => (
              <div key={question.id} className="user-profile-single-question-container">
                <div className="single-question-like">{question.like_count} likes</div>
                <Link to={`/questions/${question.id}`}> {question.title.substring(0,30)}...</Link>
                <div>{new Date(question.updatedAt).toLocaleDateString("en-US", options)}</div>
              </div>
            ))}
      </div>
    )
  }



  const answers = currentProfileUserAnswers? Object.values(currentProfileUserAnswers):[]
  // console.log("real answers from userProfile", Array.isArray(answers), answers)


  if (Array.isArray(answers[0])){
    answerSession = (
      <div className="no-question-answer">{answers[0][0]}</div>
    )
  }else{
    answerSession = (
      <div>
        {answers.map(answer => (
          <div key={answer.id} className="user-profile-single-answer-container">
            <div className="single-answer-like">{answer.like_count} likes</div>
            <Link to={`/questions/${answer.question.id}`}>{answer.question.title.substring(0,30)}...</Link>
            <div>{new Date(answer.updatedAt).toLocaleDateString("en-US", options)}</div>
          </div>
        ))}
      </div>
      )
    }
  }

  const handleDelete = (userId) => async (e) => {
    await dispatch (deleteUserThunk(userId))
      .then(() => dispatch(logout()))
      .then( history.push('/'))
  }


  return (
    isLoaded &&(
      (currentProfileUser.is_deleted === 0)
      ? (<div className="user-profile-container">
          <div className="user-info">
            <div className="user-portrait">
              <img src={`${currentProfileUser.portrait}`} alt="" />
            </div>
            <div className="user-name-time-container">
              <div className="user-name">{currentProfileUser.username}</div>
              <div className="user-time">
                <img src="https://img.myloview.com/canvas-prints/simple-birthday-cake-icon-illustration-design-cake-symbol-with-outlined-style-template-vector-400-283950708.jpg" alt="" />
                <div>Member from {new Date(currentProfileUser.createdAt).toLocaleDateString("en-US", options)}</div>
              </div>

            </div>
            <div>
              {sessionUser && sessionUser.id === currentProfileUser.id ? <div className="update-profile"><OpenModalButton buttonText = "Update User" modalComponent={<UpdateProfile user={currentProfileUser}/>}/></div> : ""}
              {sessionUser && sessionUser.id === currentProfileUser.id ? <div className="update-profile"><button onClick={handleDelete(currentProfileUser.id)}>Delete User</button></div>:""}
            </div>
          </div>
          <div className="answers-questions">
            <div className="questions">
              <h3>All questions</h3>
              {questionSession}
            </div>
            <div className="answers">
              <h3>All answers</h3>
              {answerSession}
            </div>
          </div>
        </div>)
      :(<h2>user not exits now</h2>)
    )
  )
}
