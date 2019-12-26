function getFormRes() {
  var FORMNAME = "Copy of 每日一善轉傳";
  var formHandle = DriveApp.getFilesByName(FORMNAME).next();
  var form = FormApp.openById(formHandle.getId());
  
  // form.createResponse()
  var fromRes = form.createResponse();
  
  // Date 2019-12-22
  var qtOne = form.addTextItem();
  var currentDate = new Date();
  var month = currentDate.getMonth() + 1;
  var timestamp = "";
  timestamp += currentDate.getYear().toString() + "-";
  timestamp += month.toString() + "-";
  timestamp += currentDate.getDate();
  var ansOne = qtOne.createResponse(timestamp);
  formRes.withItemResponse(ansOne);

  // Name
  var qtTwo = form.addTextItem();
  var ansTwo = qtTwo.createResponse("肯特");
  formRes.withItemResponse(ansTwo);
  
  // 1012
  var qtThir = form.addTextItem();
  var ansThir = qtThir.createResponse("1012");
  formRes.withItemResponse(ansThir);

  // how many
  var qtFour = form.addTextItem();
  // TODO: get # from bot chat
  var ansFour = qtFour.createResponse("300");
  formRes.withItemResponse(ansFour);

  formRes.submit();



  /*
  // Getter
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
   */
  }
}
