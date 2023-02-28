from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')


class QuestionLike(db.Model):
    __tablename__ = 'question_likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")), nullable=False)
    like_unlike = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, server_default=func.now())

    question = db.relationship("Question", back_populates="question_likes")

    def to_dict(self):
        return {
            'id': self.id,
            "user_id":self.user_id,
            'question_id': self.question_id,
            'createdAt': self.createdAt,
            'like_unlike': self.like_unlike
        }
