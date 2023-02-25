FROM python:3.12.0a5-slim

WORKDIR /backend-flask

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY start.sh start.sh

COPY . .

ENV FLASK_ENV=development

EXPOSE ${PORT}
CMD sh start.sh