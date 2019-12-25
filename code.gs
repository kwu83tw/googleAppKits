function getFormRes() {
  var FORMNAME = "Copy of 每日一善轉傳";
  var formHandle = DriveApp.getFilesByName(FORMNAME).next();
  var form = FormApp.openById(formHandle.getId());
  
  // form.createResponse()
  var formTitle = form.getTitle();
  var formRes = form.getResponses();
  Logger.log(formTitle);
  Logger.log(formRes);
 
  // Loop over form objects 
  for(var i=0; i < formRes.length ; i++){
    var itemRes = formRes[i].getItemResponses();

    Logger.log(itemRes);
    var itemContext = formTitle + Session.getEffectiveUser().getEmail();
    Logger.log(itemContext);

    // Loop over for each obj
    for(var j=0; j < itemRes.length ; j++){
      itemContext += itemRes[j].getItem().getTitle();
      
      itemContext += " : " + itemRes[j].getResponse() + "\n";
      itemContext += "\n Time: " + formRes[i].getTimestamp() + "\n\n\n";
    }
    Logger.log(itemContext);
  }
}
