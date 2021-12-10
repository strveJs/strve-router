export default class StrveRouter {
    constructor(routes, updateView) {
        this.routes = routes;
        this.path = null;
        this.updateView = updateView;
        this.routerHashUpdate();
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
    routerHashUpdate(fn){
        window.addEventListener('hashchange', ()=>{
            this.updateView(()=>{
                if(typeof fn === 'function'){
                    fn();
                }
            },'useRouter')
         }, false);
    }
}
