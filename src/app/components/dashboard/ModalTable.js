import React, { Component } from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import DataTable from './DataTable';


class NestedModal extends Component {
  state = { open: false }

  show = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <Modal
        dimmer={false}
        open={open}
        onOpen={this.show}
        onClose={this.close}
        size='small'
        trigger={<Button primary icon>Proceed <Icon name='right chevron' /></Button>}
      >
        <Modal.Header>Modal #2</Modal.Header>
        <Modal.Content>
          <p>That's everything!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button icon='check' content='All Done' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }
}

class ModalTable extends Component {
  state = { open: this.props.open || false }

  show = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    return (
      <Modal dimmer={false}
        open={this.state.open}
        onOpen={this.show}
        onClose={this.close}>
        <Modal.Header>Modal #1</Modal.Header>
        <Modal.Content image>
          <div className='image'>
            <Icon name='right arrow' />
          </div>
          <Modal.Description>
            <DataTable data={this.props.data} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <NestedModal />
        </Modal.Actions>
      </Modal>
    )
  }
}


export default ModalTable;