import { serial, integer, text, boolean, timestamp, uuid, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});

export const markets = pgTable("markets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  ownerId: integer("owner_id")
            .notNull()
            .references(() => account.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  active: boolean("active").notNull().default(true),
});

export const account = pgTable("account", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  accountName: text("account_name").notNull(),
  discord: text("discord"),
  nationName: text("nation_name").notNull(),
});

export const item = pgTable("item", {
  id: serial("id").primaryKey(),
  marketId: integer("market_id")
              .notNull()
              .references(() => markets.id),
  name: text("name").notNull(),
  amount: integer("amount").notNull(),
});

export const marketRelations = relations(markets, ({ one, many }) => ({
  marketOwnerAccount: one(account, { fields: [markets.ownerId], references: [account.id] }),
  items: many(item),
}));

export const accountRelations = relations(account, ({ one }) => ({
  market: one(markets, { fields: [account.id], references: [markets.ownerId]})
}))

export const itemRelations = relations(item, ({ one }) => ({
  market: one(markets, { fields: [item.marketId], references: [markets.id] })
}));