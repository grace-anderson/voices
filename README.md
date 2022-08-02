# Voices
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

**Voices** is publishing app built as a single-page MERN application built using React, GraphQL, Node.js and Express.js server, Mongoose ODM and MongoDB. The app provides a safe space for people to become writers by providing tools to write and sharing their stories and creations without the commentary or feedback typical of a social media-style app. 

[Create-react-app](https://github.com/facebook/create-react-app) was used to kick start app development. [React Router](https://www.npmjs.com/package/react-router-dom) was used to create the routing. The app is styled using [Material-UI](https://mui.com/) with the [Emotion styling engine](https://emotion.sh/docs/introduction). User authentication is handled using [JWT](https://jwt.io/).

The app is deployed to [Heroku](TODO), with the code available on [GitHub](https://github.com/grace-anderson/voices)


## Table of Contents

- [Voices](#voices)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Technologies](#technologies)
  - [Usage](#usage)
  - [Functionality](#functionality)
  - [Future development](#future-development)
  - [Installation](#installation)
  - [Contribution Guidelines](#contribution-guidelines)
  - [Screenshots and gifs of the Voices app](#screenshots-and-gifs-of-the-voices-app)
  - [License](#license)


## Technologies

This application uses the following technologies. See the package.json files in the [GitHub code](https://github.com/grace-anderson/voices) for full details.

**Client Dependencies**
* [@apollo/client](https://www.npmjs.com/package/@apollo/client)
* [@emotion/react](https://www.npmjs.com/package/@emotion/react)
* [@emotion/styled](https://www.npmjs.com/package/@emotion/styled)
* [@mui/material](https://www.npmjs.com/package/@mui/material)
* [graphql](https://www.npmjs.com/package/graphql)
* [jwt-decode](https://www.npmjs.com/package/jwt-decode)
* [prop-types](https://www.npmjs.com/package/prop-types)
* [react](https://www.npmjs.com/package/react)
* [react-dom](https://www.npmjs.com/package/react-dom)
* [react-icons](https://www.npmjs.com/package/react-icons)
* [react-router-dom](https://www.npmjs.com/package/react-router-dom)
* [react-router-hash-link](https://www.npmjs.com/package/react-router-hash-link)
* [react-scripts](https://www.npmjs.com/package/react-scripts)
* [web-vitals](https://www.npmjs.com/package/web-vitals)

**Server Dependencies**
* [apollo-server-express](https://www.npmjs.com/package/apollo-server-express)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://www.npmjs.com/package/express)
* [graphql](https://www.npmjs.com/package/graphql)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [mongoose](https://www.npmjs.com/package/mongoose)

**Dev dependencies**
* [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)
* [@testing-library/react](https://www.npmjs.com/package/@testing-library/react)
* [@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event)
* [concurrently](https://www.npmjs.com/package/concurrently)
* [eslint](https://www.npmjs.com/package/eslint)
* [nodemon](https://www.npmjs.com/package/nodemon)

**Deployment**
* [Heroku](https://www.heroku.com/)

## Usage

* Access the live **Voices** app via its [Heroku](TODO)

## Functionality

**Voices** provides the following functionality.
* A single-page app that changes views without reloading the page.
* Visitors can view stories writing by logged in users. Visitors can also view each writer's profile.
* Sign up and login functionality that grants users access to:
  * create and update a profile,
  * create multiple stories,
  * edit a selected story
  * delete a selected story

## Future development

This initial release of the Voices app fulfils client MVP requirements. Future planned releases include
* include adding donation and subscription payment options using Stripe
* an enhanced publishing workflow with administrator curation and writer feedback
* expanded writing capabilities including adding images and video to the current text capability and a manifest writing tool with local storage
* enhanced functionality sensitive to the user context, including an improved contact form and capabilities for the user to choose components of their profile to share publicly 

## Installation

To install and run the **React Portfolio** application code locally,
* Download or clone the code from the [GitHub repository](https://github.com/grace-anderson/react-portfolio)
  * run ``npm run install`` in the root directory of the project to install dependencies
  * run ``npm run develop`` in the root directory of the project to run the app during development
  * run ``npm run build`` in the root directory of the project to build the application
  * run ``npm test`` to launch the test runner in the interactive watch mode
  * run ``npm run start`` from the root directory to start the server
  * navigate to your browser, and open the app locally at url ``localhost:3000``
* See the package.json files in the [GitHub code](https://github.com/grace-anderson/voices) for more detail.

## Contribution Guidelines

* Contributions are welcome.
* The code is located in this [GitHub](https://github.com/grace-anderson/react-portfolio) repo
* To contribute, open a new issue describing your proposed enhancement or fix.
  * Before contributing, browse through open issues to see if your issue already exists or if there is an issue or enhancement you could to solve. 
  * If you're a newbie dev, start contributing by looking for issues labelled "good first issue"
* It is good practice to set up your project repository as an "upstream" remote and synchronize with the project repository
  * Don't update the main branch. Rather create your own branch using a brief descriptive name and make your changes there
* You can create pull requests, but only admins can review and merge.
  * Be nice to your reviewer by adding adding a plain English explanation of your pull request and how your updates addresses the issue/s or enhancements  
* Also see the [GitHub Community Guidelines](https://docs.github.com/en/site-policy/github-terms/github-community-guidelines)

## Screenshots and gifs of the Voices app

1. Home page
   
   ![Screenshot of Voices homepage](/client/src/components/utils/img/home.png)

2. Reading a story
   
   ![Gif of reading a story on Voices](/client/src/components/utils/img/read-story.gif)

3. Sign up page

    ![Gif of signing up to Voices](/client/src/components/utils/img/signup.gif)

4. Login page

    ![Gif of logging into Voices](/client/src/components/utils/img/login.gif)

5. Login page

    ![Gif of logged in user updating their profile](/client/src/components/utils/img/create-profile.gif)

6. Writing a story

    ![Gif of logged in user writing a story](/client/src/components/utils/img/write-a-story.gif)

7. Editing and deleting a story

    ![Gif of logged in user editing then deleting their story](/client/src/components/utils/img/edit-delete-story.gif)

## License

© 2022 [Helen Anderson](https://github.com/grace-anderson) 

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

