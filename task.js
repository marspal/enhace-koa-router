const ENOUGH_TIME = 1;

const workQueue = [];

let nextUnitWork = null;

function schedule(task){
  workQueue.push(task);
  requestIdleCallback(performWork);
}

function performWork(deadline){
  if(!nextUnitWork){
    nextUnitWork = workQueue.shift();
  }
  while(nextUnitWork && deadline.timeRemaining() > ENOUGH_TIME){
    nextUnitWork = performUnitOfWork(nextUnitWork);
  }
  if(nextUnitWork || workQueue.length){
    requestIdleCallback(performWork);
  }
}