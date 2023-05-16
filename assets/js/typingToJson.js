const inputArea_0 = document.getElementById('inputArea_0')
const inputArea_1 = document.getElementById('inputArea_1')
const inputArea_2 = document.getElementById('inputArea_2')
const splitWordBox = document.getElementById('splitWordBox')
const inTextArea = document.getElementById('in')
const outTextArea = document.getElementById('out')

const input = (e) => {
    const columsName = [
        inputArea_0.value,
        inputArea_1.value,
        inputArea_2.value
    ]
    const text = e.target.value
    let outStr = ""
    
    if(text.startsWith('{')) { // JSON
        const jsonText = `[${text.slice(0,-2)}]`
        const json = JSON.parse(jsonText)
        for (const item of json) {
            outStr += `${item[columsName[0]]}${splitWordBox.value}${item[columsName[1]]}\n`
        }
    }else{
        const lines = text.split('\n')
        for (const line of lines) {
            if(line === '') continue // 空行は無視する
            const columns = line.split(`${splitWordBox.value}`)
            const typing = kanaToRoman(columns[0], "my", { longSound : "hyphen"})
            outStr += `{ "${columsName[0]}": "${columns[0]}", "${columsName[1]}": "${columns[1]}", "${columsName[2]}": "${typing}" },\n`
        }
    }

    outTextArea.value = outStr
}

// ===< addEventLister >=========================================================
inTextArea.addEventListener("input", input)
