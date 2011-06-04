var schovano = 0;
var stoplistCZ;
var stoplistEN;
var LASTID=0;
var vizFlag = 0;
var tmpJSN;

//window.addEventListener("onresize", resizeViz(), false);
/*
window.onresize = function()
{
     resizeViz();
}
*/
function resizeViz(){
//    alert("resize")
//if (this.contentTabs.get('activeIndex') == 1) {
//  var cc = this.layout.getUnitById('content_col');
//  InventoryGraph.resize(cc.get('height'),  cc.get('width'));
//
//}
    ht.move({ x: 0, y: 0.7 }, {
      hideLabels: true
    });
wid = window.innerWidth
//window.document.getElementById("infovis-canvas").setAttribute("width",wid+"px")
if(vizFlag)
//    init(tmpJSN); vykresli znova coz uplne nechci
      
    true
}
function presmeruj()
{
  window.location.href="http://google.com";
}

var pocetpismenek=0;

function pocetZnaku(kde)
{
// spocita pocet znaku v textarea
//   pocetpismenek ++;
 pocetz = 140 - window.document.getElementById(kde).value.length;
if(pocetz < 0){
      window.document.getElementById('pocet').style.color = "red";
      window.document.getElementById('pocet').style.fontWeight = "bold";
  }
  else
      window.document.getElementById('pocet').style.color = "black";
//  window.document.getElementById('pocet').innerHTML =140 - window.document.getElementById(kde).value.length;
 
  
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
    document.getElementById('statusArea').focus();
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
    vizFlag = 1;

    jsn = vizPy(spojeni);
    tmpJSN =jsn;
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
//    window.document.getElementsByTagName('body')[0].setAttribute("onresize", "init(jsn)")

    // vykresleni grafu
    init(jsn);
    nTL = document.createElement('div');

    did = "timeLine"

    nTL.setAttribute('id',did);
     nTL.setAttribute('style','display:none');
    nTL.innerHTML = obsahDivTimeLine
    otec.appendChild(nTL);
//     window.document.getElementById('body').setAttribute("onresize", "alert('RESIZE')")
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
        window.document.getElementById('pocet').value = "140"
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
        vizFlag = 0;
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

//   var db = Titanium.Database.openFile(Titanium.Filesystem.getFile( Titanium.Filesystem.getApplicationDataDirectory(),'bayDB.db'));
    
    db.execute("CREATE TABLE IF NOT EXISTS slovo(slovo, pocetN, pocetZ)");
    //alert(twcm.bFiltruj(spojeni));
    arrayPy = twcm.bFiltruj(spojeni, pageHomeCount);
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
             pocetN = resultSet.fieldByName("pocetN");           
            pocetN = parseInt(pocetN);
            if(pocetN > 0){
                pocetN = pocetN - 1;
                resultSet= db.execute("UPDATE slovo SET pocetN = ? WHERE slovo = ?",pocetN, slovo);
            }
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

function dbPridatZaj(text){



    // spojeni s DB
//     var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'bayDB.db'));
     db.execute("CREATE TABLE IF NOT EXISTS slovo(slovo, pocetN, pocetZ)");

  Titanium.API.info('-PRED###################### -ZAJJJJ');
    forSplit = twcm.replaceNonAlpha(text)
      Titanium.API.info('-POOOOO###################### -ZZZAAAAJJJ');

    // pole s jednotlivymi slovy
    arrayPy = twcm.splitIt(forSplit);
    hm = ""
    a = 0
    //alert(arrayPy)
    while(arrayPy.length > 0){
        tmpSlovo = arrayPy.pop()
         if(!(stopListTest(tmpSlovo))){ // slovo neni ve stoplistu tak jej ulozi
        dbUpdate(db, tmpSlovo,1)
        a ++;
        hm += " " + tmpSlovo
         }
    }
//    db.close()
    //alert(hm + ":" + a)
    alert("Příspěvek byl přidán mezi zajímavé")
}

function dbPridatSpam(text){



   forSplit = twcm.replaceNonAlpha(text)

    // pole s jednotlivymi slovy
    arrayPy = twcm.splitIt(forSplit);

    while(arrayPy.length > 0){
        tmpSlovo = arrayPy.pop()
        if(!(stopListTest(tmpSlovo))){
        dbUpdate(db, tmpSlovo,0)
        }
    }
//    db.close()


}

function bSelekce(){
    var pZ = 1.0;
    var pN = 1.0;
//     var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'bayDB.db'));
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

//    var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'bayDB.db'));
     db.execute("CREATE TABLE IF NOT EXISTS slovo(slovo, pocetN, pocetZ)");
    resultSet = db.execute("SELECT * FROM slovo WHERE slovo = ? and pocetN > 1", slovo);
//    resultSet = db.execute("SELECT * FROM slovo WHERE slovo = ?", slovo);
    spamPocet =  resultSet.fieldByName('pocetN');
//    pocetZ > 1 protoze pokud je slovo pridavano do db da se vzdy 1  ne 0
    resultSet = db.execute("SELECT * FROM slovo WHERE slovo = ? and pocetZ > 1", slovo);
    resultSet = db.execute("SELECT * FROM slovo WHERE slovo = ?", slovo);
    zajimPocet =  resultSet.fieldByName('pocetZ');
    if(spamPocet == 0 || spamPocet == null) spamPocet = 1;
    if(zajimPocet == 0 || zajimPocet == null) zajimPocet = 0;
//    alert(spamPocet);
    resultSet = db.execute("SELECT * FROM slovo WHERE pocetN > 1");
//    resultSet = db.execute("SELECT SUM(pocetN) FROM slovo");
    pocetSpamSlov = parseInt(resultSet.fieldCount())
//    pocetSpamSlov = resultSet
    resultSet = db.execute("SELECT * FROM slovo WHERE pocetZ > 1");
//    resultSet = db.execute("SELECT SUM(pocetZ) FROM slovo as suma");
    pocetZajimSlov =  parseInt(resultSet.fieldCount())
//    pocetZajimSlov = parseInt(resultSet.fieldByName("suma"))
//    alert(resultSet.fieldByName("suma"))

    spamP = spamPocet/pocetSpamSlov;
    zajimP = zajimPocet/pocetZajimSlov;
    pravSpam = spamP/(zajimP + spamP);
//    alert("dbSpamWord pravSpam: "+pravSpam + " pSS: " +pocetSpamSlov +" pZS "+pocetZajimSlov  );
    if(pravSpam < 0.01)
            pravSpam = 0.01
    else if(pravSpam > 0.99999)
            pravSpam = 0.99999

    return pravSpam;
}

function spamProb(statusId){
    /* funkce spamProb spocita pradepodobnost (zajimavosti) pro konkretni tweet */
    var pZ = 1.0;
    var pN = 1.0;
    text = twcm.getTwt(spojeni, statusId)

    forSplit = twcm.replaceNonAlpha(text)

    // pole s jednotlivymi slovy
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
            if (!(stopListTest(tmpSlovo))){ // slovo neni ve stoplistu
                spamPravSlovo = dbSpamWord(tmpSlovo)

                pZ *= spamPravSlovo
                pN *= 1.0 - spamPravSlovo
            }
        }
//        if(pZ < 0.01) pZ = 0.01;
//        if(pN < 0.01) pN = 0.01;
//        if(pZ > 0.99) pz = 0.99;
//        if(pN > 0.99) pz = 0.99;
    spamPrav = pZ/(pZ+pN);
//    spamPrav = pN/(pN-pZ);
//    alert(spamPrav + " pZ: " + pZ + " pN: " + pN);
    return spamPrav
}

