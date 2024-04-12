# Use the official Python image as the base image
FROM python:3.11.1

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file to the container
COPY requirements.txt .

# Install Django project dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Set environment variables
ARG DB_DATABASE
ARG DB_HOST
ARG DB_PASSWORD
ARG DB_PORT
ARG DB_USER
ARG DJANGO_ENV
ARG GOOGLE_PROJECT_ID
ARG GOOGLE_SECRET_NAME
ARG NIXPACKS_PYTHON_VERSION
ARG SECRET_KEY
ARG GS_CREDENTIALS
ARG EMAIL_HOST_PASSWORD
ARG EMAIL_HOST_USER
ARG FRONTEND_URL

# # Run database migrations
# RUN python manage.py makemigrations

# # Apply database migrations
# RUN python manage.py migrate

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose the default Django development port
EXPOSE 8000

# Start the Django development server
CMD ["gunicorn", "--timeout", "500", "config.wsgi"]
