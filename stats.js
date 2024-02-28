let trackings = {
    "2024-02-28": {
      key1: false,
      key2: true,
      key3: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-02-29": {
      key1: true,
      key2: true,
      key3: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-03-01": {
      key1: false,
      key2: true,
      key3: false,
      happiness: Math.floor(Math.random() * 10) + 1,
    },
    "2024-04-02": {
        key1: false,
        key2: true,
        key3: false,
        happiness: Math.floor(Math.random() * 10) + 1,
      },
  };
let amts = {

}

function createAmts(){
    Object.values(trackings).forEach(day => {
        Object.entries(day).forEach(([key, value]) => {
            if (key === 'happiness'){
                return;
            }
            if (!(key in amts)){
                if (value){
                    let newItem = {seen: 1, happiness: day['happiness']};
                    amts[key] = newItem;
                }
            }
            else{
                if (value){
                    amts[key][seen] += 1;
                    amts[key][happiness] += day['happiness'];
                }
            }
        })
    })
}

createAmts();