function timeLine(co){
    window.document.getElementById('timeLine').style.display = "block";
    window.document.getElementById('skrytZajimave').setAttribute("style","display:block");
     window.document.getElementById('timeLineZajimave').innerHTML =""
    if(schovano == 0)
       zobrazZajimave();
    a = "<h3>Všechny tweety</h3>"
    if(pageHomeCount > 1)
        a = window.document.getElementById('timeLineOstatni').innerHTML
//    alert(":::" + a +":::")
    window.document.getElementById('popisZobrazeni').innerHTML = "Timeline"
    zajimaveTweety = "<h3>Zajímavé</h3>"
//    alert("TIMELINE");
    Titanium.API.info('**************************************XXXX***************************');
    if(co == "timeline")
        try{
    dataList = twcm.vypis(spojeni, "filtr", null , pageHomeCount);
        }
    catch(err){
        alert("ERROR")
    }
    else if(co == "globalline")
         dataList = twcm.vypis(spojeni, "globalline", null , pageHomeCount);  
    else{
        dataList = twcm.vypis(spojeni, "globalline", null , pageHomeCount);
    }
  Titanium.API.info('-PRED###################### -V-Y-P-I-S');
     statusid = dataList[0].id_str
     // zapis nejaktualnejsi id prispevku do souboru aby se neohodnocovaly ty same prispevky dokola
     zapisID(statusid);

     for(i = 0; i < dataList.length; i++){
       
        Titanium.API.info('-p-o- -V-Y-P-I-S')
          
          statusid = dataList[i].id_str
        
          datum  = dataList[i].created_at
          favorited = dataList[i].favorited
          datum = prevodCasu(datum);
          rawText = dataList[i].text  //  "cisty text" tweetu pro potrebu vypoctu BF
          rawText = twcm.replaceNonAlpha(rawText)
          screenName = dataList[i].user.screen_name
          avatar = dataList[i].user.profile_image_url
//          dataList[i].text = dataList[i].text.replace(/"/g, '&quot')
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
          text = twcm.replaceTag(text,0)
          text = twcm.replaceScreenName(text,0)
           spam = spamPr(rawText)
//            spam = spamPr(rawText)
//           spam = 1
           //  pokud je ID prispevku mensi nez posledni nebude se pridavat do DB aby nedochazelo k duplicitam pri obnovovani atd.
             if(LASTID < statusid)
                 dbPridatSpam(rawText)
           //  // // //
       
           

           if(spam > 0.99){
            if(favorited) // nezajimavy
                    a += "<div class='statusDiv'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a class='retweetimg' href='#' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+dataList[i].user.screen_name+"\", \""+statusid+"\")'> Reply |</a><img src='../img/favorite_on.png' /><a href='#' onclick='unFavPy(spojeni,\""+statusid+"\")'>unFAV</a></span><span class='rawTextclass'>"+rawText+"</span></div>"
            else
                    a += "<div class='statusDiv'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'> RT </a> | "+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> @ </a> | <a href='#' class='favimg' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> | <a href='#' onclick='dbPridatZaj(\""+rawText+"\")'>+Z+</a> |  SPAM = "+spam+" <span class='rawTextclass'>"+rawText+"</span> </span></div>"
                    
           }

           else{ // zajimave
            if(favorited){
                    a += "<div class='statusDiv zajStat'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a class='retweetimg' href='#' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><img src='../img/favorite_on.png' /><a href='#' onclick='unFavPy(spojeni,\""+statusid+"\")'>unFAV</a></span><span class='rawTextclass'>"+rawText+"</span></div>"
                      zajimaveTweety += "<div class='statusDiv zajStat'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a class='retweetimg' href='#' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><img src='../img/favorite_on.png' /><a href='#' onclick='unFavPy(spojeni,\""+statusid+"\")'>unFAV</a></span><span class='rawTextclass'>"+rawText+"</span></div>"
            }
            else{
//                    a += "<div class='statusDiv  zajStat'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><a href='#' class='favimg' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> | <a href='#' onclick='dbPridatZaj(\""+rawText+"\")'>Zaj+</a> | <a href='#' onclick='spamProb(\""+statusid+"\")'>SP</a></span> SPAM = "+spam+" <span class='rawTextclass'>"+rawText+"</span></div>"
                      a += "<div class='statusDiv zajStat'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'> RT </a> | "+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> @ </a> | <a href='#' class='favimg' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> | <a href='#' onclick='dbPridatZaj(\""+rawText+"\")'>+Z+</a> |  SPAM = "+spam+" <span class='rawTextclass'>"+rawText+"</span> </span></div>"
//                      zajimaveTweety += "<div class='statusDiv zajStat'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><a href='#' class='favimg' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> | <a href='#' onclick='dbPridatZaj(\""+rawText+"\")'>Zaj+</a> | <a href='#' onclick='spamProb(\""+statusid+"\")'>SP</a></span> SPAM = "+spam+" <span class='rawTextclass'>"+rawText+"</span></div>"
                        zajimaveTweety += "<div class='statusDiv zajStat'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'> RT </a> | "+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> @ </a> | <a href='#' class='favimg' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> | <a href='#' onclick='dbPridatZaj(\""+rawText+"\")'>+Z+</a> |  SPAM = "+spam+" <span class='rawTextclass'>"+rawText+"</span> </span></div>"
            }
           }
     }
//     if(dataList[2].truncated == false)
//             alert("TRUNCATED")
//    window.document.getElementById('timeLineOstatni').innerHTML = a + '<br /><a href="#" onclick="  pageHomeCount +=1; timeLine();">--STARŠÍ--</a>'
     window.document.getElementById('timeLineOstatni').innerHTML = a + '<br /><a id="starsi" name = "starsi" href="#starsi"id="starsi" name = "starsi" href="#starsi" onclick="starsiTwty();">--STARŠÍ--</a>'
    if(zajimaveTweety != "<h3>Zajímavé</h3>")
        window.document.getElementById('timeLineZajimave').innerHTML = zajimaveTweety +  '<br /><a href="#" onclick="starsiTwty();">--STARŠÍ-</a>'
//      window.document.getElementById('timeLineOstatni').innerHTML = "mmm"
//      window.document.getElementById('timeLineZajimave').innerHTML = "bbb"

}

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
//   if(povedloSe)   alert("zapsano")
//   else alert("error")
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

