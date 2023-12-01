import { PrismaClient } from '@prisma/client'

const getProperties = async (location, pricePerNight) => {
    const prisma = new PrismaClient()

    return prisma.property.findMany({
        where: {
            location: {
                contains: location,
            },
            pricePerNight: {
                contains: pricePerNight,
            },
        },
    });
};

export default getProperties;