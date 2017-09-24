function doGet(e) {
  const html = HtmlService.createTemplateFromFile('sign-up-form').evaluate()
  .setTitle('Slack GAS')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); 
  
  return html;  
}

function includeStyles() {
  return SlackSignup.includeStyles();
}

function slackInvite(email) {
  return SlackSignup.slackInvite(email);
}