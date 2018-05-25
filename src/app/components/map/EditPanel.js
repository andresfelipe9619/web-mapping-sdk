/** An Editing Panel for Tracts
 *
 */

import React from 'react';

class EditPanel extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {feature: null};
  }



  render() {
    const color_controls = [];


    let feature_id = false;
    if (this.state.feature) {
      feature_id = this.state.feature.id;
    }

    return (
      <div className='edit-panel'>
        <div>
          <span className='label'>Feature ID:</span>
          { feature_id }
        </div>

      </div>
    );
  }
}

export default EditPanel;
