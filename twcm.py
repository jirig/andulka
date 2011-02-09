# -*- coding: utf-8 -*-
def test():
  return "oo"

# -*- coding: utf-8 -*-
from oauth import oauth
from oauthtwitter import OAuthApi
import pprint
OATOKEN="111682467-nymKCZGQxijr3a8U4keoiHCArRnkLqYiHjE8QwoE"
OATOKENSECRET= "uSELZWESpSikb3Z0w8t3TGkByrlvW3kInpK7XNdV94"
consumer_key = "qkhPVwSDfFp9qUr9KlVdPA"
consumer_secret = "mUzfFwtes7UW854B7yW5rvb6RZE7Wy8OD5DMFrq3mCA"

def vypis(twitter):
  dataList =  twitter.GetAllUsersFavs()
  a = ""
  for i in range(0,len(dataList)-1):
    a += dataList[i]['user']['screen_name'] + "\n " + (unicode (dataList[i]['text'])) + "\n"
    #print(dataList[i]['user']['screen_name'])
    #print(dataList[i]['text']) 
    #print a
  print a
  return a
def test():      
  twitter = OAuthApi(consumer_key, consumer_secret)
  temp_credentials = twitter.getRequestToken()
  twitter = OAuthApi(consumer_key, consumer_secret, OATOKEN, OATOKENSECRET)
  return twitter
  
  #user_timeline = twitter.GetUserTimeline()
  #user_timeline = twitter.GetAllUsersFavs()
  #return vypis(user_timeline)
