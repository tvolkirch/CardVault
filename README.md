<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=utf-8">
	<TITLE></TITLE>
	<META NAME="GENERATOR" CONTENT="OpenOffice 4.1.5  (Unix)">
	<META NAME="CREATED" CONTENT="0;0">
	<META NAME="CHANGEDBY" CONTENT="Terry Volkirch">
	<META NAME="CHANGED" CONTENT="20201101;22164600">
</HEAD>
<BODY LANG="en-US" DIR="LTR">
<P># CardVault</P>
<P># NOTE: This application was a coding exercise that was given to
me as part of a hiring process. Admittedly, the code isn't at a
professional level, and I didn't get the job. I have a full-time job
and a lot going on at home lately so I didn't have as much time as I
wanted to devote to the coding exercise. I will be slowly polishing
it as I have time, and maybe I can use it as an example of my work so
I can get another job.</P>
<P><BR><BR>
</P>
<P>This CardVault application is a coding exercise, designed to
consume a public API and display stylized data with an infinite
scroll and a search function. It was created using React.</P>
<P><BR><BR>
</P>
<P>The application can be downloaded, installed, and run locally on a
computer with Internet access.</P>
<P><BR><BR>
</P>
<P>This application has only been tested on a computer with MacOS,
though it should run on Windows. Smart phone functionality was only
simulated in the browser. Firefox, Chrome, and Safari were tested. IE
has not.</P>
<P><BR><BR>
</P>
<P>The public API was fast enough to not make good use of the loading
indicator (aka spinner). The application could definitely do with
some improvements. With that in mind, a to-do list has been added.</P>
<P><BR><BR>
</P>
<P>Installation prerequisites: node.js and npm</P>
<P><BR><BR>
</P>
<P>Installation Steps:</P>
<P><BR><BR>
</P>
<P>1. Download the zipped build directory (build.zip) from GitHub to
a MacOS or Windows computer.</P>
<P>2. Unzip the build directory into any convenient directory.</P>
<P>3. Open a command line window such as GitBash and change to the
directory that's the parent of the unzipped build directory.</P>
<P>4. If your computer doesn't already have the npm serve
application, run the following command from the command line with
administrator privilege:</P>
<P>   npm install -g serve</P>
<P>5. Now run the serve application from the application to locally
serve the application. Use the following command:</P>
<P>   serve -s build</P>
<P>6. In your favorite common browser, enter the URL that's show by
the serve application (it's localhost:5000 on my Mac).</P>
<P><BR><BR>
</P>
<P>The application should appear in the browser. Scroll down to the
bottom of the page to load more cards. Click the magnifying glass
icon in the header to search for cards by name.</P>
<P><BR><BR>
</P>
<P>To quit the serve command, type Cmd/. (MacOS) or Ctrl/C (Windows).</P>
<P><BR><BR>
</P>
<P># Creating the Development Environment</P>
<P><BR><BR>
</P>
<P>NOTE: I know. This project should've used git, but I blindly
followed instructions for creating a React project and the
instructions didn't include git. I hope there aren't too many files
to manually copy.</P>
<P><BR><BR>
</P>
<P>1. Enter the following command from the command line:</P>
<P><BR><BR>
</P>
<P>npm install -g create-react-app</P>
<P><BR><BR>
</P>
<P>2. Create a new React project by entering the following command:</P>
<P><BR><BR>
</P>
<P>create-react-app cardvault</P>
<P><BR><BR>
</P>
<P>3. Copy all of the following code files to the public directory
under the cardvault directory:</P>
<P><BR><BR>
</P>
<P>adoring_fan.png, index.html</P>
<P><BR><BR>
</P>
<P>4. Copy all of the following code files to the src directory under
the cardvault directory:</P>
<P><BR><BR>
</P>
<P>App.css, Card.css, index.css, Loading.css, VaultContainer.css,
App.js, App.test.js, Card.js, index.js, Loading.js, VaultContainer.js</P>
<P><BR><BR>
</P>
<P>5. From the command line, change to the cardvault directory and
add a code module dependency by entering the following command:</P>
<P><BR><BR>
</P>
<P>npm install axios</P>
<P><BR><BR>
</P>
<P>5. From the command line, enter the following command to do a
build:</P>
<P><BR><BR>
</P>
<P>npm run build</P>
<P><BR><BR>
</P>
<P>This command will create the same build directory and contents
that's zipped and saved in this code repository.</P>
<P><BR><BR>
</P>
<P># TO-DO LIST</P>
<P><BR><BR>
</P>
<P>RECOMMENDATION: Don't have a loading indicator for searching
because the API is too fast and the loading indicator briefly flashes
- it seems odd.</P>
<P>It might make sense to try to put spinners over late loading card
images.</P>
<P><BR><BR>
</P>
<P>Remember vertical scroll location so the app can return to it
after searching.</P>
<P><BR><BR>
</P>
<P>Add key listener to submit search when Return key or space bar is
pressed.</P>
<P><BR><BR>
</P>
<P>Add error handling.</P>
<P><BR><BR>
</P>
<P>If it slows down as more cards are added, try PureComponent for
Card component to prevent re-rendering of previous cards.</P>
<P><BR><BR>
</P>
<P>Add a floating control to allow a user to jump to the top of the
page.</P>
<P><BR><BR>
</P>
<P>Refactor callNameSearchApi() with search attribute and value.</P>
<P><BR><BR>
</P>
<P>Add tooltip hover/tap icon with instructions for partial names and
for adding comma for AND and the pipe character for OR of multiple
name values.</P>
<P><BR><BR>
</P>
<P>See about including all search results with a scrollable list of
card names.</P>
<P><BR><BR>
</P>
<P>Learn jest so I can add unit tests for the code.</P>
<P><BR><BR>
</P>
<P>Manually test real smart phones - simulation isn't good enough.</P>
<P><BR><BR>
</P>
<P>Add more accessibility as needed and test with screen readers.</P>
</BODY>
</HTML>