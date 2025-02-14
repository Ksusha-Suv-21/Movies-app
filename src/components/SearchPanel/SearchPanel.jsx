import { Input } from 'antd'

import './SearchPanel.css'

import PropTypes from 'prop-types'

function SearchPanel({ onChange }) {
  return <Input placeholder="Type to search..." onChange={onChange} />
}

export default SearchPanel

SearchPanel.defaultProps = {
  onChange: () => {},
}

SearchPanel.propTypes = {
  onChange: PropTypes.func,
}
