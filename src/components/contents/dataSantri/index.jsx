import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

let idDeleteSantri

const DataSantri = (props) => {
  return (
    <Table striped className='text-light'>
      <Thead />

      <Tbody {...props} />
    </Table>
  )
}

const Thead = () => {
  return (
    <thead>
      <tr>
        <th
          scope='col'
          style={{ width: '20%' }}
        >
          ID
        </th>
        <th
          scope='col'
          style={{ width: '30%' }}
        >
          Nama
        </th>
        <th
          scope='col'
          style={{ width: '25%' }}
        >
          Jurusan
        </th>
        <th
          scope='col'
          style={{ width: '25%' }}
          className='text-center'
        >
          Action
        </th>
      </tr>
    </thead>
  )
}

const Tbody = (props) => {
  const [isEditModalVisible, setEditModal] = useState(false)
  const onToggleEditModal = () => setEditModal(!isEditModalVisible)

  const [isDeleteModalVisible, setDeleteModal] = useState(false)
  const onToggleDeleteModal = () => setDeleteModal(!isDeleteModalVisible)

  return (
    <tbody>
      {
        renderDataSantri(props).map((item, id) => (
          <tr key={id}>
            <th scope='row'>{item.id}</th>
            <td>{item.name}</td>
            <td>{item.studyProgram}</td>
            <td>
              <div className='row justify-content-center'>
                <ActionButton
                  button='delete'
                  onClick={() => {
                    idDeleteSantri = item.id
                    onToggleDeleteModal()
                  }}
                />

                <ActionButton
                  button='edit'
                  onClick={() => {
                    props.onDataUpdate(item)
                    onToggleEditModal()
                  }}
                />
              </div>
            </td>
          </tr>
        ))
      }

      <EditModal
        isEditModalVisible={isEditModalVisible}
        postDataSantri={props.postDataSantri}
        onToggleEditModal={onToggleEditModal}
        onHandleInput={props.onHandleInput}
        onHandleUpdate={props.onHandleUpdate}
      />

      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        onToggleDeleteModal={onToggleDeleteModal}
        onHandleDelete={props.onHandleDelete}
      />

    </tbody>
  )
}

const renderDataSantri = (props) => {
  return props.value
    ? props.newDataSantri
    : props.dataSantri
}

const EditModal = (props) => {
  return (
    <Modal
      isOpen={props.isEditModalVisible}
      toggle={() => props.onToggleEditModal()}
    >
      <ModalHeader toggle={() => props.onToggleEditModal()}>
        Update Data Santri
      </ModalHeader>

      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='name'>Nama Santri</Label>
            <Input
              type='text'
              name='name'
              id='name'
              onChange={(e) => props.onHandleInput(e)}
              value={props.postDataSantri.name}
              placeholder='nama santri'
            />
          </FormGroup>
        </Form>

        <Form>
          <FormGroup>
            <Label for='studyProgram'>Jurusan Santri</Label>
            <Input
              type='text'
              name='studyProgram'
              id='studyProgram'
              onChange={(e) => props.onHandleInput(e)}
              value={props.postDataSantri.studyProgram}
              placeholder='jurusan santri'
            />
          </FormGroup>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button
          color='info'
          onClick={() => {
            props.onHandleUpdate()
            props.onToggleEditModal()
          }}
        >
          Update
        </Button>

        <Button
          color='secondary'
          outline
          onClick={props.onToggleEditModal}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

const DeleteModal = (props) => {
  return (
    <Modal
      isOpen={props.isDeleteModalVisible}
      toggle={() => props.onToggleDeleteModal()}
    >
      <ModalHeader
        className='justify-content-center border-0'
      >
        Apakah anda yakin ingin menghapus data ini?
      </ModalHeader>

      <ModalFooter
        className='border-0'
      >
        <Button
          color='secondary'
          outline
          onClick={() => {
            props.onHandleDelete(idDeleteSantri)
            props.onToggleDeleteModal()
          }}
        >
          Delete
        </Button>
        <Button
          color='info'
          onClick={props.onToggleDeleteModal}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

const ActionButton = (props) => {
  const EditButton = props.button === 'edit'
  const DeleteButton = props.button === 'delete'

  const color = EditButton
    ? 'warning'
    : DeleteButton
      ? 'danger'
      : 'info'

  const className = EditButton
    ? ''
    : DeleteButton
      ? 'mr-2'
      : ''

  const text = EditButton
    ? 'Edit'
    : DeleteButton
      ? 'Delete'
      : ''

  return (
    <Button
      className={className}
      color={color}
      onClick={() => props.onClick()}
    >
      {text}
    </Button>
  )
}

// const BagianModal = () => {
//   return (

//   )
// }

Tbody.propTypes = {
  postDataSantri: PropTypes.object,
  onDataUpdate: PropTypes.func,
  onHandleInput: PropTypes.func,
  onHandleUpdate: PropTypes.func,
  onHandleDelete: PropTypes.func
}

EditModal.propTypes = {
  isEditModalVisible: PropTypes.bool,
  postDataSantri: PropTypes.object,
  onToggleEditModal: PropTypes.func,
  onHandleInput: PropTypes.func,
  onHandleUpdate: PropTypes.func
}

DeleteModal.propTypes = {
  isDeleteModalVisible: PropTypes.bool,
  onToggleDeleteModal: PropTypes.func,
  onHandleDelete: PropTypes.func
}

ActionButton.propTypes = {
  button: PropTypes.string,
  onClick: PropTypes.func
}

export default DataSantri
