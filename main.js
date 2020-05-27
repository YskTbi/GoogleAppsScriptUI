/*
   ブラウザアクセスのエントリーポイント
 */
function doGet(e) {
  t = HtmlService.createTemplateFromFile('index.html');
  t.title = '一覧';
  t.data = JSON.stringify(getContent());
  return t.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

/** コンテンツ */
function getContent() {
  var folder = DriveApp.getFolderById('');
  var files = folder.getFiles();
  var fileList = [];
  var returnList = [];
  //ファイル要素を取得する
  while (files.hasNext()) {
      var includeFileMap = {};
      var file = files.next();
      includeFileMap["name"] = file.getName();
      includeFileMap["url"] = file.getUrl();
      includeFileMap["time"] = file.getLastUpdated();
      includeFileMap["date"] = formatDateToString(file.getLastUpdated());
      includeFileMap["category"] = file.getDescription();
      fileList.push(includeFileMap);
  }
  //最終更新日でソート
  fileList.sort(function(a, b){
	if (a['time'] > b['time']) return -1;
	if (a['time'] < b['time']) return 1;
	return 0;
  });
  return fileList;
}

function formatDateToString(date){
  var year = date.getFullYear();
  var month = ("00" + (date.getMonth()+1)).slice(-2);
  var day = ("00" + date.getDate()).slice(-2);
  var result = year + "/" + month + "/" + day;
  return result;
}
