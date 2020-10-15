pragma solidity ^0.6.0;

contract SolidityDrive {
    struct File {
        string hash;
        string fileName;
        string fileType;
        uint date;
    }

    mapping(address => File[]) userFiles;
    File[] publicFiles;

    function addToPersonalFiles(string memory _hash, string memory _fileName, string memory _fileType, uint _date) public{
        userFiles[msg.sender].push(File({hash:_hash, fileName: _fileName, fileType: _fileType, date: _date}));
    }

    function addToPublicFiles(string memory _hash, string memory _fileName, string memory _fileType, uint _date) public{
        publicFiles.push(File({hash:_hash, fileName: _fileName, fileType: _fileType, date: _date}));
    }

    function getPersonalFilesLength(address _address) public view returns (uint ) {
        return userFiles[_address].length;
    }

    function getPersonalFile(uint _index, address _address) public view returns (string memory, string memory, string memory, uint) {
        File memory file = userFiles[_address][_index];
        return (file.hash, file.fileName, file.fileType, file.date);
    }

    function getPublicFilesLength() public view returns (uint ) {
        return publicFiles.length;
    }

    function getPublicFile(uint _index) public view returns (string memory, string memory, string memory, uint) {
        File memory file = publicFiles[_index];
        return (file.hash, file.fileName, file.fileType, file.date);
    }

}