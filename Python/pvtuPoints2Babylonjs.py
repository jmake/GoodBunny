import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

import sys
sys.path.insert(0,"/home/jovyan/work/Python")
import vtk_tools 

import glob 
import vtk 
import re
import numpy as np  

vtk_tools.VtkWarning("pvtuPoints2Babylonjs.log")
#--------------------------------------------------------------------------||--#
#--------------------------------------------------------------------------||--#
CUSTOM_MESH_JS = """/* 
  USE :
    import {GetMeshXXX} from "./pvtuPoints2Babylonjs.js"
*/ 
import * as BABYLON from  "@babylonjs/core";

export function GetMeshXXX(scene)
{
  // 
  var pbr           = new BABYLON.PBRSpecularGlossinessMaterial("pbr", scene);
  pbr.diffuseColor  = new BABYLON.Color3(0.750, 0.25, 0.20);
  pbr.glossiness    = 0.4; 

  var Mesh      = new BABYLON.Mesh("custom", scene);
  Mesh.material = pbr;

  var positions  = [\n%s\n] 
  var normals    = [\n%s\n]  
  var indices    = [\n%s\n] 
    
  var vertexData       = new BABYLON.VertexData();
  vertexData.positions = positions; 
  vertexData.normals   = normals; 
  vertexData.indices   = indices;  
  vertexData.applyToMesh(Mesh);

  //Mesh.rotation = new BABYLON.Vector3(0.0, 3.14159, 0.0);   
  Mesh.scaling = new BABYLON.Vector3(1.0,1.0,1.0);
  return Mesh; 
}
"""

CUSTOM_PARTICLES_JS = """
""" 

#--------------------------------------------------------------------------||--#
import argparse
parser = argparse.ArgumentParser()
parser.add_argument('--fin', help='foo help')
parser.add_argument('--fout', help='foo help')
args = parser.parse_args()

print("fin:'%s'"% args.fin)
print("fout:'%s'"% args.fout)

#--------------------------------------------------------------------------||--#
Files = args.fin #"bunny_orig.obj"
Files = sorted(glob.glob(Files)) ; #print( Files )
Files = Files[::]  

TimeSeries = [] 
 
for ifin,fin in enumerate(Files) : 
  numbers = vtk_tools.GetNumbersFromString( fin )#; print( numbers )
  #step    = int(numbers[-1])

  ## X.1. 
  Vtp    = vtk_tools.Reader(fin); 
  Vtp    = vtk_tools.GetPolyDataNormals(Vtp, Flip=True) 
  Vtp    = vtk_tools.Transform(Vtp,Scale=[0.15,0.15,0.15])
  Vtp    = vtk_tools.Transform(Vtp,Translate=[0,1.0,0.0])

  ## X.1. 
  Props   = vtk_tools.GetPointData(Vtp.GetPointData()) 
  Normals = Props.get('Normals',[])  

  Coords  = vtk_tools.GetCoords(Vtp)
  Coords  = Coords.astype("float32") 
  nCoords = len(Coords)
 
  ## X.1. 
  Cells = vtk_tools.GetCellsList(Vtp)
  Trias = Cells[0]
  Trias = np.array(Trias).astype("uint32")  # uint8 -> UNSIGNED_BYTE, uint32 -> UNSIGNED_INT  
  if len(Trias):  
    assert( np.amax(Trias) < (1 << 32) )
    print( "\tnCoords", Coords.shape, "nTrias:", Trias.shape  )

    ## X.1. 
    Coords  = ",".join(["%f" % f for f in  Coords.flatten()]) ; #print( Coords )  
    Normals = ",".join(["%f" % f for f in Normals.flatten()]) ; #print( Normals )  
    Trias   = ",".join(["%d" % d for d in   Trias.flatten()]) ; #print( Trias )  
    CUSTOM_JS =  CUSTOM_MESH_JS %(Coords,Normals,Trias) 
  else : 
    CoordsText = ["[%s]" % ",".join(["%f" % c for c in C]) for C in Coords ]  
    CoordsText = ",".join(CoordsText)      
    CUSTOM_JS = CUSTOM_PARTICLES_JS % (nCoords,CoordsText) 

  #fout = open("pvtuPoints2Babylonjs.js", "w")
  #fout = "fromVTK.js"
  fout = args.fout
  fout = open(fout,"w")
  fout.write(CUSTOM_JS)
  fout.close() 


#--------------------------------------------------------------------------||--#
