const routerVersion = '__VERSION__';
const global = {
    path: '',
    isMounted: false,
    _template: null,
};
function initRouter(routes, resetView) {
    if (typeof resetView === 'function') {
        window.addEventListener('hashchange', () => {
            global.path = getCurrentPath();
            global.isMounted = false;
            resetView();
        }, false);
    }
    function view() {
        if (global.path) {
            return routerHash(global.path, routes);
        }
        else {
            if (location.hash) {
                const currentPath = getCurrentPath();
                if (global.isMounted) {
                    return routerHash(currentPath, routes);
                }
                else {
                    return routerHash(currentPath, routes);
                }
            }
            else {
                if (location.pathname === '/index.html') {
                    return routerHash('/', routes);
                }
                return routerHash(location.pathname, routes);
            }
        }
    }
    return {
        view,
    };
}
function routerHash(path, routes) {
    for (let index = 0; index < routes.length; index++) {
        const item = routes[index];
        if (item.path === path) {
            if (global.isMounted) {
                return global._template();
            }
            global.isMounted = true;
            global._template = item.template;
            return global._template();
        }
    }
}
function isOrdinaryObject(obj) {
    return Object.prototype.toString
        .call(obj)
        .match(/\[object (.+?)\]/)[1]
        .toLowerCase();
}
function linkTo(pathData) {
    if (typeof pathData === 'string' || isOrdinaryObject(pathData) === 'object') {
        if (typeof pathData === 'string') {
            window.location.href = `${getBaseUrl()}#${pathData}`;
            global.path = pathData;
        }
        else {
            if (pathData.path && typeof pathData.path === 'string') {
                if (pathData.query) {
                    window.location.href = `${getBaseUrl()}#${pathData.path}?${formateObjToParamStr(pathData.query)}`;
                }
                else {
                    window.location.href = `${getBaseUrl()}#${pathData.path}`;
                }
                global.path = pathData.path;
            }
            else {
                console.error('[strve-router error]: the first parameter of function linkTo should have a param called path with string when it is an ordinary object');
            }
        }
    }
    else {
        console.error('[strve-router error]: the first parameter of function linkTo should be a string or a object');
    }
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
function toParse() {
    const search = decodeURIComponent(location.href.split('?')[1]).replace(/\+/g, ' ');
    if (!search) {
        return {};
    }
    const obj = {};
    const searchArr = search.split('&');
    searchArr.forEach((v) => {
        const index = v.indexOf('=');
        if (index !== -1) {
            const name = v.substring(0, index);
            const val = v.substring(index + 1, v.length);
            obj[name] = val;
        }
    });
    return obj;
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
    return str;
}
function formateObjToParamStr(paramObj) {
    const sdata = [];
    for (let attr in paramObj) {
        sdata.push(`${attr}=${strFilter(paramObj[attr])}`);
    }
    return sdata.join('&');
}
function getCurrentPath() {
    return location.hash.indexOf('?') !== -1
        ? location.hash.split('#')[1].split('?')[0]
        : location.hash.split('#')[1];
}
function getBaseUrl() {
    const href = window.location.href;
    const i = href.indexOf('#');
    const base = i >= 0 ? href.slice(0, i) : href;
    return `${base}`;
}
export { initRouter, linkTo, go, back, forward, toParse, routerVersion };
