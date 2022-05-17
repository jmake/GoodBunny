import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import TEST_COMPONENT from "./babylonScene.js"

class ComponentClass1 extends React.Component 
{
  render() 
  {
    return (<div> 

              <h2>
                Zavala-Ake JM 
              </h2>
                        
              <TEST_COMPONENT/>
            
            </div>
           ); 
  }
}


class ComponentClass2 extends React.Component 
{ 
  componentWillUnmount() 
  {
    alert("The component is about to be unmounted.");
  }

  constructor(props) 
  {
    super(props); 
    this.state = {account:0}; 
  }

  AddOne = () => 
  {
    this.setState({account : this.state.account+1});
  }

  render() 
  {
    const Property1 = "\"Property variable\"";
    const Property2 = {name: "Ford", model: "Mustang"};

    return(  
            <div>
               <ComponentClass1 arg1={Property1} arg2={Property2} />
            </div>  
          ); 
  }
}

// index.html ...  
const rootElement = document.getElementById("root");
ReactDOM.render(
                <StrictMode> <ComponentClass2/> </StrictMode>,
                rootElement
               );




/*
 + ReactDOM.render(HTML_code, HTML_element) displays the specified HTML_code inside the specified HTML_element 

                                                                         / <body>                  
   ReactDOM.render(<p>Hello</p>, document.getElementById('NAME'));     -|    <div id="NAME"></div>        
                                                                         \ </body>                    
 
 + REFERENCE :
   https://www.w3schools.com/react/default.asp
                                                                         
*/ 
