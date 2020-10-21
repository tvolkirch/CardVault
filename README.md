# CardVault

This CardVault application is a coding exercise, designed to consume a public API and display stylized data with an infinite scroll and a search function. It was created using React.

The application can be downloaded, installed, and run locally on a computer with Internet access.

This application has only been tested on a computer with MacOS, though it should run on Windows. Smart phone functionality was only simulated in the browser. Firefox, Chrome, and Safari were tested. IE has not.

The public API was fast enough to not make good use of the loading indicator (aka spinner). The application could definitely do with some improvements. With that in mind, a to-do list has been added.

NOTE: I know. This project should've used git, but I blindly followed instructions for creating a React project and the instructions didn't include git. I hope there aren't too many files to manually copy.

Installation prerequisites: node.js and npm

Installation Steps:

1. Download the zipped build directory (build.zip) from GitHub to a MacOS or Windows computer.
2. Unzip the build directory into any convenient directory.
3. Open a command line window such as GitBash and change to the directory that's the parent of the unzipped build directory.
4. If your computer doesn't already have the npm serve application, run the following command from the command line with administrator privilege:
   npm install -g serve
5. Now run the serve application from the application to locally serve the application. Use the following command:
   serve -s build
6. In your favorite common browser, enter the URL that's show by the serve application (it's localhost:5000 on my Mac).

The application should appear in the browser. Scroll down to the bottom of the page to load more cards. Click the magnifying glass icon in the header to search for cards by name.

To quit the serve command, type Cmd/. (MacOS) or Ctrl/C (Windows).

# Creating the Development Environment

1. Enter the following command from the command line:

npm install -g create-react-app

2. Create a new React project by entering the following command:

create-react-app cardvault

3. Copy all of the following code files to the public directory under the cardvault directory:

adoring_fan.png, index.html

4. Copy all of the following code files to the src directory under the cardvault directory:

App.css, Card.css, index.css, Loading.css, VaultContainer.css, App.js, App.test.js, Card.js, index.js, Loading.js, VaultContainer.js

5. From the command line, change to the cardvault directory and add a code module dependency by entering the following command:

npm install axios

5. From the command line, enter the following command to do a build:

npm run build

This command will create the same build directory and contents that's zipped and saved in this code repository.

# TO-DO LIST

RECOMMENDATION: Don't have a loading indicator for searching because the API is too fast and the loading indicator briefly flashes - it seems odd.
It might make sense to try to put spinners over late loading card images.

Remember vertical scroll location so the app can return to it after searching.

Add key listener to submit search when Return key or space bar is pressed.

Add error handling.

If it slows down as more cards are added, try PureComponent for Card component to prevent re-rendering of previous cards.

Add a floating control to allow a user to jump to the top of the page.

Refactor callNameSearchApi() with search attribute and value.

Add tooltip hover/tap icon with instructions for partial names and for adding comma for AND and the pipe character for OR of multiple name values.

See about including all search results with a scrollable list of card names.

Learn jest so I can add unit tests for the code.

Manually test real smart phones - simulation isn't good enough.

Add more accessibility as needed and test with screen readers.
