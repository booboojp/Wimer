import { markets, item, account  } from "../schema";
import db from "../drizzle";
import { asc, eq, not, count, and, sql  } from 'drizzle-orm';
import { password } from "bun";

//& Working
export const createAccount = async (username: string, password: string, accountName: string, discord: string, nationName: string) => {

    console.log(`Creating Account:\nUsername: ${username}\nPassword: ${password}\nAccount Name: ${accountName}\nDiscord: ${discord}\nNation Name: ${nationName}`);

    const checkDuplicateUsername = await db
        .select({ count: count()})
        .from(account)
        .where(eq(account.username, username))
        .execute();
    const hasDuplicatedUsername = checkDuplicateUsername[0].count > 0;
    const checkDuplicateAccount = await db
        .select({ count: count()})
        .from(account)
        .where(eq(account.accountName, accountName))
        .execute()
    const hasDuplicatedAccount = checkDuplicateAccount[0].count > 0;


    console.log("Checking for duplicate account name.");
    if (hasDuplicatedUsername) {
        console.log(`Username ${username} already exists.`);
        return;
    }
    console.log("No duplicate username found")
    console.log("Checking for duplicate account name");
    if (hasDuplicatedAccount) {
        console.log(`Account Name ${accountName} already exists.`);
        return;
    }
    console.log("No duplicate account information found.\n Creating account.");
    await db.insert(account).values({
        username: username,
        password: password,
        accountName: accountName,
        discord: discord,
        nationName: nationName,
    });
}
//& Working
export const viewAccountDataById = async (id: string) => {
    const data = await db.select().from(account).where(eq(account.id, id));
    const formattedData = data.map((account: any) => {
        return {
            id: account.id,
            username: account.username,
            password: account.password,
            accountName: account.accountName,
            discord: account.discord,
            nationName: account.nationName,
        }
    });
    return formattedData;
}
//& Working
export const viewAccountDataByUsername = async (username: string) => {
    const data = await db.select().from(account).where(eq(account.username, username));
    const formattedData = data.map((account: any) => {
        return {
            id: account.id,
            username: account.username,
            password: account.password,
            accountName: account.accountName,
            discord: account.discord,
            nationName: account.nationName,
        }
    });
    return formattedData;
}

export const editAccountUsername = async (id: string, username: string) => {
    console.log(`Changing username for account ID:${id} to ${username}`)
    const checkDuplicateUsername = await db
        .select({ count: count()})
        .from(account)
        .where(eq(account.username, username))
        .execute();
    const hasDuplicatedUsername = checkDuplicateUsername[0].count > 0;
    if (hasDuplicatedUsername) {
        console.log(`Username change fail, ${username} already exists.`);
        return;
    }
    await db.update(account).set({
        username: username,
    }).where(eq(account.id, id));
    console.log(`Username change success, ${username} is now the username for account ID:${id}`);
}
export const editAccountPassword = async (id: string, password: string) => {
    console.log(`Changing password for account ID:${id}`);
    await db.update(account).set({
        password: password,
    }).where(eq(account.id, id));
    console.log(`Password change success, password for account ID:${id} has been changed.`);
}
export const editAccountAccountName = async (id: string, accountName: string) => {
    console.log(`Changing account name for account ID:${id} to ${accountName}`);
    const checkDuplicateAccount = await db
        .select({ count: count()})
        .from(account)
        .where(eq(account.accountName, accountName))
        .execute();
    const hasDuplicatedAccount = checkDuplicateAccount[0].count > 0;
    if (hasDuplicatedAccount) {
        console.log(`Account Name change fail, ${accountName} already exists.`);
        return;
    }
    await db.update(account).set({
        accountName: accountName,
    }).where(eq(account.id, id));
    console.log(`Account Name change success, ${accountName} is now the account name for account ID:${id}`);
}
export const editAccountDiscord = async (id: string, discord: string) => {
    console.log(`Changing discord for account ID:${id} to ${discord}`);
    await db.update(account).set({
        discord: discord,
    }).where(eq(account.id, id));
    console.log(`Discord change success, ${discord} is now the discord for account ID:${id}`);
}
export const editAccountNationName = async (id: string, nationName: string) => {
    console.log(`Changing nation name for account ID:${id} to ${nationName}`);
    await db.update(account).set({
        nationName: nationName,
    }).where(eq(account.id, id));
    console.log(`Nation Name change success, ${nationName} is now the nation name for account ID:${id}`);
}

export const deleteAccount = async (id: string) => {
    console.log(`Deleting account ID:${id}`);
    await db.delete(account).where(eq(account.id, id));
    console.log(`Account ID:${id} has been deleted.`);
}

export const viewAllAccounts = async () => {
    const data = await db.select().from(account);
    const formattedData = data.map((account: any) => {
        return {
            id: account.id,
            username: account.username,
            password: account.password,
            accountName: account.accountName,
            discord: account.discord,
            nationName: account.nationName,
        }
    });
}
// view all accounts