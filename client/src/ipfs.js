const IPFS = require('ipfs-api')
// const ipfs = new IPFS({host: 'localhost', port: 8080});
// const ipfs = new IPFS('127.0.0.1:8080/tcp');

// const ipfsClient = require('ipfs-http-client');
// const ipfs = ipfsClient({host: '127.0.0.1', port: '5001', protocol: 'http'})
// const ipfs = ipfsClient({host: 'ipfs.infura.io', port: '5001', protocol: 'https'})

// const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default ipfs;