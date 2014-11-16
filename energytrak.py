import os
import urllib
import datetime
import json

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

 

class MainPage(webapp2.RequestHandler):
    def get(self):
            
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())
        
class AdminPage(webapp2.RequestHandler):
    def get(self):
        meters=[MeterData(type="a",value=4,building="b",month="c",year="d")]
        exemptions=[ExemptionData(name="Destro",begin=datetime.date(year=2014,month=11,day=15),building="library",room="1232")]
        ahus=[AHUData(id=1,building="library",floor="1a",room="1323")]
            
        template = JINJA_ENVIRONMENT.get_template('tables.html')
        self.response.write(template.render(meters=meters,exemptions=exemptions,ahus=ahus))


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/admin', AdminPage),
], debug=True)