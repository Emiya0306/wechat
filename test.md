# What is this CMS about?

CMS is a WeChat App management Web App.
It can help clients to post his own articles, broadcast his articles and article list, upload his temporary materials and generator QR Code to his own Wechat Official Account. User can also create his administrator account and co-workers accounts to manage their WeChat Apps.

# What are the different features provided by the CMS?

- CRUD the administrator account of the clients, and CRUD other content Creators accounts.(These role can be config in setup.js)
- Broadcast messages to users who have times to recive messages.(cron jobs, one month refresh)
- Upload the temporary materials and files library(CRUD forever materials may be more powerful).
- Post articles and article lists. (What is article location and location type?)
- CRUD QR Code for these apps and generate limited QR Codes for users.
- CRUD campaigns(activities) for apps.(How to use campaign?)
- CRUD the menus for apps.
- CRUD the followers(subscription, I think the name may be easy to understand..) information, system can calculate the information about these followers. Just like when they followed, or when they unfollowed, Where they are, how old they are and so on.
- What is taxonomy, wx-event and trigger(may be kewords auto reply)?
- CRUD the teams.(I think it use UserGroup can be more appropriate)

# What are the good parts of this CMS?

- It contains almost all Wechat Official Account operations to clients, and we can add many new custom features in CMS to let client operate their account more easy and powerful.
- It use loopback, so the models code is easy to edit.
- It use boot check system to maintain the system status.
- System builds the user role in its database, so the user role can be edit by client.(Now it is hard code, I think it can be not hard code)
- Model objects(common/models) have OOP opinion, but the realization is not best.

# What are the bad parts of this CMS?

I think it is a lot of bu hao things in CMS.
The worst thing is there are not too much good comment in files...... A good programe must have many documents and too much comment in files. An additional feature function is not easy to guess what it want to do. T^T

- boot.js: 

	Problems:
	
		- It use file global variables to hold system status, it is terrible because when another places(files) wants to referance these variables, it can not be extended. 
		- The function is also, additional, there are too many functions which has different features but have same... parent? in one file.(Just like some is system operations, some is wechatApp operations, some is router operations and other is corn-job operations)
		* I can not understand corn-job is bad placed, I think it is OK in boot because it is excute automatically.
	In my opinion, I would like to split them to several js files. Use OOP to package these functions. OOP can also package the public variables. It can also cut many requires, and easily move to other place and so on. The benifit is too much.

	Code Just like this: 

```javascript
var system = require('./modules/system');
var weChatApp = require('./modules/weChatApp');
var cron = require('./modules/cron-job');

function root() {

	system.loadSystemSettings(); // "var system = new System();" may be better. "global.system = new system();"
	//but it is complex and not clear. It is not good to read what happened in constructor.

	weChatApp.initializeWeChatApps(server); 

	// Check if the system is initialized and everything is setup properly
	server.use(system.checkSetup);
	router.get('/setup', system.setupPageHandler);
	router.post('/setup', system.setupHandler);

}
```

	The system.js() must slipt into many regions. These region is just like that: and add many many many comments, in order to next people to see. When you use webstrom, code can be easy to track.
	- "Module dependencies"
	- "Private variables"
	- "Constructor"
		- "Private variables"
		- "Public variables"
	- "Private functions"
	- "Public functions"
	- "Router mounted" list of router "router.get('/setup', system.setupPageHandler);"
	- "Router handlers"
	- and so on...

- setup.js:

	The same problems like the things I just list below.

	Problem:
		- The json information, just like ACL create, in this file is bad. I think it can be move "SystemDefaultRoles.js".
		- Database operation is use many callbacks, I think it is a little stupid for catch error, just like "if(err) {console.log(err)}", ".catch()" is grate!
		- "system_initialized" is twice set.
		- Another problem is database query is too much, I realize it is difficult to read in huge programe.I think I will make all query conditions into "var allUsers = {}" and "User.find(allUsers).then()...". It is best.

- server.js:
	Problem:
		- Container is in this file and so many logic, it will move the place into boot system. Remote method is also here, I think it should be moved into common/models.
