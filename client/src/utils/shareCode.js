function shareCodeGenerator() {
    const alphaNumArr = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678901234567890123456789`.split("");
    let codeArr = [];
    for (let i = 0; i < 6; i++) {
        codeArr.push(alphaNumArr[Math.floor(Math.random() * alphaNumArr.length)]);
    }
    let code = codeArr.join("");
    return code;
}

export  { shareCodeGenerator };