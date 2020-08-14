# FAN-OOP-PROJECT1
Project 1 of JavaScrip2
1. (0.5 Marks) Go to the following NASA URL and register in order to get an API key:
https://api.nasa.gov/
2. (0.5 Marks) Use APOD API for this assignment. You can find all needed information on provided
link:
3. (1 Marks) Create a single HTML page named index.html and a single JavaScript object matching
API Http Request Data.
4. (2 Marks) Create a JavaScript array and store a copy of your JavaScript object per AJAX call. (you
will receive different data according to your date selection, see below.)
5. (2 Marks) On your HTML page allow user to select dd-MM-YYYY information from select controls.
The following screenshot is only an example, you should user your own style.
Do not allow users to select more than 1-month (30 days) worth of data.
You should not allow users to select invalid dates.
6. (1 Mark) You should make Ajax calls only when the “From/To” date selection changes, if dates
have not changed you should not make another Ajax call to get the same data.
7. (1 Mark) Once your array has been completely filled based on the date range, create a select
control displaying title on html and using array index as value. The first select option should be
“Please select..” as html text and an invalid index number as value. i.e. -1 
8. (1 Mark) Once the user selects a valid option, use your selected index to grab your corresponding
JavaScript object and use its properties to display their values. The following is only an example
you should use your own style.
9. (1 Mark) If any property is missing from your AJAX call, (no data was returned) use the word
“Unknown” instead of allowing display “undefined” or similar.
10. Create a zip file using your group number. i.e. MIke_01.zip and place it on your respective
submission folder. 