function prvniLogin(spojeni){
    temp_credentials = twcm.getReqToken(spojeni);
    link = twcm.prvniLogin(spojeni, temp_credentials);
    Titanium.Desktop.openURL(link);
    window.document.getElementById("vyzva").setAttribute("style", "display:block;");
    window.document.getElementById("skrytZajimave").setAttribute("style", "display:none;");
    //access_token = twitter.getAccessToken(temp_credentials, oauth_verifier)
}
function prijmiPIN(){
//     alert("PrijmiPIN - ZACATEK");
    pin = window.document.getElementById("PINInput").value
    window.document.getElementById("vyzva").setAttribute("style", "display:hidden;");
    //alert(pin)
    accesToken = twcm.prijmiPIN(spojeni, temp_credentials, pin);
    OAT = accesToken.oauth_token;
    OATS = accesToken.oauth_token_secret;
    text =  accesToken.oauth_token + "\n" + accesToken.oauth_token_secret
//    alert(text)
    zapisDoSouboru(configAppFile, text)
    spojeni = twcm.connectToTwNew(OAT, OATS);
    openDB();
        window.document.getElementById("skrytZajimave").setAttribute("style", "display:block;");
    timeLine("timeline");
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
      nactiID();
//     if((LASTID = readStream.readLine()) != null) alert("ID "+LASTID)
//     else LASTID = 0
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
     timeLine("timeline");
}

