import { formateObjToParamStr } from '../utils/index.js'
export default class StrveRouter {
    constructor(routes) {
        this.routes = routes;
        this.path = '';
    }
    routerLink(pathData) {
        if (pathData) {
            if (typeof pathData === 'string') {
                window.location.hash = `#${pathData}`;
                this.path = pathData;
            } else {
                if(pathData.query){
                    window.location.hash = `#${pathData.path}?${formateObjToParamStr(pathData.query)}`;
                } else {
                    window.location.hash = `#${pathData.path}`;
                }
                this.path = pathData.path;
            }
        }
    }
    routerHash(path) {
        for (let index = 0; index < this.routes.length; index++) {
            const item = this.routes[index];
            if (item.path === path) {
                return item.template();
            }
        }
    }
    routerView() {
        if (this.path) {
            return this.routerHash(this.path);
        } else {
            if (location.hash) {
                const path = location.hash.indexOf('?') !== -1 ? location.hash.split('#')[1].split('?')[0] : location.hash.split('#')[1];
                return this.routerHash(path);
            } else {
                return this.routerHash(location.pathname);
            }
        }
    }
    routerHashUpdate(updateView, fn) {
        window.addEventListener('hashchange', () => {
            updateView(() => {
                if (typeof fn === 'function') {
                    fn();
                }
            }, 'useRouter')
        }, false);
    }
}
