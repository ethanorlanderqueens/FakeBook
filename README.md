# FakeBook

# Step 1: Use Case Diagrams - Lucidchart

# Step 2: Wireframe - Whimsical

# Step 3: DB & API Design

# Step 3.7: API Schema - GraphQL

# Step 4: Mocking API - May skip this & just load bs data instead

# Step 5: UI

# Step 6: API Reducers *cries*


# DATABASE CREDENTIALS
server: sebisdum...
Admin username: sa
Password: pooass69!

# For you to get set up:
Upgrade to Windows 10 Pro
Install Docker Desktop
Open project in vs code
cd into /Backend
run: docker-compose -f docker-compose.dev.yml up --build
to take it down, run: docker-compose -f docker-compose.dev.yml down -v --remove-orphans
Database GQL API at localhost:4466
Add HTTP header:
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkZWZhdWx0QGRlZmF1bHQiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTg2NDY3NzA5LCJleHAiOjE1ODcwNzI1MDl9.-m8P5eYIvM5pR8BPCZBcBG56URL_CtP8SIbStxlzuD0"
}
Frontfacing GQL API at localhost:80
if you get authentication error on Database API, run prisma token from \Backend and copy token to Prisma playground (:4466)