function openDB(){
     db = Titanium.Database.openFile(Titanium.Filesystem.getFile(Titanium.Filesystem.getApplicationDataDirectory(),'bayDB.db'));
}

function closeDB(){
    db.close();
}

function search(){
    schovejViz();
     window.document.getElementById('timeLineZajimave').innerHTML =
    window.document.getElementById('skrytZajimave').setAttribute("style","display:block");
    window.document.getElementById('timeLineZajimave').setAttribute("style","display:block");
     
    window.document.getElementById('popisZobrazeni').innerHTML = "Vyhledávání";
    window.document.getElementById('timeLine').style.display = "block";
     if(schovano == 0)
       zobrazZajimave();
    slovo = window.document.getElementById("searchInput").value;
    twcm.vypis(spojeni, "searchf", slovo, pageHomeCount)
    a = "<h3>Všechny tweety</h3>"
    if(pageHomeCount > 1)
        a = window.document.getElementById('timeLineOstatni').innerHTML    
    zajimaveTweety = "<h3>Zajímavé</h3>"
    Titanium.API.info('**************************************XXXX***************************');
    dataList = twcm.vypis(spojeni, "searchf", slovo, pageHomeCount);

     for(i = 0; i < dataList['results'].length; i++){
        Titanium.API.info('-p-o- -V-Y-P-I-S')
          rawText = dataList['results'][i].text  //  "cisty text" tweetu pro potrebu vypoctu BF
          screenName = dataList['results'][i].from_user;
          avatar = dataList['results'][i].profile_image_url
        // tweet je RT a zkraceny - nahradim text puvodnim nezkracenym
          if(dataList['results'][i].retweeted_status && dataList['results'][i].truncated == true){
            text = twcm.replaceUrl(dataList['results'][i].retweeted_status.text,0)
            rawText = dataList['results'][i].retweeted_status.text
            //alert("TRUNCATED ... "+ text)
          }
          else{
              text =  twcm.replaceUrl(dataList['results'][i].text,0)
          }
          // jaka je pravdepodobnost ze je tweet spam
          rawText = twcm.replaceNonAlpha(rawText)
           spam = spamPr(rawText)
           //  // // //
//           dbPridatSpam(rawText)
           //  // // //
           text = twcm.replaceTag(text,0)
           text = twcm.replaceScreenName(text,0)
           statusid = dataList['results'][i].id_str
           datum  = dataList['results'][i].created_at
           favorited = dataList['results'][i].favorited
           datum = prevodCasu(datum);


          
           if(spam > 0.99){
            if(favorited) // nezajimavy
                    a += "<div class='statusDiv'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a class='retweetimg' href='#' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><img src='../img/favorite_on.png' /><a href='#' onclick='unFavPy(spojeni,\""+statusid+"\")'>unFAV</a></span><span class='rawTextclass'>"+rawText+"</span></div>"
            else
                    a += "<div class='statusDiv'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><a href='#' class='favimg' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> | <a href='#' onclick='dbPridatZaj(\""+rawText+"\")'>Zaj+</a> | <a href='#' onclick='spamProb(\""+statusid+"\")'>SP</a> | </span> SPAM = "+spam+" <span class='rawTextclass'>"+rawText+"</span></div>"
//                                    a += "<div class='statusDiv'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><a href='#' class='favimg' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> | <a href='#' onclick='dbPridatZaj(\""+rawText+"\")'>Zaj+</a> | <a href='#' onclick='spamProb(\""+statusid+"\")'>SP</a> | </span> SPAM = "+spam+" <span class='rawTextclass'>"+rawText+"</span></div>"
           }

           else{ // zajimave
            if(favorited){
                    a += "<div class='statusDiv zajStat'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a class='retweetimg' href='#' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><img src='../img/favorite_on.png' /><a href='#' onclick='unFavPy(spojeni,\""+statusid+"\")'>unFAV</a></span><span class='rawTextclass'>"+rawText+"</span></div>"
                      zajimaveTweety += "<div class='statusDiv zajStat'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a class='retweetimg' href='#' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><img src='../img/favorite_on.png' /><a href='#' onclick='unFavPy(spojeni,\""+statusid+"\")'>unFAV</a></span><span class='rawTextclass'>"+rawText+"</span></div>"
            }
            else{
                    a += "<div class='statusDiv  zajStat'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><a href='#' class='favimg' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> | <a href='#' onclick='dbPridatZaj(\""+rawText+"\")'>Zaj+</a> | <a href='#' onclick='spamProb(\""+statusid+"\")'>SP</a></span> SPAM = "+spam+" <span class='rawTextclass'>"+rawText+"</span></div>"
                      zajimaveTweety += "<div class='statusDiv zajStat'><img src='"+avatar+"'/><b>"+screenName+ "</b>" + "<br /><span id='"+statusid+"'>" + text + "</span><br /><span class='statusTimeSpan'>"+datum+"<a href='#' class='retweetimg' onclick='retwtPy(spojeni,\""+statusid+"\")'>RT |</a>"+"<a href='#' class='replyimg' onclick='reply(spojeni,\""+screenName+"\", \""+statusid+"\")'> Reply |</a><a href='#' class='favimg' onclick='newFavPy(spojeni,\""+statusid+"\")'>FAV</a> | <a href='#' onclick='dbPridatZaj(\""+rawText+"\")'>Zaj+</a> | <a href='#' onclick='spamProb(\""+statusid+"\")'>SP</a></span> SPAM = "+spam+" <span class='rawTextclass'>"+rawText+"</span></div>"
            }
           }
     }
//     if(dataList[2].truncated == false)
//             alert("TRUNCATED")
//    window.document.getElementById('timeLineOstatni').innerHTML = a + '<br /><a href="#" onclick="  pageHomeCount +=1; timeLine();">--STARŠÍ--</a>'
     window.document.getElementById('timeLineOstatni').innerHTML = a + '<br /><a id="starsi" name = "starsi" href="#starsi"id="starsi" name = "starsi" href="#starsi" onclick="starsiTwtySrch();">--STARŠÍ--</a>'
    if(zajimaveTweety != "<h3>Zajímavé</h3>")
        window.document.getElementById('timeLineZajimave').innerHTML = zajimaveTweety +  '<br /><a href="#" onclick="starsiTwtySrch();">--STARŠÍ-</a>'
    location.href = '#timeLine';
}

