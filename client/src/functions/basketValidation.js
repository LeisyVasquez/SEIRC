function validation(basketList, basketUserList){
    const basketListDelete = new Set();
    const basketListRepeat = new Set();
    convertMap(basketList,basketListDelete,basketListRepeat);
    
    for(let i =0;i<basketUserList.length;i++){
        if(basketListDelete.has(basketUserList[i].typeBaskets)){
            basketListDelete.delete(basketUserList[i].typeBaskets);
            const regex = /^[0-9]*$/;      
            if(regex.test(basketUserList[i].quantity) && basketUserList[i].quantity!=="" && basketUserList[i].quantity!==0)continue;
            else return -1 + " "+ (i+1);
        }else{
            if(basketListRepeat.has(basketUserList[i].typeBaskets)) return -2 + " " + (i+1);
            else return -3 + " "+(i+1);
        }
    }
    return 1+ " "+0;
}

function convertMap (basketList,set1,set2){
    for(let i = 0; i<basketList.length;i++){
        set1.add(basketList[i]);
        set2.add(basketList[i]);
    }
}

module.exports = {
    validation
}