(function(module){// search recalls
  console.log('Inside cpsc IFFE');

  var cpsc = {};
  cpsc.all = [];

  cpsc.getRecalls = function() {
    $.get('http://www.saferproducts.gov/RestWebServices/Recall?format=json', function(data){
      if (data != null) {
        console.log(data);
        cpsc.all = data;
        console.log(cpsc.all.length);
      }else{
        alert('Recall database unavailable!');
      }
    });
  };

  cpsc.productUPC = function(dataAll){
    var upcObjects = dataAll.filter(function(dataEntry){
      return dataEntry.ProductUPCs.length !== 0;
    });
    return upcObjects;
  };

  cpsc.sort = function(upcData, upc){
   var replies = upcData.filter(function(entry){
     var upcObjs = entry.ProductUPCs.filter(function(upcObj){
       return upc === upcObj.UPC;
     });
     if (upcObjs.length > 0) {
       return entry;
     }
   });
   if (replies.length > 0) {
     return replies;
   } else {
     return false;
   }
 };

  // cpsc.sort = function(entries){
  //   var upcArray = [];
  //   entries.forEach(function(entry){
  //     upcArray.push(entry.ProductUPCs[0].UPC.replace(/\s/g,''));
  //   });
  //   return upcArray;
  // };
  //
  // cpsc.userCompare = function(entriesWithUPC, userUPC){
  //   var upcArr = [];
  //   upcArr = cpsc.sort(entriesWithUPC);
  //   var check = upcArr.indexOf(userUPC);
  //   if(check === -1) {
  //     console.log(userUPC);
  //     console.log('notfound');
  //     return false;
  //   }else{
  //     console.log('found');
  //     console.log(userUPC);
  //     console.log(entriesWithUPC[check]);
  //     return entriesWithUPC[check];
  //   }
  // };

  cpsc.mfgrSearch = function(mfgrName, dataAll){
    var replies = dataAll.filter(function(entry){
      var mfgrs = entry.Manufacturers.filter(function(mfgr){
        return mfgrName === mfgr.Name;
      });
      if (mfgrs.length > 0) {
        return entry;
      } else {
        return false;
      }
    });
    console.log(replies);
  };

  cpsc.controller = function(upc){
    var upcResult = cpsc.productUPC(cpsc.all);
    var cpscSearch = cpsc.sort(upcResult, upc);
    resultArray.flagProduction(cpscSearch);
    var productInfo = walmart.upcRequest(upc);
  };

  cpsc.getMfgr = function (item){
    console.log(item.name.split(/\s+/).slice(0,2).join(' '));
    console.log(item.name.split(/\s+/).slice(0,1).join(' '));
    cpsc.mfgrSearch(item.name.split(/\s+/).slice(0,2).join(' '), cpsc.all);
    cpsc.mfgrSearch(item.name.split(/\s+/).slice(0,1).join(' '), cpsc.all);
  };

  module.cpsc = cpsc;
})(window);
