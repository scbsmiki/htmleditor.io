var folders = [
    { name: "Main", deletable: true, id: 0, files: [
        { name: "Page", deletable: true, type: "html", code: "", id: 0 },
        { name: "Script", type: "js", code: "", id: 1 },
        { name: "Style", type: "css", code: "", id: 2 }
    ]}
]

var inFolder = folders[0]
var inFile = inFolder.files[0]

var title = document.querySelector("title")
var icon = document.createElement("link")

icon.rel = "shortcut icon"
icon.type="image/x-icon"
icon.href="html-icon.png"
icon.classList.toggle("icon")

document.head.appendChild(icon)

title.innerHTML=`Editando ${inFolder.name}/${inFile.name}.${inFile.type}`
