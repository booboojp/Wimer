import { serial, integer, text, boolean, timestamp, uuid, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const markets = pgTable("markets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  ownerId: uuid("owner_id")
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
  id: uuid("id").primaryKey().defaultRandom(),
  marketId: integer("market_id")
              .notNull()
              .references(() => markets.id).unique(),
  name: text("name").notNull(),
  namespacedId: text("namespaced_id").notNull(),
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