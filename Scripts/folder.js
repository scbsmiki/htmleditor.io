const CreateFolder = ( ) => {
    let folderName = prompt("Nome da pasta")
    if ( !folderName ) return;

    let id = 0;
    if ( folders[folders.length-1] ) id = folders[folders.length-1].id+1

    folders.push({
        name: folderName.slice(0,15), id: id, files: []
    })

    reloadFiles ()
}

const DeleteFolder = ( folder ) => {
    if ( folders[folder].deletable ) return alert("Essa pasta nao pode ser deletada")
    folders.splice(folder,1)
    reloadFiles()
}

const DeleteFile = ( folder, file ) => {
    if ( folders[folder].files[file].deletable ) return alert("Esse arquivo nao pode ser delatado")
    folders[folder].files.splice(file,1)
    reloadFiles()
}

const CreateFile = ( folderID ) => {
    let folder = folders[folderID]

    let fileName = prompt("Nome do arquivo")
    if ( !fileName ) return;
    let fileType = prompt("(js/css)")
    if ( !fileType ) return;

    if ( fileType != "js" ) {
        if ( fileType != "css" ) return alert("O Tipo "+fileType+" e invalido")
    }

    let id = 0;
    if ( folder.files[folder.files.length-1] ) id = folder.files[folder.files.length-1].id+1

    folder.files.push({
        name: fileName.slice(0,15), type: fileType, code: "", id: id
    })

    reloadFiles ()
}

const SetFile = ( folder, file ) => {
    inFolder = folders[folder]
    inFile = inFolder.files[file]

    title.innerHTML=`Editando ${inFolder.name}/${inFile.name}.${inFile.type}`
    icon.href= inFile.type+"-icon.png"

    document.querySelector(".coder-textarea").value = inFile.code
}

const reloadFiles = ( ) => {
    let foldesHTML = document.querySelector(".files")

    foldesHTML.innerHTML = folders.map( folder => `
        <div class="folder">
            <div class="folder-title x18">
                <span class="folder-delete x18 pointer" onclick="DeleteFolder(${folder.id})">X</span> ${folder.name}
            </div>
            <div class="folder-files">

                ${folder.files.map( file => `
                <h6 class="folder-file-name x16">
                    <span class="folder-delete x16 pointer" onclick="DeleteFile(${folder.id},${file.id})">X</span>
                    <span onclick="SetFile(${folder.id},${file.id})" class="pointer">${file.name}</span>
                    <span class="folder-file-ext ${file.type} x7">.${file.type}</span>
                </h6>
                `).join("")}

                <div class="folder-title x18 pointer" onclick="CreateFile(${folder.id})">
                    Criar novo arquivo
                </div>
            </div>
        </div>
    `).join("")
    foldesHTML.innerHTML += `
    <div class="folder-create x18 pointer" onclick="CreateFolder()">
        Criar nova pasta
    </div>`
}

reloadFiles ()