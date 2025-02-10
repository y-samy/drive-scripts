/*

###############################
###   Search In             ###
###        A Folder         ###
###         For Shortcuts   ###
###############################

$==================$
$ BEGIN USER INPUT $
$==================$

*/

/* REQUIRED */
const sourceFolderID_SearchForShortcuts = ''

/* Optional */
const recurse_SearchForShortcuts = true

/*

$==================$
$ END  USER INPUT  $
$==================$

*/




















function start_SearchForShortcuts() {
  let source = DriveApp.getFolderById(sourceFolderID_SearchForShortcuts);

  function printShortcuts(folder, path) {
    path += folder.getName() + '/';
    let shortcuts = folder.getFilesByType(MimeType.SHORTCUT);
    while (shortcuts.hasNext()) {
      console.log(path + (shortcuts.next()).getName());
    }
    if (recurse_SearchForShortcuts) {
      let childFolders = folder.getFolders();
      while (childFolders.hasNext()) {
        printShortcuts(childFolders.next(), path);
      }
    }
  }
  console.log('Looking for shortcuts in ' + source.getName() + "...");
  printShortcuts(source, '> ')

}