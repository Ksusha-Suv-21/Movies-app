import { Component } from 'react'
import { Rate } from 'antd'

import './Rating.css'

import PropTypes from 'prop-types'

export default class Rating extends Component {
  render() {
    const { onChange, value, movieId } = this.props
    console.log(value)
    return (
      <Rate
        count={10}
        onChange={(rate) => {
          onChange(movieId, rate)
        }}
        value={value}
      />
    )
  }
}

Rating.defaultProps = {
  onChange: () => {},
}

Rating.propTypes = {
  onChange: PropTypes.func,
}
