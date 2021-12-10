function filter(str) {
    str += '';
    str = str.replace(/%/g, '%25');
    str = str.replace(/\+/g, '%2B');
    str = str.replace(/ /g, '%20');
    str = str.replace(/\//g, '%2F');
    str = str.replace(/\?/g, '%3F');
    str = str.replace(/&/g, '%26');
    str = str.replace(/\=/g, '%3D');
    str = str.replace(/#/g, '%23');
    return str;
}

function formateObjToParamStr(paramObj) {
    const sdata = [];
    for (let attr in paramObj) {
        sdata.push(`${attr}=${filter(paramObj[attr])}`);
    }
    return sdata.join('&');
};

export {
    formateObjToParamStr
}