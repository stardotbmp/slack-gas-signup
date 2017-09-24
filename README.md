# Slack GAS

Slack channels are designed, by and large to be for the communication within or without an organization. The mechanics of sign-up are therefore also designed around control of membership at the organization. From the outset, however, there have been ways to allow 'loose-fit organizations', interest groups and open source projects to have dedicated channels. For these the authorization route is straightforward and relies on an invitation by email model.

But what if you don't know who needs to be invited ahead of time? This is of course often the case with all comer open source projects.

For this example I set-up a channel for users of Google Apps Script based initially from a cabal from the [Google+ community](https://plus.google.com/u/0/communities/102471985047225101769). Consequently This is a worked example for creating and utilizing a Google Apps Script Html web-app project to enable automatic sign-up/invitation to a free tier Slack channel.

## Getting Started

These instructions will get you a copy of the project up and running on your Google Apps Script account for publishing the web-app for the channel of your choice. It includes a couple of extras that I used to make this a one-stop deploy if needed.

### Prerequisites

This code could be repurposed with appropriate edits to run on other platforms. This is specific to Google Apps Script in its use of the Script Properties store which enables the auth tokens and channel names to be made exclusive and kept private.

So you'll need:
- A [script.google.com](https://script.google.com) account, i.e. a Google Auth'd account. Gmail or a GSuite account is fine for this, or even a Google cloud identity account.

#### Optional prerequisites

- This final project runs 'hosted' by a Github pages account, for this you'd need a live [Github account](https://github.com/join?source=header-home) (free tier is fine). The reason for this method is for a neat url, that is all.

- I like to host Google Apps Script projects as soon as they get beyond the prototype phase in Github, the easiest means of managing your versioning and changes of a GAS project in Github is using the awesome Chrome extension [Google Apps Script Github Assistant](https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo?hl=en)

### Installing

##### Route 1 - Low friction
If you have a Github account and have installed the git-hub assistant, clone this repository. If you want to rename the project and have it relate to your channel's name, you'll need to duplicate it and not fork it. Use this new repository of your own with the Github Assistant and pull down all the files.

![Pull from github](/docs/Assistant.png?raw=true)

##### Route 2 - Cut & Paste
If you don't want to mess about with git-hub, then you can get by with copy-pasting the code from here directly into a new Apps Script project.

If you want to edit the least amount of code, replicate the following files:

   ![Apps Script Project File Listing](/docs/Files.png?raw=true)
   
- `Code.gs` - Handles the `doGet()` action related to publishing an Apps Script as a web app.
- `SlackSignup.gs` - The logical code behind the application.
- `Docs/index.html` - The 'host' web page for the github pages implementation (contains the css for both web-app and host page).
- `sign-up-form.html` - The template HTML for the web-app


#### Script Properties
Two things you'll need to set in the Script Properties to get working.
1. The Slack channel you want to invite people to: In this case `google-apps-script`
2. The appropriate Slack api token. You generate this specific to your app and your channel by logging into your channel and then visiting [Slack API Legacy Tokens](https://api.slack.com/custom-integrations/legacy-tokens)

   e.g. `xoxp-000000000000-000000000000-000000000000-000000000000000000000000000000000`

   add both to Script Properties as:
```
slack-url: google-apps-script
slack-url: xoxp-000000000000-000000000000-000000000000-000000000000000000000000000000000
```

This is all you need for the Apps Script web-app part.

#### Publish

![Deploy as Web App](/docs/Publish.png?raw=true)

Deploy the script as web-app from the Publish menu. Have it run under your authority but accessible by anonymous. This allows you to control the access to the Script properties, but execution by anyone.

The publish step will ask you to register a version of your code. You can name this 'Launched' or whatever you want. The resultant url will look like this: `https://script.google.com/a/stardotbmp.com/macros/s/randomMonkeysBashingAwayAtTheKeys1234/exec`. Copy this url.

![Published](/docs/Published.png?raw=true)

Before you visit that url and try it out, you'll need to authorize the script to execute two scopes on your behalf.
2. Visit external urls - This is the communication with Slack
1. Access Script Properties - This to access the 'secrets' you set above.

   These are registered as:
```
https://www.googleapis.com/auth/script.external_request
https://www.googleapis.com/auth/script.storage
```

with `Code.gs` active run the function `authoriseScript()` it does nothing if the script is already authorized. If it isn't, it will prompt you to do so.

That's it. Visit https://script.google.com/a/stardotbmp.com/macros/s/randomMonkeysBashingAwayAtTheKeys1234/exec and start signing up your minions.

![Live Signup Page image](/docs/WebApp.png?raw=true)

### Github Pages

At the outset, there I stated this Apps Script would be hosted here on Github using github pages. Why?

Remember that monkeys typed url that a deployed Apps Script is published at? It is functional but obscure. If you host the Apps Script web-app within an `iframe` on another site with a more rational url, you can give a better impression of your application. This has been difficult in the past, but by using an undocumented header it is possible to do so with little fuss.

Take a look at `Docs/index.html` It is most a bunch of css I hacked together to make the sign-up page. the only functional line of html is: `<iframe class="gas-frame" src="https://script.google.com/a/stardotbmp.com/macros/s/randomMonkeysBashingAwayAtTheKeys1234/exec"></iframe>`

Thats our webapp url we get from the Publish menu.

In `Code.gs` you'll see as part of the `HtmlService` call `.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);` This is the magic header that allows this to be done with no particular Google security warnings. This works at the time of writing at least.

With a `Docs` folder in place in the github repository, this can be selected as the Github pages for the repository. These by default are HTTPS and with a url which matches your repository's name (hence the cloning not right at the beginning, you cannot rename a forked public repository).

Github Pages [https://pages.github.com/]
![Setting up Github Pages](/docs/Pages.png?raw=true)


## Built With

* [Google Apps Script](https://script.google.com) - Part of the hackers toolkit
* [Github](https://github.com) - For change control, code hosting and page serving.
* [Google Apps Script Github Assistant](https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo?hl=en) - Chrome Extension

## Contributing

Any contributions welcome. I don't have many public repositories and haven't shared much otherwise. Any pointers, corrections or improvements, I'm happy to open up and/or accept pull requests.

## Authors

* **Jonathon Broughton** - *Initial work* - [stardotbmp](https://github.com/stardotbmp)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Google Apps Script Google+ community](https://plus.google.com/u/0/communities/102471985047225101769)
* [Steve Webster](http://www.andrewroberts.net/) - for nagging me to get this done.
* [Bruce McPherson](http://www.mcpher.com/  ) - for continuing to lead the way in education in the Google Apps Script space. I totally used his namespacing pattern for this.
