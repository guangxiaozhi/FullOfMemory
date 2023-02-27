from flask_wtf import FlaskForm

from wtforms import StringField
from wtforms.validators import DataRequired

class AnswerForm(FlaskForm):
  answer_body = StringField("answer_body", validators=[DataRequired()])
