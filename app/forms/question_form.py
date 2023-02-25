from flask_wtf import FlaskForm

from wtforms import StringField
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    tags = StringField("tags")
