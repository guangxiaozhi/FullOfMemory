from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')


class AnswerLike(db.Model):
    __tablename__ = 'answer_likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    answer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("answers.id")), nullable=False)
    like_unlike = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, server_default=func.now())

    answer = db.relationship("Answer", back_populates="answer_likes")

    def to_dict(self):
        return {
            'id': self.id,
            'answer_id': self.answer_id,
            'user_id':self.user_id,
            'like_unlike': self.like_unlike,
            'createdAt': self.createdAt
        }
