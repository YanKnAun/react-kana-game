import React from "react";
import './index.css'

class Guard extends React.Component {
	state = {
		todoList: [],
		inputValue: ''
	}

	handleChange(e) {
		const value = e.target.value

		this.setState({
			inputValue: value
		})
	}

	handleKeyup(e) {
		let { todoList, inputValue } = this.state

		if (e.keyCode === 13) {
			this.setState({
				todoList: [
					...todoList,
					{
						name: inputValue,
						isChecked: false
					}
				],
				inputValue: ''
			})
		}
	}

	handleChangeCheckbox(e, index, isChecked) {
		let { todoList } = this.state

		todoList = todoList.map((item, i) => {
			if (i === index) {
				item.isChecked = !isChecked
			}

			return item
		})

		this.setState({
			todoList: todoList
		})
	}

	handleDel(index) {
		let { todoList } = this.state

		todoList.splice(index, 1)

		this.setState({
			todoList
		})
	}

	render() {
		const { todoList, inputValue } = this.state

		return (
			<div className="container">
				<input type="text" className="input-text" value={inputValue} onChange={(e) => this.handleChange(e)} onKeyDown={(e) => this.handleKeyup(e)} placeholder='请输入任务名称' />
				<hr />
				<ul>
					{
						todoList.map((item, index) => {
							return (
								<li key={index}>
									<input type="checkbox" checked={item.isChecked} onChange={(e) => this.handleChangeCheckbox(e, index, item.isChecked)} />
									<span>{item.name}</span>
									<button className="btn" onClick={() => this.handleDel(index)}>删除</button>
								</li>
							)
						})
					}
				</ul>
				<div>已完成 {todoList.filter(item => item.isChecked).length} / {todoList.length} </div>
			</div>
		)
	}
}

export default Guard;