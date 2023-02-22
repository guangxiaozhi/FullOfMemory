from flask import Blueprint
from app.models import Question, Answer, QuestionLike

question_routes = Blueprint('questions', __name__)


# Get all Questions
@question_routes.route('/')
def get_all_question():
    questions = Question.query.all()
    # data = [ques.to_dict() for ques in questions]
    data = []
    for question in questions:
      answer_count = len(Answer.query.filter(Answer.question_id == question.id).all())
      like_count = len(QuestionLike.query.filter(QuestionLike.question_id ==question.id).all())
      print("answer_count", answer_count)
      questionInfo = {}
      questionInfo.update(question.to_dict())
      questionInfo["answer_count"] = answer_count
      questionInfo["like_count"] = like_count
      data.append(questionInfo)
    return {"questions": data}


# Get Question by Question Id
@question_routes.route('/<int:id>')
def get_question_by_id(id):
   question = Question.query.get(id)
   like_count = len(QuestionLike.query.filter(QuestionLike.question_id ==question.id).all())
   answer_count = len(Answer.query.filter(Answer.question_id == question.id).all())
   questionInfo = {"answer_count":answer_count, "like_count": like_count}
   questionInfo.update(question.to_dict())
   return {"question" : questionInfo}
