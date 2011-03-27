# -*- coding: utf-8 -*-
def test():
  return "oo"

# -*- coding: utf-8 -*-
from oauthtwitter import OAuthApi
import pprint
import re
import subprocess
import simplejson
import json

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
#  pomocna promenna pro ulozeni a vypis statusExpecting , delimiter: line 1 u
  a = ""
  # pomocna promenna pro slozeni json dat pro vyzualizaci pomoci thejit
 
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
                a += "<div class='statusDiv'><img src='"+dataList[i]['user']['profile_image_url']+"'/><b>"+dataList[i]['user']['screen_name']+ "</b>" + "<br />" + text + "<br /><span class='statusTimeSpan'>"+dataList[i]['created_at']+" <a href='#' onclick='reply(spojeni,\""+dataList[i]['user']['screen_name']+"\", \""+statusid+"\")'>| Reply |</a>  <a href='#' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> </span></div>"

               
#            a += "<div class='statusDiv'><b>"+dataList[i]['user']['screen_name']+ "</b>" + "<br />" + ((dataList[i]['text'])) + "<br /><span class='statusTimeSpan'>"+dataList[i]['created_at']+"</span></div>"
#        except:
#            a = "<b> Žádný výsledek nebyl nalezen</b>"

    #print(dataList[i]['user']['screen_name'])
    #print(dataList[i]['text']) 
    #print a



    
  return a

def vizData(twitter):

#    jsn ={"id": "stred00", "name": "stred","data": { "some key": "some value", "some other key": "some other value"},"children": [ {"id": "232_42", "name": "KUCHTA Band", "data": { "tsomekey":"twitter je nununu","image":"n0M.png"},"children": []}]}
#    jsn = simplejson.loads('{"id": "stred00", "name": "stred","data": { "some key": "some value", "some other key": "some other value"},"children": [ {"id": "232_42", "name": "KUCHTA Band", "data": { "tsomekey":"twitter je nununu","image":"n0M.png"},"children": []}]}')
#    jsn = simplejson.loads('{"id": "stred00", "name": "stred","data": { "some key": "some value", "some other key": "some other value"},"children": [ {"id": "232_42", "name": "KUCHTA Band", "data": { "tsomekey":"twitter je nununu","image":"n0M.png"},"children": []},'+'{"id": "stre", "name": "sted","data": { "some key": "some value", "some other key": "some other value"},"children": []}]}')
#    return simplejson.dumps(jsn)
    tmp_jsn = ""
    dataList =  twitter.GetHomeTimeline()
    for i in range(0,len(dataList)-1):
#        try:
            text='...'
#            text = replaceUrl(dataList[i]['text'])
            text = dataList[i]['text'].replace('"', '\'')
            text = text.replace('\\', '\\\\')
#            text = replaceUrl(text)
            statusid = dataList[i]['id_str']
#            text = simplejson.JSONEncoder().encode(text)
            sname = dataList[i]['user']['screen_name']
            imgurl = dataList[i]['user']['profile_image_url']
#            a += "<div class='statusDiv'><img src='"+dataList[i]['user']['profile_image_url']+"'/><b>"+dataList[i]['user']['screen_name']+ "</b>" + "<br />" + text + "<br /><span class='statusTimeSpan'>"+dataList[i]['created_at']+" <a href='#' onclick='reply(spojeni,\""+dataList[i]['user']['screen_name']+"\", \""+statusid+"\")'>| Reply |</a>  <a href='#' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> </span></div>"
            if(i == len(dataList)-2):
                tmp_jsn += '{"id":"'+statusid+'", "name":"'+sname+'","data": {"tsomekey":"'+text+'", "image":"'+imgurl+'"}, "children":[]}'
                print "===== POSLEDNI ======"
            else:
                tmp_jsn += '{"id":"'+statusid+'", "name":"'+sname+'","data": {"tsomekey":"'+text+'", "image":"'+imgurl+'"}, "children":[]},'
                print "===== E ======"
    
#    jsn = simplejson.loads('{"id": "stred00", "name": "stred","data": { "some key": "some value", "some other key": "some other value"},"children": [' +tmp_jsn+ ']}')
    tmp_jsn = tmp_jsn.encode('utf-8')
#    jsn = '{"id": "stred00", "name": "stred","data": { "some key": "some value", "some other key": "some other value"},"children": [' +tmp_jsn+ ']}'
    jsn = simplejson.loads('{"id": "ME", "name": "me","data": {},"children": [' +tmp_jsn+ ']}')
    
#    print jsn
    return jsn
#    jsn = "..."
#     print jsn
#    jsn= """{
#  "id": "aUniqueIdentifier",
#  "name": "usually a nodes name",
#  "data": {
#    "some key": "some value",
#    "some other key": "some other value"
#   },
#  "children": [ {
#                "id": "232_42",
#                "name": "KUCHTA Band",
#                "data": {
#                    "tsomekey":"twitter je nununu",
#                    "image":"n0M.png"
#                },
#                "children": []}]
#}"""
    
#return jsn

def connectToTw():
  twitter = OAuthApi(consumer_key, consumer_secret)
  temp_credentials = twitter.getRequestToken()
  twitter = OAuthApi(consumer_key, consumer_secret, OATOKEN, OATOKENSECRET)
  print "=====================SPOJENO"
  return twitter
  
def publishStatus(twitter, text, statusID = None, input_encoding='utf8'):
#  twitter.UpdateStatus(text)
    if(statusID):
        twitter.UpdateStatus(text, options = {'in_reply_to_status_id':statusID})
    else:
     twitter.UpdateStatus(text)

def replaceUrl(text):
    """ nahradi vsechny odkazy v "text" za aktivni """
    for word in text.split(" "):
        m = re.match(r"(http://.+)", word)
        if (m):
#            print "ahoj "+m.group(1)
#            text = text.replace(word,'<a href="javascript:otevriOdkaz('+m.group(1)+')">'+m.group(1)+'</a>')
#             text = text.replace(word,"<a href='#' onclick='Titanium.Desktop.openURL(\'"+m.group(1)+"\');'>"+m.group(1)+"</a>")
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
