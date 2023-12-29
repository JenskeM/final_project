import { PrismaClient } from '@prisma/client';

const getUsers = async (username, email) => {
    // console.log("Ontvangen zoekcriteria:", username, email);

    const prisma = new PrismaClient();
    const users = await prisma.user.findMany({
        where: {
            username: {
                contains: username,
            },
            email: {
                contains: email,
            }
        }
    });

    //console.log("Users found:", users);

    return users;

};

export default getUsers;
