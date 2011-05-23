# -*- coding: utf-8 -*-
from oauthtwitter import OAuthApi
import pprint
import re
import subprocess
import simplejson
import json
import bayes

OATOKEN="111682467-nymKCZGQxijr3a8U4keoiHCArRnkLqYiHjE8QwoE"
OATOKENSECRET= "uSELZWESpSikb3Z0w8t3TGkByrlvW3kInpK7XNdV94"
consumer_key = "qkhPVwSDfFp9qUr9KlVdPA"
consumer_secret = "mUzfFwtes7UW854B7yW5rvb6RZE7Wy8OD5DMFrq3mCA"
SIGNIN_URL = 'http://twitter.com/oauth/authenticate'

def vypis(twitter, co, search = None, page = None):
  if((co == "timeline") or (co == "filtr")):
    if(page == None):
          page=1
    dataList =  twitter.GetHomeTimeline(options = {'page':page})
  elif(co == "globalline"):
         if(page == None):
          page=1
         dataList =  twitter.GetPublicTimeline(options = {'page':page})
#    dataList =  twitter.GetHomeTimeline()
  elif(co == "myFavs"):
    dataList =  twitter.GetAllUsersFavs(options = {'page':page})
#  elif(co == "usrFavs"):
#    dataList =  twitter.GetConcretUserFavs()
  elif(co == "mentions"):
    dataList =  twitter.GetMentions(options = {'page':page})
  elif((co == "search") or (co == "searchf")):
     dataList = twitter.GetSearchResult(options = {'q':search,'page':page})
#  pomocna promenna pro ulozeni a vypis statusExpecting , delimiter: line 1 u
  a = ""
  # pomocna promenna pro slozeni json dat pro vyzualizaci pomoci thejit
 
#vypis pro vysledky hledani
  if(co == "search"):
#        print dataList["results"][1]
        a=u""
        for i in range(0,len(dataList["results"])):
            try:
                text=replaceUrl(((dataList['results'][i]['text'])),0)
                text = replaceTag(text,0)
                text = replaceScreenName(text,0)
#                favorited = dataList['results'][i]['favorited'] ###NELZE###
                statusid = dataList['results'][i]['id_str']
                a += "<div class='statusDiv'><img src='"+dataList['results'][i]['profile_image_url']+"'/><b>"+dataList['results'][i]['from_user']+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br />" + ((dataList['results'][i]['created_at'])) +"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT</a>"+"<br /></div>"
            except:
                a = "<b> Žádný výsledek nebyl nalezen</b>"
  elif(co == "searchf"):
      return dataList
  elif((co == "filtr") or (co =="globalline")):
#      for i in range(0,len(dataList)):
#        a+= dataList[i]['user']['screen_name'] + " "+ unicode(dataList[i]['text']) + " "
#        a+= unicode(dataList[i]['text']) + " "
        return dataList
#  vypis statusu krom vyhledavani
  else:
      if(co=="myFavs"):
#         a="<h1>Favorites</h1>"
            a=""
      elif(co=="timeline"):
         a="<h1>Timeline</h1>"
      elif(co=="mentions"):
#         a="<h1>Mentions</h1>"
            a=""
     
      for i in range(0,len(dataList)):
#        try:
            text=""
            text = replaceUrl(dataList[i]['text'],0)
            text = replaceTag(text,0)
            text = replaceScreenName(text,0)
            statusid = dataList[i]['id_str']
            favorited = dataList[i]['favorited']
