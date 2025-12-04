import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed suppliers
    const supplier1 = await prisma.supplier.create({
        data: {
            name: 'Supplier One',
            contact: 'contact@supplierone.com',
            phone: '123-456-7890',
        },
    });

    const supplier2 = await prisma.supplier.create({
        data: {
            name: 'Supplier Two',
            contact: 'contact@suppliertwo.com',
            phone: '098-765-4321',
        },
    });

    // Seed customers
    const customer1 = await prisma.customer.create({
        data: {
            name: 'Customer One',
            email: 'customerone@example.com',
            phone: '555-1234',
        },
    });

    const customer2 = await prisma.customer.create({
        data: {
            name: 'Customer Two',
            email: 'customertwo@example.com',
            phone: '555-5678',
        },
    });

    // Seed products
    const product1 = await prisma.product.create({
        data: {
            name: 'Product One',
            price: 10.99,
            quantity: 100,
            supplierId: supplier1.id,
        },
    });

    const product2 = await prisma.product.create({
        data: {
            name: 'Product Two',
            price: 20.99,
            quantity: 50,
            supplierId: supplier2.id,
        },
    });

    console.log({ supplier1, supplier2, customer1, customer2, product1, product2 });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });