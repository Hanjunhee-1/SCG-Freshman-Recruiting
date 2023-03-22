function dateFormat() {
    const currentDate = new Date();
    
    const result = currentDate.getFullYear() + 
            '-' + ( currentDate.getMonth()+1 <= 9 ? '0'+(currentDate.getMonth()+1) : (currentDate.getMonth()+1)) +
            '-' + ( currentDate.getDate() <= 9 ? '0'+currentDate.getDate() : currentDate.getDate());

    return result;
}

// CommonJS 식 export 방식
module.exports.dateFormat = dateFormat;