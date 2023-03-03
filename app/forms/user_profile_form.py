from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class UserProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    portrait = StringField('portrait', validators=[DataRequired()])
