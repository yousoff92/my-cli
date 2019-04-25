# my-cli

## Introduction 

You can create your custom CLI using this program structure.

## Prequisite 

This program tested ok by using this version :
- npm 6.7.0
- node v11.14.0

## Getting Started 

1. Install in your local
```
npm install -g
```

2. Modify constant.js (if any)
3. Then you can now use `my` command in your terminal.
4. Try execute `my -h` for available commands.


## Adding new commands

1. Follow this structure :

- components
  - module_name_1
    - module_name_1.js
  - module_name_2
    - module_name_2.js
    
2. The module_name_1.js structure must follow base.js    
