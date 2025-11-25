#!/bin/bash
# Script to create the PostgreSQL database

echo "Setting up PostgreSQL database for CarePath-AI..."

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "Error: PostgreSQL is not running on localhost:5432"
    echo "Please start PostgreSQL first."
    exit 1
fi

# Create database (this will fail if it already exists, which is fine)
createdb carepath_db 2>/dev/null && echo "Database 'carepath_db' created successfully!" || echo "Database 'carepath_db' already exists or creation failed."

echo ""
echo "Database setup complete!"
echo "Make sure your .env file has the correct DATABASE_URL:"
echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/carepath_db"
echo ""
echo "Replace 'postgres:postgres' with your actual PostgreSQL username:password"

