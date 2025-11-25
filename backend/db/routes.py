from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from .database import get_db
from .models import TriageResult

router = APIRouter(prefix="/api/db", tags=["database"])


# Pydantic schemas for request/response
class TriageResultCreate(BaseModel):
    symptoms: str
    age: int
    goal: str
    duration: str
    summary: Optional[str] = None
    possible_causes: Optional[dict] = None
    recommended_steps: Optional[dict] = None
    suggested_labs: Optional[dict] = None
    red_flags: Optional[dict] = None
    education: Optional[str] = None


class TriageResultResponse(BaseModel):
    id: int
    symptoms: str
    age: int
    goal: str
    duration: str
    summary: Optional[str] = None
    possible_causes: Optional[dict] = None
    recommended_steps: Optional[dict] = None
    suggested_labs: Optional[dict] = None
    red_flags: Optional[dict] = None
    education: Optional[str] = None
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True


@router.post("/triage", response_model=TriageResultResponse, status_code=201)
def create_triage_result(
    triage_data: TriageResultCreate,
    db: Session = Depends(get_db)
):
    """Save a new triage result to the database"""
    try:
        db_triage = TriageResult(
            symptoms=triage_data.symptoms,
            age=triage_data.age,
            goal=triage_data.goal,
            duration=triage_data.duration,
            summary=triage_data.summary,
            possible_causes=triage_data.possible_causes,
            recommended_steps=triage_data.recommended_steps,
            suggested_labs=triage_data.suggested_labs,
            red_flags=triage_data.red_flags,
            education=triage_data.education,
        )
        db.add(db_triage)
        db.commit()
        db.refresh(db_triage)
        return db_triage
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error saving to database: {str(e)}")


@router.get("/triage/{triage_id}", response_model=TriageResultResponse)
def get_triage_result(triage_id: int, db: Session = Depends(get_db)):
    """Get a specific triage result by ID"""
    triage = db.query(TriageResult).filter(TriageResult.id == triage_id).first()
    if not triage:
        raise HTTPException(status_code=404, detail="Triage result not found")
    return triage


@router.get("/triage", response_model=List[TriageResultResponse])
def get_all_triage_results(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all triage results with pagination"""
    triages = db.query(TriageResult).offset(skip).limit(limit).all()
    return triages


@router.get("/triage/user/{age}", response_model=List[TriageResultResponse])
def get_triage_results_by_age(age: int, db: Session = Depends(get_db)):
    """Get all triage results for a specific age"""
    triages = db.query(TriageResult).filter(TriageResult.age == age).all()
    return triages


@router.delete("/triage/{triage_id}", status_code=204)
def delete_triage_result(triage_id: int, db: Session = Depends(get_db)):
    """Delete a triage result by ID"""
    triage = db.query(TriageResult).filter(TriageResult.id == triage_id).first()
    if not triage:
        raise HTTPException(status_code=404, detail="Triage result not found")
    
    try:
        db.delete(triage)
        db.commit()
        return None
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting from database: {str(e)}")


@router.put("/triage/{triage_id}", response_model=TriageResultResponse)
def update_triage_result(
    triage_id: int,
    triage_data: TriageResultCreate,
    db: Session = Depends(get_db)
):
    """Update a triage result by ID"""
    triage = db.query(TriageResult).filter(TriageResult.id == triage_id).first()
    if not triage:
        raise HTTPException(status_code=404, detail="Triage result not found")
    
    try:
        triage.symptoms = triage_data.symptoms
        triage.age = triage_data.age
        triage.goal = triage_data.goal
        triage.duration = triage_data.duration
        triage.summary = triage_data.summary
        triage.possible_causes = triage_data.possible_causes
        triage.recommended_steps = triage_data.recommended_steps
        triage.suggested_labs = triage_data.suggested_labs
        triage.red_flags = triage_data.red_flags
        triage.education = triage_data.education
        triage.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(triage)
        return triage
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating database: {str(e)}")

