name: GCPa

on: 
  workflow_dispatch: 
  
  push:
    paths :
      - 'CICD/**'
      

jobs:

  build:
  
    runs-on: ubuntu-20.04
      
    steps:
    
    - name: Dowloading repository ... 
      uses: actions/checkout@v2