function starsiTwtySrch(){
    pageHomeCount =pageHomeCount + 1;
    search();
}

function skryjZajimave(){
    window.document.getElementById('timeLineZajimave').setAttribute("style","display:none");
    window.document.getElementById('skrytZajimave').setAttribute("onclick","zobrazZajimave()");
    window.document.getElementById('skrytZajimave').innerHTML = "Zobrazit zajímavé teety"
    schovano = 1
}
function zobrazZajimave(){
     window.document.getElementById('timeLineZajimave').setAttribute("style","display:block");
     window.document.getElementById('skrytZajimave').setAttribute("onclick","skryjZajimave()");
     window.document.getElementById('skrytZajimave').innerHTML = "Skrýt zajímavé teety"
     schovano = 0
}

function mentionsFavs(co){
      window.document.getElementById('skrytZajimave').setAttribute("style","display:none");
      window.document.getElementById('timeLine').style.display = "block";
      window.document.getElementById('timeLineZajimave').style.display = "none"
      a=""
       if(pageHomeCount == 1)
           window.document.getElementById('timeLineOstatni').innerHTML = ""
        if(pageHomeCount > 1)
            a = window.document.getElementById('timeLineOstatni').innerHTML
    //    alert(":::" + a +":::")
        if(co == "mentions"){
            window.document.getElementById('popisZobrazeni').innerHTML = "Mentios"
            dataList = twcm.vypis(spojeni, "mentions", null , pageHomeCount);
        }
        else{
            dataList = twcm.vypis(spojeni, "myFavs", null , pageHomeCount);
            window.document.getElementById('popisZobrazeni').innerHTML = "Oblíbené"
        }
        a += dataList;
        Titanium.API.info('**************************************XXXX***************************');
        window.document.getElementById('timeLineOstatni').innerHTML = a +  '<br /><a href="#starsi" name="starsi"; onclick="starsiMentionsFavs(\''+co+'\');">--STARŠÍ-</a>'
//        location.href = '#starsi';

}