#            if(co=="myFavs"):
#                a += "<div class='statusDiv'><img src='"+dataList[i]['user']['profile_image_url']+"'/><b>"+dataList[i]['user']['screen_name']+ "</b>" + "<br />" + text + "<br /><span class='statusTimeSpan'>"+dataList[i]['created_at']+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT</a>"+"<img src='./img/favorite_on.png' /><a href='#' onclick='unFavPy(spojeni,\""+statusid+"\")'>unFAV</a></span></div>"
#            else:
            if(favorited):
                    a += "<div class='statusDiv'><img src='"+dataList[i]['user']['profile_image_url']+"'/><b>"+dataList[i]['user']['screen_name']+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+dataList[i]['created_at']+"<a class='retweetimg' href='#' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+dataList[i]['user']['screen_name']+"\", \""+statusid+"\")'> Reply |</a><img src='./img/favorite_on.png' /><a href='#' onclick='unFavPy(spojeni,\""+statusid+"\")'>unFAV</a></span></div>"
            else:
                    a += "<div class='statusDiv'><img src='"+dataList[i]['user']['profile_image_url']+"'/><b>"+dataList[i]['user']['screen_name']+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+dataList[i]['created_at']+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+dataList[i]['user']['screen_name']+"\", \""+statusid+"\")'> Reply |</a><a href='#' class='favimg' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> | <a href='#' onclick='dbPridatZajimavy(\""+statusid+"\")'>Zs</a> | <a href='#' onclick='spamProb(\""+statusid+"\")'>SP</a></span></div>"
                
            #except:
#            a = "<b> Žádný výsledek nebyl nalezen</b>"
  return a

def vizData(twitter):

#    jsn ={"id": "stred00", "name": "stred","data": { "some key": "some value", "some other key": "some other value"},"children": [ {"id": "232_42", "name": "KUCHTA Band", "data": { "tsomekey":"twitter je nununu","image":"n0M.png"},"children": []}]}
#    jsn = simplejson.loads('{"id": "stred00", "name": "stred","data": { "some key": "some value", "some other key": "some other value"},"children": [ {"id": "232_42", "name": "KUCHTA Band", "data": { "tsomekey":"twitter je nununu","image":"n0M.png"},"children": []}]}')
#    jsn = simplejson.loads('{"id": "stred00", "name": "stred","data": { "some key": "some value", "some other key": "some other value"},"children": [ {"id": "232_42", "name": "KUCHTA Band", "data": { "tsomekey":"twitter je nununu","image":"n0M.png"},"children": []},'+'{"id": "stre", "name": "sted","data": { "some key": "some value", "some other key": "some other value"},"children": []}]}')
#    return simplejson.dumps(jsn)
    tmp_jsn = ""
    dataList =  twitter.GetHomeTimeline(options = {'page':1})
    for i in range(0,len(dataList)):
#        try:
            text='...'
#            text = replaceUrl(dataList[i]['text'])
#            text = dataList[i]['text'].replace('"', '\\"')
            text = dataList[i]['text'].replace('"', '\'')
            text = text.replace('\\', '\\\\')
            text = text.replace('\n', " ")
            
            text = replaceUrl(text,1)
            text = replaceTag(text,1)
            text = replaceScreenName(text,1)

            statusid = dataList[i]['id_str']
#            text = simplejson.JSONEncoder().encode(text)
            sname = dataList[i]['user']['screen_name']
            imgurl = dataList[i]['user']['profile_image_url']

            in_reply_id = dataList[i]["in_reply_to_status_id_str"]
            # jestlize je status odpovedi na jiny - mel by se zobrazit i on
            #neni odpovedi
            if not(in_reply_id):
    #            a += "<div class='statusDiv'><img src='"+dataList[i]['user']['profile_image_url']+"'/><b>"+dataList[i]['user']['screen_name']+ "</b>" + "<br />" + text + "<br /><span class='statusTimeSpan'>"+dataList[i]['created_at']+" <a href='#' onclick='reply(spojeni,\""+dataList[i]['user']['screen_name']+"\", \""+statusid+"\")'>| Reply |</a>  <a href='#' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> </span></div>"
                if(i == len(dataList)-1):
                    tmp_jsn += '{"id":"'+statusid+'", "name":"'+sname+'","data": {"tsomekey": "'+text+ "  " +' ", "image":"'+imgurl+'"}, "children":[]}'
                    print "===== POSLEDNI ======"
                else:
                    tmp_jsn += '{"id":"'+statusid+'", "name":"'+sname+'","data": {"tsomekey":"'+text+'", "image":"'+imgurl+'"}, "children":[]},'
                    print "===== E ======"
            # je odpovedi
            else:                
                 rData = getTweet(twitter, in_reply_id)
                 print("============ aoj ============")
                 rSname = rData['user']['screen_name']
                 rImgurl = rData['user']['profile_image_url']               
                 rText = rData['text'].replace('"', '\'')
                 rText = rText.replace('\\', '\\\\')
                 rText = rText.replace('\n', " ")
                 rText = replaceUrl(rText,1)
                 rText = replaceTag(rText,1)
                 rText = replaceScreenName(rText,1)
                 rChild = ""                

                 rChild = '{"id":"R'+str(in_reply_id)+'", "name":"'+rSname+'","data": {"tsomekey": "'+rText+ "  " +' ", "image":"'+rImgurl+'"}, "children":[]}'
