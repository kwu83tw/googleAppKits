/** @OnlyCurrentDoc */
// Telegram block //
var telegramToken = "YourSecret";
var telegramUrl = "https://api.telegram.org/bot" + telegramToken;

// return bot info e.g., {"id":xxxxxx,"is_bot":true,"first_name":"","username":""}}
function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

// Get chat_id from myself
function getUpdatedMsg(){
  var url = telegramUrl + "/getUpdates";
  var res = UrlFetchApp.fetch(url);
  Logger.log(res.getContentText());
}

// Required chat_id
function testSendMessageToRoom(){
  var msg = "每日一善回報員測試";
  var url = telegramUrl + "/sendMessage?text=" + encodeURIComponent(msg) + "&chat_id=";
  var res = UrlFetchApp.fetch(url);
  Logger.log(res.getContentText());
}  

function testTriggeringFunc() {
  deleteMsgInRoom("", "");
}

function deleteMsgInRoom(chat_id, msg_id) {
  var url = telegramUrl + "/deleteMessage?chat_id=" + chat_id + "&message_id=" + msg_id;
  var res = UrlFetchApp.fetch(url);
  Logger.log(res.getContentText());
}
  
function sendMessageToRoom(e){
  var url = telegramUrl + "/sendMessage?text=" + encodeURIComponent(e) + "&chat_id=";
  var res = UrlFetchApp.fetch(url);
  Logger.log(res.getContentText());
}
// Telegram block //


function callTrigger() {
  // Add trigger
  ScriptApp.newTrigger('ccr')
    .timeBased()
    .atHour()
    .nearMinute()
    .everyDays()
    .inTimezone("America/Los_Angeles")
    .create();
}

function findPrevLastRow() {
  var ss = SpreadsheetApp.getActive();
  var s = ss.getSheetByName("Form Responses 1");
  var lastCol = s.getLastColumn();
  var lastRow = s.getLastRow();  
  for (var r=lastRow; r>0; r--) {
    tmp = s.getRange(r, lastCol);
    if ( tmp.getValue() ) {
      return tmp.getValue();
    }
  }
  return -1;
}

// calculate today sum return count, sum
function getSum(preLastRow, curLastRow, targetCol) {
  var ss = SpreadsheetApp.getActive();
  var s = ss.getActiveSheet();
  var data = s.getRange(preLastRow+1, 3, curLastRow-preLastRow).getValues();
  var count = 0; 
  var sum = 0;
  Logger.log(data);
  for (i=0; i<=data.length; i++){
    if (data[i]) {
      count = count + 1;
      sum = sum + data[i] * 1;
    }
  }
  return {
      count: count,
      sum: sum
  };
}

function ccr() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange(sheet.getLastRow(), 1, 1, sheet.getMaxColumns()).activate();
  
  // color last row font into bold
  spreadsheet.getActiveRangeList().setFontWeight('bold');
  spreadsheet.getActiveRangeList().setFontStyle('italic');

  // find previous last row
  var prevLastRow = findPrevLastRow();
  
  // find range to calculate sum, count
  if (validateSpreadsheet()) { 
    var gs = getSum(prevLastRow, sheet.getLastRow(), 3);
    sheet.getRange(sheet.getLastRow(), sheet.getLastColumn()-2).setValue(gs.sum);
    sheet.getRange(sheet.getLastRow(), sheet.getLastColumn()-1).setValue(gs.count);
    sheet.getRange(sheet.getLastRow(), sheet.getLastColumn()).setValue(sheet.getLastRow());

    var displayStr = compResportStr(gs.sum.toString(), gs.count.toString());

    // setting value of F1
    sheet.getRange(1, 6).clearContent();
    sheet.getRange(1, 6).setValue(displayStr);

    sendMessageToKent(displayStr);
  }
}

function compReportStr (ttCount, pplCount) {
    var currentDate = new Date();
    var datetime = (currentDate.getMonth()+1) + "/" + (currentDate.getDate());
    var displayStr = "聖荷西館" + datetime + "每日一善";
    var secondLine = "轉傳總人數： " + ttCount + "人";
    var thirdLine = "執行人數: " + pplCount + "人";
    displayStr = displayStr + "\n" + secondLine + "\n" + thirdLine;
    Logger.log(displayStr);
    // Logger.log('聖荷西館 %s 每日一善轉傳總人數： %s 人 執行人數: %s 人', datetime, gs.sum.toString(), gs.count.toString());
    return displayStr;
}

// Escape error causing by existing markup (if someone edit lastrow already)
function validateSpreadsheet() {
  var ss = SpreadsheetApp.getActive();
  var s = ss.getSheetByName("Form Responses 1");
  var lastCell = s.getRange(s.getLastRow(), s.getLastColumn()).getValue();
  Logger.log("%s %s", lastCell, s.getLastRow());
  if ( lastCell.toString() != s.getLastRow() ) {
    return 1;
    }
  return 0;
}
