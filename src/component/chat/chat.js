import React, { Component } from 'react'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import  { connect } from 'react-redux';
import {getMsgList, sendMsg, recvMsg,readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../utils'
import QueueAnim from 'rc-queue-anim';
// import  io from 'socket.io-client';
// const socket = io('ws://localhost:9093')

@connect(
	state=>state,
	{ getMsgList, sendMsg, recvMsg ,readMsg}
)
export default class Chat extends Component {
	constructor(props){
		super(props)
		this.state = {
			text:'',
			msg:[],
			showEmoji:false
		}
	}

	componentDidMount() {
		if (!this.props.chat.chatmsgs.length) {
			this.props.getMsgList()
			this.props.recvMsg()	
		}
	}
	componentWillUnmount() {
		const to = this.props.match.params.userid
		this.props.readMsg(to)
	}

	fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}

	handleSubmit(){
		// socket.emit('sendmsg',{text:this.state.text})
		const from = this.props.user._id;
		const to = this.props.match.params.userid
		const msg = this.state.text;
		this.props.sendMsg({from,to,msg})
		this.setState({text:''});
	}
	render(){
		const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))

		const Item = List.Item

		const userid = this.props.match.params.userid
		const users = this.props.chat.users
		if(!users[userid]){
			console.log("没法渲染")
			return null
		}

		const chatid = getChatId(userid, this.props.user._id)
		const chatmsgs = this.props.chat.chatmsgs.filter(v=>v.chatid===chatid)

		// const username = this.props.chatuser.userlist.filter(v=>v._id==userid)[0].user
		// console.log(username)
		
		return(
			<div id="chat-page">
				<NavBar
					mode='dark'
					icon={<Icon type="left" />}
					onLeftClick={()=>{
						this.props.history.goBack()
					}}
				>
					{users[userid].name}
				</NavBar>
				<QueueAnim delay={100} type={"left"}>
					{chatmsgs.map(v=>{
						const avatar = require(`../img/${users[v.from].avatar}.png`)

						return v.from === userid ? (
							<List key={v._id}>
								<Item
									thumb={avatar}
								>
								{v.content}
								</Item>
							</List>
						):(
							<List key={v._id}>
								<Item
									extra={<img src={avatar} alt="头像" />}
								 	className='chat-me'
								>
								{v.content}
								</Item>
							</List>
						)
					})}
				</QueueAnim>
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder='请输入'
							value={this.state.text}
							onChange={v=>{
								this.setState({text:v})
							}}
							extra={

								<div>
									<span
										role="img"
										style={{marginRight:15}}
										onClick={()=>{
											this.setState({
												showEmoji:!this.state.showEmoji
											})
											this.fixCarousel()
										}}
									>😃</span>
									<span onClick={()=>this.handleSubmit()} >发送</span>
								</div>
							}
						></InputItem>
					</List>	
					{this.state.showEmoji?<Grid 
						data={emoji}
						columnNum={9}
						carouselMaxRow={4}
						isCarousel={true}
						onClick={el=>{
							this.setState({
								text:this.state.text+el.text
							})
							
						}}
					/>:null}		
				</div>			
			</div>

		)
	}
}