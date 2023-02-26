FROM python:3.9.16-slim-buster

WORKDIR /backend-flask

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# COPY start.sh start.sh

COPY . .

ENV FLASK_ENV=development

EXPOSE ${PORT}
# CMD sh start.sh
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567"]

