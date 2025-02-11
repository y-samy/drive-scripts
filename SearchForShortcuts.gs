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

  let root = DriveApp.getFolderById(sourceFolderID_SearchForShortcuts);

  console.log('Looking for shortcuts in ' + root.getName() + "...");

  if (!recurse_SearchForShortcuts) {
    let shortcuts = root.getFilesByType(MimeType.SHORTCUT);
    while (shortcuts.hasNext())
      console.log(`> ${(shortcuts.next()).getName()}`);
    return;
  }

  let dirStack = [];
  dirStack.push([root.getFolders(), root, '> ', false]); // recursion replacement
  // generator function, folder, full path, flagged searched

  let currentGen;
  let currentFolder;
  let currentPath;
  let printedAlready;

  while (dirStack.length) {
    currentGen = dirStack[dirStack.length - 1][0];
    currentFolder = dirStack[dirStack.length - 1][1];
    currentPath = dirStack[dirStack.length - 1][2];
    printedAlready = dirStack[dirStack.length - 1][3];

    if (!printedAlready) {
      let shortcuts = currentFolder.getFilesByType(MimeType.SHORTCUT);
      while (shortcuts.hasNext())
        console.log(`${currentPath} ${(shortcuts.next()).getName()}`);
      dirStack[dirStack.length - 1][3] = true;
    }

    if (!currentGen.hasNext()) {
      dirStack.pop();
      continue;
    }

    let nextFolder = currentGen.next()
    let nextGen = nextFolder.getFolders();
    dirStack.push([nextGen, nextFolder, `${currentPath}/${nextFolder.getName()}`, false]);
  }

}
