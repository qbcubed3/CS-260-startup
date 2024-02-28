# Startup Specification

## Elevator Pitch

Have you ever felt that you wish you could know how to be more happy on a day-to-day basis? My startup is a website that tracks a user's happiness, and activities for a day and then tracks said data throughout a period and gives feedback on the data. Every day the user can log onto the app and be asked to give a scale for how happy they were that day. After putting this rating in they will be able to select what they did that day. This valuable data can be used to then figure out what activities make you happier and suggest how to improve your own life. This application will help people be more mindful of what they are doing in their day-to-day lives, how this affects their happiness, and what they can do to be more happy.

## Key Features

* A quick and easy survey that tracks the daily happiness of the user
* A survey that allows users to pick from a list of options for what they did today, and also allows them to create their own, which will be saved for all later surveys.
* Data is stored in a database that allows the user to track their progress over time
* Feedback on how you can better use your time to be more happy based on the data already given
* Graphical representations of the data showing how your happiness has changed over time and how often you are doing certain activities, easily downloadable too
* Notifications will be given that remind users to do the surveys at a user-specified time of the day
## How Technologies Will Be Used

### Authentication 
    
Users will be able to create personal accounts which will be connected to the data that they upload to the server through the daily surveys and the analysis of said data

### Database Data

The data collected through the daily surveys will be stored inside a database. It will hold the daily happiness levels, the activities done every day, and even the survey categories that the user comes up with themselves.

### WebSocket Data
    
This will be used to allow users to set up a time to be sent a reminder to do their daily survey. They can choose any time of the day. it will also update the graphs and statistics in real time to reflect a survey that was just taken.


## Rough Sketch of Website

![Rough sketch of what the survey page will look like when a user goes to take the daily survey on the website.](rough-sketches/survey.PNG)
Survey page when taking the daily survey.

![Rough Sketch of what the statistics page will look like once a user has taken the survey enough times to populate the page with data.](rough-sketches/statistics.png)
Statistics page after being populated with enough data to display statistics.

### HTML Deliverable

For this part of the project I built out the basic HTML for the webpage

**HTML** - for html I created 4 different pages, those being the login page, home page, statistics, and daily survey. I used only HTML and just created the basic content of each of these pages. I used BODY, NAV, MAIN, HEADER, and FOOTER within my HTML and used them correctly in order to organize my webpage better.

**Links** - I put the links to all the other pages in my website at the top of the page and then in the how to get started part of the homepage I put links to all the parts I was referencing within that paragraph.

**Text Content** - I populated each of the pages with the proper text content, putting what I could inside of the website at the time, and then describing what I couldn't do now but will do later.

**3rd Party Service Calls** - I put a placeholder for where I am going to be storing data in the database and then also fetching data from the database.

**Images** - I added an image of a smiley face as the image on a tab and then also added a smiley face at the bottom of each footer.

**Login PlaceHolder** - I added both a text box for the username and password and then a submit button to login. I also added a username placeholder at the top of the page, which I will move once I apply CSS to my project and can move it to the top right more easily.

**Database** - I left a placeholder at the end of the survey section so that I can put all that data from the survey into the database and then also there is nothing in the statistics page yet because that is one big placeholder because all that will come from the data from the database.

**WebSocket** - The statistics page also has a placeholder from this because websocket will be used to update the statistics and then also ping peope to remind them to do the daily survey.

### CSS Deliverable

**Properly Styled CSS header, footer, main** - Done

**Properly Styled CSS Navigation Elements** - Put at the side in a navigation menu, and change when hovered over

**Responsive to Window Resizing** - All elements change to fit the size of the current window

**Properly Styled CSS Application Elements** - Used CSS to change the look of checkboxes, text boxes, range meter, etc.

**Properly Styled CSS Text Elements** - Used CSS to make text look cleaner and changed color in some spots

**Properly styled CSS Application Images** - used CSS in order to put images where I want them to be on my webpage using flexboxes.

### Javascript Deliverable

**Support for Future Logins** - Done, moves the webpage to the survey page once logged in.

**Support for Future Database** - Currently tracks the results from each survey in local storage. This will be tracked in database storage eventually

**Support for Future Websocket** - Has a popup that reminds the user to do the survey. Right now it goes at random times, but Websocket will be used to make it appear at the right time.

**Application Logic** - The survey is fully useable with selectable options and a slideable rank. This data is parsed and saved.




