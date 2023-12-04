# Project Title: CSV Score Ranking Application

## Description

### This project is a Node.js application for managing a score ranking system. It reads from and writes to a CSV file, sorting entries based on scores and dates.

#### Requirements

- Node.js
- npm (Node Package Manager)
- Docker (optional, for running the application in a Docker container)

**Local Setup**
- Use git clone  https://github.com/AyatoShirayouki/CSV_Score_Ranking to clone the project repository to your local machine.
- Navigate to the project directory: cd [project-directory].
- Install Dependencies
- Run npm install to install the required Node.js modules.

**Running the Application**

The application can be executed via the command line with specific arguments for date, name, and score.
Example command: node Ranking.js DATE=2021-05-22 NAME=Satoshi SCORE=220.

**Docker Setup**

- Build the Docker Image
- Ensure Docker is installed and running on your machine.
- In the project directory, build the Docker image using the provided Dockerfile: docker build -t csv-ranking-app .

**Running the Application in Docker**

Once the image is built, run the application inside a Docker container: docker run -it --name csv-app csv-ranking-app.
To pass arguments to the application in Docker, modify the CMD line in the Dockerfile or use docker run command arguments.
Notes
The CSV file (ranking.csv) should be located in the project directory.
Ensure that the input format for the command line arguments is correct as per the application requirements.
