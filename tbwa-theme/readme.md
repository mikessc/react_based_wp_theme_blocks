
# Wordpress Theme - TBWA.com

The purpose of this repository... is to house the Wordpress Theme to be used in conjunction with the TBWA Blocks Plugin for the TBWA.com website. 

It's very difficult to write instructions that cover all developer situations. If you see anything here that can be improved, **please** let david.colquhoun@tbwa.com know. 

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
> tbwacom/wp-content/themes/tbwa-theme/

## Download the files
From inside the Wordpress themes folder, clone the repository into a new folder called ***tbwa-theme*** 
> cd wp-content/themes/  
> gh repo clone DAN-AKL/wordpress-tbwa-theme  tbwa-theme

You should now have this folder structure:
>tbwacom/wp-content/themes/tbwa-theme/  
>tbwacom/wp-content/themes/tbwa-theme/readme.md  
>tbwacom/wp-content/themes/tbwa-theme/parts  
>tbwacom/wp-content/themes/tbwa-theme/src  
>tbwacom/wp-content/themes/tbwa-theme/templates  
.. etc  

##  Node Package Manager (NPM)

From inside the theme folder:
>tbwacom/wp-content/themes/tbwa-theme/

Install dependencies described in package.json:
>npm install

Watch for changes to the source files:
>npm run start

Build once from source:
>npm run build

## Wordpress admin
Log into your Wordpress Admin and activate the theme from the Appearance \> Themes page. 
> http://localhost:8000/wp-admin

## Theme anatomy

| File or Folder | Description |
| :--- | :--- |
| .gitignore | Ignores standard files and also the ***build*** and ***node_modules*** folders.  |
| build/ | Contains build files. There are .js and .css files for the admin and frontend. This folder is create by the ***npm run start*** or ***npm run build*** commands. |
| functions-***.php | These files contain the PHP code for the theme. This file is where Wordpress features are enabled/disabled. The build .js and .css files are enqueued by this file. | 
| index.php | Empty file required by Wordpress. |
| node_modules/ | NPM saves its downloaded packages here. This folder is created by the ***npm install*** command.  |
| package-lock.json | Automatically created by NPM. Describes what packages are installed in ***node_modules***. |
| package.json | Specifies which NPM packages this theme needs. |
| parts/ | Contains template parts. These are HTML files containing blocks that make up parts of the site, for example the header and footer. These are contents of these is in the database, the files are there as placeholders. |
| rea<span>dme<span>.md | This readme file. |
| screenshot.png | Image used as the theme preview in the Wordpress Admin. |
| src/ | The source .scss and .js files used to create the build files. |
| static/ | Static files, currently just the favicon files. |
| style.css | All themes must have this file.  Ideally put CSS into the files found in the src folder, and not this file. |
| templates/ | Page templates made up of template blocks and template parts. The contents of these is in the database. |
| theme.json | Required Wordpress file that contains theme settings used by the Wordpress Admin. |
| webpack.config.js | Webpack configuration file for processsing the source files into the build files. |






