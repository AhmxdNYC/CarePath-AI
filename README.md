# CarePath-AI

A lightweight AI-powered symptom-to-care pathway assistant built in under 24 hours. Designed to explore how technology can make healthcare clearer and more accessible.

## 📌 Overview

CarePath-AI turns patient-reported symptoms into a safe, structured care pathway. It is not a diagnostic tool. Instead, it provides:

- A short summary
- General possible causes
- Safe recommended next steps
- Suggested labs (general, non-diagnostic)
- Red-flag warnings
- Patient education

The goal is to offer simple, understandable guidance for people who often feel overwhelmed or unsure about where to start with their symptoms.

## 🩺 Problem This Solves

Many people struggle with:

- Understanding what symptoms might mean
- Deciding whether telehealth or in-person care is appropriate
- Feeling lost in the healthcare process
- Navigating care without access to primary care providers

CarePath-AI aims to reduce confusion by giving users structured clarity and actionable steps, aligning with my belief in using technology to improve access and understanding in healthcare.

## ⚙️ Tech Stack

- **Next.js (TypeScript)** – frontend
- **FastAPI (Python)** – backend API
- **OpenAI API** – structured care pathway generation
- **TailwindCSS** – UI
- **PostgreSQL (optional)** – saving care history

## 🧠 How It Works

Users enter simple inputs (symptoms, age, goal, duration). The backend:

1. Validates the input
2. Sends a safety-focused structured prompt to the OpenAI API
3. Returns a clean JSON output with clear sections for the UI to display

This keeps the experience simple, predictable, and patient-friendly.

## 🧪 Testing

Coming soon. Basic unit tests for API validation and mocked AI responses will be added to support reliability and backend maturity.

## 🌟 Why This Project Matters

I've seen how overwhelming healthcare can be for people—especially those in families, communities, or regions where access is limited. Even small tools that offer clarity can make someone feel more confident and informed about their next step.

CarePath-AI represents my interest in building technology that reduces confusion, increases access, and empowers patients. It reflects why I'm drawn to healthcare engineering roles: the impact is real, personal, and meaningful.
