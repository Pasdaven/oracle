// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CountdownTimer {
  uint256 public duration;

  event TimerStarted(uint256 startTime, uint256 duration);
  event TimerExpired();

  constructor(uint256 _duration) {
    duration = _duration;
  }

  function startTimer() public returns (uint256) {
    uint256 startTime = block.timestamp; // block.timestamp is the current block timestamp in seconds since the epoch (Jan 1 1970)
    emit TimerStarted(startTime, duration);
    return startTime;
  }

  function checkTimeNotExpired(uint256 startTime) public view returns (bool) {
    uint256 currentTime = block.timestamp;
    return currentTime < startTime + duration && currentTime >= startTime;
  }

  function checkTimerExpired(uint256 startTime) public view returns (bool) {
    uint256 currentTime = block.timestamp;
    return currentTime >= startTime + duration;
  }

  function expireTimer(uint256 startTime) public {
    require(checkTimerExpired(startTime), 'the timer has not expired yet');
    emit TimerExpired();
  }
}
