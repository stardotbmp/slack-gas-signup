var SlackSignup = (function(namespace){
  
  var get = PropertiesService.getScriptProperties();
  
  namespace.config = {
    key: get.getProperty('slack-api-key'),
    slackUrl: get.getProperty('slack-url')
  }
  
  namespace.includeStyles = function() {
    var indexHtml = HtmlService.createHtmlOutputFromFile('docs/index').getContent();
    return indexHtml.match(/<style>[\s\S]+?<\/style>/);
  }
  
  namespace.slackInvite = function(email) {
    
    // Only works if script-properties token is set.
    if (!SlackSignup.config.key) { throw('No key set'); }
    
    // Only works if script-properties slack url is set.
    if (!SlackSignup.config.slackUrl) { throw('No url set'); }
    
    if (!email) { throw('No email passed'); }    
    
    var response,
        params,
        url = 'https://' + SlackSignup.config.slackUrl + '.slack.com/api/users.admin.invite?';
    
    params = {
      email: encodeURIComponent(email),
      token: SlackSignup.config.key,
      set_active: true,
      resend: true
    };
        
    url = Object.keys(params).reduce(function(url, key){  
      return url + key +'=' + params[key] + '&';
    }, url);
        
    try {
      response = JSON.parse(UrlFetchApp.fetch(url).getContentText());
    } catch (err) {
      throw(err);
    }
    
    if (!response.error && response.ok == true) {
      return email;
    } else {
      throw(response.error);
    }  
  }
  
  return namespace;
  
}(SlackSignup || {}));