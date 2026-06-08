import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Save contact form submission to the database."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '')
    phone = body.get('phone', '')
    email = body.get('email', '')
    address = body.get('address', '')
    message = body.get('message', '')
    rating = body.get('rating')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    cur.execute(
        f"INSERT INTO {schema}.submissions (name, phone, email, address, message, rating) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
        (name, phone, email, address, message, rating)
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'id': row[0]})
    }