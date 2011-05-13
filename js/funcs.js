
function presmeruj()
{
  window.location.href="http://google.com";
}

var pocetpismenek=0;

function pocetZnaku(kde)
{
// spocita pocet znaku v textarea
//   pocetpismenek ++;

//  window.document.getElementById('pocet').innerHTML =140 - window.document.getElementById(kde).value.length;
  pocetz = 140 - window.document.getElementById(kde).value.length;
  if(pocetz < 0){
      window.document.getElementById('pocet').style.color = "red";
      window.document.getElementById('pocet').style.fontWeight = "bold";
  }
  window.document.getElementById('pocet').innerHTML = pocetz;
}

function vycisti(id)
{
   window.document.getElementById(id).value = ""
}
function otevriOdkaz(link)
{
    Titanium.Platform.openURL(link);
}

function reply(spojeni,sName, sID){
    area = window.document.getElementById("statusArea");
    area.innerHTML = "@" + sName + " ";
    replyStatusID = sID
    // zobrazeni formulare pro tweet a schovani vyhledavaciho...
    window.document.getElementById("searchForm").style.display='none';
    window.document.getElementById('searchFormDiv').style.display='none';
    ukazSF = 0; // nastavy priznak pro vyhledavaci formular na "schovan"
    window.document.getElementById('twtForm').style.display='block';
    window.document.getElementById('twtFormDiv').style.display='block';
    ukazTF = 1;
}

function vizualizuj(){
    jsn = vizPy(spojeni);
    obsahDivTimeLine = document.getElementById('timeLine').innerHTML
    otec = document.getElementById('contentDiv');
    mazany = document.getElementById('timeLine');
     otec.removeChild(mazany);
    //alert(jsn);
    //window.document.getElementById("jsn_vypis").innerHTML = jsn;
    window.document.getElementById('vizual').style.display = "block";
//    window.document.getElementById('timeLine').style.display = "none";



//    window.document.getElementById('timeLineZajimave').style.display = "none";
//    window.document.getElementById('timeLineOstatni').style.display = "none";
//    window.document.getElementById('timeLine').setAttribute("style","display:none")
//    window.document.getElementById('vizual').setAttribute("style","display:block")
//    window.document.getElementById('timeLine').setAttribute("style","visibility:hidden")
//    window.document.getElementById('vizual').setAttribute("style","visibility:visible")
    init(jsn);
    nTL = document.createElement('div');

    did = "timeLine"

    nTL.setAttribute('id',did);
     nTL.setAttribute('style','display:none');
    nTL.innerHTML = obsahDivTimeLine

    otec.appendChild(nTL);
}

function dalsiTwity(){
    pageHomeCount +=1;
    dalsiPy(spojeni, pageHomeCount);
}

function ukazForm(id){
   if(id == "twtForm"){
    if(ukazTF == 0){ // statusovy formular je schovan -> zobrazit
        // skryt vyhledavaci formular
        window.document.getElementById("searchForm").style.display='none';
        window.document.getElementById('searchFormDiv').style.display='none';
        ukazSF = 0; // nastavy priznak pro vyhledavaci formular na "schovan"
        window.document.getElementById(id).style.display='block';
        window.document.getElementById(id+'Div').style.display='block';
        ukazTF = 1;
   }
   else{
        window.document.getElementById(id+'Div').style.display='none';
        window.document.getElementById(id).style.display='none';
        ukazTF = 0;
          //po zavreni
        replyStatusID =0; // zruseni odpovedniho ID
        window.document.getElementById('statusArea').value = "" // vymyzani textu
   }
  }
  else{
      if(ukazSF == 0){
        window.document.getElementById("twtForm").style.display='none';
        window.document.getElementById('twtFormDiv').style.display='none';
        ukazTF = 0;
        //po zavreni
        replyStatusID =0; // zruseni odpovedniho ID
        window.document.getElementById('statusArea').value = "" // vymyzani textu

        window.document.getElementById(id).style.display='block';
        window.document.getElementById(id+'Div').style.display='block';
        ukazSF = 1;
      }
      else{
        window.document.getElementById(id+'Div').style.display='none';
        window.document.getElementById(id).style.display='none';
        ukazSF = 0;
      }

  }
}

function schovejViz(){
    el = window.document.getElementById('vizual');
        if(el != null){
            window.document.getElementById('vizual').style.display = "none"
        }
}

function testdb(){
   var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(
    Titanium.Filesystem.getApplicationDataDirectory(), 'mydatabase.db'));

db.execute("CREATE TABLE IF NOT EXISTS test(id INTEGER, name TEXT)");
db.execute("INSERT INTO test VALUES(123, 'a')");

