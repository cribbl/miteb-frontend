const axios = require('axios');


	let params = {
		uid: '9xdTvUjqtuYI5yYOJ4BbhsPAIyx2',
    notificationOptions: {
    	notification: {
	      title: "This is the title",
	      body: "this is the body and this is another set of the long body being sent",
	      icon: 'https://laracasts.com/images/series/circles/do-you-react.png',
	      click_action: 'https://bookings.cribblservices.com'
	  	},
	  	data: {
	  		name: 'bhawesh'
	  	}
    }
  };

  axios.post('https://dev-miteventbooking.herokuapp.com/notif/send-push', params)
	.then(function(resp) {
		console.log(resp);
	})
	.catch(function(err) {
		console.log(err);
	})