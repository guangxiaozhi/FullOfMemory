from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class UserProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(4, 60)])
    portrait = StringField('portrait', validators=[DataRequired()])
