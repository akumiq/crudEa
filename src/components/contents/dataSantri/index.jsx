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
  return props.searchedSantri && props.value
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
          <th scope='col'>ID</th>
          <th scope='col'>Nama</th>
          <th scope='col'>Jurusan</th>
          <th scope='col' className='text-center'>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          renderDataSantri(props).map((item, id) => (
            <tr key={id}>
              <th scope='row'>{item.id}</th>
              <td>{item.nama}</td>
              <td>{item.jurusan}</td>
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
                      onToggleEditModal()
                      props.dataUpdate(item)
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
                <Label for='nama'>Nama Santri</Label>
                <Input
                  type='text'
                  name='nama'
                  id='nama'
                  onChange={(e) => props.onHandleInput(e)}
                  value={props.postDataSantri.nama}
                  placeholder='nama santri'
                />
              </FormGroup>
            </Form>

            <Form>
              <FormGroup>
                <Label for='jurusan'>Jurusan Santri</Label>
                <Input
                  type='text'
                  name='jurusan'
                  id='jurusan'
                  onChange={(e) => props.onHandleInput(e)}
                  value={props.postDataSantri.jurusan}
                  placeholder='jurusan santri'
                />
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button
              color='info'
              onClick={() => {
                onToggleEditModal()
                props.onHandleUpdate()
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
                onToggleDeleteModal()
                props.onHandleDelete(idDeleteSantri)
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
  onHandleUpdate: PropTypes.func,
  postDataSantri: PropTypes.object,
  onHandleInput: PropTypes.func,
  onHandleDelete: PropTypes.func,
  dataUpdate: PropTypes.func
}

export default DataSantri
