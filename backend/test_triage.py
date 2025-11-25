#!/usr/bin/env python3
"""
Simple test script for the triage endpoint
"""
import requests
import json

# Test data
test_data = {
    "symptoms": "Headache and fatigue",
    "age": 28,
    "goal": "Understand if I need to see a doctor",
    "duration": "2 days"
}

# Endpoint URL
url = "http://localhost:8000/triage"

print("Testing triage endpoint...")
print(f"URL: {url}")
print(f"Request data: {json.dumps(test_data, indent=2)}")
print("-" * 50)

try:
    response = requests.post(url, json=test_data)
    response.raise_for_status()
    
    print(f"Status Code: {response.status_code}")
    print(f"Response:")
    print(json.dumps(response.json(), indent=2))
except requests.exceptions.ConnectionError:
    print("❌ Error: Could not connect to server. Make sure the server is running on http://localhost:8000")
except requests.exceptions.HTTPError as e:
    print(f"❌ HTTP Error: {e}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"❌ Error: {e}")


