# Use the official Python image as the base image
FROM python:3.11.1

# Set the working directory to /app
# WORKDIR /

# Copy the requirements file to the container
COPY requirements.txt .

# Install Django project dependencies
RUN pip install -r requirements.txt

# Expose the default Django development port
EXPOSE 8000

# Start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]