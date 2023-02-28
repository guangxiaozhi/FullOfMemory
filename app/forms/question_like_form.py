from flask_wtf import FlaskForm

from wtforms import IntegerField
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
  user_id = IntegerField("user_id", validators=[DataRequired()])
  question_id = IntegerField("question_id", validators=[DataRequired()])
  like_unlike = IntegerField("like_unlike", validators=[DataRequired()])