var resultSet = db.execute("SELECT * FROM test");
alert("Found " + resultSet.rowCount() + " rows");
while (resultSet.isValidRow())
{
    var text = "";
    for (var i = 0; i < resultSet.fieldCount(); i++){
        text += resultSet.fieldName(i) + ":"+ resultSet.field(i) + " ";}
    alert(text);
    resultSet.next();
}
}
function bFiltruj(){

   var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(
    Titanium.Filesystem.getApplicationDataDirectory(),'bayDB.db'));
    
    db.execute("CREATE TABLE IF NOT EXISTS slovo(slovo, pocetN, pocetZ)");
    //alert(twcm.bFiltruj(spojeni));
    arrayPy = twcm.bFiltruj(spojeni);
    hm = ""
    a = 0
    while(arrayPy.length > 0){
        tmpSlovo = arrayPy.pop()
        dbUpdate(db, tmpSlovo,0)
        a ++;
        hm += " " + tmpSlovo
    }
    alert(hm + ":" + a)
    db.close()
    //alert(text);
}
function dbUpdate(db, slovo, zajimavost){
     var resultSet;
    // alert("update")
     resultSet = db.execute("SELECT * FROM slovo WHERE slovo = ?", slovo);
          // existujeli slovo v db
          
     if(resultSet.fieldCount() > 0){
         // nezajimavy(spam) = 0 , zajimavy = 1
         if(zajimavost){
            pocetZ = resultSet.fieldByName("pocetZ");           
            pocetZ = parseInt(pocetZ)+1;
            resultSet= db.execute("UPDATE slovo SET pocetZ = ? WHERE slovo = ?",pocetZ, slovo);
         }
        else{
            pocetN = resultSet.fieldByName("pocetN");
            pocetN = parseInt(pocetN)+1;
            resultSet= db.execute("UPDATE slovo SET pocetN = ? WHERE slovo = ?",pocetN, slovo);
         }
     }
      else{
         // neexistuje v DB
         if(zajimavost)
             // 2 kompenzace, ze je 1 pridana ikdyz neexistuje = aby nedochazelo k deleni nulou
            resultSet = db.execute("INSERT INTO slovo (slovo, pocetN, pocetZ) VALUES(?, 1, 2)",slovo);
        else
            resultSet = db.execute("INSERT INTO slovo (slovo, pocetN, pocetZ) VALUES(?, 2, 1)",slovo);
      }
     //alert("Found " + resultSet.rowCount() + " rows");
}

function dbPridatZajimavy(statusId){



    // spojeni s DB
     var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'bayDB.db'));   
     db.execute("CREATE TABLE IF NOT EXISTS slovo(slovo, pocetN, pocetZ)");
     
    text = twcm.getTwt(spojeni, statusId)

    forSplit = twcm.replaceNonAlpha(text)

    // pole s jednotlivymi slovy
    arrayPy = twcm.splitIt(forSplit);
    hm = ""
    a = 0
    //alert(arrayPy)
    while(arrayPy.length > 0){
        tmpSlovo = arrayPy.pop()
        dbUpdate(db, tmpSlovo,1)
        a ++;
        hm += " " + tmpSlovo
    }    
    db.close()
    alert(hm + ":" + a)
}
    
function dbPridatZaj(text){



    // spojeni s DB
     var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'bayDB.db'));
     db.execute("CREATE TABLE IF NOT EXISTS slovo(slovo, pocetN, pocetZ)");


    forSplit = twcm.replaceNonAlpha(text)

    // pole s jednotlivymi slovy
    arrayPy = twcm.splitIt(forSplit);
    hm = ""
    a = 0
    //alert(arrayPy)
    while(arrayPy.length > 0){
        tmpSlovo = arrayPy.pop()
        dbUpdate(db, tmpSlovo,1)
        a ++;
        hm += " " + tmpSlovo
    }
    db.close()
    alert(hm + ":" + a)
}

function dbPridatSpam(text){



    // spojeni s DB
     var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'bayDB.db'));
     db.execute("CREATE TABLE IF NOT EXISTS slovo(slovo, pocetN, pocetZ)");

    forSplit = twcm.replaceNonAlpha(text)

    // pole s jednotlivymi slovy
    arrayPy = twcm.splitIt(forSplit);
    hm = ""
    a = 0
    //alert(arrayPy)
    while(arrayPy.length > 0){
        tmpSlovo = arrayPy.pop()
        dbUpdate(db, tmpSlovo,0)
        a ++;
        hm += " " + tmpSlovo
    }
    db.close()
    //alert(hm + ":" + a)
}