function starsiMentionsFavs(co){
     pageHomeCount =pageHomeCount + 1;
//     alert(pageHomeCount)
      mentionsFavs(co);
}

function prevodCasu(stamp){
    var datum = new Date(Date.parse(stamp))
      console.log(datum)
      var now = new Date();
      var nowEpoch = now.getTime();
      targetEpoch = datum.getTime();
        daysLeft = Math.floor(((nowEpoch - targetEpoch) / (60*60*24)) / 1000);
        hours =  Math.floor((nowEpoch - targetEpoch) / 1000/ (60*60) % 24 );
        minutes = Math.floor(((nowEpoch - targetEpoch) / 1000 % (60*60)) / 60 );
        seconds = Math.floor((nowEpoch - targetEpoch) / 1000 % 60 );
      if(daysLeft >= 1)
// 	return daysLeft;
//        if(daysLeft == 1)
//            return "včera"
//	else
            return Date(stamp).toLocaleString().substr(0, 16);
      else if(hours >= 1)
	if(hours == 1)
	  return "před hodinou"
	else if (hours < 5)
	  return  hours + " hodiny zpět"
        else 
            return hours + " hodin zpět"
      else if(minutes > 0)
	if(minutes == 1)
	  return "před minutou"
        else if(minutes < 5)
            return minutes + " minuty zpět"
	else
	  return minutes + " minut zpět"
// 	return minutes
      else return "před chvílí"
}
function nactiStoplisty(){
/*funkce nacte obsahy stoplistu pro mozna porovnavani za behu
 *stoplisty jsou nacteny do globalnich promennych stoplistCZ a EN
 */
   var userDir = Titanium.Filesystem.getApplicationDataDirectory();
   var readFile = Titanium.Filesystem.getFile(userDir, "stoplistCZ.txt");
   if (readFile.exists()){
      var readStream = Titanium.Filesystem.getFileStream(readFile);
      readStream.open(Titanium.Filesystem.MODE_READ);
      stoplistCZ = readStream.read().toString();
      readStream.close();
//      return true;
   }
    else {alert('NELZE nacist STOPLIST (CZ)');return false;}
   userDir = Titanium.Filesystem.getApplicationDataDirectory();
   readFile = Titanium.Filesystem.getFile(userDir, "stoplistEN.txt");
   if (readFile.exists()){
      readStream = Titanium.Filesystem.getFileStream(readFile);
      readStream.open(Titanium.Filesystem.MODE_READ);
      stoplistEN = readStream.read().toString();
      readStream.close();
//      return true;
   }

}
function stopListTest(slovo){
    /*
     *funkce otestuje zda se @slovo nachází v nekterem stoplistu
     **/
    naselCZ = stoplistCZ.search(slovo.toLowerCase());
    if(naselCZ == -1){ // nenasel v prvnim stoplistu a koukne se do druheho
         naselEN = stoplistEN.search(slovo.toLowerCase());
          if(naselEN == -1)
            return false // slovo neni v stoplistu
         else 
             return true // je obsazeno v stoplistu
    }
    else // slovo je v prvnim stoplistu
        return true
}

