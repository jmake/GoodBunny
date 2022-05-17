import React from "react"; // ?? 
import SceneComponent from 'babylonjs-hook'; 
import * as BABYLON from  "@babylonjs/core";
import {GetMeshXXX} from "./fromVTK.js"
//import "./App.css";

var SceneType02a = function (scene) 
{
   scene.createDefaultCameraOrLight(true, true, true);
   scene.activeCamera.useAutoRotationBehavior = true;
   scene.lights[0].dispose();
   scene.activeCamera.setTarget( new BABYLON.Vector3(0, 1.2, 0) );
   scene.activeCamera.setPosition(new BABYLON.Vector3(-0.75, 1.125, -0.75));
   scene.activeCamera.defaultElevation = 0.5 
   scene.activeCamera.zoomStopsAnimation = false

   var light = new BABYLON.HemisphericLight("hemi", BABYLON.Vector3.Up());
   light.intensity = 0.75;

   var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);
   light.intensity = 0.25;
    
   var generator  = new BABYLON.ShadowGenerator(512, light);
   generator.useBlurExponentialShadowMap = true;
   generator.blurKernel = 32;

   for(var i = 0; i < scene.meshes.length; i++) generator.addShadowCaster(scene.meshes[i]);   
   
   var helper = scene.createDefaultEnvironment({
      enableGroundMirror: true,
      groundShadowLevel: 1.0,
   });  
   helper.setMainColor(BABYLON.Color3.Black());
}


var GetCustomMesh = function(scene) 
{
  // 
  var pbr           = new BABYLON.PBRSpecularGlossinessMaterial("pbr", scene);
  pbr.specularColor = new BABYLON.Color3(0.750, 0.25, 0.20);
  pbr.glossiness    = 0.4; 

  var Mesh      = new BABYLON.Mesh("custom", scene);
  Mesh.material = pbr;
  
  var vertexData       = new BABYLON.VertexData();
  vertexData.positions = [-5, 2, -3, -7, -2, -3, -3, -2, -3, 5, 2, 3, 7, -2, 3, 3, -2, 3];
  vertexData.indices   = [0, 1, 2, 3, 4, 5];    
  //vertexData.normals   = []; 
  vertexData.applyToMesh(Mesh);
  return Mesh; 
}


var GetCubeMesh = function(scene) 
{
  //
  var pbr             = new BABYLON.PBRSpecularGlossinessMaterial("pbr", scene);
  pbr.diffuseColor    = new BABYLON.Color3(0.750, 0.25, 0.20);
  pbr.glossiness      = 0.4;  

  //
  var Mesh        = BABYLON.MeshBuilder.CreateBox("box", {size:0.5}, scene);
  Mesh.material   = pbr;
  Mesh.position.y = 1.15;
  return Mesh; 
}


const CreateBasicScene01a = function(scene)
{
  const canvas = scene.getEngine().getRenderingCanvas();

  var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  //camera.setPosition(new BABYLON.Vector3(0, 5, -30));
  camera.attachControl(canvas, true);

  var light  = new BABYLON.DirectionalLight("hemi", new BABYLON.Vector3(0, 0, 1), scene);
  light.intensity = 1.0;

  // --> 
  //var cube = GetCubeMesh(scene); 
  //var custom = GetCustomMesh(scene);
  //var body = GetBodyMesh(scene); 
  //var sneeze = GetSneezeMesh(scene);
  var xxx = GetMeshXXX(scene);
  // <-- 
};


	// show axis
  var showAxis = function(scene, size) 
  {
    var axisX = BABYLON.Mesh.CreateLines("axisX", [ 
                                                    new BABYLON.Vector3.Zero(), 
                                                    new BABYLON.Vector3(size, 0, 0), 
                                                    new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
                                                    new BABYLON.Vector3(size, 0, 0), 
                                                    new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
                                                  ], 
                                        scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);

    var axisY = BABYLON.Mesh.CreateLines("axisY", [
                                                    new BABYLON.Vector3.Zero(), 
                                                    new BABYLON.Vector3(0, size, 0), 
                                                    new BABYLON.Vector3( -0.05 * size, size * 0.95, 0), 
                                                    new BABYLON.Vector3(0, size, 0), 
                                                    new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
                                                  ], 
                                        scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);

    var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
                                                    new BABYLON.Vector3.Zero(), 
                                                    new BABYLON.Vector3(0, 0, size), 
                                                    new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
                                                    new BABYLON.Vector3(0, 0, size), 
                                                    new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
                                                ], 
                                        scene);
    axisZ.color = new BABYLON.Color3(0, 0, 1);

};


var GetWebm = function(scene) 
{
  var Engine = scene.getEngine()
  var deltaTimeInMillis = Engine.getDeltaTime();

  if (BABYLON.VideoRecorder.IsSupported(Engine)) 
  {
    var recorder = new BABYLON.VideoRecorder(Engine);
    recorder.startRecording("bunny.webm",30);  
  }

}

const onSceneReady = function(scene)
{
  showAxis(scene,3);
  SceneType02a(scene)
  CreateBasicScene01a(scene); 
  GetWebm(scene); 
} 


const onRender = function(scene)
{
  var deltaTimeInMillis = scene.getEngine().getDeltaTime();
};


export default () => 
(
  <div>
    <SceneComponent 
      antialias 
      onSceneReady={onSceneReady} 
      onRender={onRender} 
      id="my-canvas" />
  </div>
);
