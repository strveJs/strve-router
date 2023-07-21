declare const routerVersion: string;
declare function initRouter(routes: any[], setData: Function, fn: Function): {
    view: () => any;
};
declare function isOrdinaryObject(obj: object): void;
interface pathDataType {
    path: string;
    query: object;
}
declare function linkTo(pathData: string | pathDataType, fn: Function): void;
declare function go(n: number): void;
declare function back(): void;
declare function forward(): void;
interface objparse {
    [key: string]: string;
}
declare function toParse(): objparse;
export { initRouter, isOrdinaryObject, linkTo, go, back, forward, toParse, routerVersion };
