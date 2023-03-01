import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { fetchUserProfileInfo } from "../../../store/userProfile"
import './getUserProfile.css'


export default function UserProfilePage(){
  const dispatch = useDispatch()
  console.log("useParams", useParams())
  const {userId} = useParams()
  const [isLoaded, setIsLoaded] = useState(false)

  const variable = useSelector(state => {
    console.log("state from userProfile", state)
  })

  const currentProfileUser = useSelector(state => {
    console.log("user from userProfile", state.userProfile.user)
    return state.userProfile.user
  })

  const currentProfileUserQuestions = useSelector(state => {
    console.log("questions from userProfile", state.userProfile.questions)
    return state.userProfile.questions
  })

  const questions = currentProfileUserQuestions? Object.values(currentProfileUserQuestions):[]
  console.log("real questions from userProfile", Array.isArray(questions), questions)

  const currentProfileUserAnswers = useSelector(state => {
    console.log("answers from userProfile", state.userProfile.answers)
    return state.userProfile.answers
  })

  const answers = currentProfileUserAnswers? Object.values(currentProfileUserAnswers):[]
  console.log("real answers from userProfile", Array.isArray(answers), answers)

  useEffect(() => {
    dispatch(fetchUserProfileInfo(userId)).then(() => {
      return setIsLoaded(true)
    })
  }, [dispatch])


  const options = { year: 'numeric', month: 'long', day:'numeric' };

  return (
    isLoaded && (
      <div>
      <h2> current user profile page</h2>
      <div className="user-info">
        <div className="user-portrait">
        <img src="https://www.gravatar.com/avatar/b4ef3ecedbeb1da0e39d12175ffe87a7?s=256&d=identicon&r=PG" alt="" />
        </div>
        <div className="user-name-time">
          <div>{currentProfileUser.username}</div>
          <div>{new Date(currentProfileUser.createdAt).toLocaleDateString("en-US", options)}</div>
        </div>

        </div>
        <div className="answers-questions">
          <div className="questions">
            <h3>All questions</h3>
            {questions.map(question => (
              <div key={question.id}>
                <div>{question.like_count} likes</div>
                <Link to={`/questions/${question.id}`}> {question.title}</Link>
                <div>{new Date(question.updatedAt).toLocaleDateString("en-US", options)}</div>
              </div>
            ))}
          </div>
          <div className="answers">
              <h3>All answers</h3>
              {answers.map(answer => (
                <div key={answer.id}>
                  <div>{answer.like_count} likes</div>
                  <Link to={`/questions/${answer.question.id}`}>{answer.question.title}</Link>
                  <div>{new Date(answer.updatedAt).toLocaleDateString("en-US", options)}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  )
}
