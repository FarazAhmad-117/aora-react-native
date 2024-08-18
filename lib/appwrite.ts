import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';



export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: "com.faraz.aora",
    projectId: '66c19f260023ad45038f',
    databaseId: '66c1b381000c66583111',
    userCollectionId: '66c1b3be0022bf3d14d5',
    videoCollectionId: '66c1b3f300046b10d88f',
    storageId: '66c1ec7900384f2cc460',
}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

type CreateUserProps = {
    email: string;
    password: string;
    username: string;
}

export const createUser = async ({ email, password, username }: CreateUserProps) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username);

        await signIn({ email, password });

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                avatar: avatarUrl,
                username
            }
        );
        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}


export async function signIn({ email, password }: { email: string, password: string }) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}


export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );
        if (!currentUser) throw Error;
        return currentUser;
    } catch (error) {
        console.log(error);
    }
}



