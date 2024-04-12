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

ARG DJANGO_ENV
ARG SECRET_KEY

# # Run database migrations
# RUN python manage.py makemigrations

# # Apply database migrations
# RUN python manage.py migrate

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose the default Django development port
EXPOSE 8000

# Start the Django development server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]
