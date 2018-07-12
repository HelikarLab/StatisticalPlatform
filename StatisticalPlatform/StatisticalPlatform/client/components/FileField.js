import React, {Component} from 'react';

class FileField extends Component {

  render() {
    return(
      <input type="file"  style={{display: "none"}} id="invis-file" accept=".csv, .xls, .xlsx" />
    );
  }
}

export default FileField;
