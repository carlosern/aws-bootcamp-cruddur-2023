import json
import psycopg2
import os

global conn
def lambda_handler(event, context):
    print(event)
    user = event['request']['userAttributes']
    try:
        conn = psycopg2.connect(
            host=(os.getenv('PG_HOSTNAME')),
            database=(os.getenv('PG_DATABASE')),
            user=(os.getenv('PG_USERNAME')),
            password=(os.getenv('PG_SECRET'))
        )

        # Connect to an existing database
        #with psycopg2.connect(os.getenv('CONNECTION_URL')) as conn:
    
        # conn = psycopg2.connect(
        #      host=(os.getenv('CONNECTION_URL'))
        # )
        cur = conn.cursor()
        cur.execute("INSERT INTO users (display_name, handle, cognito_user_id, email) VALUES(%s, %s, %s, %s)", (user['name'], user['preferred_username'], user['sub'], user['email']))
        conn.commit() 

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        
    finally:
        if conn is not None:
            cur.close()
            conn.close()
            print('Database connection closed.')

    return event