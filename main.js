// Create a global variable to store the previous date inputed by the user to comparison
var GLOBAL_START_END_DATE = null;
// Empty apodPicsArray with datas
var apodPicsArray = [];
// Get the input date space
var fromToDate = document.getElementById("fromToDate");
// Get the validation output space
var validationMessageOutput = document.getElementById("addValidationMessage");
// Get the dropdown space by the id
var dropdownTitles = document.getElementById("titleDropdown");

// Function AJAX
function getJSONAsync(url) {
    var request = new XMLHttpRequest();
    // Clear the apodPicsArray before requesting again
    apodPicsArray = [];
    // Check if the readyState changes
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            // If it's ok add the data(with th picture and informations) to the array
            apodPicsArray.push(JSON.parse(request.responseText));
            // Call the function to populate the dropdown menu
            populateDropdownMenu(apodPicsArray, dropdownTitles);
        }
    }
    // Open a connection using URL
    request.open("GET", url);
    // Send the GET request
    request.send();
}

// Function to get the URL and call the function getJSONAsync()
function updateURL(date) {
    var apiKey = "api_key=XXXXXXXXXXXXXXXXXXX"; // go to https://api.nasa.gov/ and get your own key
    // Concatenate the url with the apikey information and the date (that comes through the loop)
    var url = "https://api.nasa.gov/planetary/apod?" + apiKey + "&date=" + date;
    // Call the function to get the datas
    getJSONAsync(url);
}

// Function to loop through the date imputed in order to retrieve all the datas 
function filterDate() {
    // Show the validation space that was hidden 
    validationMessageOutput.hidden = false;
    validationMessageOutput.style = "color:#ff5252";

    // Get the value of the start day
    var start = new Date($('input[name="daterange"]').data('daterangepicker').startDate);

    // Get the value of the end day
    var end = new Date($('input[name="daterange"]').data('daterangepicker').endDate);

    // Validation: not null, not empty string...
    if (!fromToDate) {
        var message = "Please enter a valid date";
        validationMessageOutput.innerHTML = message;
    }
    // Validation that the dates values changed to call Ajax again
    else if (fromToDate.value === GLOBAL_START_END_DATE) {
        var message = "Please select a different date range in order to view different results";
        validationMessageOutput.innerHTML = message;
    }
    else {
        validationMessageOutput.innerHTML = "Success";
        validationMessageOutput.style = "color:green";

        // variable loop created to be incremented
        var loop = start;

        // loop through the dates imputed in order to retrieve all the datas 
        while (loop <= end) {
            // Converting to the YYYY-MM-dd and assigned to date variable 
            var month = '' + (loop.getMonth() + 1);
            var day = '' + loop.getDate();
            var year = loop.getFullYear();

            if (month.length < 2) {
                month = '0' + month;
            }
            if (day.length < 2) {
                day = '0' + day;
            }
            var date = [year, month, day].join('-');

            // Call the function to create the url with the updated date
            updateURL(date);

            // Increment the start date(loop) to +1
            var newDate = loop.setDate(loop.getDate() + 1);
            loop = new Date(newDate);
        }
        // hide fieldset
        document.querySelector("fieldset").hidden = true;
    }
    // Assign to the flobal variable the value imputed from the user to comparison
    GLOBAL_START_END_DATE = fromToDate.value;
}

function populateDropdownMenu(array, theElement) {
    validationMessageOutput.hidden = true;
    // Show dropdown
    theElement.hidden = false;

    // Clear
    theElement.innerHTML = "";

    // Create the first option
    var firstOption = document.createElement("option");
    firstOption.innerHTML = "Please select...";
    firstOption.value = -1;
    firstOption.disabled = true;
    firstOption.selected = true;
    theElement.appendChild(firstOption);

    // Loop Through the apodPicsArray create option element and populate the dropdown with the title and assigned with the index of the array
    array.forEach(function (dataContent, index) {
        tempOption = document.createElement("option");
        tempOption.innerText = dataContent.title;
        tempOption.value = index;
        theElement.appendChild(tempOption);
    })
}

function displayObject() {
    // Show fieldset
    document.querySelector("fieldset").hidden = false;

    // hide video section
    var video = document.querySelector("iframe");
    video.hidden = true;
    video.src = "";

    // Grab the selected index of the apodPicsapodPicsArray
    var selectedItem = document.getElementById("titleDropdown").value;

    // Grab div output Area
    var divOutput = document.getElementById("outputTitle");
    divOutput.style = "display: block";
    // Grab fieldset output Area
    var fieldsetSpace = document.querySelector("fieldset");
    fieldsetSpace.style = "display: block";
    // Grab image output area and show it
    var imageOutput = document.getElementById("image");
    imageOutput.hidden = false;
    // Grab explanation, copyright and divImage area
    var explanationOutput = document.getElementById("outputExplanation");
    var copyrightOutput = document.getElementById("copyright");
    var divImage = document.getElementById("imageDiv");

    // Populate divOutput with the title selected
    divOutput.innerHTML = apodPicsArray[selectedItem].title + "<br>";

    // Populate the explanationOutput with the explanation of the selected title
    explanationOutput.innerHTML = "<br>" + apodPicsArray[selectedItem].explanation;

    // Image validation
    if (apodPicsArray[selectedItem].media_type !== "image") {
        // If its a video - show video area with the video and hide image Area 
        if (apodPicsArray[selectedItem].media_type == "video") {
            imageOutput.hidden = true;
            video.hidden = false;
            video.src = apodPicsArray[selectedItem].url;
        }
        else {
            // If there is no video or image show the warning
            divImage.innerHTML = "No Image/video Available!";
            divImage.className = "w3-panel w3-red";
            divImage.style = "text-align: center;";
        }
    }
    else {
        // If it's an image show the image
        divImage.className = "";
        if (apodPicsArray[selectedItem].hdurl) {
            // If there is an HD image show it
            imageOutput.src = apodPicsArray[selectedItem].hdurl;
        }
        else {
            // If there is no HD Image show it in the normal resolution
            imageOutput.src = apodPicsArray[selectedItem].url;
        }
    }

    // Copyrigh validation
    if (!apodPicsArray[selectedItem].copyright) {
        // If there is no data on copyright show "UNKNOWN"
        copyrightOutput.innerHTML = "Date: " + apodPicsArray[selectedItem].date + "<hr>Copyright: Unkown";
    }
    else {
        copyrightOutput.innerHTML = "Date: " + apodPicsArray[selectedItem].date + "<hr>Copyright: " + apodPicsArray[selectedItem].copyright;
    }
}