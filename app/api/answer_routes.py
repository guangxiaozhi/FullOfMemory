from flask import Blueprint
from app.models import db, Answer, User, AnswerLike
from .question_routes import question_routes

answer_routes = Blueprint('answer', __name__)

@answer_routes.route('/')
def get_all_answers():
    answers = Answer.query.all()
    data = [answer.to_dict() for answer in answers]
    print("all answers", data)
    return data

@question_routes.route('/<int:questionId>/answers')
def get_answers_by_questionId(questionId):
  answers = Answer.query.filter(Answer.question_id == questionId)

  data = []
  for answer in answers:
    user = User.query.filter(User.id == answer.user_id).all()
    likes = AnswerLike.query.filter(AnswerLike.answer_id == answer.id).all()
    print("user by answer user_id", user[0].to_dict())
    print("answer by question id", answer.to_dict())
    answerInfo = {}
    answerInfo.update(answer.to_dict())
    answerInfo["user"]=user[0].to_dict()
    answerInfo["like_count"] = len(likes)
    print("answerInfo",answerInfo)
    data.append(answerInfo)
  print("data", data)
  return data
