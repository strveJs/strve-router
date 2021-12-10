export default class StrveRouter {
    constructor(routes) {
        this.routes = routes;
        this.path = null;
    }
    routerLink(path) {
        window.location.hash = `#${path}`;
        this.path = path;
    }
    routerHash(path){
        for (let index = 0; index < this.routes.length; index++) {
            const item = this.routes[index];
            if (item.path === path) {
                return item.template();
            }
        }
    }
    routerView() {
        const pathurl = this.path?this.path:location.hash ? location.hash.split('#')[1] : location.pathname;
        return this.routerHash(pathurl);
    }
    routerHashUpdate(updateView,fn){
        window.addEventListener('hashchange', ()=>{
            updateView(()=>{
                if(typeof fn === 'function'){
                    fn();
                }
            },'useRouter')
         }, false);
    }
}
