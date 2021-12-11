<p align="center">
  <a href="https://github.com/maomincoding/strve" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://maomincoding.github.io/strvejs-doc/logo.png" alt="Strve logo">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://npmjs.com/package/strvejs"><img src="https://badgen.net/npm/v/strvejs" alt="npm package"></a>
</p>
<br/>

# Strve Router

The official router for Strve.js.

## Introduce

Strve Router is the official route manager of Strve.js. It is deeply integrated with the core of Strve.js, making it easy to build single-page applications.

## Started

The easiest way to try `Strve.js` is to use the direct import CDN link. You can open it in your browser and follow the examples to learn some basic usage.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StrveRouter</title>
</head>

<body>
    <div id="app"></div>
    <script type="module">
        import { Strve, render, updateView } from 'https://cdn.jsdelivr.net/npm/strvejs/dist/strve.esm.js';
        import StrveRouter from '../src/hash/index.js';

        const state = {
            arr: ['1', '2'],
            isShow: false,
            isRed: false,
            msg: '1'
        };

        const strveRouter = new StrveRouter([{
            path: '/',
            template: Home
        }, {
            path: '/about',
            template: About
        }]);

        strveRouter.routerHashUpdate(updateView, () => {
            console.log(strveRouter.param2Obj());
        });

        function sub1() {
            return render`
                <div>
                    组件1
                </div>
            `
        }

        function sub2() {
            return render`
                <div>
                    组件2
                </div>
            `
        }

        function Home() {
            return render`
                <div class='innter121'>
                    <button onclick="${goAbout}" id="dd">goAbout</button>
                    <h1>Home</h1>
                    ${sub1()}
                    ${sub2()}
                </div>
            `
        }

        function About() {
            return render`
                <div class="innter11">
                    <button onclick="${goback}">goback</button>
                    <button onclick="${goHome}" id="ddd">goHome</button>
                    <h2>About</h2>
                </div>
            `
        }

        function App() {
            return render`
              <div class='inner'>
              
                ${strveRouter.routerView()}
              </div >
          `;
        }

        function goback() {
            strveRouter.back();
        }

        function goAbout() {
            console.log('goAbout');
            strveRouter.routerLink({
                path: '/about',
                query: {
                    id: 1,
                    name: "maomin"
                }
            });
        }

        function goHome() {
            console.log('goHome');
            strveRouter.routerLink('/');
        }

        Strve('#app', {
            data: { state },
            template: App
        });
    </script>
</body>

</html>
```
## Documentation

To learn more about Strve, check [its documentation](https://maomincoding.github.io/strvejs-doc/).

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present, maomincoding
