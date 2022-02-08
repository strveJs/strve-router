/*!
 * strve-router v2.0.1
 * (c) 2021-2022 maomincoding
 * Released under the MIT License.
 */

const strveRouterVersion = '2.0.0'; 
let path = '';

function StrveRouter(routes){
    function routerView () {
        if (path) {
            return routerHash(path, routes);
        } else {
            if (location.hash) {
                const currentPath = getCurrentPath();
                return routerHash(currentPath, routes);
            } else {
                return routerHash(location.pathname, routes);
            }
        }
    
    }
    return {
        routerView
    }
}

function routerLink(pathData) {
    if (pathData) {
        if (typeof pathData === 'string') {
            window.location.href = `${getBaseUrl()}#${pathData}`;
            path = pathData;
        } else {
            if (pathData.query) {
                window.location.href = `${getBaseUrl()}#${pathData.path}?${formateObjToParamStr(pathData.query)}`;
            } else {
                window.location.href = `${getBaseUrl()}#${pathData.path}`;
            }
            path = pathData.path;
        }
    }
}

function routerHashUpdate(updateView, fn) {
    window.addEventListener('hashchange', () => {
        path = getCurrentPath();
        updateView(() => {
            if (typeof fn === 'function') {
                fn();
            }
        }, 'useRouter')
    }, false);
}

function go(n) {
    window.history.go(n);
}

function back() {
    window.history.go(-1);
}

function forward() {
    window.history.go(1);
}

function param2Obj() {
    const search = decodeURIComponent(location.href.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
        return {}
    }
    const obj = {};
    const searchArr = search.split('&');
    searchArr.forEach(v => {
        const index = v.indexOf('=');
        if (index !== -1) {
            const name = v.substring(0, index);
            const val = v.substring(index + 1, v.length);
            obj[name] = val;
        }
    })
    return obj
}

function strFilter(str) {
    str += '';
    str = str.replace(/%/g, '%25');
    str = str.replace(/\+/g, '%2B');
    str = str.replace(/ /g, '%20');
    str = str.replace(/\//g, '%2F');
    str = str.replace(/\?/g, '%3F');
    str = str.replace(/&/g, '%26');
    str = str.replace(/\=/g, '%3D');
    str = str.replace(/#/g, '%23');
    return str
}

function formateObjToParamStr(paramObj) {
    const sdata = [];
    for (let attr in paramObj) {
        sdata.push(`${attr}=${strFilter(paramObj[attr])}`);
    }
    return sdata.join('&')
}

function getCurrentPath() {
    return location.hash.indexOf('?') !== -1 ? location.hash.split('#')[1].split('?')[0] : location.hash.split('#')[1];
}

function getBaseUrl() {
    const href = window.location.href;
    const i = href.indexOf('#');
    const base = i >= 0 ? href.slice(0, i) : href;
    return `${base}`
}

function routerHash(path,routes) {
    for (let index = 0; index < routes.length; index++) {
        const item = routes[index];
        if (item.path === path) {
            return item.template()
        }
    }
}

export {
    StrveRouter,
    routerLink,
    routerHashUpdate,
    go,
    back,
    forward,
    param2Obj,
    strveRouterVersion
}