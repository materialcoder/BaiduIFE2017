// console.log('Hello, world');
// phantom.exit();


// var page=require('webpage').create();
// page.open('http://www.baidu.com',function(status) {
// 	console.log(status);
// 	phantom.exit();
// })



// var page = require('webpage').create(),
//   system = require('system'),
//   t, address;

// if (system.args.length === 1) {
//   console.log('Usage: loadspeed.js <some URL>');
//   phantom.exit();
// }

// t = Date.now();
// address = system.args[1];
// page.open(address, function(status) {
//   if (status !== 'success') {
//     console.log('FAIL to load the address');
//   } else {
//     t = Date.now() - t;
//     console.log('Loading ' + system.args[1]);
//     console.log('Loading time ' + t + ' msec');
//   }
//   phantom.exit();
// }); 



// var page = require('webpage').create();
// page.open('http://www.baidu.com', function(status) {
//   console.log("Status: " + status);
//   if(status === "success") {
//     page.render('baidu.png');
//   }
//   phantom.exit();
// });


/*var page = require('webpage').create();

// page.settings.userAgent = 'WebKit/534.46 Mobile/9A405 Safari/7534.48.3';
// page.settings.viewportSize = { width: 400, height: 600 };

page.open('https://slashdot.org', function (status) {
	if (status !== 'success') {
    console.log('Unable to load!');
    phantom.exit();
  } else {
		var title = page.evaluate(function () {
  	    var posts = document.getElementsByClassName("article");
		  posts[0].style.backgroundColor = "#FFF";
		  return document.title;
	  });

    window.setTimeout(function () {
      page.clipRect = { top: 0, left: 0, width: 600, height: 700 };
	    page.render(title + "1.png");
	    page.clipRect = { left: 0, top: 600, width: 400, height: 600 };
      page.render(title + '2.png');
	    phantom.exit();
    }, 1000);	  
  }
});*/
