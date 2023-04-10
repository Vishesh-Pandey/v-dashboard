# V-Dashboard

V-Dashboard is a web application built with React, Redux Toolkit, Bootstrap, and Firebase. It provides users with three functionalities: creating website shortcuts, writing to-do lists, and a notes section. Users can create their accounts, and data will be saved on Firebase. Additionally, users can try out the application without signing up, which doesn't save data permanently on the dashboard.

## Installation

To run the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/vishesh-pandey/v-dashboard.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Firebase Configuration

To use the Firebase features in this project, you'll need to set up a Firebase project and add your project's configuration to the code. Here's how to do it:

1. Sign in to the [Firebase Console](https://console.firebase.google.com/) using your Google account.

2. Click the "Create a project" button, and follow the prompts to create a new Firebase project.

3. Once your project is created, click the "Add app" button to add a new app to your project. Choose "Web" as the platform, and give your app a name.

4. Firebase will generate a configuration object for your app, which includes a `apiKey`, `authDomain`, `projectId`, and other properties. Copy this configuration object to your clipboard.

5. In your code, open the `src/firebase.js` file, and paste your Firebase configuration object into the `firebaseConfig` variable.

`const firebaseConfig = {
// Paste your Firebase configuration object here
};`

`firebase.initializeApp(firebaseConfig);`

## Usage

The application provides users with three main functionalities: creating website shortcuts, writing to-do lists, and a notes section. Users can create an account or try the application without signing up.

### Creating Website Shortcuts

Users can add website shortcuts by clicking on the "Add Shortcut" button on the dashboard. They can then enter the name of the website and its URL. The shortcut will be displayed on the dashboard, and users can click on it to navigate to the website.

### Writing To-Do Lists

Users can create to-do lists by clicking on the "Add List" button on the dashboard. They can then enter the title of the list and the items they want to add. Users can mark items as completed or delete them once they're done.

### Notes Section

Users can create notes by clicking on the "Add Note" button on the dashboard. They can then enter the title of the note and its content. The note will be displayed on the dashboard, and users can edit or delete it as needed.

## Deployment

The application is deployed on GitHub Pages and can be accessed at https://vishesh-pandey.github.io/v-dashboard/.

## Contributing

Contributions to the project are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## Contact

If you have any questions or feedback, please don't hesitate to contact me.
