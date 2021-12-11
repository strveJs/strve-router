<p align="center">
  <a href="https://github.com/maomincoding/strve-router" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://maomincoding.github.io/strvejs-doc/logo.png" alt="Strve logo">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://npmjs.com/package/strve-router"><img src="https://badgen.net/npm/v/strve-router" alt="npm package"></a>
</p>
<br/>

# Strve Router

The official router for Strve.js.

## Introduce

Strve Router is the official route manager of Strve.js. It is deeply integrated with the core of Strve.js, making it easy to build single-page applications.

Currently only supports Hash mode.

## Started

The easiest way to try strve-router is to use the direct import CDN link. You can open it in your browser and follow the examples to learn some basic usage.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>StrveRouter</title>
</head>

<body>
    <div id="app"></div>
    <script type="module">
        import { Strve, render, updateView } from 'https://cdn.jsdelivr.net/npm/strvejs/dist/strve.esm.js';
        import StrveRouter from 'https://cdn.jsdelivr.net/npm/strve-router/dist/strve-router.esm.js';

        const state = {
            msg: 'Hello!'
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

        function Home() {
            return render`
                <div class='innter'>
                    <button onclick="${goAbout}">goAbout</button>
                    <h1>Home</h1>
                </div>
            `
        }

        function About() {
            return render`
                <div class="innter">
                    <button onclick="${goback}">goback</button>
                    <button onclick="${goHome}">goHome</button>
                    <h2>About</h2>
                </div>
            `
        }

        function App() {
            return render`
              <div class='inner'>
                <p>{state.msg}</p>
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
