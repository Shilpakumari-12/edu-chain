// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title StudyGroupTracker
 * @dev A smart contract to track study sessions and reward participants
 */
contract StudyGroupTracker {
    struct StudySession {
        string topic;
        address organizer;
        uint256 timestamp;
        bool completed;
        mapping(address => bool) participants;
        uint256 participantCount;
    }
    
    // State variables
    mapping(uint256 => StudySession) public sessions;
    mapping(address => uint256) public tokenBalance;
    uint256 public sessionCount;
    uint256 public rewardAmount;
    address public owner;
    
    // Events
    event SessionCreated(uint256 indexed sessionId, string topic, address indexed organizer, uint256 timestamp);
    event SessionCompleted(uint256 indexed sessionId, address indexed organizer);
    event TokensRewarded(address indexed recipient, uint256 amount);
    event ParticipantJoined(uint256 indexed sessionId, address indexed participant);
    event RewardAmountUpdated(uint256 oldAmount, uint256 newAmount);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }
    
    modifier validSessionId(uint256 _sessionId) {
        require(_sessionId < sessionCount, "Invalid session ID");
        _;
    }
    
    modifier onlyOrganizer(uint256 _sessionId) {
        require(sessions[_sessionId].organizer == msg.sender, "Only the organizer can call this function");
        _;
    }
    
    modifier notCompleted(uint256 _sessionId) {
        require(!sessions[_sessionId].completed, "Session already completed");
        _;
    }
    
    /**
     * @dev Constructor initializes the contract with a default reward amount
     * @param _initialRewardAmount Amount of tokens to reward for completing a session
     */
    constructor(uint256 _initialRewardAmount) {
        owner = msg.sender;
        rewardAmount = _initialRewardAmount > 0 ? _initialRewardAmount : 10;
    }
    
    /**
     * @dev Creates a new study session
     * @param _topic The topic of the study session
     * @return sessionId The ID of the newly created session
     */
    function createStudySession(string memory _topic) public returns (uint256 sessionId) {
        require(bytes(_topic).length > 0, "Topic cannot be empty");
        
        sessionId = sessionCount;
        StudySession storage newSession = sessions[sessionId];
        
        newSession.topic = _topic;
        newSession.organizer = msg.sender;
        newSession.timestamp = block.timestamp;
        newSession.completed = false;
        newSession.participantCount = 0;
        
        // Add organizer as a participant automatically
        newSession.participants[msg.sender] = true;
        newSession.participantCount++;
        
        emit SessionCreated(sessionId, _topic, msg.sender, block.timestamp);
        sessionCount++;
        
        return sessionId;
    }
    
    /**
     * @dev Allows a user to join a study session
     * @param _sessionId The ID of the session to join
     */
    function joinStudySession(uint256 _sessionId) 
        public 
        validSessionId(_sessionId) 
        notCompleted(_sessionId) 
    {
        StudySession storage session = sessions[_sessionId];
        require(!session.participants[msg.sender], "Already joined this session");
        
        session.participants[msg.sender] = true;
        session.participantCount++;
        
        emit ParticipantJoined(_sessionId, msg.sender);
    }
    
    /**
     * @dev Marks a study session as completed and rewards the organizer
     * @param _sessionId The ID of the session to complete
     */
    function completeStudySession(uint256 _sessionId) 
        public 
        validSessionId(_sessionId)
        onlyOrganizer(_sessionId)
        notCompleted(_sessionId)
    {
        StudySession storage session = sessions[_sessionId];
        session.completed = true;
        
        // Reward the organizer
        tokenBalance[msg.sender] += rewardAmount;
        
        emit SessionCompleted(_sessionId, msg.sender);
        emit TokensRewarded(msg.sender, rewardAmount);
    }
    
    /**
     * @dev Checks if an address is a participant in a specific session
     * @param _sessionId The ID of the session
     * @param _participant The address to check
     * @return bool True if the address is a participant
     */
    function isParticipant(uint256 _sessionId, address _participant) 
        public 
        view 
        validSessionId(_sessionId) 
        returns (bool) 
    {
        return sessions[_sessionId].participants[_participant];
    }
    
    /**
     * @dev Gets the token balance of a user
     * @param _user The address of the user
     * @return uint256 The token balance
     */
    function getTokenBalance(address _user) public view returns (uint256) {
        return tokenBalance[_user];
    }
    
    /**
     * @dev Gets details about a study session
     * @param _sessionId The ID of the session
     * @return topic The topic of the session
     * @return organizer The address of the organizer
     * @return timestamp When the session was created
     * @return completed Whether the session is completed
     * @return participantCount The number of participants
     */
    function getSessionDetails(uint256 _sessionId)
        public
        view
        validSessionId(_sessionId)
        returns (
            string memory topic,
            address organizer,
            uint256 timestamp,
            bool completed,
            uint256 participantCount
        )
    {
        StudySession storage session = sessions[_sessionId];
        return (
            session.topic,
            session.organizer,
            session.timestamp,
            session.completed,
            session.participantCount
        );
    }
    
    /**
     * @dev Updates the reward amount for completing sessions
     * @param _newRewardAmount The new reward amount
     */
    function updateRewardAmount(uint256 _newRewardAmount) public onlyOwner {
        require(_newRewardAmount > 0, "Reward amount must be greater than 0");
        uint256 oldAmount = rewardAmount;
        rewardAmount = _newRewardAmount;
        emit RewardAmountUpdated(oldAmount, _newRewardAmount);
    }
    
    /**
     * @dev Transfers ownership of the contract
     * @param _newOwner The address of the new owner
     */
    function transferOwnership(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "New owner cannot be the zero address");
        owner = _newOwner;
    }
}
