/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] obj.maxLength-任意长度最大位
** xuanfeng 2014-08-28
*/
export default function randomWord(obj) {
    obj = {
        num: true,
        minLetter: true,
        maxLetter: true,
        minLength: 2,
        maxLength: 5,
        randomFlag: true,
        ...obj
    }
    var str = "",
        pos = 0,
        range = obj.minLength,
        arr = [],
        nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        minLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        maxLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    if (obj.minLetter) {
        arr.push(...minLetters)
    }
    if (obj.maxLetter) {
        arr.push(...maxLetters)
    }
    if (obj.num) {
        arr.push(...nums)
    }
    // 随机产生
    if (obj.randomFlag) {
        range = Math.round(Math.random() * (obj.maxLength - obj.minLength)) + obj.minLength;
    }
    for (var i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}