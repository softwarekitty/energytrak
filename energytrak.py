import os
import urllib
import datetime
import json

import jinja2
import webapp2


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
'''
    
#we're using google sheets default format: mm/dd/yyyy
def seconds_from_date(d):
    if not d or d==DEFAULT_BEGIN:
        return 0
    try:
        dt = datetime.datetime.strptime(d,"%m/%d/%Y")
        epoch = datetime.datetime.utcfromtimestamp(0)
        delta = dt -epoch
        return delta.total_seconds()
    except ValueError:
        return -1
    except:
        return -2
 

class MainPage(webapp2.RequestHandler):
    def get(self):
            
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())


application = webapp2.WSGIApplication([
    ('/', MainPage),
], debug=True)