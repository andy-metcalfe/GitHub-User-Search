window.onload = (event) => {
  setTimeout(() => {$("#pre-loader").fadeOut()}, 1000);

};

//when user searches username it will run the function to get the information about the user
$('#search-addon').on('click', function() {

  var gitHubUserName = $('#search-bar').val();

  $('#search-bar').val('');

  getGitHubAccount(gitHubUserName);
});


//function to get data about
function getGitHubAccount(gitHubUserName){

  $.ajax({
      url: "libs/php/getProfile.php",
      type: 'GET',
      dataType: 'json',
      data: {
        userName: gitHubUserName
      },
      beforeSend: function(){
      $("#pre-loader").show();
     },
      success: function(result) {
       //console.dir(result);

      //checks if user exisits
       if(result['gitHubUser'] == null || result['gitHubUser']['message'] ){

         noProfile();


       } else {

        var username = result['gitHubUser']['login'];
        var repLink = 'https://github.com/' + username + '?tab=repositories';

        var joinedDate = result['gitHubUser']['created_at'].slice(0,10);
        joinedDate = reformatDate(joinedDate);

        var summary;
        result['gitHubUser']['bio'] ? summary = result['gitHubUser']['bio'] : summary = 'This user has no bio';

        var company;
        result['gitHubUser']['company'] ? company = result['gitHubUser']['company'] : company = 'No company available';

        var location;
        result['gitHubUser']['location'] ? location = result['gitHubUser']['location'] : location = 'No location available';

        var additionalLink;
        result['gitHubUser']['blog'] ? additionalLink = result['gitHubUser']['blog'] : additionalLink = 'No additional links';

        var name;
        result['gitHubUser']['name'] ? name = result['gitHubUser']['name'] : name = '';

         const userProfile = {
           name : name,
           profilePicUrl: result['gitHubUser']['avatar_url'],
           username: result['gitHubUser']['login'],
           profileLink: result['gitHubUser']['html_url'],
           summary: summary,
           company: company,
           location: location,
           additionalLink: additionalLink,
           repositoryLink: repLink,
           joinedDate: fullDateString,
           followers: result['gitHubUser']['followers'],
           repositoryCount: result['gitHubUser']['public_repos']
         }
          //console.log(userProfile);
          displayProfile(userProfile);
       }

  },
      error: function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
    complete:function(data){
        setTimeout(() => {$("#pre-loader").fadeOut()}, 1000);
     },
  });
}



//function fill the profile
function noProfile(){

$('#whole-container').html(' ');


let noProfile = `


  <div id="no-profile-container">
  <p id="userDoesNotExist">This username does not exist...</p>
  </div>


`;

$('#whole-container').append(noProfile);


}


//function fill the profile
function displayProfile(userProfile){

$('#whole-container').html(' ');


let gitHubProfile = `
<div id="git-hub-profile">

  <div id="picture-container">

    <img id="profile-picture" src="${userProfile.profilePicUrl}" height="250">
    <p id="joined">${userProfile.joinedDate}</p>
    <div class="icon-pic" id="followers-container">
    <div id="followers">
        <i class="fas fa-user-friends hide"></i>
        <p id="followers-count">${userProfile.followers}</p>
    </div>

    <div class="icon-pic" id="public-rep">
        <i class="fas fa-book hide"></i>
        <p id="repository-count">${userProfile.repositoryCount}</p>
    </div>
  </div>
  </div>


  <div id="bio">
    <span id="name">${userProfile.name}</span>
    <span id="link"><a target="_blank" id="profile-link" href="${userProfile.profileLink}">${userProfile.profileLink}</a></span>
    <p id="username">@${userProfile.username}</p>
    <p class="sub-text"><i class="fas fa-user hide icon"></i><span id="summary">${userProfile.summary}</span></p>
    <p class="sub-text"><i class="fas fa-building hide icon"></i><span id="company">${userProfile.company}</span></p>
    <p class="sub-text"><i class="icon fas fa-map-marker-alt hide"></i><span id="location">${userProfile.location}</span></p>

    <div id="links-container">
      <a class="links-text" id="additonal-link-a" href="${userProfile.additionalLink}" target="_blank"><p class="links"><i class="icon fas fa-external-link-alt hide"></i><span id="additional-link">${userProfile.additionalLink}</span></p></a>
      <a class="links-text" id="repository-link-a" href="${userProfile.repositoryLink}" target="_blank"><p class="links"><i class="fas fa-book hide icon"></i><span id="repository-link">${userProfile.repositoryLink}</span></p></a>
    </div>

  </div>


</div>
`;

$('#whole-container').append(gitHubProfile);


}











let fullDateString;

//changes date format
function reformatDate(fullDate){

	year = fullDate.slice(0,4);
	month = fullDate.slice(5,7);
	day = fullDate.slice(8,10);
	after = '';
	changeMonthToText(month);
	changeTextAfterDate(day);

	if(day.charAt(0) == 0){
		day = day.substring(1);
	}

	fullDateString = day + after + ' ' + month + ' ' + year;
}

function changeTextAfterDate(date){
	if(date == 1){
		after = 'st';
	} else if (date == 2) {
		after = 'nd';
	} else if (date == 3) {
		after = 'rd';
	} else if (date > 3 && date < 21) {
		after = 'th';
	} else if (date == 21) {
		after = 'st';
	} else if(date == 22){
		after = 'nd';
	} else if (date == 23) {
		after = 'rd';
	} else if (date > 23 && date < 31) {
		after = 'th';
	} else if (date == 31) {
		after = 'st';
	}
}

function changeMonthToText(monthVariable){
	switch(monthVariable) {
	case monthVariable = '01':
	month = 'Jan'
	break;
	case monthVariable = '02':
	month = 'Feb'
	break;
	case monthVariable = '03':
	month = 'Mar';
	break;
	case monthVariable = '04':
	month = 'Apr';
	break;
	case monthVariable = '05':
	month = 'May';
	break;
	case monthVariable = '06':
	month = 'Jun';
	break;
	case monthVariable = '07':
	month = 'Jul';
	break;
	case monthVariable = '08':
	month = 'Aug';
	break;
	case monthVariable = '09':
	month = 'Sep';
	break;
	case monthVariable = '10':
	month = 'Oct';
	break;
	case monthVariable = '11':
	month = 'Nov';
	break;
	case monthVariable = '12':
	month = 'Dec';
	break;
}
}
