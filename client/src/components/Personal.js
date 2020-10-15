import React, { Component } from "react";
import { Table } from "reactstrap";
import { FileIcon, defaultStyles } from "react-file-icon";
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import Moment from "react-moment";


class Personal extends Component {
    solidityDrive = [];
    object = ()=> {
        return this.props.object;
    }
    render() {
        return (
          // <script>{this.props.object.getPersonalFiles()}</script>
          // <h1>{this.solidityDrive}</h1>  this.object().state.solidityDrive
          <div>
            {/* {console.log(this.object().state.solidityDrive)} */}
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
                {this.object().state.solidityDrive !== []
                  ? this.object().state.solidityDrive.map((item, key) => (
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
          </div>
        );
      }
}

export default Personal;


/*
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
                {(solidityDrive) !== [] ? (solidityDrive).map((item, key) => (
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

*/