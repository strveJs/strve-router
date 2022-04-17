## 2.1.0 (2022-04-17)

### Features

- Modify API:

  | Old API              | New API         |
  | -------------------- | --------------- |
  | `strveRouterVersion` | `routerVersion` |
  | `StrveRouter`        | `initRouter`    |
  | `param2Obj`          | `toParse`       |
  | `routerLink`         | `linkTo`        |

- Remove API `routerHashUpdate`;
- TypeScript refactoring code;

## 2.0.4 (2022-02-26)

### Features

- Update `routerLink` API;
- Fix the first time the local server opens the path `/index.html` is blank;
- Support data initialization operation (cache strategy will be adopted by default when using route to switch pages, if you don't want to use cache, you need to clear the data changed by the current view);
