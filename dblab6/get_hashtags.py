import re, time
from pymongo import MongoClient

client = MongoClient()
start_time = time.time()

for item in client.tweets.tweets.find({}):
    item['hashtags'] = re.findall(r"#(\w+)", item['content'])
    client.tweets.tweets.update(
        {"_id" : item['_id']}, item)

end_time = time.time()
print(end_time - start_time)