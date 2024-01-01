const resultEl = document.getElementById('result')
const clipboardEl = document.getElementById('clipboard')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const genrateEl = document.getElementById('genrate')

const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

genrateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.textContent = genratePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function genratePassword(lower, upper, number, symbol, length) {
    let genratedPassword = ''

    const typesCount = lower + upper + number + symbol
    if (typesCount === 0) return ''

    const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])

    // for (let i = 0; i < length; i += typesCount) {
    //     typesArray.forEach(type => {
    //         if (type.lower === true && genratedPassword.length <= length) genratedPassword += randomFunction.lower()
    //         if (type.upper === true && genratedPassword.length <= length) genratedPassword += randomFunction.upper()
    //         if (type.number === true && genratedPassword.length <= length) genratedPassword += randomFunction.number()
    //         if (type.symbol === true && genratedPassword.length <= length) genratedPassword += randomFunction.symbol()
    //     })
    // }
    // return genratedPassword

    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const typeName = Object.keys(type)[0]
            genratedPassword += randomFunction[typeName]()
        })
    }
    return genratedPassword.slice(0, length)
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbol = '!@#$%^&*(){}[]=<>/,.'
    return symbol[Math.floor(Math.random() * symbol.length)]
    // return String.fromCharCode(Math.floor(Math.random() * 15) + 33)
}

clipboardEl.addEventListener('click', () => {
    if (resultEl.value === '') return

    navigator.clipboard.writeText(resultEl.textContent)
    alert('Password copied to clipboard')
})