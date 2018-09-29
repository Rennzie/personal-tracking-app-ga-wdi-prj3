# wdi-project-three

<img src="src/assets/resolut-logo-full-black.png" width="auto" height="250">
### A MEAN stack web app built with AngularJS

The Resolut app tracks time goals set for Mind, Body and Soul and is a platform for hosting, finding and signing up for events which go towards achieving those goals.

*This is the original team Repo as it was at the end of the project*

## Table of Contents
* [Brief](#brief)
* [Tech Used](#tech)
* [Process](#process)
* [Challenges](#challenges)
* [Wins](#wins)
* [Next Up](#next)

* [Click](https://intense-beyond-35594.herokuapp.com/) to view site

## <a name="brief"></a>Brief


Technical Requirements:

**Server Side**
- **Use Mongo, Node & Express** to build a server-side API
- **Your API must have at least 2 related models**, one of which should be a user
- **Your API should include all RESTFUL actions** for at least one of those models
- **Include authentication** to restrict access to appropriate users
- **Include at least one referenced or embedded sub-document**
- **Include automated tests** for at least one resource

**Client Side**
- **Use Angular** to build a front-end that consumes your API
- **Use SCSS** instead of CSS
- **Use Webpack & Yarn** to manage your dependencies and compile your source code

MVP Deliverables:
- **A working API,** built by the whole team, hosted somewhere on the internet
- **A handmade Angular front-end** that consumes your own API, hosted somewhere on the internet
- A **link to your hosted working app** in the URL section of your Github repo
- A **team git repository hosted on Github**, with a link to your hosted project, and frequent commits from every team member dating back to the very beginning of the project

<hr>

## <a name="tech"></a>Technologies Used:

`AngularJS`
`Express.js`
`MongoDB`
`Mongoose`
`bcrypt`
`Vanilla Javascript`
`Moment.js`
`Chart.js`
`Mocha`
`Chai`
`Webpack`
`JSON Web Token`
`SASS (SCSS)`
`Bulma`
`CSS 3`
`HTML 5`
`Git`
`Atom`
`Insomnia`
`GitHub`
`Trello`

<hr>

## <a name="process"></a>The Process
### Planning
The two of us underwent a full days planning before we started to code the app. We originally focussed on the concept which led us to the user flows. Sophie then worked on the first draft wireframes (see images below) and Sean worked on the models. The two of us then re-conviened and went over each others work and ideas, further fleshing out both the models and wireframes. As we went, we added tasks to our team [Trello](https://trello.com/b/mdTpDMaI) board which we used to track our progress through the project.

Once we had a good idea of the user and data flows right through the app we began the build.




### The Build
Initially Sean worked on the back end, focussing on the models and the testing while Sophie built out front end infrastructure and started getting the basic layout of the client side sorted.

...

<hr>

## <a name="challenges"></a>Challenges
Being the first and most realistic web app that we have built so far on the course we faced many challenges. One in particular was updating the the number of hours a user has logged towards a specific goal. The challenge was to increment the number of hours logged rather than simply overwriting the existing total as this would require additional server requests which could be avoided. We solved this by using a Method which we called in the goal controller.

Other challenges included showing the users event recommendations which they where not already signed up for, as well as showing them the events they had already attended and the ones they have signed up for. We did this with the use of the `.filter()` array method on the front end and mongoose virtual's in the event model on the back end. See the front end method below:

```Javascript
  function updateEvents() {
    if($scope.events){
      // returns all the events the user has attended, past and present
      const usersEvents = $scope.events.filter(event => {
        return event.guests.some(guest => guest === $scope.user._id);
      });
      $scope.attendedEvents = usersEvents.filter(event => event.concluded ===   true);
      $scope.upcomingEvents = usersEvents.filter(event => event.concluded ===   false);

      //returns all the events the user is not attending
      $scope.userNotAttending = $scope.events.filter(event => {
        return event.guests.every(guest => guest !== $scope.user._id);
      }).filter(event => event.concluded === false);
    }
  }
```

<hr>

## <a name="wins"></a>Wins
Wins came from all sides on this project once we found a good rythm. Solving the two challenges above where two of the biggest but incorporating the CityMapper travel time API to get the users travel time to an event from there home was a good one. As well as a few aesthetic wins like getting the event information to show over an image when hovered over. Given though, this method does not work so well for mobile and would need to be re-looked at as an immediate bug fix to improve the site responsiveness.

Another win came in the form of controlling the event show page to only allow users to sign up if there was still space in the event. This also required conditionally showing different options depending if there was actually a user logged in and if they were weather they are attending the event or not.


<hr>

## <a name="next"></a>Next up

There where a number of features that we had to abbandon near the end of the project as awe ran out of time and chose making the app stable over being feature rich, a selection is listed below but see the team [Trello](https://trello.com/b/mdTpDMaI) board for a full list of abbandonned features.

- Implement a file stacker like API for adding images directly
- User should be able to get Uber travel times and costs
- User should see travel times from their home location to events while browsing the events index
-  Hosts should have their own profile page which shows their past events
- Integrate with other event hosting sites like MeetUp.com etc so users have a wider selection of events to go towards their goals.
