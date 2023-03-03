from flask import Blueprint, request
from app.models import db, Answer, User, AnswerLike, Question
from .question_routes import question_routes
from .user_routes import user_routes
from flask_login import current_user, login_required
from app.forms import AnswerForm

answer_routes = Blueprint('answer', __name__)


# get all answers, test on backend
@answer_routes.route('/')
def get_all_answers():
    answers = Answer.query.all()
    data = [answer.to_dict() for answer in answers]
    # print("all answers", data)
    return data

# get all answers by question Id
@question_routes.route('/<int:questionId>/answers')
def get_answers_by_questionId(questionId):
  answers = Answer.query.filter(Answer.question_id == questionId)

  data = []
  for answer in answers:
    user = User.query.filter(User.id == answer.user_id).all()
    answer_likes = AnswerLike.query.filter(AnswerLike.answer_id == answer.id).all()
    like_count = 0
    for like in answer_likes:
      like_count = like_count + like.like_unlike
    # print("user by answer user_id", user[0].to_dict())
    # print("answer by question id", answer.to_dict())
    answerInfo = {}
    answerInfo.update(answer.to_dict())
    answerInfo["user"]=user[0].to_dict()
    answerInfo["like_count"] = like_count
    # print("answerInfo",answerInfo)
    data.append(answerInfo)
  # print("data", data)
  return data


# edit one answer by answer id
@answer_routes.route('/<int:answerId>', methods=["PUT"])
@login_required
def edit_answer_by_answerId(answerId):
  answer = Answer.query.get(answerId)
  # print("answer from backend", answer.to_dict())
  if not answer:
    return {"errors":["answer coldn't be found"]}, 404

  if not answer.user_id == current_user.id:
    return {"errors": ["you cann't edit the answer is not owned you"]}, 403

  form = AnswerForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    answer.answer_body = request.get_json()['answer_body']
    db.session.commit()
    # print("returned answer from backend ", answer.to_dict())
    return answer.to_dict()
  elif form.errors:
    # print("answer_body is empty, get errors?", form.errors)
    return form.errors, 400


# answer one question
@question_routes.route('/<int:questionId>/answers', methods=["POST"])
@login_required
def create_answer_by_questioId(questionId):
  # print("backend start create answer")
  answer = Answer.query.filter(Answer.question_id == questionId, Answer.user_id == current_user.id).all()
  # print("current_user.id", current_user.id)
  # for item in answer:
  #   print("item.user_id", item.user_id)
  if len(answer):
    # print("you already have one answer for this question")
    return {"errors": ["You already have one answer for this question, please update your answer"]}, 403

  form = AnswerForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    newAnswer = Answer(
      user_id = int(current_user.id),
      question_id = questionId,
      answer_body = request.get_json()['answer_body']
    )
    db.session.add(newAnswer)
    db.session.commit()
    # print("result from backend", newAnswer.to_dict())
    # print("current user", current_user.to_dict())
    data = {}
    data.update(newAnswer.to_dict())
    data["user"] = current_user.to_dict()
    return data
  elif form.errors:
    # print("create new answer get errors?", form.errors)
    return form.errors, 400


# Delete one answer by answerId
@answer_routes.route('/<int:answerId>', methods=["DELETE"])
@login_required
def delete_answer(answerId):
  answer = Answer.query.get(answerId)
  # print("backend answer", answer.to_dict())

  if answer is None:
    return {"errors": ["answer couldn't be found"]}, 404
  db.session.delete(answer)
  db.session.commit()
  return {"message": ["Successfully deleted"]},200


#get all likes by answerId
@answer_routes.route('/<int:answerId>/likes', methods=["GET"])
def get_likes_by_answerId(answerId):
  likes = AnswerLike.query.filter(AnswerLike.answer_id == answerId).all()
  if not likes:
    return {"message": ["current answer doesn't have likes now"]}

  return {"likes":[like.to_dict() for like in likes]}

# add like on one answer
@answer_routes.route('/<int:answerId>/likes', methods = ["POST"])
@login_required
def add_like_by_answerId(answerId):
  like = AnswerLike.query.filter(AnswerLike.user_id == current_user.id, AnswerLike.answer_id == answerId).all()
  # print("len(likes)", len(like))

  if len(like):
    if like[0].like_unlike == 1:
        return {"errors": "you already liked this answer"}, 403
    elif like[0].like_unlike < 1:
        like[0].like_unlike = like[0].like_unlike + 1
        db.session.commit()
        return like[0].to_dict()
  else:
    newLike = AnswerLike(
        user_id = current_user.id,
        answer_id = answerId,
        like_unlike = request.get_json()["like_unlike"],
    )

    db.session.add(newLike)
    db.session.commit()
    # print("newLike.to_dict()", newLike.to_dict())
    return newLike.to_dict()

# delete one like on one answer
@answer_routes.route('/<int:answerId>/unlikes', methods = ["POST"])
@login_required
def delete_like_by_answerId(answerId):
  like = AnswerLike.query.filter(AnswerLike.user_id == current_user.id, AnswerLike.answer_id == answerId).all()
  # print("len(likes)", len(like))

  if len(like):
    if like[0].like_unlike == -1:
        return {"errors": "you already unliked this answer"}, 403
    elif like[0].like_unlike > -1:
        like[0].like_unlike = like[0].like_unlike - 1
        db.session.commit()
        return like[0].to_dict()
  else:
    newLike = AnswerLike(
        user_id = current_user.id,
        answer_id = answerId,
        like_unlike = request.get_json()["like_unlike"],
    )

    db.session.add(newLike)
    db.session.commit()
    # print("newLike.to_dict()", newLike.to_dict())
    return newLike.to_dict()

# get answers by userId
@user_routes.route('/<int:userId>/answers')
def get_answers_by_userId(userId):
  answers = Answer.query.filter(Answer.user_id == userId).all()
  if not answers:
    return {"noAnswers":["This user has not answered any questions."]}, 200
  data = []
  for answer in answers:
    question = Question.query.filter(Question.id == answer.question_id).all()
    answer_likes = AnswerLike.query.filter(AnswerLike.answer_id == answer.id).all()
    like_count = 0
    for like in answer_likes:
      like_count = like_count + like.like_unlike
    answerInfo = {}
    answerInfo.update(answer.to_dict())
    answerInfo["question"] = question[0].to_dict()
    answerInfo["like_count"] = like_count
    data.append(answerInfo)

  return data
