from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
import os
import sys

from services.home_activities import *
from services.notification_activities import *
from services.user_activities import *
from services.create_activity import *
from services.create_reply import *
from services.search_activities import *
from services.message_groups import *
from services.messages import *
from services.create_message import *
from services.show_activity import *

#JWT
from lib.cognito_jwt_token import CognitoJwtToken, extract_access_token, TokenVerifyError

#HONEYCOMB
from opentelemetry import trace
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# X-RAY
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.ext.flask.middleware import XRayMiddleware

#CLOUDWATCH
import watchtower
import logging
from time import strftime

#ROLLBAR
import rollbar
import rollbar.contrib.flask
from flask import got_request_exception


# Configuring Logger to Use CloudWatch
LOGGER = logging.getLogger(__name__)
LOGGER.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
cw_handler = watchtower.CloudWatchLogHandler(log_group='cruddur')
LOGGER.addHandler(console_handler)
LOGGER.addHandler(cw_handler)

LOGGER.info("TEST LOG CARLOSERN")

#HONEYCOMB
# Initialize tracing and an exporter that can send data to Honeycomb
provider = TracerProvider()
processor = BatchSpanProcessor(OTLPSpanExporter())
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)
tracer = trace.get_tracer(__name__)




app = Flask(__name__)

cognito_jwt_token = CognitoJwtToken(
  user_pool_id=os.getenv("AWS_COGNITO_USER_POOL_ID"), 
  user_pool_client_id=os.getenv("AWS_COGNITO_USER_POOL_CLIENT_ID"),
  region=os.getenv("AWS_DEFAULT_REGION")
)


#HONEYCOMB
# Initialize automatic instrumentation with Flask
FlaskInstrumentor().instrument_app(app)
RequestsInstrumentor().instrument()

# X-RAY
xray_url = os.getenv("AWS_XRAY_URL")
xray_recorder.configure(service='backend-flask', dynamic_naming=xray_url)
XRayMiddleware(app, xray_recorder)

#ROLLBAR
rollbar_access_token = os.getenv('ROLLBAR_ACCESS_TOKEN')

@app.before_first_request
def init_rollbar():
    """init rollbar module"""
    rollbar.init(
        # access token
        rollbar_access_token,
        # environment name
        'production',
        # server root directory, makes tracebacks prettier
        root=os.path.dirname(os.path.realpath(__file__)),
        # flask already sets up logging
        allow_logging_basic_config=False)

    # send exceptions from `app` to rollbar, using flask's signal system.
    got_request_exception.connect(rollbar.contrib.flask.report_exception, app)


frontend = os.getenv('FRONTEND_URL')
backend = os.getenv('BACKEND_URL')
origins = [frontend, backend]
cors = CORS(
  app, 
  resources={r"/api/*": {"origins": origins}},
  # expose_headers="location,link",
  # allow_headers="content-type,if-modified-since",
  headers=['Content-Type', 'Authorization'], 
  expose_headers='Authorization',  
  methods="OPTIONS,GET,HEAD,POST"
)


@app.after_request
def after_request(response):
    timestamp = strftime('[%Y-%b-%d %H:%M]')
    LOGGER.error('%s %s %s %s %s %s', timestamp, request.remote_addr, request.method, request.scheme, request.full_path, response.status)
    return response

def verify_token(request):
    access_token = extract_access_token(request.headers)
    try:
        claims = cognito_jwt_token.verify(access_token)
        # authenticated request
        app.logger.debug("authenticated")
        app.logger.debug(claims)
        app.logger.debug(claims['username'])
        return claims['username']
    except TokenVerifyError as e:
        # unauthenticated request
        app.logger.debug(e)
        app.logger.debug("unauthenticated")
        return None

def get_cognito_user_id(request):
    app.logger.debug("==get_cognito_user_id==")
    access_token = extract_access_token(request.headers)
    try:
        claims = cognito_jwt_token.verify(access_token)
        # authenticated request
        app.logger.debug("authenticated")
        app.logger.debug(claims)
        return claims['sub']
    except TokenVerifyError as e:
        # unauthenticated request
        app.logger.debug(e)
        app.logger.debug("unauthenticated")
        return None


