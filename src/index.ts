import {addTodo, getData, editTodo, toggleTodo, deleteTodo} from "./db/actions/todoActions";
import {createMarket, deleteMarket, getAllMarkets} from "./db/actions/marketActions";
import {createAccount} from "./db/actions/marketActions";
//createMarket(getRandomInt(1, 10000), "Shop Haven", 1);

const prompt: string = "(1) Add\n(2) View\n(3) Delete\n";
