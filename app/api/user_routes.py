from flask import Blueprint, request
from flask_login import login_required
from app.models import User, db
from app.forms import UserProfileForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# update user name or portrait.
@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_user(id):
    user = User.query.get(id)
    if not user:
        return {"errors":["user doesn't exit"]}, 404
    users = User.query.all()
    usernames = [userele.username for userele in users if userele.id != id]
    if usernames.count(request.get_json()["username"]):
        return {"errors":["username should be unique"]}, 404
    form = UserProfileForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        user.username = request.get_json()["username"]
        user.portrait = request.get_json()["portrait"]
        db.session.commit()
        print("update user profile user.to_dict()", user.to_dict())
        return user.to_dict()
    elif form.errors:
        print("update user profile errors", form.errors)
        return form.errors, 400
