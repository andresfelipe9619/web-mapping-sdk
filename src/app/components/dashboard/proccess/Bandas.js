import React, { Component } from 'react'
import FeatureTable from './../../table/FeatureTable';
import { Segment, Icon , Button } from "semantic-ui-react";

class Bandas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bandas: null
    }
  }
  componentDidMount() {
    fetch(`http://localhost:8080/geoserver/cahibi1/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:bandas&outputFormat=application%2Fjson`)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response.statusText);
        }
        return response.json();
      }).then((response) => {
        console.log("bandas", response.features)
        this.setState({ bandas: response.features })
      })
  }



  clickedWatch = ({ id }) => {
    console.log("u click me" + id)

    this.watchClasificadora(id);
  }

  watchClasificadora(id) {
    console.log("u click me" + id)
  }

  render() {

    const callbacks = { acciones: this.clickedWatch }


    const ActionsComponent = ({ row, CustomFunction }) => {
      // const clickedEdit = () => editProduct({ imageURL: row[accessor] });
      const handleclickedWatch = () => CustomFunction({ id: row['id_clasif'] });
      return (
        <Button.Group icon>
          <Button onClick={handleclickedWatch}>
            <Icon name='eye' />
          </Button>
          {/* <Button>
                        <Icon name='edit' />
                    </Button>
                    <Button  >
                        <Icon name='trash' />
                    </Button> */}

        </Button.Group>
      )
    }

    // component={ActionsComponent}  callbacks={callbacks}
    if (this.state.bandas) {
      return (
        <div>
          <Segment> <h2>Bandas</h2></Segment>

          <FeatureTable data={this.state.bandas} />
        </div>
      )
    } else return null
  }
}

export default Bandas