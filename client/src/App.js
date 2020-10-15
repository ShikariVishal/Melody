import React, { Component } from "react";
import SolidityDriveContract from "./contracts/SolidityDrive.json";
import getWeb3 from "./getWeb3";
import Personal from "./components/Personal";
import Public from "./components/Public";
import "./App.css";
import Select from 'react-select';
import UploadFile from "./components/Modals/UploadFile";
import { Table } from "reactstrap";
import { FileIcon, defaultStyles } from "react-file-icon";
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import fileReaderPullStream from "pull-file-reader";
import Moment from "react-moment";

const options = [
    { value: 'personal', label: 'Personal' },
    { value: 'public', label: 'Public' },
];

class App extends Component {
  state = { 
    web3: true, 
    accounts: null, 
    contract: null, 
    selectedOption: options[0],
    solidityDrive: []
  };

  updatePublicFiles = async() => {
    try {
      const {accounts, contract} = this.state;
      let filesLength = await contract.methods.getPublicFilesLength().call({form: accounts[0]});
      let files = []
      for(let i = 0; i < filesLength; i++) {
        let file = await contract.methods.getPublicFile(i).call({form: accounts[0]});
        files.push(file);
      }
      this.setState({solidityDrive: files});
    } catch (error) {
      console.log(error);
    }
  }

  uploadFile = async(hash, fileName, fileType, timestamp, selectedOption) => {
    const {accounts, contract} = this.state;
    console.log(`contract instance -`,contract);
    console.log(`seelected options - `, selectedOption.value);
    if(selectedOption.value === 'personal'){
      let uploaded = await contract.methods.addToPersonalFiles(hash, fileName, fileType, timestamp).send({from: accounts[0], gas: 300000})
      console.log('uploaded',uploaded);
      this.updatePersonalFiles();
    }

    if(selectedOption.value === 'public'){
      console.log(`hash - ${hash}, type - ${fileType}`);
      let uploaded = await contract.methods.addToPublicFiles(hash, fileName, fileType, timestamp).send({from: accounts[0], gas: 300000})
      console.log('uploaded',uploaded);
      this.updatePublicFiles();
    } 
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SolidityDriveContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SolidityDriveContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.updatePublicFiles);
      web3.currentProvider.publicConfigStore.on('update', async() => {
        const changedAccounts = await web3.eth.getAccounts();
        this.setState({accounts: changedAccounts});
        this.updateSolidityDrive();
      })
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  render() {
    const {solidityDrive} = this.state;
    const {selectedOption} = this.state;

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <UploadFile object={this} />

        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />

        <Table>
          <thead>
            <tr>
              <th width="6%" scope="row">
                Type
              </th>
              <th className="text-left">File Name</th>
              <th className="text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {solidityDrive !== []
              ? solidityDrive.map((item, key) => (
                  <tr>
                    <th>
                      <FileIcon
                        extension={item[2]}
                        {...defaultStyles[item[2]]}
                      />
                    </th>
                    <th className="text-left">
                      <a href={"https://ipfs.infura.io/ipfs/" + item[0]}>
                        {item[1]}
                      </a>
                    </th>
                    <th className="text-right">
                      <Moment format="YYYY/MM/DD" unix>
                        {item[3]}
                      </Moment>
                    </th>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>

        {/* {selectedOption === options[0] ? <Personal object={this} /> : <Public object={this} />} */}

        {/* {console.log(this.getFiles())} */}
        {/* {selectedOption === options[0] ? <Personal object={this} /> : <Public object={this} />} */}
        {/* {selectedOption === options[0] ? this.getPersonalFiles() : this.getPublicFiles() } */}
      </div>
    );
  }
  
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.updateSolidityDrive();
  };
  
  updateSolidityDrive = () => {
    this.state.selectedOption === options[0] ? this.updatePersonalFiles() : this.updatePublicFiles();
  }
  
  updatePersonalFiles = async() => {
    try {
      const {accounts, contract} = this.state;
      let filesLength = await contract.methods.getPersonalFilesLength(accounts[0]).call({form: accounts[0]});
      let files = []
      for(let i = 0; i < filesLength; i++) {
        let file = await contract.methods.getPersonalFile(i, accounts[0]).call({form: accounts[0]});
        files.push(file);
      }
      this.setState({solidityDrive: files});
    } catch (error) {
      console.log(error);
    }
  }

}

export default App;