#                 rChild = '{"id":"Rahoj", "name":"REPLY","data": {"tsomekey": "REPLY"}, "children":[]}'
                 print "=====REPLY -  REPLY ======"
                 if(i == len(dataList)-1):
                    tmp_jsn += '{"id":"'+statusid+'", "name":"'+sname+'","data": {"tsomekey": "'+text+ "  " +' ", "image":"'+imgurl+'"}, "children":['+rChild+']}'
                    print "===== POSLEDNI REPLY ======"
                 else:
                    tmp_jsn += '{"id":"'+statusid+'", "name":"'+sname+'","data": {"tsomekey":"'+text+'", "image":"'+imgurl+'"}, "children":['+rChild+']},'
                    print "===== E  REPLY======"

    tmp_jsn = tmp_jsn.encode('utf-8')
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
#  temp_credentials = twitter.getRequestToken()
  twitter = OAuthApi(consumer_key, consumer_secret, OATOKEN, OATOKENSECRET)
  print "====================SPOJENO"
  return twitter
#funkce je volana po spuseteni kleinta pro navazani spojeni v pokud nejde o prvni spojeni (celkove)
def connectToTwt(OAT, OATS):
#  twitter = OAuthApi(consumer_key, consumer_secret)
#  temp_credentials = twitter.getRequestToken()
#  print("TOKEN1:::")
#  print(OAT)
#  print("TOKEN1::")
  twitter = OAuthApi(consumer_key, consumer_secret, OAT, OATS)
  print "===**=================SPOJENO"
  return twitter
def connectToTwNew(OAT, OATS): 
  twitter = OAuthApi(consumer_key, consumer_secret, OAT, OATS)
  print "=====================SPOJENO"
  return twitter

def firstConn():
  twitter = OAuthApi(consumer_key, consumer_secret)
#  temp_credentials = twitter.getRequestToken()
#  twitter = OAuthApi(consumer_key, consumer_secret, OATOKEN, OATOKENSECRET)
  print "=====================SPOJENO"
  return twitter
def publishStatus(twitter, text, statusID = None, input_encoding='utf8'):
#  twitter.UpdateStatus(text)
    if(statusID):
        twitter.UpdateStatus(text, options = {'in_reply_to_status_id':statusID})
    else:
     twitter.UpdateStatus(text)

def replaceUrl(text,viz):
    """ nahradi vsechny odkazy v "text" za aktivni """
    for word in text.split(" "):
#        m = re.match(r"(http://.+)", word)
        m = re.match(r'((http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&%\$\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4})(\:[0-9]+)?(/[^/][a-zA-Z0-9\.\,\?\'\\/\+&%\$#\=~_\-@]*)*)', word)
#        m = re.match(r"(http://[^ ]+[^,. ])", word)
        if (m):
#            print "ahoj "+m.group(1)
#            text = text.replace(word,'<a href="javascript:otevriOdkaz('+m.group(1)+')">'+m.group(1)+'</a>')
#             text = text.replace(word,"<a href='#' onclick='Titanium.Desktop.openURL(\'"+m.group(1)+"\');'>"+m.group(1)+"</a>")
           if(viz):
               text = text.replace(word,'<a href=\\"#\\" onclick=\\"Titanium.Desktop.openURL(\''+m.group(1)+'\')\\">'+m.group(1)+'</a>')
           else:
               text = text.replace(word,'<a href="#" onclick="Titanium.Desktop.openURL(\''+m.group(1)+'\')">'+m.group(1)+'</a>')
              
    return text

def replaceTag(text, viz):
    for word in text.split(" "):
