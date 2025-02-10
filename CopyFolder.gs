/*

###############################
###   Copy                  ###
###     Folder Contents     ###
###                 by ID   ###
###############################

$==================$
$ BEGIN USER INPUT $
$==================$

*/

/* REQUIRED */
const sourceFolderID_CopyFolder = '';
const targetFolderID_CopyFolder = '';

/* OPTIONAL */
const copyOriginalFromShortcuts_CopyFolder = true;
const traverseFolderShortcuts_CopyFolder = false;

/*

$==================$
$ END  USER INPUT  $
$==================$

========================USER GUIDE=========================

Replace      the   strings        inside    the    variable
sourceFolderID_CopyFolder     and         the      variable
targetFolderID_copyFolder with the IDs of the source folder
(you   want  to  copy)    and  target  folder (destination)
respectively.

The script  will fill the target folder with the contents of
the source folder, including all subfolders. The script will
not  traverse or copy  the   original  files  from shortcuts
unless the  variables   copyOriginalFromShortcuts_CopyFolder
and traverseFolderShortcuts_CopyFolder  respectively are set
to true.

The time limit for a running script is 6 continuous minutes.
If the  folder you  specified   requires  more  time, please
consider  splitting the task  up if re-running  the function
start_CopyFolder does not make it continue where it left off
in a previous run.

WILL NOT COPY FILES IF THE FILE OWNER HAS RESTRICTED COPYING
OR DOWNLOADING THE FILE

*/



















function start_CopyFolder() {
  const fromFolder = DriveApp.getFolderById(sourceFolderID_CopyFolder)
  const toFolder = DriveApp.getFolderById(targetFolderID_CopyFolder)

  function copyFolder(fromFolder, toFolder) {
    var folderList = []
    var files = fromFolder.getFiles()
    while (files.hasNext()) {
      var file = files.next();
      if (file.getMimeType() == MimeType.SHORTCUT && file.getTargetMimeType() == MimeType.FOLDER && traverseFolderShortcuts_CopyFolder) {
        folderList.push(DriveApp.getFolderById(file.getTargetId()))
        continue;
      }
      if (file.getMimeType() == MimeType.SHORTCUT && file.getTargetMimeType() != MimeType.FOLDER && copyOriginalFromShortcuts_CopyFolder)
        file = DriveApp.getFileById(file.getTargetId())
      var newFile = file.makeCopy(file.getName(), toFolder)
      console.log('Copied ' + file.getName())
    }

    var folders = fromFolder.getFolders()
    while (folders.hasNext()) {
      var folder = folders.next()
      folderList.push(folder)
    }

    folderList.forEach(folder => {
      var newFolder = toFolder.createFolder(folder.getName())
      copyFolder(folder, newFolder)
    })
  }

  copyFolder(fromFolder, toFolder)
}

