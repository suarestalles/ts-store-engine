import { prisma } from "../shared/database/prisma";

beforeAll(async () => {
    await prisma.$connect();
});

beforeEach(async () => {
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
})

afterAll(async () => {
    await prisma.$disconnect();
})

export async function clearDataBase() {
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
}