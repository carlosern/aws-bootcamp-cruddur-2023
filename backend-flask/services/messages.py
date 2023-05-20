from datetime import datetime, timedelta, timezone
from lib.ddb import Ddb
from lib.db import db

class Messages:
  def run(message_group_uuid, cognito_user_id):
    model = {
      'errors': None,
      'data': None
    }

    sql = db.template('users','uuid_from_cognito_user_id')
    my_user_uuid = db.query_value(sql,{'cognito_user_id': cognito_user_id})
    print(f"UUID: {my_user_uuid}")

    ddb = Ddb.client()
    data = Ddb.list_messages(ddb, message_group_uuid)
    print("list_messages")
    print(data)

    model['data'] = data
    return model

# class Messages:
#   def run(user_sender_handle, user_receiver_handle):
#     model = {
#       'errors': None,
#       'data': None
#     }

#     now = datetime.now(timezone.utc).astimezone()

#     results = [
#       {
#         'uuid': '4e81c06a-db0f-4281-b4cc-98208537772a' ,
#         'display_name': 'Andrew Brown',
#         'handle':  'andrewbrown',
#         'message': 'Cloud is fun!',
#         'created_at': now.isoformat()
#       },
#       {
#         'uuid': '66e12864-8c26-4c3a-9658-95a10f8fea67',
#         'display_name': 'Andrew Brown',
#         'handle':  'andrewbrown',
#         'message': 'This platform is great!',
#         'created_at': now.isoformat()
#     }]
#     model['data'] = results
#     return model