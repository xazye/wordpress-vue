# Simple Blog WP Vue

I built this project as a simple blog using Vue 3 for the frontend and WordPress as a headless CMS for the backend.

## My Project Structure

I've divided the project into two main parts:

1.  **`vue-blog/`**: This directory holds the Vue 3 frontend application.
    *   Vite, TypeScript, Vue Router, and Tailwind CSS.
    *   It fetches data from the WordPress REST API.
    *   It's responsible for displaying the stuff.
2.  **`wordpress/`**: This directory contains the Docker configuration for the WordPress backend.
    *   It utilizes the official WordPress Docker image.
    *   It uses MySQL as the database.
    *   It includes a custom theme (`vue-theme`) for necessary backend configurations and API interactions.

## Setup and Running

### Prerequisites

You'll need the following installed on your system:

*   Docker and Docker Compose
*   Node.js and npm (or yarn/pnpm)

### Backend (WordPress)

1.  Navigate into the `wordpress/` directory:
    ```bash
    cd wordpress
    ```
2.  Start the Docker containers:
    ```bash
    docker-compose up -d
    ```
3.  WordPress will then be accessible at `http://localhost:8888`. You may need to complete the standard WordPress installation via your browser the first time you run it.

### Frontend (Vue)

1.  Navigate into the `vue-blog/` directory:
    ```bash
    cd ../vue-blog
    ```
2.  Install the project dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  The Vue application will be running, typically at `http://localhost:5173`. Check your terminal output for the exact URL.

## Key Technologies I Used

*   **Frontend**: Vue 3, Vite, TypeScript, Vue Router, Tailwind CSS
*   **Backend**: WordPress (Headless), PHP
*   **Database**: MySQL
*   **Containerization**: Docker, Docker Compose
