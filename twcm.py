# -*- coding: utf-8 -*-
def test():
  return "oo"

# -*- coding: utf-8 -*-
from oauthtwitter import OAuthApi
import pprint
import re
import subprocess

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

#vypis pro vysledky hledani
  if(co == "search"):
#        print dataList["results"][1]
        for i in range(0,len(dataList["results"])-1):
            try:
                a += "div class='statusDiv'><img src='"+dataList['results'][i]['profile_image_url']+"'/><b>"+dataList['results'][i]['from_user']+ "</b>" + "<br />" + ((dataList['results'][i]['text'])) + "<br /></div>"
            except:
                a = "<b> Žádný výsledek nebyl nalezen</b>"
#  vypis statusu krom vyhledavani
  else:
      for i in range(0,len(dataList)-1):
#        try:
            text=""
            text = replaceUrl(dataList[i]['text'])
            statusid = dataList[i]['id_str']
            if(co=="myFavs"):
                a += "<div class='statusDiv'><img src='"+dataList[i]['user']['profile_image_url']+"'/><b>"+dataList[i]['user']['screen_name']+ "</b>" + "<br />" + text + "<br /><span class='statusTimeSpan'>"+dataList[i]['created_at']+"<a href='#' onclick='unFavPy(spojeni,\""+statusid+"\")'>unFAV</a></span></div>"
            else:
                a += "<div class='statusDiv'><img src='"+dataList[i]['user']['profile_image_url']+"'/><b>"+dataList[i]['user']['screen_name']+ "</b>" + "<br />" + text + "<br /><span class='statusTimeSpan'>"+dataList[i]['created_at']+"<a href='#' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a></span></div>"
            
#            a += "<div class='statusDiv'><b>"+dataList[i]['user']['screen_name']+ "</b>" + "<br />" + ((dataList[i]['text'])) + "<br /><span class='statusTimeSpan'>"+dataList[i]['created_at']+"</span></div>"
#        except:
#            a = "<b> Žádný výsledek nebyl nalezen</b>"

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
  
def publishStatus(twitter, text, statusid = None, input_encoding='utf8'):
  twitter.UpdateStatus(text)

def replaceUrl(text):
    """ nahradi vsechny odkazy v "text" za aktivni """
    for word in text.split(" "):
        m = re.match(r"(http://.+)", word)
        if (m):
#            print "ahoj "+m.group(1)
#            text = text.replace(word,'<a href="javascript:otevriOdkaz('+m.group(1)+')">'+m.group(1)+'</a>')
             text = text.replace(word,'<a href="#" onclick="Titanium.Desktop.openURL(\''+m.group(1)+'\');">'+m.group(1)+'</a>')
            
    return text

def browserOpen(link):
    subprocess.Popen(["x-www-browser"],True)
  
def newFav(twitter, statusid):
    twitter.CreateFav(statusid)
    return
def unFav(twitter, statusid):
    twitter.DestroyFav(statusid)
    return

def reply(twitter):
#    twitter.updateStatus()
    return
  #user_timeline = twitter.GetUserTimeline()
  #user_timeline = twitter.GetAllUsersFavs()
  #return vypis(user_timeline)
