import {createMarket, deleteMarket, getAllMarkets} from "./db/actions/marketActions";
import {createAccount, viewAccountDataById, viewAccountDataByUsername, editAccountUsername, editAccountPassword, editAccountAccountName, editAccountDiscord, editAccountNationName } from "./db/actions/accountActions";
import {addItemToMarket, findAllItemTypesInMarket} from "./db/actions/itemActions";
const exit = async() => {
    process.exit();
}
/*createAccount("thebooboo", "123456789", "Taran", "thebooboo", "Oblivion")
    .then(() => { 
        viewAccountDataById("thebooboo")
            .then((data) => { 
                console.log(data);})
    }).finally(() => {
        process.exit();
    });*/

/*viewAccountDataById("2").then((data) => {
    console.log(data);
    exit()
});*/

viewAccountDataByUsername("thebooboo").then((data) => {
    console.log(data);
    exit()
});