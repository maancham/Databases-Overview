import time
import requests, json
from elasticsearch import Elasticsearch
import re

url = 'https://www.sahamyab.com/guest/twiter/list?v=0.1'
elasticsearch = Elasticsearch([{'host' : 'localhost', 'port' : 9200}])
total = 1000
fetched = 0
seenIds = set()
hashtags = list()

while fetched < total:
    response = requests.request('GET', url, headers={'User-Agent': 'Chrome/61'})
    if response.status_code != 200:
        print('HTTP', response.status_code)
        continue
    data = response.json()["items"]
    for tweet in data:
        if tweet["id"] not in seenIds:
            try:
                tweet["hashtags"] = re.findall(r"#(\w+)", tweet["content"])
                elasticsearch.index(index = "twitter", doc_type = "twitter", body = tweet)
                seenIds.add(tweet["id"])
                fetched += 1
                print("tweet" + str(tweet["id"]) + "fetched, total:  " + str(fetched))
            except Exception as e:
                print(e)