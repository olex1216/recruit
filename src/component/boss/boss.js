import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'

@connect(
	state=>state.chatuser,
	{getUserList}
)
export default class Boss extends Component {
	constructor(props) {
		super(props)
		this.state={
			data:[]
		}
	}
	componentDidMount() {
		this.props.getUserList('genius')
	}


	render(){
		const Header = Card.Header
		const Body = Card.Body
		return(
			<WingBlank>
				<WhiteSpace></WhiteSpace>
				{this.props.userlist.map(v=>(
					v.avatar?(<Card key={v._id}>
						<Header
							title={v.user}
							thumb={require(`../img/${v.avatar}.png`)}
							extra={<span>{v.title}</span>}
						></Header>
						<Body>
							{v.type==='boss'? <div>公司:{v.company}</div> :null}

							{v.desc.split('\n').map(d=>(
								<div key={d}>{d}</div>
							))}
							{v.type==='boss'? <div>薪资:{v.money}</div> :null}
						</Body>
						<WhiteSpace></WhiteSpace>
					</Card>) : null
				))}
			</WingBlank>
		)
	}
}