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

const recurse_SearchForShortcuts = true

/*

$==================$
$ END  USER INPUT  $
$==================$

*/




















function start_SearchForShortcuts() {
  let source = DriveApp.getFolderById(sourceFolderID_SearchForShortcuts);
  let folders = [];
  let shortcuts = [];
  folders.push(source);

  function getFolderList(folder)
  {
    let tempFolders = folder.getFolders();
    while (tempFolders.hasNext()){
      let nextFolder = tempFolders.next();
      folders.push(nextFolder);
      getFolderList(nextFolder);
    }
  }
  if (recurse_SearchForShortcuts)
  {
    getFolderList(source);
  }

  folders.forEach(folder => {
    let tempShortcuts = folder.getFilesByType(MimeType.SHORTCUT);
    while (tempShortcuts.hasNext())
    {
      shortcuts.push(tempShortcuts.next());
    }
  })

  shortcuts.forEach(shortcut => {
    let path = shortcut.getName();
    let parent = (shortcut.getParents()).next();
    while (parent.getId() != sourceFolderID_SearchForShortcuts)
    {
      path = parent.getName() + '/' + path;
      parent = (parent.getParents()).next();
    }
    path = parent.getName() + '/' + path;
    console.log('Found ' + path);
  })

}