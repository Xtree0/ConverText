import express from "express"
const app = express()
const port = 3333

app.use(express.text())

app.post('/convert', (req, res) => {
    let textoInicial = req.body.replace(/\((s|es)\)/g, "$1")
    textoInicial = textoInicial.replace(/\((as|os|eis|is|ãos|ães|ões|ns)\)/g, "")

    const linhas = textoInicial.split('\n')
    const regex = /[a-zA-Z\u00C0-\u00FF]+/gm

    const linhasParseadas = []
    linhas.forEach((linha) => {
        const palavras = linha.match(regex)
        for (let i = 0; i < palavras.length; i += 6) {
            linhasParseadas.push(palavras.slice(i, i + 6).join(" "));
        }
    })

    const textoParseado = linhasParseadas.join("\n") 

    res.send(textoParseado)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