@app.route("/api/message_groups", methods=['GET'])
def data_message_groups():  
  cognito_user_id = get_cognito_user_id(request)
  if cognito_user_id is not None:    
    model = MessageGroups.run(cognito_user_id=cognito_user_id)
    return model['data'], 200
  else:
    return {}, 401
    #401 es no authenticado
    #403 es que aunque esta autenticado, no tiene el permiso para ese recurso
  
  #user_handle  = 'andrewbrown'
  # model = MessageGroups.run(user_handle=user_handle)
  # if model['errors'] is not None:
  #   return model['errors'], 401
  # else:
  #   return model['data'], 200

@app.route("/api/messages/@<string:message_group_uuid>", methods=['GET'])
def data_messages(message_group_uuid):
  # user_sender_handle = 'andrewbrown'
  # user_receiver_handle = request.args.get('user_reciever_handle')

  # model = Messages.run(user_sender_handle=user_sender_handle, user_receiver_handle=user_receiver_handle)
  cognito_user_id = get_cognito_user_id(request)
  if cognito_user_id is not None:    
    model = Messages.run(cognito_user_id=cognito_user_id, message_group_uuid=message_group_uuid)
    return model['data'], 200
  else:
    return {}, 401

  
  # if model['errors'] is not None:
  #   return model['errors'], 422
  # else:
  #   return model['data'], 200
  # return

@app.route("/api/messages", methods=['POST','OPTIONS'])
@cross_origin()
def data_create_message():
  user_sender_handle = 'andrewbrown'
  user_receiver_handle = request.json['user_receiver_handle']
  message = request.json['message']

  model = CreateMessage.run(message=message,user_sender_handle=user_sender_handle,user_receiver_handle=user_receiver_handle)
  if model['errors'] is not None:
    return model['errors'], 422
  else:
    return model['data'], 200
  return

@app.route("/api/activities/home", methods=['GET'])
@xray_recorder.capture('activities_home')
def data_home():
  
  print("CONSOLE activities_home", request)

  username = verify_token(request)
  data = HomeActivities.run(username)

  return data, 200

@app.route("/api/activities/@<string:handle>", methods=['GET'])
@xray_recorder.capture('activities_users')
def data_handle(handle):
  model = UserActivities.run(handle)
  if model['errors'] is not None:
    return model['errors'], 422
  else:
    return model['data'], 200

@app.route("/api/activities/search", methods=['GET'])
def data_search():
  term = request.args.get('term')
  model = SearchActivities.run(term)
  if model['errors'] is not None:
    return model['errors'], 422
  else:
    return model['data'], 200
  return

@app.route("/api/activities", methods=['POST','OPTIONS'])
@cross_origin()
def data_activities():
  print("CONSOLE data_activities", request)
  user_handle  = 'carlosern'
  message = request.json['message']
  ttl = request.json['ttl']
  model = CreateActivity.run(message, user_handle, ttl)
  if model['errors'] is not None:
    return model['errors'], 422
  else:
    return model['data'], 200
  return

@app.route("/api/activities/<string:activity_uuid>", methods=['GET'])
@xray_recorder.capture('activities_show')
def data_show_activity(activity_uuid):
  data = ShowActivity.run(activity_uuid=activity_uuid)
  return data, 200

@app.route("/api/activities/<string:activity_uuid>/reply", methods=['POST','OPTIONS'])
@cross_origin()
def data_activities_reply(activity_uuid):
  user_handle  = 'andrewbrown'
  message = request.json['message']
  model = CreateReply.run(message, user_handle, activity_uuid)
  if model['errors'] is not None:
    return model['errors'], 422
  else:
    return model['data'], 200
  return


@app.route("/api/activities/notification", methods=['GET'])
def data_notification():
  username = verify_token(request)
  data = NotificationActivities.run(username)

  return data, 200


@app.route('/rollbar/test')
def rollbar_test():
    rollbar.report_message('Hello World!', 'warning')
    return "Hello World!"
    
if __name__ == "__main__":
  app.run(debug=True)