import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const styles={
  checkbox: {
    marginBottom:10,
    padding:0,
 
  }
};


class CheckboxGroup extends React.Component {
  constructor(props){
       super(props);

       if (props.getCheckedBoxes){
      props.getCheckedBoxes(this.getCheckedBox.bind(this));
    }
    

    this.updateCheck=this.updateCheck.bind(this);
       this.state={
        disable:false,
        checkboxes:[],
        roomCode: { 
                    '3101':false, '3102':false, '3103':false, '3104':false, '3105':false,
                    '3201':false, '3202':false, '3203':false, '3204':false, '3205':false, 
                    '3301':false, '3302':false, '3303':false, '3304':false, '3305':false, 
                    '3401':false, '3402':false, '3403':false, '3404':false, '3405':false, 
                    '5101':false, '5102':false, '5103':false, '5104':false, '5105':false, 
                    '5106':false, '5107':false, '5108':false, '5109':false, '5201':false, 
                    '5202':false, '5203':false, '5204':false, '5205':false, '5206':false, 
                    '5207':false, '5208':false, '5209':false, '5301':false, '5302':false, 
                    '5303':false, '5304':false, '5305':false, '5306':false, '5307':false, 
                    '5308':false, '5309':false, '5401':false, '5402':false, '5403':false, 
                    '5404':false, '5405':false, '5406':false, '5407':false,' 5408':false, 
                    '5409':false,   
                  },
        roomStatus: this.props.a
       }
      }
     getCheckedBox(){
      this.props.sendData(this.state.roomCode);
    }
    updateCheck(b,s) {
      let x=(b)+(s);
      let arr = this.state.roomCode
      arr[x] = !arr[x]
      this.setState({roomCode:arr})
      console.log(arr);
    };


       render(){
     
        var self=this;
        switch(this.props.b){
            case "3":  {var f=[1,2,3,4,5]} 
                          return(

                                  <div className="Row" style={{display:"flex",flexDirection:"row",padding:0}}>
                                  <table>
                                    {f.map(function(f,index){
                                      return <div key={index}> <tr> 
                                                  <td> <Checkbox  id="1" labelPosition="left"  
                                                     label={f + "01"} 
                                                     style={{display: self.state.roomStatus[self.props.b+f+"01"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"01"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"01")}
                                                     checked={self.state.roomCode[self.props.b+f+"01"]}
                                                   
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "02"} 
                                                     style={{display: self.state.roomStatus[self.props.b+f+"02"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"02"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"02")}
                                                     checked={self.state.roomCode[self.props.b+f+"02"]}
                                                     
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "03"} 
                                                     style={{display: self.state.roomStatus[self.props.b+f+"03"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"03"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"03")}
                                                     checked={self.state.roomCode[self.props.b+f+"03"]}
                                             
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "04"} 
                                                     style={{display: self.state.roomStatus[self.props.b+f+"04"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"04"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"04")}
                                                     checked={self.state.roomCode[self.props.b+f+"04"]}
                                         
                                                    /> 
                                                    </td>
                                                     <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "05"} 
                                                     style={{display: self.state.roomStatus[self.props.b+f+"05"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"05"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"05")}
                                                     checked={self.state.roomCode[self.props.b+f+"05"]}
                                                    
                                                    /> 
                                                    </td>
                                              </tr>
                                            </div>
                                  })}
                                 </table>
                                 </div> 
                       );
            case "5":{   var f=[1,2];}
                          return(

                                  <div className="Row" style={{display:"flex",flexDirection:"row",padding:0}}>
                                  <table>
                                    {f.map(function(f,index){
                                      return <div key={index}> <tr > 
                                                  <td> <Checkbox id="1" labelPosition="left"  
                                                     label={f + "01"} 
                                                     style={{display: self.state.roomStatus[self.props.b+f+"01"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"01"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"01")}
                                                     checked={self.state.roomCode[self.props.b+f+"01"]}
                                                     
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "02"} 
                                                     style={{display: self.state.roomStatus[self.props.b+f+"02"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"02"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"02")}
                                                     checked={self.state.roomCode[self.props.b+f+"02"]}
                                                  
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "03"} 
                                                    style={{display: self.state.roomStatus[self.props.b+f+"03"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"03"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"03")}
                                                     checked={self.state.roomCode[self.props.b+f+"03"]}
                                              
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "04"} 
                                                   style={{display: self.state.roomStatus[self.props.b+f+"04"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"04"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"04")}
                                                     checked={self.state.roomCode[self.props.b+f+"04"]}
                                                     hidden={self.state.roomStatus[self.props.b+f+"04"]}
                                                    /> 
                                                    </td>
                                                     <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "05"} 
                                                   style={{display: self.state.roomStatus[self.props.b+f+"05"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"05"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"05")}
                                                     checked={self.state.roomCode[self.props.b+f+"05"]}
                                                
                                                    /> 
                                                    </td>
                                                     <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "06"} 
                                                    style={{display: self.state.roomStatus[self.props.b+f+"06"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"06"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"06")}
                                                     checked={self.state.roomCode[self.props.b+f+"06"]}
                                                   
                                                    /> 
                                                    </td>
                                                  </tr>
                                                   <tr>
                                                   <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "07"} 
                                                     style={{display: self.state.roomStatus[self.props.b+f+"07"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"07"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"07")}
                                                     checked={self.state.roomCode[self.props.b+f+"07"]}
                                                     
                                                  /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "08"} 
                                                    style={{display: self.state.roomStatus[self.props.b+f+"08"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"08"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"08")}
                                                     checked={self.state.roomCode[self.props.b+f+"08"]}
                                                  
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "09"} 
                                                      style={{display: self.state.roomStatus[self.props.b+f+"09"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[self.props.b+f+"09"]}
                                                     onCheck={ () => self.updateCheck(self.props.b,f+"09")}
                                                     checked={self.state.roomCode[self.props.b+f+"09"]}
                                                
                                                    /> 
                                                  </td>
                                                  </tr>
                                             </div>
                                  })}
                                 </table>
                                 </div> 
                     );

            

            default: console.log('invalid building')
                }
              }
 }           
CheckboxGroup.propTypes={
        b:React.PropTypes.string,
        a: React.PropTypes.object,
        sendData: React.PropTypes.object
       }
       


export default CheckboxGroup;