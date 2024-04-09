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

export const addItemToMarket = async (itemNamespacedId: string, amount: number, marketId: number) => {
    const resultMarketID = await db
        .select({ count: count() })
        .from(item)
        .where(eq(item.marketId, marketId))
        .execute();
    const existsMarketID = resultMarketID[0].count >0;
    const resultNamespacedId = await db
        .select({ count: count() })
        .from(item)
        .where(eq(item.namespacedId, itemNamespacedId))
        .execute();
    const existsNamespacedId = resultNamespacedId[0].count >0;
    if (existsMarketID && existsNamespacedId) {
        console.log(`Item ${itemNamespacedId} already is in market ID:${marketId}\nAdding ${amount} to item:${itemNamespacedId} in market ID:${marketId}`)
        await db
            .update(item)
            .set({
                amount: sql`${item.amount} + ${amount}`,
            })
            .where(and(eq(item.marketId, marketId), eq(item.namespacedId, itemNamespacedId)));
        const logData = await db.select().from(item).where(eq(item.namespacedId, itemNamespacedId)).execute();
        console.log(`New Item Data: ${logData}`);
    } else if (existsMarketID) {
        console.log(`Item ${itemNamespacedId} already not market ID:${marketId}\nAdding new item: ${itemNamespacedId} to market ID:${marketId}`)
        const itemData = await getMinecraftItemData(itemNamespacedId);
        await db.insert(item).values({
            name: itemData.name,
            namespacedId: itemNamespacedId,
            amount: amount,
            marketId: marketId,
        });
        const logData = await db.select().from(item).where(eq(item.namespacedId, itemNamespacedId)).execute();
        console.log(`New Item Data: ${logData}`);
    } else {
        console.log(`Item ${itemNamespacedId} already not market ID:${marketId}, and market ID:${marketId} does not exist.`)
    }
}

export const findAllItemTypesInMarket = async (marketId: number) => {
    const data = await db.select().from(item).where(eq(item.marketId, marketId)).orderBy(asc(item.name));
    const formattedData = data.map((item: any) => {
        return {
            name: item.name,
            amount: item.amount,
        };
    });
    console.log(formattedData);
}