function zapisID(id){
    var userDir = Titanium.Filesystem.getApplicationDataDirectory();
   var writeFile = Titanium.Filesystem.getFile(userDir, "lastid.cfg");
   var writeStream = Titanium.Filesystem.getFileStream(writeFile);
   writeStream.open(Titanium.Filesystem.MODE_WRITE);
//   povedloSe = writeStream.write(contents);
   povedloSe = writeStream.write(id);
   writeStream.close();
}
function nactiID(){
   var readContents;
//   var filename = 'SOUBORTITANX.txt';
   var userDir = Titanium.Filesystem.getApplicationDataDirectory();
   var readFile = Titanium.Filesystem.getFile(userDir, "lastid.cfg");
   if (readFile.exists()){
      var readStream = Titanium.Filesystem.getFileStream(readFile);
      readStream.open(Titanium.Filesystem.MODE_READ);
     if((LASTID = readStream.readLine()) != null)
         true
         //alert("ID "+LASTID)
     else LASTID = 0
      readStream.close();
//      Titanium.API.info('OAT = ' + OAT + '  OATS = '+ OATS);
      return true;
   }
   else LASTID = 0
//    else {alert('NEEXISTUJE soubor s poslednim ID');return false;}
}

function posliStatus(spojeni, replyStatusID){
    //#try:
    if(window.document.getElementById('statusArea').value.length >140)
        alert("Text je příliš dlouhý")
    else{
      text = window.document.getElementById('statusArea').value;
      if(replyStatusID){
        twcm.publishStatus(spojeni, text, statusID = replyStatusID);
        replyStatusID = 0;
      }
      else
        twcm.publishStatus(spojeni, text);
      window.document.getElementById('statusArea').value = ""

      ukazForm("twtForm")
      window.document.getElementById('pocet').innerHTML =140
   // #except:
     //#  alert("odeslani selhalo");
    }
}