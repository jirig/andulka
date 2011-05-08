# -*- coding: utf-8 -*-
from sqlite3 import dbapi2 as sqlite

#nazev databaze vyuzivane pro klasifikaci prispevku
#DB = "anDB"
#db = sqlite
SNALEZENO = 1 # hledane slovo je v db
SNENALEZENO = 0 # hledane slovo neni v db
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
   
class MySqlite():
    """
    MySqlite je trida obstaravajici praci s databazi (sqlite) pro spravnou
    funkci adaptivni casti klienta.

    TODO:
        1) Ukonceni spojeni s DB
    """
#    db = sqlite.connect('./Resources/anDB')
    db = sqlite.connect('anDB')
    
#    def __init__(self):
#        try:
##            self.db = sqlite.connect('"./'+DB+'"')
#            self.db = sqlite.connect("./Resources/anDB")
#        except:
#            print "Pripojeni selhalo"
##
#    def __del__(self):
#        self.db.close()

    def createTable(self):
        self.db.execute("create table slovo(slovo,pocetZ,pocetN,pravZ,pravN,spamProb)")
        self.db.commit()

    def pocetSlov(self):
        pocet = self.db.execute("select count(*) from slovo");
#        print pocet
        return int(pocet.fetchone()[0])

    def insertSlovo(self, s):
            """Ulozeni zaznamu do db"""
            self.db.execute("insert into slovo values(?,?,?,?,?,?)", (s.slovo, s.pocetVyskytuZ, s.pocetVyskytuN, s.pravZajimave, s.pravNezajimave, s.spamProb))
            self.db.commit()
            spamProb = 0
            for s in slova:
                self.db.execute("insert into slovo(slovo,pocetZ,pocetN,pravZ,pravN,spamProb) values(?,?,?,?,?,?)", (s.slovo,s.pocetZ, s.pocetN, s.pravZ, s.pravN, s.spamProb))
#            self.db.execute("insert into kalendar(datum,cas,ucas,text,hotovo) values (?,?,?,?,?)", (datum, cas, ucas,text,done))
            print "YEAAAAH"
            self.db.commit()
#            self.db.close()

    def najdiSlovo(self, slovo):
        """
        metoda podporujici praci s konkretnim slovem, pokud slovo neni
        nalezeno v db bude se muset vytvorit novy zaznam
        """

        d = self.db.execute("select * from slovo where slovo = ?", (slovo,))
        if(d.fetchone() != None):
            return SNALEZENO
        else:
            return SNENALEZENO

    def najdiAZvys(self, slovo, typ):
        """
        Pokud je slovo jiz v db zvysi jeho pocet.
        Pokud neni ulozi jej a pocet nastavi na 1.
        """
        print "HEJHULAQ"
        d = self.db.execute("select * from slovo where slovo = ?", (slovo,))
        dd = d.fetchone()
        if(dd != None): #nalezeno
            pocet = int(dd[2])
            pocet += 1
            print pocet
            if(typ=="spam"): # krmime spamem?
                #ano 
                self.db.execute("update slovo set pocetN = ? where slovo = ?", (pocet, slovo,))
                self.db.commit()
            else:
                #ne
                self.db.execute("update slovo set pocetZ = ? where slovo = ?", (pocet, slovo,))
                self.db.commit()

        else: #nenalezeno
            pocet = 1
            if(typ=="spam"):
                self.db.execute("insert into slovo(slovo, pocetN) values(?, ?)", (slovo, pocet,))
                self.db.commit()
            else:
                self.db.execute("insert into slovo(slovo, pocetZ) values(?, ?)", (slovo, pocet,))
                self.db.commit()
            print slovo
#            self.db.close()
            return SNENALEZENO

    def selectSlovo(self, slovo):
        dbS = self.db.execute("select * from slovo where slovo = ?", (slovo.slovo,))
        for slovo.slovo, slovo.pocetVyskytuZ, slovo.pocetVyskytuN, slovo.pravZajimave, slovo.pravNezajimave, slovo.spamProb in dbS:
            return slovo

    def selectAll(self):
        slovo = Slovo()
        slova = []
#        rowid = 0
#        db = sqlite.connect('anDB')
        dbS = self.db.execute("select * from slovo")        
        for sslovo, pocetVyskytuZ, pocetVyskytuN, pravZajimave, pravNezajimave, spamProb in dbS:
#        for rowid, slovo.slovo, slovo.pocetVyskytuN, slovo.pocetVyskytuZ, slovo.pocetVyskytuN, slovo.pravZajimave, slovo.pravNezajimave, slovo.spamProb in dbS:
            slovo.slovo = str(sslovo)
#            slovo.pocetVyskytuZ = str(pocetVyskytuZ)
#            slovo.pocetVyskytuN = str(pocetVyskytuN)
#            slovo.pravZajimave = str(pravZajimave)
#            slovo.pravNezajimave = str(pravNezajimave)
#            slovo.spamProb = str(spamProb)
            print slovo.slovo

            slova.append(slovo)
        print slova
#        for s in slova:
#            print s.slovo
#        return slova


    def pocetZajimavych(self):
        pocet = self.db.execute("select * from slovo where pocetZ > 0 ")
        p = len(pocet.fetchall())
        if( p > 0):
            return p
        else:
            return 1

    def pocetNezajimavych(self):
        pocet = self.db.execute("select * from slovo where pocetN > 0 ")
        p = len(pocet.fetchall())
        if( p > 0):
            return p
        else:
            return 1
        
    def selectTableKalendar(self):
            """ vyber vsech udalosti v kalendari """
#            db = sqlite.connect('MYDB')
            date="\n"
            pdate="\n...\n"

            vystup = self.db.execute(" select rowid,* from kalendar")
            for rowid,datum, cas, ucas, text, hotovo in vystup:
                    ID = str(rowid)
                    ddatum = str(datum)
                    ccas = str(cas)
                    txtt = str(text)
                    done = str(hotovo)
                    print txtt
                    date += "ID: "+ ID + " ... "+datum+"-"+ccas+"..." +txtt+" Done: " +done+  pdate

            self.db.close
            return date
    def dclose(self):
        self.db.close()
        