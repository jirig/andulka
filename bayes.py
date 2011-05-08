# -*- coding: utf-8 -*-
"""
1) nacist obsah obsahu spam souboru
2) rozdelit po slovech =>> vytvorit seznam slov s.append(slovo)
3) pro kazde slovo jeho pocet vyskytu ve spamu a hamu
4) spocitat miru spamu... (pocet vyskytu slova ve spamu/celkovy pocet spam slov)/citatel+ (to co citatel ale pro ham)
    a) pocet S a H = 0 => spam = 0,0
    b) spam < 0,01 => spam = 0,01
    c) spam > 0,99 => spam = 0,99
-----
5) pro slova z noveho prispevku spocitat pravdepodobnost (4i)*(4[i+1])/{(4i)*(4[i+1])+((1-4i)*(1-4[i+1]))}
    a) pokud slovo neni ve slovniku je potreba jej pridat
-----

// pocet vyskytu slova mezi zajimavymi prispevky
sPZ
// pocet vyskytu slova mezi nezajimavymi prispevky
sPN
// pravdepodobnost vyskytu
pSZ
pSN
// pravdepodobnost ze slovo patri do zajimaveho prispevku
ppZ
"""

import mySqlite

SNALEZENO = 1 # hledane slovo je v db
SNENALEZENO = 0 # hledane slovo neni v db
#global pocetZajimavych
#global pocetNezajimavych

class Slovo():
   """trida pro uchovani informaci o danem slove"""
#   def __init__(self):
#       print
   slovo = ""
   pocetVyskytuZ = 1
   pocetVyskytuN = 1
   pravZajimave = 1
   pravNezajimave = 1
   spamProb = 1
# pocetZajimavych => select * from slovo where pocetZ/N != 0
   #       TODO: udelat variantu pro SPAM a HAM!!
   
   def prepocet(self):
       pocetZajimavychSlov = self.pocetZajimavych()
       pocetNezajimavychSlov = self.pocetNezajimavych()
       self.pocetVyskytuZ +=1
       self.pocetVyskytuN +=1
       self.pravZajimave = self.pocetVyskytuZ / pocetZajimavychSlov
       self.pravNezajimave = self.pocetVyskytuN / pocetNezajimavychSlov
       self.spamProb = self.pravZajimave / (self.pravZajimave + self.pravNezajimave)

   def pocetZajimavych(self):
       db = mySqlite.MySqlite()
       return (db.pocetZajimavych())
   
   def pocetNezajimavych(self):
       db = mySqlite.MySqlite()
       return (db.pocetNezajimavych())



   
class Bayes():
    """
    Trida Bayes zajistuje klasifikacei a trizeni prispevku pro nasledne
    (ne)zobrazeni.
    """
#    def __init_(self):


    def parseData(self, text=None):
        
        if(text != None):
            spamText = text
            spamText = "Swiss replica watches: swiss movement replicas,"
        else:
            f = open("tmpSpam.txt", "r")
            spamText = f.read()
            spamText =(spamText).decode('utf-8')
#        print spamText
        # nahrazeni/odstraneni nevyznamnych znaku pro analyzu
        # TODO: doplnit znaky
#        spamText = spamText.encode('utf-8')
        
#        spamText = spamText.replace("."," ").replace(","," ").replace("\""," ").replace("#"," ").replace("“"," ").replace("”"," ").replace("@"," ").replace("$"," ").replace("\'"," ").replace("\\"," ").replace("/"," ").replace("!"," ").replace("?"," ").replace(":"," ").replace("\n", " ").lower()
        spamText = spamText.replace("."," ").replace(","," ").replace("\""," ").replace("#"," ").replace("@"," ").replace("$"," ").replace("\'"," ").replace("\\"," ").replace("\/"," ").replace("!"," ").replace("?"," ").replace(":"," ").replace("\n", " ").lower()
        spamWords = spamText.split()
        #        print spamWords
#        db = mySqlite.MySqlite()
#        slovo = Slovo()
#        slova = []
# pro kazde slovo se provede zjisteni pritomnosti, vypocet pravdepodobnosti,
# pripadne pridani do db
#        for s in spamWords:
#            slovo.slovo = s
#
#            jetam = dotaz do db s.slovo
#            if(db.najdiSlovo(s)):
#                slovo.pocetVyskytuZ = db.fetchone()[1]
#                slovo.pocetVyskytuN = db.fetchone()[2]
#                slovo.prepocet()
#            else:
#                slovo.prepocet()
##            print s.slovo
#            slova.append(slovo)
            
#            s.append("xxxx")
#        self.verdikt(slova)
        print "PRED NAPLN"
        self.spamNapln(spamWords)
#        self.spamNapln(hamWords)
        print "PRED SQL"
#        db = mySqlite.MySqlite()
        print "MEZI SQL"
#        pocetSlov = db.pocetSlov
        print "Po SQL"
#        db.selectAll()


    def spamNapln(self, spamWords):
        dbd = mySqlite.MySqlite()
#        db.selectAll()
        for s in spamWords:
            dbd.najdiAZvys(s, "spam")
#        del db
        dbd.dclose()


#    def naplnSpam(self, db, slovo):
#
#        if(db.najdiSlovo(slovo.slovo)):
#            slovo.prepocet()
#        db.insertSlovo(slovo)


        

    def pravdepodobnost(self, slovo, pocetZajimavychSlov, pocetNezajimavych):
        slovo.pravZajimave = slovo.pocetVyskytuZ / pocetZajimavychSlov
        slovo.pravNezajimave = slovo.pocetVyskytuN / pocetNezajimavychSlov
        slovo.spamProb = slovo.pravZajimave / (slovo.pravZajimave + slovo.pravNezajimave )

    def verdikt(self, slovo):
        """metoda pro konecnou klasifikaci, zda je prispevek zajimavy"""
        pVZ = 1
        pVN = 1
        for s in slovo:
#            pVZ *= s.pravZajimave
#            pVN *= s.pravNezajimave
             pVZ *= s.spamProb
             pVN *= (1-s.spamProb)

        vysledek = pVZ / (pVZ + pVN)
        print "VYSLEDEK: "
        print vysledek
        return vysledek




    def spamP(self):
        pSpam = 1
        pSpam *= ps[i] / (ps[i]+(1-ps[i]))
        print


