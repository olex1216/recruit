import React, { Component } from 'react'
import  { connect } from 'react-redux'
import {List,Badge} from 'antd-mobile'


@connect(
	state=>state,
	{}
)
export default class Msg extends Component {

	getLast(arr){
		return arr[arr.length-1]
	}

	render(){

		const Item = List.Item
		const Brief = Item.Brief

		const userid = this.props.user._id
		const userinfo = this.props.chat.users

		// console.log(userinfo)


		const msgGroup = {}
		this.props.chat.chatmsgs.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || []
			msgGroup[v.chatid].push(v)
		})

		// console.log(msgGroup)

		const chatList = Object.values(msgGroup).sort((a,b)=>{
			const a_last = this.getLast(a).create_time
			const b_last = this.getLast(b).create_time
			return b_last - a_last
		})

		// console.log(chatList)

		return(
			<div>
		
					{chatList.map(v=>{
						const lastItem = this.getLast(v)
						const targetId = v[0].from===userid?v[0].to:v[0].from
						if (!userinfo[targetId]) {
							return null
						}

						const unreadNum = v.filter(v=>!v.read&&v.to===userid).length

						return(
							<List key={lastItem._id}>
								<Item 
									style={{zIndex:10}}
									extra={<Badge text={unreadNum}></Badge>}
									arrow="horizontal"	
									thumb={require(`../img/${userinfo[targetId].avatar}.png`)}								
									onClick={()=>{
										this.props.history.push(`/chat/${targetId}`)
									}}
								>
									{lastItem.content}
									<Brief>{userinfo[targetId].name}</Brief>
								</Item>
							</List>
						)

					})}
					
					
			</div>
		)
	}

}