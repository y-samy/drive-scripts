/*

###############################
###   Batch                 ###
###         File            ###
###              Renaming   ###
###############################

$==================$
$ BEGIN USER INPUT $
$==================$

*/

/* REQUIRED */
const sourceFolderID_BatchRename = ''

const query_BatchRename = '' // String or RegExp literal
const replace_BatchRename = '' // String or RegExp literal

/* OPTIONAL */
const replaceAllInstances_BatchRename = false

/*

$==================$
$ END  USER INPUT  $
$==================$

*/

















function start_BatchRename() {
  var folder = DriveApp.getFolderById(sourceFolderID_BatchRename);
  var files = folder.getFiles();
  let replaceFunc = (replaceAllInstances_BatchRename) ? String.prototype.replaceAll : String.prototype.replace;
  while (files.hasNext()) {
    var file = files.next()
    var fileName = file.getName();
    if (fileName.match(query_BatchRename)) {
      let renameLog = 'Renamed ' + fileName + ' ';
      fileName = replaceFunc.call(fileName, query_BatchRename, replace_BatchRename);
      renameLog += 'to ' + fileName;
      file.setName(fileName);
      console.log(renameLog);
    };
  };
}