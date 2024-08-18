import { Account, Client, ID } from 'react-native-appwrite';



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

export const createUser = () => {
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
}




