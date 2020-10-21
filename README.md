# Boon Web React App Example

This project is a template that is similar in structure to the Boon Web repository.

In the root of this repository is a Sketch file containing the design. If you don't have Sketch, let us know, then we'll find another way.

- [Boon Web React App Example](#boon-web-react-app-example)
  * [Getting started](#getting-started)
  * [Project structure](#project-structure)
  * [The exercise](#the-exercise)

## Getting started

Boon uses yarn, so all commands in this file will reflect that.

To get started, simply install the packages with the following command:

```
yarn install
```

And then you're ready to start the project with the following command:

```
yarn start
```

## Project structure

The project uses Create React App and our own structure on top of that. In the `assets/svg` folder we've added some relevant SVGs to this exercise.

```
.
├─ /public                            # Static public assets (not imported anywhere in source code)
│   └─ index.html                     # The main HTML entry-point of the application
└─ /src                               # Application source code
    ├─ index.js                       # Application bootstrap and rendering
    ├─ App.js                         # The root of the actual application. This handles global rendering logic, and renders the root route.
    ├─ /api                           # Contains methods to communicate with the API
    ├─ /components                    # Global Reusable Components
    │   └─ /<ComponentName>           # Some other component. Can contain multiple jsx too, if they are tightly connected in use
    │       ├─ index.js
    │       ├─ <ComponentName>.js     # Main component rendering logic
    │       └─ <ComponentName>.scss   # Optional accompanying styles
    ├─ /routes                        # Contains all pages on the platform
    │   └─ <Name>Page                 # Top-level page
    │       ├─ index.js
    │       ├─ <Name>Page.js          # Main component rendering logic
    │       └─ <Name>Page.scss        # Optional accompanying styles
    ├─ /assets                        # Contains assets
    |   ├─ /fonts                     # Contains all fonts
    |   ├─ /img                       # Contains all images
    |   └─ /svg                       # Contains all svgs - imported through JS, ReactComponent
    └─ /styles                        # Sass helpers and "settings", like variables and mixins

```

## The exercise
The feature we're currently working on is a poll.
There's a Sketch file in the root of the repository containing the design.

### API
For this exercise we've created a mock API that uses `LocalStorage` for persistence. Should the data in `LocalStorage` be corrupted somehow, the following command can be executed in the developer console:
```
window.localStorage.clear()
```

For the API, we're working with the following `Poll` object type which is seeded initially from the file `data/poll.js`:
```
{
  id: 'bd8f4b86-e98a-455d-8b84-0e9fa7cd5abc',               // Poll ID
  message: 'Hvilken pasta er den bedste til bolognese?',    // Poll title / question
  votesCount: 2,                                            // The amount of votes on the poll
  votersCount: 2,                                           // The amount of voters on the poll
  myVotes: [],                                              // An array of pollOption id's reprecsenting the votes of the user viewing the poll
  voters: [                                                 // An array of the people who have voted on the poll
    {
      id: '3c952bb1-5be0-48ec-b9f7-0549602ee40a',
      name: 'Frederik Fredslund Lassen',
      profileImageUrl: 'https://img.boon.tv/cc712a73-60e2-49d3-a5db-162728f7dd28.jpg',
      username: 'fredefl'
    },
    {
      id: 'f5a0b33a-984d-4e5c-9ec4-f01e6d6a9b42',
      name: 'Boon Support',
      profileImageUrl: 'https://img.boon.tv/361a6de8-d51c-4a15-a629-ab44811b95de.png',
      username: 'fredslund'
    }
  ],
  user: {                                                   // The user who created the poll
    id: '3c952bb1-5be0-48ec-b9f7-0549602ee40a',
    name: 'Frederik Fredslund Lassen',
    profileImageUrl: 'https://img.boon.tv/cc712a73-60e2-49d3-a5db-162728f7dd28.jpg',
    username: 'fredefl'
  },
  pollOptions: [                                            // An array of the options of the poll
    {
      id: 'c18bab54-1c03-40b2-876e-d963840716c4',           // The ID of the option
      order: 0,                                             // The initial order of the poll options used for sorting when no votes are present
      message: 'Conchiglie',                                // The options text
      votesCount: 2,                                        // The amount of votes for said option
      createdAt: '2020-10-07T11:49:34.471Z'                 // When the option was created
    },
  ]
}
```

The following object is the `PollOption` type:
```
{
  id: 'c18bab54-1c03-40b2-876e-d963840716c4',           // The ID of the option
  order: 0,                                             // The initial order of the poll options used for sorting when no votes are present
  message: 'Conchiglie',                                // The options text
  votesCount: 2,                                        // The amount of votes for said option
  createdAt: '2020-10-07T11:49:34.471Z'                 // When the option was created
}
```

The API located in `api/poll.js` and can be imported from there. The API can be interacted with using the following functions:

As we're using [Immutable.js](https://immutable-js.github.io/immutable-js/docs/#/]) for the real Boon project, these mock API endpoints also return Immutable Objects. These can be converted into regular JS objects by calling `.toJS()` on them.

#### `getPollApi()`
Gets the whole `Poll` object as an Immutable object.

#### `useGetPollApi()`
A React hook to get the whole `Poll` object. It returns a JS object literal containing two items: `data` and `refresh`. The `data` item contains the `Poll` object in an Immutable form, the `refresh` item is a function, that when called re-queries the API for the poll object, which is returned on a re-render in the `data` item.

#### `createPollOptionApi()`
This function creates a new option on the poll. It takes a `message` parameter as a `string` like so:
```
createPollOptionApi({ message: 'Example' })
```
It returns the new `PollOption` object.

#### `pollVoteApi()`
This function submits the users votes on the poll. It takes a `optionIds` parameter as an `array` of `strings` like so:
```
pollVoteApi({ optionIds: ['c18bab54-1c03-40b2-876e-d963840716c4', 'a23a2bd-1c03-40b2-876e-d963840716c4'] })
```
It returns the `Poll` object with the new votes reflected.

#### `resetDataApi()`
This function resets the API back to initial data.
