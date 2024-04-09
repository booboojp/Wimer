import { markets, item, account  } from "../schema";
import db from "../drizzle";
import { asc, eq, not, count, and, sql  } from 'drizzle-orm';

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


export const createMarket = async (name: string, ownerId: any) => {
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


export const getMarketAllItemsCount = async (marketId: number) => {
    const data = await db.select({ count: count() }).from(item).where(eq(item.marketId, marketId)).execute();
    return data[0].count;
}

