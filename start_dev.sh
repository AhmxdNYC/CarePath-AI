#!/bin/bash

# Start both backend and frontend servers concurrently
# Usage: ./start_dev.sh

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting CarePath-AI development servers...${NC}"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${BLUE}Stopping servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Start backend in background
echo -e "${BLUE}Starting backend server (port 8000)...${NC}"
cd backend
source venv/bin/activate
uvicorn app:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend in background
echo -e "${BLUE}Starting frontend server (port 3000)...${NC}"
cd carepath-ai
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}✓ Backend running at http://localhost:8000${NC}"
echo -e "${GREEN}✓ Frontend running at http://localhost:3000${NC}"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait

