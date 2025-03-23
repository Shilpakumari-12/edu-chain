// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ElearningPlatform is ERC721, Ownable {
    struct Course {
        uint256 id;
        string title;
        string description;
        uint256 price;
        address instructor;
        bool exists;
    }

    struct Scholarship {
        address donor;
        uint256 amount;
    }

    uint256 public courseCounter;
    uint256 public nftCounter;
    mapping(uint256 => Course) public courses;
    mapping(address => uint256[]) public enrolledCourses;
    mapping(address => Scholarship) public scholarships;
    
    event CourseAdded(uint256 courseId, string title, uint256 price, address instructor);
    event CoursePurchased(address student, uint256 courseId);
    event ScholarshipFunded(address donor, uint256 amount);
    event ScholarshipClaimed(address student, uint256 amount);
    event NFTIssued(address student, uint256 tokenId);

    constructor() ERC721("CourseNFT", "CNFT") Ownable(msg.sender) {}

    function addCourse(string memory _title, string memory _description, uint256 _price) public {
        courseCounter++;
        courses[courseCounter] = Course(courseCounter, _title, _description, _price, msg.sender, true);
        emit CourseAdded(courseCounter, _title, _price, msg.sender);
    }

    function purchaseCourse(uint256 _courseId) public payable {
        require(courses[_courseId].exists, "Course does not exist");
        require(msg.value >= courses[_courseId].price, "Insufficient funds");
        
        payable(courses[_courseId].instructor).transfer(msg.value);
        enrolledCourses[msg.sender].push(_courseId);
        
        emit CoursePurchased(msg.sender, _courseId);
    }

    function issueNFT(address _student) public onlyOwner {
        nftCounter++;
        _mint(_student, nftCounter);
        emit NFTIssued(_student, nftCounter);
    }

    function donateScholarship() public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        scholarships[msg.sender] = Scholarship(msg.sender, msg.value);
        emit ScholarshipFunded(msg.sender, msg.value);
    }

    function claimScholarship(address _student) public onlyOwner {
    require(scholarships[_student].amount > 0, "No scholarship available");
    uint256 amount = scholarships[_student].amount;
    scholarships[_student].amount = 0;
    payable(_student).transfer(amount);
    emit ScholarshipClaimed(_student, amount);
    }
}