function bSelekce(){
    var pZ = 1.0;
    var pN = 1.0;
     var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'bayDB.db'));
     db.execute("CREATE TABLE IF NOT EXISTS slovo(slovo, pocetN, pocetZ)");
    // natahnuti timeline se vsim vsudy do dataList v JSON
    dataList = twcm.vypis(spojeni, "filtr");
    //alert(dataList[0].text)
    //alert(dataList.length)
    for(i = 0; i < dataList.length; i++){
        //alert(dataList[i].text)
        forSplit = twcm.replaceNonAlpha(dataList[i].text)
        //alert(forSplit)
        wordArray = twcm.splitIt(forSplit);
         while(wordArray.length > 0){
            tmpSlovo = wordArray.pop()
            dbUpdate(db, tmpSlovo,0)
            spamPravSlovo = dbSpamWord(tmpSlovo)
            pZ *= spamPravSlovo
            pN *= 1 - spamPravSlovo
        }
        spamPrav = pZ/(pZ+pN);
//        alert(spamPrav)
    }
//    alert(spamPrav)
    db.close()
    alert("hotovo")
}

function dbSpamWord(slovo){
    /* pomocna funkce pro komunikaci s databazi pri vypoctu pravdepodobnosti */

    var spamPocet; //cetnost slova v spam slovech
    var zajimPocet; // pocet zajimavych slov
    var pocetSpamSlov; // pocet spam slov
    var pocetZajimSlov; // pocet  zajimavych slov
    var  spamP; // pomer spamPocet/pocetSpamSlov
    var zajimP; // pomer zajimPocet/pocetZajimSlov
    var pravSpam; // pravdepodobnost ze slovo je spam

    var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'bayDB.db'));
    
    resultSet = db.execute("SELECT * FROM slovo WHERE slovo = ? and pocetN > 0", slovo);
    spamPocet =  resultSet.fieldByName('pocetN');
    resultSet = db.execute("SELECT * FROM slovo WHERE slovo = ? and pocetZ > 0", slovo);
    zajimPocet =  resultSet.fieldByName('pocetZ');
    if(spamPocet == 0 || spamPocet == null) spamPocet = 1;
    if(zajimPocet == 0 || zajimPocet == null) zajimPocet = 1;
//    alert(spamPocet);
    resultSet = db.execute("SELECT * FROM slovo WHERE pocetN > 0");
//    resultSet = db.execute("SELECT SUM(pocetN) FROM slovo");
    pocetSpamSlov = parseInt(resultSet.fieldCount())
//    pocetSpamSlov = resultSet
    resultSet = db.execute("SELECT * FROM slovo WHERE pocetZ > 0");
//    resultSet = db.execute("SELECT SUM(pocetZ) FROM slovo as suma");
    pocetZajimSlov =  parseInt(resultSet.fieldCount())
//    pocetZajimSlov = parseInt(resultSet.fieldByName("suma"))
//    alert(resultSet.fieldByName("suma"))

    spamP = spamPocet/pocetSpamSlov;
    zajimP = zajimPocet/pocetZajimSlov;
    pravSpam = spamP/zajimP;
//    alert("dbSpamWord pravSpam: "+pravSpam + " pSS: " +pocetSpamSlov +" pZS "+pocetZajimSlov  );
    if(pravSpam < 0.01)
            pravSpam = 0.01
    else if(pravSpam > 0.99)
            pravSpam = 0.99

    return pravSpam;
}

function spamProb(statusId){
    /* funkce spamProb spocita pradepodobnost (zajimavosti) pro konkretni tweet */
    var pZ = 1.0;
    var pN = 1.0;
    text = twcm.getTwt(spojeni, statusId)
//    alert(statusId)
    forSplit = twcm.replaceNonAlpha(text)
//    alert(forSplit)
    // pole s jednotlivymi slovy
//    text = window.document.getElementById(statusId).innerHTML
     wordArray = twcm.splitIt(forSplit);
     while(wordArray.length > 0){
            tmpSlovo = wordArray.pop()
            spamPravSlovo = dbSpamWord(tmpSlovo)
            pZ *= spamPravSlovo
            pN *= 1 - spamPravSlovo
        }
    spamPrav = pZ/(pZ+pN);
//    spamPrav = pN/(pN-pZ);
    alert(spamPrav + " pZ: " + pZ + " pN: " + pN);
}

