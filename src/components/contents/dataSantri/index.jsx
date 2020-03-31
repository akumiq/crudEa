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

const renderDataSantri = (props) => {
  return props.value
    ? props.newDataSantri
    : props.dataSantri
}

let idDeleteSantri

const DataSantri = (props) => {
  const [isEditModalVisible, setEditModal] = useState(false)
  const onToggleEditModal = () => setEditModal(!isEditModalVisible)

  const [isDeleteModalVisible, setDeleteModal] = useState(false)
  const onToggleDeleteModal = () => setDeleteModal(!isDeleteModalVisible)

  return (
    <Table striped className='text-light'>
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

      <tbody>
        {
          renderDataSantri(props).map((item, id) => (
            <tr key={id}>
              <th scope='row'>{item.id}</th>
              <td>{item.name}</td>
              <td>{item.studyProgram}</td>
              <td>
                <div className='row justify-content-center'>
                  <Button
                    className='mr-2'
                    color='danger'
                    onClick={() => {
                      idDeleteSantri = item.id
                      onToggleDeleteModal()
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    color='warning'
                    onClick={() => {
                      props.onDataUpdate(item)
                      onToggleEditModal()
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </td>
            </tr>
          ))
        }

        <Modal
          isOpen={isEditModalVisible}
          toggle={onToggleEditModal}
        >
          <ModalHeader toggle={onToggleEditModal}>
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
                onToggleEditModal()
              }}
            >
              Update
            </Button>

            <Button
              color='secondary'
              outline
              onClick={onToggleEditModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={isDeleteModalVisible}
          toggle={onToggleDeleteModal}
        >
          <ModalHeader
            toggle={onToggleDeleteModal}
          >
            Apakah anda yakin ingin menghapus data ini?
          </ModalHeader>

          <ModalFooter>
            <Button
              color='secondary'
              outline
              onClick={() => {
                props.onHandleDelete(idDeleteSantri)
                onToggleDeleteModal()
              }}
            >
              Delete
            </Button>
            <Button
              color='info'
              onClick={onToggleDeleteModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

      </tbody>
    </Table>
  )
}

DataSantri.propTypes = {
  postDataSantri: PropTypes.object,
  onDataUpdate: PropTypes.func,
  onHandleInput: PropTypes.func,
  onHandleUpdate: PropTypes.func,
  onHandleDelete: PropTypes.func
}

export default DataSantri
