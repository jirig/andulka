# -*- coding: utf-8 -*-
def test():
  return "oo"

# -*- coding: utf-8 -*-
from oauthtwitter import OAuthApi
import pprint
OATOKEN="111682467-nymKCZGQxijr3a8U4keoiHCArRnkLqYiHjE8QwoE"
OATOKENSECRET= "uSELZWESpSikb3Z0w8t3TGkByrlvW3kInpK7XNdV94"
consumer_key = "qkhPVwSDfFp9qUr9KlVdPA"
consumer_secret = "mUzfFwtes7UW854B7yW5rvb6RZE7Wy8OD5DMFrq3mCA"

def vypis(twitter, co, search = None):
  if( co == "timeline"):
    dataList =  twitter.GetHomeTimeline()
  elif(co == "myFavs"):
    dataList =  twitter.GetAllUsersFavs()
#  elif(co == "usrFavs"):
#    dataList =  twitter.GetConcretUserFavs()
  elif(co == "search"):
     dataList = twitter.GetSearchResult(search)
  a = ""

  if(co == "search"):
#        print dataList["results"][1]
        for i in range(0,len(dataList["results"])-1):
            try:
                a += "<b>"+dataList["results"][i]['from_user']+ "</b>" + "<br />" + ((dataList["results"][i]['text'])) + "<br />"
            except:
#                a = "<b> Žádný výsledek nebyl nalezen</b>"

  else:
      for i in range(0,len(dataList)-1):
        try:
            a += "<b>"+dataList[i]['user']['screen_name']+ "</b>" + "<br />" + ((dataList[i]['text'])) + "<br />"
        except:
            a = "<b> Žádný výsledek nebyl nalezen</b>"

    #print(dataList[i]['user']['screen_name'])
    #print(dataList[i]['text']) 
    #print a
    
  return a

def connectToTw():
  twitter = OAuthApi(consumer_key, consumer_secret)
  temp_credentials = twitter.getRequestToken()
  twitter = OAuthApi(consumer_key, consumer_secret, OATOKEN, OATOKENSECRET)
  print "=====================SPOJENO"
  return twitter
  
def publishStatus(twitter, text, input_encoding='utf8'):
  twitter.UpdateStatus(text)
  
  
  
  #user_timeline = twitter.GetUserTimeline()
  #user_timeline = twitter.GetAllUsersFavs()
  #return vypis(user_timeline)