function spamPr(text){
    /* funkce spamProb spocita pradepodobnost (zajimavosti) pro konkretni tweet
     * @param text - text tweetu ktery aktualne posuzuji
    */
    var pZ = 1.0;
    var pN = 1.0;    
//    alert(statusId)
    forSplit = twcm.replaceNonAlpha(text)
//    alert(forSplit)
    // pole s jednotlivymi slovy
//    text = window.document.getElementById(statusId).innerHTML
     wordArray = twcm.splitIt(forSplit);
     while(wordArray.length > 0){
            tmpSlovo = wordArray.pop()
            spamPravSlovo = dbSpamWord(tmpSlovo)
            pZ *= spamPravSlovo
            pN *= 1 - spamPravSlovo
        }
    spamPrav = pZ/(pZ+pN);
//    spamPrav = pN/(pN-pZ);
//    alert(spamPrav + " pZ: " + pZ + " pN: " + pN);
    return spamPrav
}

function timeLine(){
    window.document.getElementById('timeLine').style.display = "block";
    a = "<h1>Timeline </h1><br />"
    zajimaveTweety = "<h1>Zajímavé</h1>"
//    alert("TIMELINE");
Titanium.API.info('**************************************XXXX***************************');
    dataList = twcm.vypis(spojeni, "filtr", null , pageHomeCount);
    Titanium.API.info('-PRED###################### -V-Y-P-I-S');
     for(i = 0; i < dataList.length; i++){
        Titanium.API.info('-p-o- -V-Y-P-I-S')
          rawText = dataList[i].text  //  "cisty text" tweetu pro potrebu vypoctu BF
          screenName = dataList[i].user.screen_name
          avatar = dataList[i].user.profile_image_url
        // tweet je RT a zkraceny - nahradim text puvodnim nezkracenym
          if(dataList[i].retweeted_status && dataList[i].truncated == true){
            text = twcm.replaceUrl(dataList[i].retweeted_status.text,0)
            rawText = dataList[i].retweeted_status.text
//            alert("TRUNCATED ... "+ text)
          }
          else{
              text =  twcm.replaceUrl(dataList[i].text,0)
          }
          // jaka je pravdepodobnost ze je tweet spam
           spam = spamPr(rawText)
           //  // // //
//           dbPridatSpam(rawText)
           //  // // //
           text = twcm.replaceTag(text,0)
           text = twcm.replaceScreenName(text,0)
           statusid = dataList[i].id_str
           datum  = dataList[i].created_at
           favorited = dataList[i].favorited

           

           if(spam > 0.99){
            if(favorited) // nezajimavy
                    a += "<div class='statusDiv'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a class='retweetimg' href='#' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+dataList[i].user.screen_name+"\", \""+statusid+"\")'> Reply |</a><img src='../img/favorite_on.png' /><a href='#' onclick='unFavPy(spojeni,\""+statusid+"\")'>unFAV</a></span><span class='rawTextclass'>"+rawText+"</span></div>"
            else
                    a += "<div class='statusDiv'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><a href='#' class='favimg' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> | <a href='#' onclick='dbPridatZaj(\""+rawText+"\")'>Zaj+</a> | <a href='#' onclick='spamProb(\""+statusid+"\")'>SP</a></span> SPAM = "+spam+" <span class='rawTextclass'>"+rawText+"</span></div>"
           }

           else{ // zajimave
            if(favorited)
//                    a += "<div class='statusDiv'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a class='retweetimg' href='#' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><img src='../img/favorite_on.png' /><a href='#' onclick='unFavPy(spojeni,\""+statusid+"\")'>unFAV</a></span><span class='rawTextclass'>"+rawText+"</span></div>"
                      zajimaveTweety += "<div class='statusDiv zajStat'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a class='retweetimg' href='#' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><img src='../img/favorite_on.png' /><a href='#' onclick='unFavPy(spojeni,\""+statusid+"\")'>unFAV</a></span><span class='rawTextclass'>"+rawText+"</span></div>"
            else
//                    a += "<div class='statusDiv' style='color:green;'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><a href='#' class='favimg' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> | <a href='#' onclick='dbPridatZaj(\""+rawText+"\")'>Zaj+</a> | <a href='#' onclick='spamProb(\""+statusid+"\")'>SP</a></span> SPAM = "+spam+" <span class='rawTextclass'>"+rawText+"</span></div>"
                      zajimaveTweety += "<div class='statusDiv zajStat' style='color:green;'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><a href='#' class='favimg' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> | <a href='#' onclick='dbPridatZaj(\""+rawText+"\")'>Zaj+</a> | <a href='#' onclick='spamProb(\""+statusid+"\")'>SP</a></span> SPAM = "+spam+" <span class='rawTextclass'>"+rawText+"</span></div>"
           }
     }
//     if(dataList[2].truncated == false)
//             alert("TRUNCATED")
//    window.document.getElementById('timeLineOstatni').innerHTML = a + '<br /><a href="#" onclick="  pageHomeCount +=1; timeLine();">--STARŠÍ--</a>'
     window.document.getElementById('timeLineOstatni').innerHTML = a + '<br /><a id="starsi" name = "starsi" href="#starsi"id="starsi" name = "starsi" href="#starsi" onclick="starsiTwty();">--STARŠÍ--</a>'
    if(zajimaveTweety != "<h1>Zajímavé</h1>")
        window.document.getElementById('timeLineZajimave').innerHTML = zajimaveTweety +  '<br /><a href="#" onclick="starsiTwty();">--STARŠÍ-</a>'
//      window.document.getElementById('timeLineOstatni').innerHTML = "mmm"
//      window.document.getElementById('timeLineZajimave').innerHTML = "bbb"

}

