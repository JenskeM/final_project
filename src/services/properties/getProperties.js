import { PrismaClient } from '@prisma/client'

const getProperties = async (location, pricePerNight) => {

    prisma = new PrismaClient()
    const properties = await prisma.property.findMany({
        where: {
            location: {
                contains: location,
            },
            pricePerNight
        },
    });

    return properties;

};

export default getProperties;