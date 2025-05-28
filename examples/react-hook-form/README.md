# React App using react-hook-form

## Development
Using `npm link` is sensitive to React versions and will generate the following error if misconfigured:
<pre>
Warning: Invalid hook call.
</pre>

To link in dev versions of the libraries, do the following:

In this folder:
```shell
cd node_modules/react && npm link && cd ../..
cd node_modules/react-dom && npm link && cd ../..
```

In the top-level directory (containing node_modules), run the following.
```shell
npm link react react-dom
```
