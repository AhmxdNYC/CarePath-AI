from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os
import json

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

    # Parse the JSON content from the response
    content = response.choices[0].message.content
    if content:
        return json.loads(content)
    return {"error": "No response from OpenAI"}
