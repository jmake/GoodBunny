
BUILDING()
{
  rm -rf $BUILD
  mkdir $BUILD
  cd $BUILD
  cp -r ../ReactJS/* . 

  ls
  pwd

  node --version 
  npm --version  
}


GET_PACKAGEJSON() 
{ 
  ## INIT 
  rm -rf package* 
  rm -rf node_modules 

  ## SET UP   
  npm init -y

  ## REACT 
  npm install --save-dev react-dom@16.14.0  

  ## BABYLON
  ## import * as BABYLON from 'babylonjs';
  npm install --save-dev babylonjs@5.4.0 

  ## import * as BABYLON from '@babylonjs/core/Legacy/legacy';
  npm install --save-dev  @babylonjs/core@5.4.0 

  ## import SceneComponent from 'babylonjs-hook';
  npm install --save-dev babylonjs-hook@0.1.1  
 
  ## BABEL 
  npm install --save-dev babel-loader@8.2.2 @babel/core@7.15.5   
  npm install --save-dev @babel/plugin-proposal-class-properties@7.14.5  
  npm install --save-dev @babel/preset-react@7.14.5

  ## WEBPACK 
  npm install --save-dev webpack@5.56.0
  npm install --save-dev webpack-cli@4.8.0

  npm install --save-dev ci@2.2.0

  ls package*
} 


GETFROMVTK()
{
  python ../Python/pvtuPoints2Babylonjs.py \
    --fin=../Bunny/bunny_orig.obj \
    --fout=src/fromVTK.js 
}


RUNNER()
{
  ##ReInit  
  #npx ci                          # Input:package*;  Output:node_modules   

  cp dotbabelrc .babelrc 

  npx webpack --mode development

  ls dist/bundle.js 

  python ../Python/join.py 

  cp index.html .. 
} 



###
BUILD=BUILD5  
BUILDING

### node_modules package* ->  
GET_PACKAGEJSON 

### fromVTK.js -> 
GETFROMVTK

### bundle.js -> 
RUNNER 

#
# open index.html
# jupyter server list
# http://localhost:10000/?token=TOKEN_CODE
#
