import React from 'react'
import PropTypes from 'prop-types'
import {
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

const PaginationButton = (props) => {
  return (
    <Pagination
      className='pagination justify-content-end m-4'
      aria-label='Page navigation example'
    >
      <PaginationItem disabled={props.currentPage <= 1}>
        <PaginationLink onClick={props.onPreviousPage}>
          Previous
        </PaginationLink>
      </PaginationItem>

      {props.paginationNumbers.map((item, index) => (
        <PaginationItem
          key={index}
          active={props.currentPage === item}
        >
          <PaginationLink
            id={item}
            onClick={(event) => props.onMovePage(event)}
          >
            {item}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem
        disabled={
          props.currentPage === props.paginationNumbers.length
        }
      >
        <PaginationLink onClick={props.onNextPage}>
          Next
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  )
}

PaginationButton.propTypes = {
  currentPage: PropTypes.number,
  paginationNumbers: PropTypes.array,
  onMovePage: PropTypes.func,
  onPreviousPage: PropTypes.func,
  onNextPage: PropTypes.func
}

export default PaginationButton