#        m = re.match(r"(#.+)", word)
        m = re.match(r"(.*)(#\w+)", word)
        if (m):
#            print "ahoj "+m.group(1)
#            text = text.replace(word,'<a href="javascript:otevriOdkaz('+m.group(1)+')">'+m.group(1)+'</a>')
#             text = text.replace(word,"<a href='#' onclick='Titanium.Desktop.openURL(\'"+m.group(1)+"\');'>"+m.group(1)+"</a>")
#            text = text.replace(word,'<a href="#" onclick="tVypisPy(spojeni, \'search\',\''+m.group(1)+'\');">'+m.group(1)+'</a>')
            if(viz):
               text = text.replace(word,''+m.group(1)+'<a href=\\"#\\" onclick=\\"tVypisPy(spojeni, \'search\',\''+m.group(2)+'\');\\">'+m.group(2)+'</a>')
            else:
               text = text.replace(word,''+m.group(1)+'<a href="#" onclick="tVypisPy(spojeni, \'search\',\''+m.group(2)+'\');">'+m.group(2)+'</a>')

    return text

def replaceScreenName(text,viz):
    for word in text.split(" "):
#        m = re.match(r"(@)(.+)", word)
        m = re.match(r"(@)(\w+)", word)
        if (m):
#            print "ahoj "+m.group(1)
#            text = text.replace(word,'<a href="javascript:otevriOdkaz('+m.group(1)+')">'+m.group(1)+'</a>')
#             text = text.replace(word,"<a href='#' onclick='Titanium.Desktop.openURL(\'"+m.group(1)+"\');'>"+m.group(1)+"</a>")
            if(viz):
               text = text.replace(word,'<a href=\\"#\\" onclick=\\"Titanium.Desktop.openURL(\'https://twitter.com/'+m.group(2)+'\');\\">'+m.group(0)+'</a>')
            else:
               text = text.replace(word,'<a href="#" onclick="Titanium.Desktop.openURL(\'https://twitter.com/'+m.group(2)+'\');">'+m.group(0)+'</a>')
              
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
def getTwt(twitter, statusid):
    data=twitter.GetStatusById(statusid)
    print data
    return data['text']
def getTweet(twitter, statusid):
    print "============GET TWEET PRED========"
    data=twitter.GetStatusById(str(statusid))
#    print data
    print "============GET TWEET PO========"
    return data
def retweet(twitter, statusid):
    data = twitter.Retweet(statusid)
    return data

### Funkce vztahujici se k filtrpovani ###

def bFiltruj(twitter, page = None):
#    b = bayes.Bayes()
    if(page == None):
        page = 1
    text = vypis(twitter, page = page, co = "filtr")
#    b.parseData(text)
    
    # a co SPESL ZNAKY JAKO PREVRACENE UVOZOVKY A jine UNICODE...?
#    splitText = text.replace("."," ").replace(","," ").replace("\""," ").replace("#"," ").replace("@"," ").replace("-"," ").replace(">"," ").replace("<"," ").replace("("," ").replace(")"," ").replace("$"," ").replace("\'"," ").replace("\\"," ").replace("/"," ").replace("!"," ").replace("?"," ").replace(":"," ").replace("\n", " ").lower()
    splitText = replaceNonAlpha(text);
    splitText = splitText.split()
    return splitText
#    return("KOnec filtru")

def replaceNonAlpha(text):
    # (?u) => unicode flag
    text = text.decode('utf-8')
    return re.sub("(?u)[\W\d]", " ", text.strip())
#    return re.sub("[\W\d]", " ", text.strip())
def splitIt(text):
    return text.split()



def jstest():
    return("jstest")

def getReqToken(twitter):
    temp_credentials = twitter.getRequestToken()
    return temp_credentials
def prvniLogin(twitter, temp_credentials):
    #vraci adresu pro prohlizec, kde bude potvrzeno pouzivani klienta
    return twitter.getAuthorizationURL(temp_credentials)

def prijmiPIN(twitter, temp_credentials, pin):
    access_token = twitter.getAccessToken(temp_credentials, pin)
    return access_token

def startFollow(twitter, username):
    twitter.StartFollow(username)

def stopFollow(twitter, username):
    twitter.StopFollow(username)

