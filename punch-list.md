* Financial documents on payment FAQ page
* Bug: New reg and login: should not be presented with a reg button
* Silly season events (invite only)
* Audit permissions for api and front end
* Caching - client and server side
* Older events or events without courses should fail more gracefully
* Payments: ability to choose whether or not to save a card
* Payments: saving/selecting multiple cards
* Contact messages - send to contact@bhmc.org
* Ensure new member registration obeys the config flag
* Return URL may need to be fixed - might also just be a dev issue
* Identity and handle returning inactive member signup (redirect from failed login)
* malihu scrollbars
* Google analytics (maybe)
* How to handle members with the same name? (typeaheads)
* Timed refresh of the Wednesday reserve page?
* Better load times and some sort of indicator
* How can we gracefully handle a 503 from the api?
* "Secure" wording on the payment component
* Sponsor model/api and rendering on the UI
* Scroll to top on mobile
* Match play cannot handle multiple documents
* Job to refund all for a rainout

###Reports
* Payment report by users
* Staff guards on report urls
* Print styling

###Admin Functions
* Wednesday admin page
    * manual signup and skins
    * move groups/players

###Jobs
* Import friends from 2017 signup files

### Transition
* Content Review
    * A 60-90 minute meeting with officers (and beers)
    * Sponsors - where do we put different levels (code required)
* Accounts: switch all passwords to GHIN
    * Create a home page announcement to recommend changing password
* DNS
    * Transfer bhmc.org ownership to me (current owner must do this)
    * Register domain to point to firebase url
    * Update Bunker website to point to bhmc.org
    * ~~Ensure http upgrades to https~~
* Email changes in the api and Mailgun setup
    * ~~Code currently uses Zoomdoggy.com - change this~~
    * DNS email routes must be set up
    * Mailgun set up
* Set up account at Stripe
    * Either create a new account or use my "test" account
    * Must tie to the club bank account
    * Create additional admins
    * Update the website to use production security keys
* Turn on registration
    * Currently disabled in the website
    * Run a few sanity tests
* Admin training
    * Who can do admin tasks (roles)
    * How to upload results and teetimes (Dan)
    * How to add groups on the par 3s
    * How to update SLP and Dam Cup documents
    * How to manually sign up a user for an event
    * How to manually register a new users
    * How to add an event
    * How to change an event
    * How to add or change policies (including rules)
    * How to publish home page announcements
    * How to export event signups
    * Other reports

