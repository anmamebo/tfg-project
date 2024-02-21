# Use the official Python image as the base image
FROM python:3.11.1

# Set the working directory to /app
WORKDIR /app

COPY . /app

# Copy the requirements file to the container
COPY requirements.txt .

# Install Django project dependencies
RUN pip install -r requirements.txt

# Expose the default Django development port
EXPOSE 8000

# Copy entrypoint script into the container
COPY entrypoint.sh /app/entrypoint.sh

# Grant execution permissions to the entrypoint script
RUN chmod +x /app/entrypoint.sh

# Specify the command to run on container startup
CMD ["/app/entrypoint.sh"]