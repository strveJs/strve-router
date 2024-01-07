declare const routerVersion: string;
declare function initRouter(routes: any[], resetView: Function): {
    view: () => any;
};
interface pathDataType {
    path: string;
    query: object;
}
declare function linkTo(pathData: string | pathDataType): void;
declare function go(n: number): void;
declare function back(): void;
declare function forward(): void;
interface objparse {
    [key: string]: string;
}
declare function toParse(): objparse;
export { initRouter, linkTo, go, back, forward, toParse, routerVersion };
