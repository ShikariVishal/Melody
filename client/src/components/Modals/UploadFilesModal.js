import React, { Component } from "react";
import Select from 'react-select';
import ipfs from "../../ipfs";
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import fileReaderPullStream from "pull-file-reader";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { StyledDropZone } from "react-drop-zone";


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const options = [
    { value: "personal", label: "Personal" },
    { value: "public", label: "Public" },
];


class UploadFilesModal extends Component {
  state = {
    selectedOption: options[0],
    modalOpen: false,
    modalStyle: getModalStyle,
  };

  [this.selectedOption] = React.useState(options[0]);
  [this.modalOpen] = React.useState(false);
  [this.modalStyle] = React.useState(getModalStyle);

  onDrop = async (file) => {
    const stream = fileReaderPullStream(file);

    const result = await ipfs.add(stream);
    const timestamp = Math.round(+new Date() / 1000);
    const type = file.name.substr(file.name.lastIndexOf(".") + 1);

    this.handleModalClose();

    console.log(`hash -> ${result[0].hash}, fileName -> ${file.name}`);
    // props.object.uploadFile(result[0].hash, file.name, type, timestamp, selectedOption);
  };

  handleModalOpen = () => {
    this.setState({modalOpen: true});
  };

  handleModalClose = () => {
    this.setState({modalOpen: true});
  };
  
  handleUploadTo = (selectedOption) => {
    this.setState({selectedOption});
    console.log(selectedOption);
  };
  classes = useStyles();
  
  body = (
    <div style={this.state.modalStyle} className={this.classes.paper}>
      <div>
        <p id="simple-modal-description">Upload to :</p>

        <Select
          value={this.state.selectedOption}
          onChange={this.handleUploadTo}
          options={options}
        />
        <hr />
      </div>

      <StyledDropZone onDrop={this.onDrop} />
    </div>
  );

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleModalOpen}>
          upload
        </Button>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {this.body}
        </Modal>
      </div>
    );
  }
}

export default UploadFilesModal;