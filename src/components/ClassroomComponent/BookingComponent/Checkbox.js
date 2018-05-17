import React from 'react';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

const styles={
  checkbox: {
    marginBottom:10,
    padding:0,
 
  }
};
  var ab5="5"
  var nlh="3"

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
                    '3501':false, '3502':false, '3503':false, '3504':false, '3505':false, 
                    '5101':false, '5102':false, '5103':false, '5104':false, '5105':false, 
                    '5106':false, '5107':false, '5108':false, '5109':false, '5201':false, 
                    '5202':false, '5203':false, '5204':false, '5205':false, '5206':false, 
                    '5207':false, '5208':false, '5209':false  
                  },
        roomStatus: this.props.a
       }
      }
    
    updateCheck(b,s) {
    
      let x=(b)+(s);
      let arr = this.state.roomCode
      arr[x] = !arr[x]
      this.setState({roomCode:arr})
      this.props.handlerFromParent(Object.values(arr));
    };


       render(){
                         var self=this;
                         var f=[1,2,3,4,5]
                         var e=[1,2]
                          return(<div>
                                  <h6> NLH </h6>
                                  <div className="Row" style={{display:"flex",flexDirection:"row",padding:0}}>
                                  <table>
                                    {f.map(function(f,index){
                                      return <div key={index}> <tr> 
                                                  <td> <Checkbox  id="1" labelPosition="left"  
                                                     label={f + "01"} 
                                                     style={{display: self.state.roomStatus[nlh+f+"01"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[nlh+f+"01"]}
                                                     onCheck={ () => self.updateCheck(nlh,f+"01")}
                                                     checked={self.state.roomCode[nlh+f+"01"]}
                                                   
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "02"} 
                                                     style={{display: self.state.roomStatus[nlh+f+"02"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[nlh+f+"02"]}
                                                     onCheck={ () => self.updateCheck(nlh,f+"02")}
                                                     checked={self.state.roomCode[nlh+f+"02"]}
                                                     
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "03"} 
                                                     style={{display: self.state.roomStatus[nlh+f+"03"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[nlh+f+"03"]}
                                                     onCheck={ () => self.updateCheck(nlh,f+"03")}
                                                     checked={self.state.roomCode[nlh+f+"03"]}
                                             
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "04"} 
                                                     style={{display: self.state.roomStatus[nlh+f+"04"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[nlh+f+"04"]}
                                                     onCheck={ () => self.updateCheck(nlh,f+"04")}
                                                     checked={self.state.roomCode[nlh+f+"04"]}
                                         
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={f + "05"} 
                                                     style={{display: self.state.roomStatus[nlh+f+"05"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[nlh+f+"05"]}
                                                     onCheck={ () => self.updateCheck(nlh,f+"05")}
                                                     checked={self.state.roomCode[nlh+f+"05"]}
                                                    
                                                    /> 
                                                  </td>
                                              </tr>
                                            </div>
                                  })}
                                 </table>
                                 </div> 

                                 <h6> AB5 </h6>
                                 <div className="Row" style={{display:"flex",flexDirection:"row",padding:0}}>
                                  <table>
                                    {e.map(function(e,index){
                                      return <div key={index}> <tr > 
                                                  <td> <Checkbox id="1" labelPosition="left"  
                                                     label={e + "01"} 
                                                     style={{display: self.state.roomStatus[ab5+e+"01"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[ab5+e+"01"]}
                                                     onCheck={ () => self.updateCheck(ab5,e+"01")}
                                                     checked={self.state.roomCode[ab5+e+"01"]}
                                                     
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={e + "02"} 
                                                     style={{display: self.state.roomStatus[ab5+e+"02"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[ab5+e+"02"]}
                                                     onCheck={ () => self.updateCheck(ab5,e+"02")}
                                                     checked={self.state.roomCode[ab5+e+"02"]}
                                                  
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={e + "03"} 
                                                    style={{display: self.state.roomStatus[ab5+e+"03"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[ab5+e+"03"]}
                                                     onCheck={ () => self.updateCheck(ab5,e+"03")}
                                                     checked={self.state.roomCode[ab5+e+"03"]}
                                              
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={e + "04"} 
                                                   style={{display: self.state.roomStatus[ab5+e+"04"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[ab5+e+"04"]}
                                                     onCheck={ () => self.updateCheck(ab5,e+"04")}
                                                     checked={self.state.roomCode[ab5+e+"04"]}
                                                     hidden={self.state.roomStatus[ab5+e+"04"]}
                                                    /> 
                                                    </td>
                                                     <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={e + "05"} 
                                                   style={{display: self.state.roomStatus[ab5+e+"05"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[ab5+e+"05"]}
                                                     onCheck={ () => self.updateCheck(ab5,e+"05")}
                                                     checked={self.state.roomCode[ab5+e+"05"]}
                                                
                                                    /> 
                                                    </td>
                                                  </tr>
                                                   <tr>
                                                     <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={e + "06"} 
                                                    style={{display: self.state.roomStatus[ab5+e+"06"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[ab5+e+"06"]}
                                                     onCheck={ () => self.updateCheck(ab5,e+"06")}
                                                     checked={self.state.roomCode[ab5+e+"06"]}
                                                   
                                                    /> 
                                                    </td>
                                                   <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={e + "07"} 
                                                     style={{display: self.state.roomStatus[ab5+e+"07"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[ab5+e+"07"]}
                                                     onCheck={ () => self.updateCheck(ab5,e+"07")}
                                                     checked={self.state.roomCode[ab5+e+"07"]}
                                                     
                                                  /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={e + "08"} 
                                                    style={{display: self.state.roomStatus[ab5+e+"08"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[ab5+e+"08"]}
                                                     onCheck={ () => self.updateCheck(ab5,e+"08")}
                                                     checked={self.state.roomCode[ab5+e+"08"]}
                                                  
                                                    /> 
                                                  </td>
                                                  <td>
                                                    <Checkbox id="1" labelPosition="left"  
                                                     label={e + "09"} 
                                                      style={{display: self.state.roomStatus[ab5+e+"09"]? 'none' : 'styles.checkbox'}}
                                                     disabled={self.state.roomStatus[ab5+e+"09"]}
                                                     onCheck={ () => self.updateCheck(ab5,e+"09")}
                                                     checked={self.state.roomCode[ab5+e+"09"]}
                                                
                                                    /> 
                                                  </td>
                                                  </tr>
                                             </div>
                                  })}
                                 </table>
                                 </div> 

                                 </div>
                       );
      
                     

              }
 }           
CheckboxGroup.propTypes={
      
        a: React.PropTypes.object,
        handlerFromParent: React.PropTypes.function
       }
       


export default CheckboxGroup;