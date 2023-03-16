from datetime import datetime, timedelta, timezone
from lib.db import pool, query_wrap_array

class HomeActivities:
  #def run():
  #def run(logger):
  def run(cognito_user_id=None):
    # logger.info("HomeActivities")

    sql = query_wrap_array("""
    SELECT * FROM public.activities
    """)
    print(sql)
    with pool.connection() as conn:
      with conn.cursor() as cur:
        cur.execute(sql)
        # this will return a tuple
        # the first field being the data
        json = cur.fetchone()

    print("=====")
    print(json)
    return json[0]

    # return results
    #now = datetime.now(timezone.utc).astimezone()
    # results = [{
    #   'uuid': '68f126b0-1ceb-4a33-88be-d90fa7109eee',
    #   'handle':  'Andrew Brown',
    #   'message': 'Cloud is fun!',
    #   'created_at': (now - timedelta(days=2)).isoformat(),
    #   'expires_at': (now + timedelta(days=5)).isoformat(),
    #   'likes_count': 5,
    #   'replies_count': 1,
    #   'reposts_count': 0,
    #   'replies': [{
    #     'uuid': '26e12864-1c26-5c3a-9658-97a10f8fea67',
    #     'reply_to_activity_uuid': '68f126b0-1ceb-4a33-88be-d90fa7109eee',
    #     'handle':  'Worf',
    #     'message': 'This post has no honor!',
    #     'likes_count': 0,
    #     'replies_count': 0,
    #     'reposts_count': 0,
    #     'created_at': (now - timedelta(days=2)).isoformat()
    #   }],
    # }]

    # if cognito_user_id != None:
    #   results.insert(0,{
    #     'uuid': '66e12864-8c26-4c3a-9658-95a10f8fea67',
    #     'handle':  'Worf',
    #     'message': 'I am out of prune juice',
    #     'created_at': (now - timedelta(days=7)).isoformat(),
    #     'expires_at': (now + timedelta(days=9)).isoformat(),
    #     'likes': 0,
    #     'replies': []}
    #   )
    #   results.insert(0,{
    #     'uuid': '248959df-3079-4947-b847-9e0892d1bab4',
    #     'handle':  'Garek',
    #     'message': 'My dear doctor, I am just simple tailor',
    #     'created_at': (now - timedelta(hours=1)).isoformat(),
    #     'expires_at': (now + timedelta(hours=12)).isoformat(),
    #     'likes': 0,
    #     'replies': []
    #   }
    #   )

   
    