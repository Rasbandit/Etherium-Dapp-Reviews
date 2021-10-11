pragma solidity ^0.6.0;

import './SchloadCoin.sol';

/**
 * @title Location
 * @dev Location reviews and associated data.
 */
contract Location {
    address coinAddress;
    string public name;
    string public locationId;
    uint256 public reviewAggregate;
    uint256 public reviewCount;
    Review[] public reviews;

    struct Review {
        string text;
        uint8 rating;
        address user;
    }

    constructor(string memory _name, string memory _locationId, address _coinAddress) public {
        name = _name;
        locationId = _locationId;
        reviewCount = 0;
        reviewAggregate = 0;
        coinAddress=_coinAddress;
    }

    function addReview(string memory _text, uint8 _rating) payable public {
      require(_rating >= 0);
      require(_rating <= 5);

      reviews.push(Review(_text, _rating, msg.sender));
      reviewAggregate = reviewAggregate + _rating;
      reviewCount++;

      SchloadCoin schd = SchloadCoin(coinAddress);
      schd.rewardTokens(msg.sender);
    }
}
