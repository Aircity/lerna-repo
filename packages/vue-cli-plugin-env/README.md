# vue-cli-plugin-env-yaml

This is a vue-cli 3.x plugin to inject environment variables.

## Environment variables injection

env.yaml:

```
baseURL:
 DEV: dev.org 
 QA: qa.org 
 PRD: prd.org
```

npm run build

```
console.log(baseURL)
// => dev.org
```

npm run build:qa

```
console.log(baseURL)
// => qa.org
```

npm run build:prd

```
console.log(baseURL)
// => prd.org
```

## Getting started

:warning: Make sure you have vue-cli 3.x.x:

```
vue --version
```

If you don't have a project created with vue-cli 3.x yet:

```
vue create my-new-app
```

Navigate to the newly created project folder and add the cli plugin:

```
cd my-new-app
vue add @o3o/env-yaml
```

Start your app:

```
npm run serve
```
