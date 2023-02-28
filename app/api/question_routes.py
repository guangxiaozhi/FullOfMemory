from flask import Blueprint, request
from app.models import db, Question, Answer, QuestionLike
from flask_login import current_user, login_required

from app.forms.question_form import QuestionForm
from sqlalchemy.sql import func

question_routes = Blueprint('questions', __name__)


# Delete question by id
@question_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_question(id):
   # print("delete start")
   question = Question.query.get(id)

   if not question:
      return {"errors": ["Question couldn't be found"]}, 404

   if not question.user_id == current_user.id:
      return {"errors": ["you cann't delete the question is not owned you"]}, 403

   db.session.delete(question)
   db.session.commit()
   return {"message": ["Successfully deleted"]},200

# Get all Questions
@question_routes.route('/')
def get_all_question():
    questions = Question.query.all()
    # data = [ques.to_dict() for ques in questions]
    data = []
    for question in questions:
      answer_count = len(Answer.query.filter(Answer.question_id == question.id).all())
      question_likes = QuestionLike.query.filter(QuestionLike.question_id ==question.id).all()
      like_count = 0
      for like in question_likes:
         like_count = like_count + like.like_unlike
      # print("answer_count", answer_count)
      questionInfo = {}
      questionInfo.update(question.to_dict())
      questionInfo["answer_count"] = answer_count
      questionInfo["like_count"] = like_count
      data.append(questionInfo)
    return data


# Get Question details by Question Id
@question_routes.route('/<int:id>')
def get_question_by_id(id):
   # print("$$$$$ question id", id)
   question = Question.query.get(id)
   if not question:
      return {"errors": ["question couldn't be found"]}, 404

   question_likes = QuestionLike.query.filter(QuestionLike.question_id ==question.id).all()
   like_count = 0
   for like in question_likes:
      like_count = like_count + like.like_unlike
   answer_count = len(Answer.query.filter(Answer.question_id == question.id).all())
   questionInfo = {"answer_count":answer_count, "like_count": like_count}
   questionInfo.update(question.to_dict())

   return questionInfo

# Get current user's questions
@question_routes.route('/current')
@login_required
def get_questions_by_current_user():
   questions = Question.query.filter(Question.user_id == current_user.id).all()
   # if not questions:
   #    return {"errors": ["current user doesn't have question"]}, 404
   questions_data = {question.id: question.to_dict() for question in questions}
   data = {}
   data["questions"] = questions_data
   # answers = Answer.query.filter(Answer.user_id == current_user.id).all()
   # answers_data = {answer.id:answer.to_dict() for answer in answers}
   # data["answers"] = answers_data
   data["user"] = current_user.to_dict()

   return data

# Edit question by question id
@question_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_question(id):
   question = Question.query.get(id)
   # print("question by id", question.to_dict())
   if not question:
      return {"errors": ["question couldn't be found"]}, 404

   if not question.user_id == current_user.id:
      return {"errors": ["you cann't edit the question is not owned you"]}, 403

   questions = Question.query.filter(Question.id != id).all()
   titles = [ques.to_dict()["title"] for ques in questions]
   descriptions = [ques.to_dict()["description"] for ques in questions]

   form = QuestionForm()
   form["csrf_token"].data = request.cookies["csrf_token"]
   if form.validate_on_submit():
      question.title = request.get_json()["title"]
      question.description = request.get_json()["description"]
      question.tags = request.get_json()["tags"]
      question.updatedAt = func.now()

      if question.to_dict()["title"] in titles:
         return {"errors": "Question title should be unique"}, 400
      if question.to_dict()["description"] in descriptions:
         return {"errors": "Question description should be unique"}, 400

      db.session.commit()
      return question.to_dict()
   elif form.errors:
      return form.errors, 400


# Create question
@question_routes.route('/', methods=["POST"])
@login_required
def create_question():
   # print("@@@@@@backend create question")
   questions = Question.query.all()

   titles = [ques.to_dict()["title"] for ques in questions]
   # print("all titles value", titles)
   # print('how do i autosize a resource image into a datagridview column' in titles)
   descriptions = [ques.to_dict()["description"] for ques in questions]

   form = QuestionForm()
   form["csrf_token"].data = request.cookies["csrf_token"]
   # print("**********request", request.get_json())
   if form.validate_on_submit():
      question = Question(
         user_id = int(current_user.id),
         title = request.get_json()["title"],
         description = request.get_json()["description"],
         tags = request.get_json()["tags"],
         createdAt = func.now(),
         updatedAt = func.now()
      )
      if question.to_dict()["title"] in titles:
         return {"errors": "Question title should be unique"}, 400
      if question.to_dict()["description"] in descriptions:
         return {"errors": "Question description should be unique"}, 400
      db.session.add(question)
      db.session.commit()
      return question.to_dict()
   elif form.errors:
      # print("form.errors from backend create question", form.errors)
      return form.errors, 400


#get all likes by questionId
@question_routes.route('/<int:questionId>/likes', methods=["GET"])
def get_likes(questionId):
   likes = QuestionLike.query.filter(QuestionLike.question_id == questionId).all()
   if not likes:
      return {"message": ["current question doesn't have likes now"]}

   return {"likes":[like.to_dict() for like in likes]}


# add like to one question
@question_routes.route('/<int:questionId>/likes', methods=["POST"])
@login_required
def add_like(questionId):
   print("start backend add like")
   like = QuestionLike.query.filter(QuestionLike.user_id == current_user.id, QuestionLike.question_id == questionId).all()
   print("len(likes)", len(like))

   if len(like):
      if like[0].like_unlike == 1:
         return {"errors": "you already liked this question"}, 403
      elif like[0].like_unlike < 1:
         like[0].like_unlike = like[0].like_unlike + 1
         db.session.commit()
         return like[0].to_dict()
   else:
      newLike = QuestionLike(
         user_id = current_user.id,
         question_id = questionId,
         like_unlike = request.get_json()["like_unlike"],
      )

      db.session.add(newLike)
      db.session.commit()
      print("newLike.to_dict()", newLike.to_dict())
      return newLike.to_dict()


# remove like by question id:
@question_routes.route('/<int:questionId>/unlikes', methods=["POST"])
@login_required
def remove_like(questionId):
   like = QuestionLike.query.filter(QuestionLike.user_id == current_user.id, QuestionLike.question_id == questionId).all()
   print("delete like")
   if len(like):
      if like[0].like_unlike == -1:
         return {"errors": "you already unliked this question"}, 403
      elif like[0].like_unlike > -1:
         like[0].like_unlike = like[0].like_unlike - 1
         db.session.commit()
         return like[0].to_dict()
   else:
      newLike = QuestionLike(
         user_id = current_user.id,
         question_id = questionId,
         like_unlike = request.get_json()["like_unlike"],
      )

      db.session.add(newLike)
      db.session.commit()
      print("newLike.to_dict()", newLike.to_dict())
      return newLike.to_dict()
