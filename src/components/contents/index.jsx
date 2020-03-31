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
              dataSantri={props.dataSantri}
              newDataSantri={props.newDataSantri}
              postDataSantri={props.postDataSantri}
              onDataUpdate={props.onDataUpdate}
              onHandleInput={props.onHandleInput}
              onHandleUpdate={props.onHandleUpdate}
              onHandleDelete={props.onHandleDelete}
            />
          )
          : <PageNotFound />
      }
    </div>
  )
}

Contents.propTypes = {
  value: PropTypes.string,
  dataSantri: PropTypes.array,
  newDataSantri: PropTypes.array,
  postDataSantri: PropTypes.object,
  onDataUpdate: PropTypes.func,
  onHandleInput: PropTypes.func,
  onHandleUpdate: PropTypes.func,
  onHandleDelete: PropTypes.func
}

export default Contents
