import time
import requests, json
from pymongo import MongoClient

client = MongoClient()
db = client.tweets
url = 'https://www.sahamyab.com/guest/twiter/list?v=0.1'
count_needed, sleep_time = 1000, 60
# count_sofar = db.tweets.count_documents({})

count_sofar = 0

while count_sofar < count_needed:
    response = requests.request('GET', url, headers={'User-Agent': 'Chrome/61'})
    # result = response.status_code
    # if result == requests.codes.ok:
    #     data = response.json()['items']
    #     for d in data:
    #         try:
    #             db.tweets.replace_one({"id": d["id"]}, d, upsert=True)
    #         except Exception as e:
    #             print("Upsert exception: " + str(e))
    #     count_sofar = db.tweets.count_documents({})
    # else:
    #     print("Response code error: " + str(result))
    print(f'Count of fetched tweets is {count_sofar}')
    time.sleep(sleep_time)

count_sofar = db.tweets.count_documents({})