import React from 'react'
import DataSantri from './dataSantri'
import PageNotFound from './page404'
import PropTypes from 'prop-types'

const Contents = (props) => {
  return (
    <div className='container-fluid p-4'>
      {
        props.dataSantri
          ? (
            <DataSantri
              value={props.value}
              searchedSantri={props.searchedSantri}
              newDataSantri={props.newDataSantri}
              onHandleUpdate={props.onHandleUpdate}
              postDataSantri={props.postDataSantri}
              onHandleInput={props.onHandleInput}
              dataSantri={props.dataSantri}
              onHandleDelete={props.onHandleDelete}
              dataUpdate={props.dataUpdate}
              simpanDataSantri={props.simpanDataSantri}
            />
          )
          : <PageNotFound />
      }
    </div>
  )
}

Contents.propTypes = {
  dataSantri: PropTypes.array,
  value: PropTypes.string,
  searchedSantri: PropTypes.func,
  newDataSantri: PropTypes.array,
  onHandleUpdate: PropTypes.func,
  postDataSantri: PropTypes.object,
  onHandleInput: PropTypes.func,
  onHandleDelete: PropTypes.func,
  dataUpdate: PropTypes.func,
  simpanDataSantri: PropTypes.func
}

export default Contents
