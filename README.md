# CardVault

NOTE: This application was a coding exercise that was given to me as part of a hiring process. Admittedly, the code isn't at a professional level, and I didn't get the job. I have a full-time job and a lot going on at home lately so I didn't have as much time as I wanted to devote to the coding exercise. I will be slowly polishing it as I have time, and maybe I can use it as an example of my work so I can get another job.

This CardVault application is a coding exercise, designed to consume a public API and display stylized data with an infinite scroll and a search function. It was created using React.

The application can be downloaded, installed, and run locally on a computer with Internet access.

This application has only been tested on a computer with MacOS, though it should run on Windows. Smart phone functionality was only simulated in the browser. Firefox, Chrome, and Safari were tested. IE has not.

The public API was fast enough to not make good use of the loading indicator (aka spinner). The application could definitely do with some improvements. With that in mind, a to-do list has been added.

Installation prerequisites: node.js, npm, and git

Installation Steps:

1. Download the zipped build directory (build.zip in the main branch) from GitHub to a MacOS or Windows computer.
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

1. Download the tvolkirch/CardVault repository on your computer and unzip it a directory of your choosing. NOTE: I haven't yet created a pubic key so the best that can be done for now is to download the code as a zip file and unzip it.

2. Move to the cardvault project directory and enter the following command from the command line:

npm install

3. Enter the following command line to run locally against the development environment:

npm start

4. From the command line, enter the following command to do a production build:

npm run build

This command will create the same build directory and contents that's zipped and saved in this code repository.


# TO-DO LIST

It might make sense to try to put spinners over late loading card images.

Add error handling.

Add tooltip hover/tap icon with instructions for partial names and for adding comma for AND and the pipe character for OR of multiple name values.

See about including all search results with a scrollable list of card names.


# Release Notes (in reverse order)

- moved scroll listener to componentDidMount() as it should be

- refactored code to make it easier to test

- added unit tests to exceed 80 percent coverage of all code

xxxxx

- Made the cards accessible by keyboard

xxxxx

- Refactored search overlay and search results as separate components

- Added a top of page control (and made it accessible by keyboard) to reduce scrolling

xxxxx

- Refactored API as a separate component

- Added Jest unit tests with mocked components and component snapshots

- Added key listeners for web accessibility of searches

xxxxx

- Added better comments in the main app file

- Changed the spinner

- Made the search overlay translucent

xxxxx

- Fixed search overlay to not affect scroll position

- Added spinner on initial page load

- Improved some background colors

xxxxx

- Converted this project to use git

