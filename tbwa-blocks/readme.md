

# Wordpress Plugin - TBWA.com Blocks

The purpose of this repository... is to house the Wordpress Blocks Plugin to be used in conjunction with the TBWA Theme for the TBWA.com website.  The plugin adds custom blocks to Wordpress.

It's very difficult to write instructions that cover all developer situations. If you see anything here that can be improved, **please** let us know. 

## Separation of Theme and Blocks

There are infinite ways to structure a Wordpress site. 

For tbwa.com the **theme** defines typography, page transitions, smooth scroll, parallax, analytics... the parts of the site that surround the blocks.  And have a **plugin** that defines many blocks.  All content is made up of blocks, including page structure and navigation.  

The blocks are separate from the theme, so in theory the theme can be changed without breaking the block content. If we switch the theme to Wordpress's default block theme, Twenty Twenty-Two all of the sites block content should function correctly.  

If we took a single block out of the TBWA Blocks Plugin, and moved it to another Wordpress site, that block is expected to function correctly as a standalone block. 

We have not created a separate plugin for each block because we expect there to be 60 to 80 custom blocks.  There will be additional plugins needed for specific functionality, like languages, or to minify/concatenate the enqueued scripts. 

## Wordpress environment 
See the suggested Wordpress Development Environment here:
> https://github.com/DAN-AKL/wordpress-dev-env  

It uses Docker to very quickly spin up a database, a web server, and Wordpress. 

## Project folder
All of the theme files live within the themes folder inside Wordpress.
> tbwacom/wp-content/plugins/tbwa-blocks/

## Download the files
From inside the Wordpress plugin folder, clone the repository into a new folder called ***tbwa-blocks*** 
> cd wp-content/plugins/  
> gh repo clone DAN-AKL/wordpress-tbwa-blocks  tbwa-blocks

You should now have this folder structure:
>tbwacom/wp-content/plugins/tbwa-blocks/  
>tbwacom/wp-content/plugins/tbwa-blocks/readme.md  
>tbwacom/wp-content/plugins/tbwa-blocks/src/  
>tbwacom/wp-content/plugins/tbwa-blocks/tbwa-blocks.php  
.. etc  

##  Node Package Manager (NPM)

From inside the plugin folder:
>tbwacom/wp-content/plugins/tbwa-blocks/

Install dependencies described in package.json:
>npm install

Watch for changes to the source files:
>npm run start

Build once from source:
>npm run build

Update Wordpress dependencies to the latest:
>npm run packages-update

## Wordpress admin
Log into your Wordpress Admin and activate the plugin from the Plugins page. Now when you edit a page you will see new blocks in the list of blocks. 
> http://localhost:8000/wp-admin

## Plugin anatomy

| File or Folder | Description |
| :----- | :--- |
| .gitignore | Ignores standard files and also the ***build*** and ***node_modules*** folders.  |
| build/ | Contains build files. Each block has a separate folder inside this folder.  See below for a description of the source and build files that make up each block. |
| dynamic_blocks/ | Some blocks have their DOM created by PHP instead of React. They are added by tbwa-blocks.php  See below for a description of the source and build files that make up each block. |
| node_modules/ | NPM saves its downloaded packages here. This folder is created by the ***npm install*** command.  |
| package-lock.json | Automatically created by NPM. Describes what packages are installed in ***node_modules***. |
| package.json | Specifies which NPM packages this theme needs. |
| postcss.config.js | Config file for Post CSS, used to disable the grid auto-prefixer. |
| rea<span>dme<span>.md | This readme file. |
| src/ | The source .js and .scss files. Each block has a separate folder inside this folder.  See below for a description of the source and build files that make up each block. |
| src/index.js | This is used as an entry point for the build process.  The blocks are imported into this file, and then registered with Wordpress |
| static/ | Static files that do not need to be compiled, currently used tof the map found on the contact page. |
| svgo.config.js | Config file for how react includes SVG files. |
| tbwa-blocks.php | Registers the blocks with Wordpress. |
| webpack.config.js | Overrides Wordpress's default WebPack config settings. |


## Block source files

Each block has a source folder:
>tbwa-blocks/src/block-name/

Inside a blocks source folder are the following files.  These file names are the standard Wordpress convention, they are named this way for historic compatibility reasons. 

| File | Description |
| :----- | :--- |
| block.json | Wordpress settings for this block, including which .js and .css build files this block uses. |
| index.js | Entry point for the build process. This file imports **edit.js** and **save.js**, and registers the block with Wordpress. |
| edit.js | The edit function that returns the DOM to be used for this block in the Wordpress Admin. |
| save.js | The save function that returns the HTML string to be saved in the database, and displayed on the frontend of the site. |
| editor.scss | Admin only scss. |
| style.scss | Frontend and admin scss.  |
| frontend.js | Frontend only JavaScript.  Most blocks will not need frontend  JavaScript. |

## Block build files 

Each block has a build folder:
>tbwa-blocks/build/block-name/

JavaScript and CSS source maps (.map) are created for all of the build files.  In a production environment Wordpress will remove comments, concatenate and minify the .js and .css files removing the source maps.  

Inside a blocks build folder are the following files. These file names are the standard Wordpress convention, they are named this way for historic compatibility reasons. 

| File | Description |
| :----- | :--- |
| block.json | Wordpress settings for this block, including which .js and .css build files this block uses. |
| index.js | Admin JavaScript including the edit and save functions. |
| index.asset.php | Registers admin dependencies with Wordpress. |
| index.css | Admin only css. |
| style-index.css | Frontend and admin css. |
| frontend.js | Frontend only JavaScript. Most blocks will not need frontend JavaScript. |
| frontend.asset.php | Registers frontend dependencies with Wordpress. |


## Touch points for adding a new block 

1. Duplicate an existing block folder within the ***tbwa-blocks/src/*** folder. The folder name is the blocks name/handle/slug. It must be in [kebab case](http://wiki.c2.com/?KebabCase).  

2. Set the blocks name, title and description here:
    > tbwa-blocks/src/block-name/block.json  
   
3. Replace the blocks name in the following source files:
    > tbwa-blocks/src/block-name/editor.scss  
    > tbwa-blocks/src/block-name/index.js  
    > tbwa-blocks/src/block-name/style.scss  

4. Add a new line to this file to import the block:
    > tbwa-blocks/src/index.js  

5. Register the block with Wordpress by following the comments in this file: 
    > tbwa-blocks/tbwa-blocks.php   

6. Run `npm run start` 

7. In the Wordpress admin you should now be able edit a page, and add your new block.  Save the page. And your new block should be visible on the site frontend. 

**Be careful with the block name, it's used in many places and common mistakes will be a typo with the block name, or missing a place where the block name needs to be replaced.**




