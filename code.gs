var telegramToken = ""; // YOUR_BOT_SECRET_TOKEN
var telegramUrl = "https://api.telegram.org/bot" + telegramToken;
var webAppUrl = ""; // YOUR_GAS_APP_URL

// webhook must be set at 1st time with telegram
// Noted: it cannot use together with getUpdates API
function setWebhook(){
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var res = UrlFetchApp.fetch(url);
  Logger.log(res.getContentText());
}

// This func will get triggered when a Get request is sent to webAppUrl
function doGet(){
  return HtmlService.createHtmlOutput("hi there");
}

/* msg content from telegram bot
{
  "parameter": {
    
  },
  "contextPath": "",
  "contentLength": 258,
  "queryString": "",
  "parameters": {
    
  },
  "postData": {
    "type": "application/json",
    "length": 258,
    "contents": "{\"update_id\":815634662,\n\"message\":{\"message_id\":365,\"from\":{\"id\":123456,\"is_bot\":false,\"first_name\":\"KK\",\"last_name\":\"Wu\",\"language_code\":\"en\"},\"chat\":{\"id\":123456,\"first_name\":\"KK\",\"last_name\":\"Wu\",\"type\":\"private\"},\"date\":1577601090,\"text\":\"30\"}}",
    "name": "postData"
  }
}
*/

// Required chat_id
function sendMsg(e, id){
  var url = telegramUrl + "/sendMessage?text=" + encodeURIComponent(e) + "&chat_id=" + id;
  var res = UrlFetchApp.fetch(url);
  Logger.log(res.getContentText());
}

function doPost(e) {
  /*
  var FORMNAME = "Copy of 每日一善轉傳";
  var formHandle = DriveApp.getFilesByName(FORMNAME).next();
  var form = FormApp.openById(formHandle.getId());
  GmailApp.sendEmail(Session.getEffectiveUser(), "Msg sent from bot", JSON.stringify(, null, 4));
  */

  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  var chatId = data.message.from.id;
  
  // if msg sent by invalid user, do nothing.
  if (validateId(chatId) ==  0) {
    return;
  }
  
  var formId = ""; // formID
  var form = FormApp.openById(formId);
  var formRes = form.createResponse();

  if ( !isNumeric(text) ) {
    sendMsg("Are you serious???\n" + text + "\n請輸入數字啦! 麻瓜!!! >>>", chatId);
    return;
  } else {
    sendMsg("輸入" + text + " ing ..... over!", chatId);
  }

  var questions = form.getItems();
  // Date 2019-12-22
  addResponse(questions[0].asDateItem(), new Date(), formRes);
  
  // Name
  if ( chatId.toString() == 170537126 ) {
    var myname = "肯特";
  } else {
    var myname = "曉容";
  }
  addResponse(questions[1].asTextItem(), myname, formRes);
  
  // 1012
  addResponse(questions[2].asListItem(), ["1012"], formRes);
  
  // how many "asCheckboxItem() in dummy spreadsheet"
  var qt = questions[3].asMultipleChoiceItem();
  Logger.log(qt.hasOtherOption());
  addResponse(qt, [text], formRes);
  
  formRes.submit();
  
}

function validateId(id) {
  var ids = [170537126, 791104546];
  if ( ids.indexOf(id) != -1 ){
    return 1;
  }
  return 0;
}

function isNumeric(text){
  return !isNaN(text) && text > 0
}


/* This method will generate new question/answer fields 
  form.createResponse()
  
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
  */

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
  }
*/
