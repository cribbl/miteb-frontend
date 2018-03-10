import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const styles={
  checkbox: {
    marginBottom:10,
    padding:0

  }
};


class CheckboxGroup extends React.Component {
  constructor(props){
       super(props);
    this.updateCheck=this.updateCheck.bind(this);
       this.state={
        disable:false,
        checkboxes:[],
        roomCode: {'0101':false, '0102':false, '0103':false, '0104':false, '0105':false, '0106': false,
                  '0107':false, '0108': false, '0108':false, '0109':false
                  },
        roomStatus: this.props.a
       }
      }
    updateCheck(b,s) {
      let x=(b)+(s);
      console.log(this.state.roomCode[x]);
      let arr = this.state.roomCode
      arr[x] = !arr[x]
      this.setState({roomCode:arr})
    };
 

      checkDisable(b,s,a) {
        console.log(b,s);
        console.log(a);
        
        //updates available list array for every room code such that end date is over (?)
        //check for availability by checking room code against available rooms array
        //if available, push to available array and return false.
        //if not available, return true.
        return false;
          
       };
      

       render(){

        switch(this.props.b){
            case "5": return(<div className="Row" style={{display:"flex",flexDirection:"row",padding:"0"}}>
                      <table>
                      <tr>
                      <td>
                        <Checkbox id="1" labelPosition="left"  
                         label={this.props.n + "01" + " "} 
                         style={styles.checkbox}
                         disabled={this.state.roomStatus[this.props.b+this.props.n+"01"]}
                         onCheck={ () => this.updateCheck(this.props.b,this.props.n+"01")}
                         checked={this.state.roomCode[this.props.b+this.props.n+"01"]}
                        />
                      </td>
                      <td>
                        <Checkbox id="2" labelPosition="left"
                        label={this.props.n + "02"}
                        style={styles.checkbox}
                        disabled={this.state.roomStatus[this.props.b+this.props.n+"02"]}
                        onCheck={ () => this.updateCheck(this.props.b,this.props.n+"02")}
                        checked={this.state.roomCode[this.props.b+this.props.n+"02"]}
                         />    
                      </td>
                       <td>
                        <Checkbox id="3" labelPosition="left" 
                        label={this.props.n + "03"}
                        style={styles.checkbox}
                        disabled={this.state.roomStatus[this.props.b+this.props.n+"03"]}
                        onCheck={ () => this.updateCheck(this.props.b,this.props.n+"03")}
                        checked={this.state.roomCode[this.props.b+this.props.n+"03"]}
                        />
                      </td>
                       <td>
                        <Checkbox id="4" labelPosition="left"
                        label={this.props.n + "04"}
                        style={styles.checkbox}
                         disabled={this.checkDisable(this.props.b,this.props.n+"04")}
                         onCheck={ () => this.updateCheck(this.props.b,this.props.n+"04")}
                        checked={this.state.roomCode[this.props.b+this.props.n+"04"]}
                        />
                      </td>
                       <td>
                        <Checkbox id="5" labelPosition="left"
                        label={this.props.n + "05"}
                        style={styles.checkbox}
                        disabled={this.checkDisable(this.props.b,this.props.n+"05")}
                        onCheck={ () => this.updateCheck(this.props.b,this.props.n+"05")}
                        checked={this.state.roomCode[this.props.b+this.props.n+"05"]}
                       />
                       </td>
                      <td>
                        <Checkbox id="6" labelPosition="left" 
                        label={this.props.n + "06"}
                        style={styles.checkbox}
                         disabled={this.checkDisable(this.props.b,this.props.n+"06")}
                         onCheck={ () => this.updateCheck(this.props.b,this.props.n+"06")}
                        checked={this.state.roomCode[this.props.b+this.props.n+"06"]}
                       />
                      </td>
                      </tr>
                      <tr>
                      <td><Checkbox labelPosition="left"
                        label={this.props.n + "07"}
                        style={styles.checkbox}
                         disabled={this.checkDisable(this.props.b,this.props.n+"07")}
                         onCheck={ () => this.updateCheck(this.props.b,this.props.n+"07")}
                        checked={this.state.roomCode[this.props.b+this.props.n+"07"]}
                      />
                      </td>
                       <td><Checkbox labelPosition="left" 
                        label={this.props.n + "08"}
                        style={styles.checkbox}
                         disabled={this.checkDisable(this.props.b,this.props.n+"08")}
                         onCheck={ () => this.updateCheck(this.props.b,this.props.n+"08")}
                        checked={this.state.roomCode[this.props.b+this.props.n+"08"]}

                      />
                      </td>
                      <td><Checkbox labelPosition="left"
                        label={this.props.n + "09"}
                        style={styles.checkbox}
                         disabled={this.checkDisable(this.props.b,this.props.n+"09")}
                         onCheck={ () => this.updateCheck(this.props.b,this.props.n+"09")}
                        checked={this.state.roomCode[this.props.b,this.props.n,"09"]}
                      />
                      </td>
                 
                   
                      </tr>
                      </table>
                  </div>     
                  );
            case "3": return(<div className="Row" style={{display:"flex",flexDirection:"row",padding:"0"}}>
                      <Checkbox 
                        label={this.props.n + "01"}
                        style={styles.checkbox}
                      />
                      <Checkbox 
                        label={this.props.n + "02"}
                        style={styles.checkbox}
                      />
                       <Checkbox 
                        label={this.props.n + "03"}
                        style={styles.checkbox}
                      />
                       <Checkbox 
                        label={this.props.n + "04"}
                        style={styles.checkbox}
                      />
                  </div>)
                }
              }
 }           
CheckboxGroup.propTypes={
        n:React.PropTypes.string,
        b:React.PropTypes.string,
        a: React.PropTypes.object
       }
       


export default CheckboxGroup;