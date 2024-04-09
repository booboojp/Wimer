import { markets } from "../schema";
import { item } from "../schema";
import { account } from "../schema";
import db from "../drizzle";
import { asc, eq, not } from 'drizzle-orm';
import {v4 as uuidv4} from 'uuid';

async function getMinecraftItemData(namespacedId: string) {
    try {
      const response = await fetch('https://minecraft-api.vercel.app/api/items');
      const data = await response.json();
      const itemData = data.filter((item: any) => item.namespacedId === namespacedId);
      return itemData[0];
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }


export const createMarket = async (name: string, ownerId: number) => {
    await db.insert(markets).values({
        name: name,
        ownerId: ownerId,
    });
}
export const deleteMarket = async (marketName: string) => {
    await db.delete(markets).where(eq(markets.name, marketName));
}
export const getAllMarkets = async () => {
    const data = await db.select().from(markets).orderBy(asc(markets.name));
    return data;
}

export const createAccount = async () => {
    await db.insert(account).values({
        username: "thebooboo",
        password: "test",
        accountName: "test",
        discord: "test",
        nationName: "test",
    });
}



/*export const addItemToMarket = async (itemNamespacedId: string, amount: number, marketId: number) => {

}*/
