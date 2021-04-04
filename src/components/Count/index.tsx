import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  incrementAction,
  addListAction,
  incrementActionAsync
} from '../../redux/modules/count/actions'
import { AppState } from '../../redux'
import { IListData, IIncrementData } from '../../redux/modules/count/types'

interface IProps {
  num: number
  list: IListData[]
  incrementAction: typeof incrementAction
  addListAction: typeof addListAction
  incrementActionAsync: (data: IIncrementData, time?: number) => void
}

class Count extends Component<IProps, {}> {
  private addNum = () => {
    this.props.incrementAction({ num: 2 })
  }
  private addList = () => {
    const obj: IListData = {
      name: 'wq' + Math.random(),
      id: Math.random()
    }
    this.props.addListAction(obj)
  }
  private addNumAsync = () => {
    this.props.incrementActionAsync({ num: 2 }, 500)
  }
  render () {
    const { num, list } = this.props
    return (
      <div>
        <button onClick={this.addNum}>+2</button>
        <button onClick={this.addList}>addList</button>
        <button onClick={this.addNumAsync}>+2Async</button>
        <p>{num}</p>
        {list.map((item, index) => (
          <p key={item.id + index}>{item.name}</p>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  num: state.count.num,
  list: state.count.list
})

const mapDispatchToProps = {
  incrementAction,
  addListAction,
  incrementActionAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(Count)
