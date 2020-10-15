import React, { Component } from "react";
import { Table } from "reactstrap";
import { FileIcon, defaultStyles } from "react-file-icon";
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import Moment from "react-moment";


class Public extends Component {
    solidityDrive = [];
    object = ()=> {
        return this.props.object;
    }
    render() {
        return (
          <div>
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

export default Public;


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