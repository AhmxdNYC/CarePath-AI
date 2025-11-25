from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

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
def generate_care_pathway(data: TriageInput):
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

    return response.choices[0].message
