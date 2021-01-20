---
sidebar: auto
---

# Quick Start
## Installation
### Npm

- Install fontawesome
```shell
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @fortawesome/free-solid-svg-icons
```

### Usage

`src/main.js`
```vue
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
dom.watch();
```
