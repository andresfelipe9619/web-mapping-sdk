import React, { Component } from 'react'
import FeatureTable from './../../table/FeatureTable';
import { Segment, Icon , Button } from "semantic-ui-react";

class Profinal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profinal: null
    }
  }
  componentDidMount() {
    fetch(`http://localhost:8080/geoserver/cahibi1/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=cahibi1:profinal&outputFormat=application%2Fjson`)
      .then(response => {
        if (!response.ok) {
          // dispatch(alertError(response));
          return Promise.reject(response.statusText);
        }
        return response.json();
      }).then((response) => {
        console.log("profinal", response.features)
        this.setState({ profinal: response.features })
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
    if (this.state.profinal) {
      return (
        <div>
          <Segment> <h2>Productos Finales</h2></Segment>

          <FeatureTable data={this.state.profinal} />
        </div>
      )
    } else return null
  }
}

export default Profinal