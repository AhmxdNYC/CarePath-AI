from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()


class TriageResult(Base):
    """Model for storing triage results in PostgreSQL"""
    __tablename__ = "triage_results"

    id = Column(Integer, primary_key=True, index=True)
    symptoms = Column(Text, nullable=False)
    age = Column(Integer, nullable=False)
    goal = Column(String(255), nullable=False)
    duration = Column(String(100), nullable=False)
    
    # Store the AI response as JSON
    summary = Column(Text, nullable=True)
    possible_causes = Column(JSON, nullable=True)
    recommended_steps = Column(JSON, nullable=True)
    suggested_labs = Column(JSON, nullable=True)
    red_flags = Column(JSON, nullable=True)
    education = Column(Text, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def to_dict(self):
        """Convert model instance to dictionary"""
        return {
            "id": self.id,
            "symptoms": self.symptoms,
            "age": self.age,
            "goal": self.goal,
            "duration": self.duration,
            "summary": self.summary,
            "possible_causes": self.possible_causes,
            "recommended_steps": self.recommended_steps,
            "suggested_labs": self.suggested_labs,
            "red_flags": self.red_flags,
            "education": self.education,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

