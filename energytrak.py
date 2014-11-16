import os
import urllib
import datetime
import calendar
import json
import random

import jinja2
import webapp2
from google.appengine.ext import db


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=False)

#testing - run:  gcloud preview app run /Users/carlchapman/GoogleDrive/GAE/energytrak

'''
creating the page - a guide:
____________________________
we start from a mock ISU page

every page has a dropdown of the buildings, and a button to get an exemption

If you select a building, you get 3 tabs with charts on them (grandfathered links below)

The button takes you through the questionaire and gives you a pdf

There is a separate data entry/edit/delete interface, password protected

it has three tabs for meters, exemptions and ahu data
 
you can view, edit, add, delete rows from a data store

changes will persist
'''

#some classes to represent db entries

#one month of data for one meter in a particular building
class MeterData(db.Model):
    #electric, heating, cooling
    type = db.TextProperty()
    value = db.IntegerProperty()
    building = db.TextProperty()
    month = db.TextProperty()
    year = db.TextProperty()
    
#an exemption
class ExemptionData(db.Model):
    #electric, heating, cooling
    name = db.TextProperty()
    begin = db.DateProperty()
    building = db.TextProperty()
    room = db.TextProperty()
    
class AHUData(db.Model):
    #electric, heating, cooling
    id = db.IntegerProperty()
    building = db.TextProperty()
    floor = db.TextProperty()
    room = db.TextProperty()
    
    
#these next two functions generate some random-seeming entries to fill out the tables a little

#expect n to be 1 or greater
def getAHU(id,building,floor,startRoom,n):
    entries = []
    for x in range(1,n):
        entries.append(AHUData(id=id,building=building,floor=floor,room=str(random.randrange(startRoom, startRoom+n*5,x))))
    return entries
    
#expect n to be 1 or greater
def getMeter(type,building,year):
    entries = []
    for x in range(1,12):
        entries.append(MeterData(type=type,value=random.randrange(25, 100,x),building=building,month=calendar.month_name[x],year=year))
    return entries

#these two handler classes respond to requests, per webapp2.  See the 'application' at the bottom

class MainPage(webapp2.RequestHandler):
    def get(self):
            
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())
        
class AdminPage(webapp2.RequestHandler):
    def get(self):
        meter_entries=[]
        meter_entries.extend(getMeter("heating","Gilman","2012"))
        meter_entries.extend(getMeter("cooling","Gilman","2013"))
        
        exemption_entries=[]
        exemption_entries.append(ExemptionData(name="Prof. Bookish",begin=datetime.date(year=2014,month=11,day=15),building="Library",room="1232"))
        exemption_entries.append(ExemptionData(name="Prof. Science",begin=datetime.date(year=2015,month=1,day=10),building="Gilman",room="4032"))
        exemption_entries.append(ExemptionData(name="Dr. Experiment",begin=datetime.date(year=2014,month=12,day=1),building="Atanasoff",room="B032"))

        ahu_entries = []
        ahu_entries.extend(getAHU(1,"Gilman","1",1000,4))
        ahu_entries.extend(getAHU(2,"Gilman","1",1030,5))
        ahu_entries.extend(getAHU(3,"Gilman","4",4010,2))
            
        template = JINJA_ENVIRONMENT.get_template('tables.html')
        self.response.write(template.render(meters=meter_entries,exemptions=exemption_entries,ahus=ahu_entries))


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/admin', AdminPage),
], debug=True)