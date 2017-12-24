import React ,{ Component}  from 'react'
import  { connect } from 'react-redux';
import { addGun,removeGun,addGunAsync} from './index.redux'


@connect( 
	state =>({ num : state.counter }),
	{ addGun, removeGun, addGunAsync }
)
class App extends Component {
	render(){
		const { num,addGun,removeGun,addGunAsync} = this.props;
		return(
			<div>
				<h1>一营</h1>
				<h2>现在有机枪{num}把</h2>
				<button onClick={addGun}>申请机枪</button>
				<button onClick={removeGun}>上交机枪</button>
				<button onClick={addGunAsync}>延迟上交机枪</button>
			</div>
		)
	}
}


export default App