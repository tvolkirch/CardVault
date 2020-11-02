<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=utf-8">
	<TITLE></TITLE>
	<META NAME="GENERATOR" CONTENT="OpenOffice 4.1.5  (Unix)">
	<META NAME="CREATED" CONTENT="0;0">
	<META NAME="CHANGEDBY" CONTENT="Terry Volkirch">
	<META NAME="CHANGED" CONTENT="20201101;22134600">
</HEAD>
<BODY LANG="en-US" DIR="LTR">
<P>#CardVault</P>
<P># NOTE: This application was a coding exercise that was given to
me as part of a hiring process. Admittedly, the code isn't at a
professional level, and I didn't get the job. I have a full-time job
and a lot going on at home lately so I didn't have as much time as I
wanted to devote to the coding exercise. I will be slowly polishing
it as I have time, and maybe I can use it as an example of my work so
I can get another job.</P>
<P><META NAME="CHANGEDBY" CONTENT="Terry Volkirch"><META NAME="CHANGEDBY" CONTENT="Terry Volkirch">This
CardVault application is a coding exercise, designed to consume a
public API and display stylized data with an infinite scroll and a
search function.</P>
<P>The application can be downloaded, installed, and run locally on a
computer with Internet access.</P>
<P>This application has only been tested on a computer with MacOS,
though it should run on Windows. Smart phone functionality was only
simulated in the browser. Firefox, Chrome, and Safari were tested. IE
has not.</P>
<P>The public API was fast enough to not make good use of the loading
indicator (aka spinner). The application could definitely do with
some improvements. With that in mind, a to-do list has been added to
the end of this file.</P>
<P STYLE="margin-bottom: 0in">Installation prerequisites: node.js and
npm</P>
<P><BR><BR>
</P>
<P>Installation Steps:</P>
<OL>
	<LI><P>Download the zipped build directory from GitHub to a MacOS or
	Windows computer.</P>
	<LI><P>Unzip the build directory into any convenient directory.</P>
	<LI><P>Open a command line window such as GitBash and change to the
	directory that's the parent of the unzipped build directory.</P>
	<LI><P>If your computer doesn't already have the npm serve
	application, run the following command from the command line with
	administrator privilege:</P>
	<OL>
		<P>npm install -g serve</P>
	</OL>
	<LI><P>Now run the serve application from the application to locally
	serve the application. Use the following command:</P>
	<OL>
		<P>serve -s build</P>
	</OL>
	<LI><P>In your favorite common browser, enter the URL that's show by
	the serve application (it's localhost:5000 on my Mac).</P>
</OL>
<P>The application should appear in the browser. Scroll down to the
bottom of the page to load more cards. Click the magnifying glass
icon in the header to search for cards by name.</P>
<P>To quit the serve command, type Cmd/. (MacOS) or Ctrl/C (Windows).</P>
<P><BR><BR>
</P>
<P><BR><BR>
</P>
<P>TO-DO LIST</P>
<P>RECOMMENDATION: Don't have a loading indicator for searching
because the API is too fast and the loading indicator briefly flashes
- it seems odd.</P>
<P>It might make sense to try to put spinners over late loading card
images.</P>
<P>Remember vertical scroll location so the app can return to it
after searching.</P>
<P>Add key listener to submit search when Return key or space bar is
pressed.</P>
<P>Add error handling.</P>
<P>If it slows down as more cards are added, try PureComponent for
Card component to prevent re-rendering of previous cards.</P>
<P>Add a floating control to allow a user to jump to the top of the
page.</P>
<P>Refactor callNameSearchApi() with search attribute and value.</P>
<P>Add tooltip hover/tap icon with instructions for partial names and
for adding comma for AND and the pipe character for OR of multiple
name values.</P>
<P>See about including all search results with a scrollable list of
card names.</P>
<P>Learn jest so I can add unit tests for the code.</P>
<P>Manually test real smart phones - simulation isn't good enough.</P>
<P>Add more accessibility as needed and test with screen readers.</P>
</BODY>
</HTML>