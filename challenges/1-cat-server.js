const { bannerContent } = require('../utils/database');
const request = require('../utils/server');

function checkServerStatus(callbackFun) {
  request('/status', callbackFun)
}

function fetchBannerContent(callbackArg) {
  request('/banner', (err, bannerContent) => {
    if (err) {
      callbackArg(err, bannerTest);
    }
    else {
      let bannerTest = {...bannerContent}
      bannerTest.copyrightYear = 2023;
      callbackArg(err, bannerTest);
    }}
  )
}

function fetchAllOwners(callbackOwners) {
request('/owners', (err, owners) => {
  if (err){
    callbackArg(err, owners);
  }
  else {
    let ownerNames = owners.map((owner) => 
      owner.toLowerCase()
    )
    callbackOwners(err, ownerNames)
  }
})
}

function fetchCatsByOwner(owner1, callbackO) {
  request(`/owners/${owner1}/cats`, (err, arrayOfcats) => {
    if (err){
      callbackO(`404 - ${owner1} not found`,arrayOfcats)
    }
    else{
      callbackO(err, arrayOfcats)
    }
  })
}

function fetchCatPics(arrayOfStrings,callback) {
  // define output array
  // loop input array
    // inside loop make a request if error push placeholder string else push the catname string 
  // end of loop invoke call back with that return output array
  let outPutArr =[];
  if(arrayOfStrings.length === 0) {
    callback(null, outPutArr);
  }
  for(let i=0;i<arrayOfStrings.length; i++){
    request(`/pics/${arrayOfStrings[i]}`,(err,cl)=>{
      if(err){
        outPutArr.push('placeholder.jpg');
      }
      else{
        outPutArr.push(cl);
        
      }
      if(outPutArr.length === arrayOfStrings.length) {
        callback(null, outPutArr);
      }
    })

  }
}

function fetchAllCats() {}

function fetchOwnersWithCats() {}

function kickLegacyServerUntilItWorks() {}

function buySingleOutfit() {}

module.exports = {
  buySingleOutfit,
  checkServerStatus,
  kickLegacyServerUntilItWorks,
  fetchAllCats,
  fetchCatPics,
  fetchAllOwners,
  fetchBannerContent,
  fetchOwnersWithCats,
  fetchCatsByOwner
};
