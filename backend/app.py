from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from sqlalchemy.orm import Session
import os
import json

# Database imports
from db.routes import router as db_router
from db.database import init_db, get_db
from db.models import TriageResult

load_dotenv()

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Next.js default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    try:
        init_db()
    except Exception as e:
        print(f"Database initialization failed: {str(e)}")
        print("Server will continue without database features.")

# Include database routes
app.include_router(db_router)
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables. Please check your .env file.")

client = OpenAI(api_key=api_key)

class TriageInput(BaseModel):
    symptoms: str
    age: int
    goal: str
    duration: str

@app.post("/triage")
def generate_care_pathway(data: TriageInput, db: Session = Depends(get_db)):
    prompt = f"""
    You are a safe telehealth assistant providing general educational guidance.
    The user reports:
    - Symptoms: {data.symptoms}
    - Age: {data.age}
    - Goal: {data.goal}
    - Duration: {data.duration}

    Return a JSON with these keys:
    - summary
    - possible_causes
    - recommended_steps
    - suggested_labs
    - red_flags
    - education

    Do NOT diagnose. Do NOT prescribe medication.
    Keep it general, helpful, and actionable.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    # Parse the JSON content from the response
    content = response.choices[0].message.content
    if content:
        result = json.loads(content)
        
        # Save to database
        try:
            db_triage = TriageResult(
                symptoms=data.symptoms,
                age=data.age,
                goal=data.goal,
                duration=data.duration,
                summary=result.get("summary"),
                possible_causes=result.get("possible_causes"),
                recommended_steps=result.get("recommended_steps"),
                suggested_labs=result.get("suggested_labs"),
                red_flags=result.get("red_flags"),
                education=result.get("education"),
            )
            db.add(db_triage)
            db.commit()
            db.refresh(db_triage)
            result["saved_id"] = db_triage.id  # Add the database ID to the response
        except Exception as e:
            # Log error but don't fail the request
            db.rollback()
            print(f"Error saving to database: {str(e)}")
        
        return result
    return {"error": "No response from OpenAI"}
