import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Get all form submissions for the admin dashboard."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    cur.execute(
        f"SELECT id, name, phone, email, address, message, rating, created_at FROM {schema}.submissions ORDER BY created_at DESC"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    submissions = [
        {
            'id': r[0],
            'name': r[1],
            'phone': r[2],
            'email': r[3],
            'address': r[4],
            'message': r[5],
            'rating': r[6],
            'created_at': r[7].isoformat() if r[7] else None
        }
        for r in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'submissions': submissions})
    }