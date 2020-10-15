import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { StyledDropZone } from "react-drop-zone";
import { Table } from "reactstrap";
import { FileIcon, defaultStyles } from "react-file-icon";
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import fileReaderPullStream from "pull-file-reader";
import MenuItem from '@material-ui/core/MenuItem';
import Moment from "react-moment";
import Select from 'react-select';
import ipfs from "../../ipfs";
import CircularProgress from '@material-ui/core/CircularProgress';
import { render } from 'react-dom';
import App from '../../App';




function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));





export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);  

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const options = [
    { value: "personal", label: "Personal" },
    { value: "public", label: "Public" },
  ];

  const [option, setOption] = React.useState(options[0]);

  const onDrop = async (file) => {
      const stream = fileReaderPullStream(file);
      
      const result = await ipfs.add(stream);
      const timestamp = Math.round(+new Date() / 1000);
      const type = file.name.substr(file.name.lastIndexOf(".")+1);
      setOpen(false);
      props.object.uploadFile(result[0].hash, file.name, type, timestamp, option);
  };

  const handleUploadToChange = (event) => {
    setOption(event);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <p id="simple-modal-description">Upload to :</p>

        <Select
          value={option}
          onChange={handleUploadToChange}
          options={options}
        >
          <MenuItem value={"personal"}>Personal</MenuItem>
          <MenuItem value={"public"}>Public</MenuItem>
        </Select>
        <hr />
      </div>

      <StyledDropZone onDrop={onDrop} />
    </div>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleModalOpen}>
        upload
      </Button>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
