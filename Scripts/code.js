const WriteCode = async ( ) => {
    inFile.code = document.querySelector(".coder-textarea").value
    folders[inFolder.id].files[inFile.id].code = inFile.code

    let HTML = "";
    let CSS = ""
    let JS = ""
    await folders.forEach ( folder => {
        folder.files.forEach ( file => {
            if ( file.type === "html" ) HTML += file.code + "\n"
            if ( file.type === "css" ) CSS += file.code + "\n"
            if ( file.type === "js" ) JS += file.code + "\n"
        })
    })
    document.querySelector(".preview-page").srcdoc=""
    document.querySelector(".preview-page").srcdoc+="<style>"+CSS+"</style>"
    document.querySelector(".preview-page").srcdoc+="<body>"+HTML+"</body>"
    document.querySelector(".preview-page").srcdoc+="<script>"+JS+"</script>"
    Console ( )
}

const Console = async ( ) => {
    document.querySelector(".preview-console-code").srcdoc = ""
    
    let Code = "";
    await folders.forEach ( folder => {
        folder.files.forEach ( file => {
            if ( file.type === "js" ) Code += file.code + "\n"
        })
    })

    Code = Code.replace(/console.log/g, `document.querySelector('.preview-console-code').srcdoc+="<br><span style="color:white">[ ${new Date().toLocaleTimeString()} ]</span> "+`)
    
    try {
        let result = await eval(Code)
        if ( typeof result === "object" ) {
            document.querySelector('.preview-console-code').srcdoc+=`<span style="color:white">[ ${new Date().toLocaleTimeString()} ]</span> o: `+ JSON.stringify(result) + "<br>"
        }
        if ( typeof result === "function" ) {
            document.querySelector('.preview-console-code').srcdoc+=`<spanstyle="color:white">[ ${new Date().toLocaleTimeString()} ]</span> f: `+ result + "<br>"
        }
    } catch (error) {
        error = new Error(error)
        document.querySelector('.preview-console-code').srcdoc+=`<span style="color:white">[ ${new Date().toLocaleTimeString()} ]</span> <span style="color: red">`+
        error+ "</span> <br>"
    }
}