/*
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

 */

function zapisDoSouboru(filename, text){
//   var contents = "Some contents to write";
//   var filename = 'SOUBORTITAN.txt';
   var userDir = Titanium.Filesystem.getApplicationDataDirectory();
   var writeFile = Titanium.Filesystem.getFile(userDir, filename);
   var writeStream = Titanium.Filesystem.getFileStream(writeFile);
   writeStream.open(Titanium.Filesystem.MODE_WRITE);
//   povedloSe = writeStream.write(contents);
   povedloSe = writeStream.write(text);
   writeStream.close();
   if(povedloSe)   alert("zapsano")
   else alert("error")
}

function ctiSoubor(filename){
 var readContents;
//   var filename = 'SOUBORTITANX.txt';
   var userDir = Titanium.Filesystem.getApplicationDataDirectory();
   var readFile = Titanium.Filesystem.getFile(userDir, filename);
   if (readFile.exists()){
      var readStream = Titanium.Filesystem.getFileStream(readFile);
      readStream.open(Titanium.Filesystem.MODE_READ);
      readContents = readStream.read(true);
      readStream.close();
      alert('contents = ' +  readContents);
      Titanium.API.info('contents = ' +  readContents);
      return true;
   }
    else {alert('NEEX');return false;}
   
}

function existujeSoubor(filename){
 var readContents;
//   var filename = 'SOUBORTITANX.txt';
   var userDir = Titanium.Filesystem.getApplicationDataDirectory();
   var readFile = Titanium.Filesystem.getFile(userDir, filename);
   if (readFile.exists()){
      Titanium.API.info('##################### existuje #####');
      return true;
   }
    else{
        return false;
    }

}

function prvniLogin(){
    temp_credentials = twcm.getReqToken(spojeni);
    link = twcm.prvniLogin(spojeni, temp_credentials);
    Titanium.Desktop.openURL(link);
    window.document.getElementById("vyzva").setAttribute("style", "display:block;");    
    //access_token = twitter.getAccessToken(temp_credentials, oauth_verifier)
}
function prijmiPIN(){
//     alert("PrijmiPIN - ZACATEK");
    pin = window.document.getElementById("PINInput").value
    window.document.getElementById("vyzva").setAttribute("style", "display:hidden;");
    alert(pin)
    accesToken = twcm.prijmiPIN(spojeni, temp_credentials, pin);
    OAT = accesToken.oauth_token;
    OATS = accesToken.oauth_token_secret;
    text =  accesToken.oauth_token + "\n" + accesToken.oauth_token_secret
    alert(text)
    zapisDoSouboru(configAppFile, text)
    spojeni = twcm.connectToTwNew(OAT, OATS);
    timeLine();
//    alert( accesToken)
//    zapisDoSouboru("andulka.config", accesToken)
//    alert("PrijmiPIN - KONEC");

}

function nactiTokeny(){
 var readContents;
//   var filename = 'SOUBORTITANX.txt';
   var userDir = Titanium.Filesystem.getApplicationDataDirectory();
   var readFile = Titanium.Filesystem.getFile(userDir, configAppFile);
   if (readFile.exists()){
      var readStream = Titanium.Filesystem.getFileStream(readFile);
      readStream.open(Titanium.Filesystem.MODE_READ);     
      OAT = readStream.readLine().toString();
      OATS = readStream.readLine().toString();
      readStream.close();
//      alert('OAT = ' + OAT + 'OATS = '+ OATS);
      Titanium.API.info('OAT = ' + OAT + '  OATS = '+ OATS);
      return true;
   }
    else {alert('NEEX NACTI_TOKENY');return false;}

}

function starsiTwty(){
     pageHomeCount =pageHomeCount + 1;
//     alert(pageHomeCount)
     timeLine();
}