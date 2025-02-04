const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const encryptedPassword = await bcrypt.hash('password', 10);

  await prisma.brand.create({
    data: {
      name: 'The Kettle Gourmet'
    }
  });

  await prisma.brand.create({
    data: {
      name: 'Popcorn Maker'
    }
  });

  await prisma.category.create({
    data: {
      name: 'Asian Favourites'
    }
  });

  await prisma.category.create({
    data: {
      name: 'Spicy Snacks'
    }
  });

  await prisma.location.create({
    data: {
      name: 'Punggol Warehouse',
      address: 'Blk 303B Punggol Central #05-792'
    }
  });

  await prisma.location.create({
    data: {
      name: 'Bishan Warehouse',
      address: 'Blk 117 Ang Mo Kio Ave 4 #08-467'
    }
  });

  await prisma.supplier.create({
    data: {
      email: 'tanwk@comp.nus.edu.sg',
      name: 'Wee Kek',
      address: 'Blk 117 Ang Mo Kio Ave 4 #08-467',
      currency: 'SGD - Singapore Dollar'
    }
  });

  await prisma.product.create({
    data: {
      sku: 'SKU123',
      name: 'Nasi Lemak Popcorn',
      brandId: 1,
      qtyThreshold: 20,
      productCategory: {
        create: [
          {
            categoryName: 'Asian Favourites',
            productSku: 'SKU123',
            category: {
              connect: {
                name: 'Asian Favourites'
              }
            }
          }
        ]
      },
      stockQuantity: {
        create: [
          {
            productName: 'Nasi Lemak Popcorn',
            productSku: 'SKU123',
            quantity: 20,
            locationName: 'Punggol Warehouse',
            location: {
              connect: {
                id: 1
              }
            }
          }
        ]
      }
    }
  });

  await prisma.product.create({
    data: {
      sku: 'SKU124',
      name: 'Fish Head Curry Popcorn',
      brandId: 1,
      qtyThreshold: 20,
      productCategory: {
        create: [
          {
            categoryName: 'Asian Favourites',
            productSku: 'SKU124',
            category: {
              connect: {
                name: 'Asian Favourites'
              }
            }
          }
        ]
      },
      stockQuantity: {
        create: [
          {
            productName: 'Fish Head Curry Popcorn',
            productSku: 'SKU124',
            quantity: 50,
            locationName: 'Punggol Warehouse',
            location: {
              connect: {
                id: 1
              }
            }
          }
        ]
      }
    }
  });

  await prisma.product.create({
    data: {
      sku: 'SKU125',
      name: 'Salted Caramel Popcorn',
      brandId: 1,
      qtyThreshold: 20,
      productCategory: {
        create: [
          {
            categoryName: 'Asian Favourites',
            productSku: 'SKU125',
            category: {
              connect: {
                name: 'Asian Favourites'
              }
            }
          }
        ]
      },
      stockQuantity: {
        create: [
          {
            productName: 'Salted Caramel Popcorn',
            productSku: 'SKU125',
            quantity: 50,
            locationName: 'Punggol Warehouse',
            location: {
              connect: {
                id: 1
              }
            }
          }
        ]
      }
    }
  });

  await prisma.product.create({
    data: {
      sku: 'SKU126',
      name: 'Chocolate Popcorn',
      brandId: 1,
      qtyThreshold: 20,
      productCategory: {
        create: [
          {
            categoryName: 'Asian Favourites',
            productSku: 'SKU126',
            category: {
              connect: {
                name: 'Asian Favourites'
              }
            }
          }
        ]
      },
      stockQuantity: {
        create: [
          {
            productName: 'Chocolate Popcorn',
            productSku: 'SKU126',
            quantity: 50,
            locationName: 'Punggol Warehouse',
            location: {
              connect: {
                id: 1
              }
            }
          }
        ]
      }
    }
  });

  await prisma.product.create({
    data: {
      sku: 'SKU127',
      name: 'Pulut Hitam Popcorn',
      brandId: 1,
      qtyThreshold: 20,
      productCategory: {
        create: [
          {
            categoryName: 'Asian Favourites',
            productSku: 'SKU127',
            category: {
              connect: {
                name: 'Asian Favourites'
              }
            }
          }
        ]
      },
      stockQuantity: {
        create: [
          {
            productName: 'Pulut Hitam Popcorn',
            productSku: 'SKU127',
            quantity: 50,
            locationName: 'Punggol Warehouse',
            location: {
              connect: {
                id: 1
              }
            }
          }
        ]
      }
    }
  });

  await prisma.bundle.create({
    data: {
      name: 'Nasi Lemak Mega Bundle (8 x 65g)',
      description: '8 x Nasi Lemak Popcorn',
      bundleProduct: {
        create: [
          {
            productSku: 'SKU123',
            productName: 'Nasi Lemak Popcorn',
            bundleName: 'Nasi Lemak Mega Bundle (8 x 65g)',
            quantity: 8,
            product: {
              connect: {
                id: 1
              }
            }
          }
        ]
      }
    }
  });

  await prisma.bundle.create({
    data: {
      name: 'Fish Head Curry Mega Bundle (8 x 65g)',
      description: '8 x Fish Head Curry Popcorn',
      bundleProduct: {
        create: [
          {
            productSku: 'SKU124',
            productName: 'Fish Head Curry Popcorn',
            bundleName: 'Fish Head Curry Mega Bundle (8 x 65g)',
            quantity: 8,
            product: {
              connect: {
                id: 2
              }
            }
          }
        ]
      }
    }
  });

  await prisma.bundle.create({
    data: {
      name: 'Classic Flavours Mini Bundle (4 x 65g)',
      description: '4 x Classic Flavours Popcorn',
      bundleProduct: {
        create: [
          {
            productSku: 'SKU125',
            productName: 'Salted Caramel Popcorn',
            bundleName: 'Classic Flavours Mini Bundle (4 x 65g)',
            quantity: 2,
            product: {
              connect: {
                id: 3
              }
            }
          },
          {
            productSku: 'SKU126',
            productName: 'Chocolate Popcorn',
            bundleName: 'Classic Flavours Mini Bundle (4 x 65g)',
            quantity: 2,
            product: {
              connect: {
                id: 4
              }
            }
          }
        ]
      }
    }
  });

  await prisma.bundle.create({
    data: {
      name: 'Shiok Ah! Specialty Bundle (6 x 65g)',
      description: '6 x Specialty Popcorn',
      bundleProduct: {
        create: [
          {
            productSku: 'SKU124',
            productName: 'Fish Head Curry Popcorn',
            bundleName: 'Shiok Ah! Specialty Bundle (6 x 65g)',
            quantity: 3,
            product: {
              connect: {
                id: 2
              }
            }
          },
          {
            productSku: 'SKU127',
            productName: 'Pulut Hitam Popcorn',
            bundleName: 'Shiok Ah! Specialty Bundle (6 x 65g)',
            quantity: 3,
            product: {
              connect: {
                id: 5
              }
            }
          }
        ]
      }
    }
  });

  await prisma.productCatalogue.create({
    data: {
      price: 5.0,
      productId: 1,
      description:
        "Our signature flavour. You won't be able to tell the difference between this and the real thing!"
    }
  });

  await prisma.productCatalogue.create({
    data: {
      price: 5.0,
      productId: 3,
      description:
        "Can't go wrong with the classics. Sweet and salty at the same time."
    }
  });

  await prisma.productCatalogue.create({
    data: {
      price: 5.0,
      productId: 4,
      description:
        'Combining our favourite dessert with our favourite snack. Meet our take on Chocolate Popcorn!'
    }
  });

  await prisma.bundleCatalogue.create({
    data: {
      price: 34.99,
      bundleId: 1,
      description:
        "For those that just can't get enough of Nasi Lemak. Cheaper as a bundle!"
    }
  });

  await prisma.bundleCatalogue.create({
    data: {
      price: 27.99,
      bundleId: 4,
      description:
        'For those who love specialty flavours. Cheaper when you buy a bundle!'
    }
  });

  await prisma.procurementOrder.create({
    data: {
      orderDate: new Date(),
      description: 'Procurement Order',
      totalAmount: 20,
      paymentStatus: 'PENDING',
      fulfilmentStatus: 'CREATED',
      warehouseName: 'Punggol Warehouse',
      warehouseAddress: 'Blk 303B Punggol Central #05-792',
      currency: 'SGD - Singapore Dollar',
      procOrderItems: {
        create: [
          {
            quantity: 20,
            productSku: 'SKU123',
            productName: 'Nasi Lemak Popcorn',
            rate: 16
          }
        ]
      },
      supplierId: 1,
      supplierName: 'Wee Kek',
      supplierAddress: 'Blk 117 Ang Mo Kio Ave 4 #08-467',
      supplierEmail: 'tanwk@comp.nus.edu.sg'
    }
  });

  await prisma.LeaveQuota.create({
    data: {
      tier: 'Tier 1',
      annual: 10,
      childcare: 10,
      compassionate: 10,
      parental: 10,
      sick: 10,
      unpaid: 10
    }
  });

  await prisma.LeaveQuota.create({
    data: {
      tier: 'Tier 2',
      annual: 15,
      childcare: 15,
      compassionate: 15,
      parental: 15,
      sick: 15,
      unpaid: 15
    }
  });

  await prisma.LeaveQuota.create({
    data: {
      tier: 'Tier 3',
      annual: 20,
      childcare: 20,
      compassionate: 20,
      parental: 20,
      sick: 20,
      unpaid: 20
    }
  });

  await prisma.User.create({
    data: {
      firstName: 'Destinee',
      lastName: 'Ow',
      email: 'destineeow32@gmail.com',
      password: encryptedPassword,
      role: 'ADMIN',
      isVerified: true,
      tier: 'Tier 3'
    }
  });
  await prisma.User.create({
    data: {
      firstName: 'Wee Kek',
      lastName: 'Tan',
      email: 'tanwk@comp.nus.edu.sg',
      password: encryptedPassword,
      role: 'ADMIN',
      isVerified: false,
      tier: 'Tier 2'
    }
  });

  await prisma.User.create({
    data: {
      firstName: 'Kelly',
      lastName: 'Ng',
      email: 'ng.kelly.jl@gmail.com',
      password: encryptedPassword,
      role: 'ADMIN',
      isVerified: true,
      tier: 'Tier 1'
    }
  });

  await prisma.User.create({
    data: {
      firstName: 'Wee Kek',
      lastName: 'Tan',
      email: 'tanwk+user@comp.nus.edu.sg',
      password: encryptedPassword,
      role: 'FULLTIME',
      isVerified: false,
      tier: 'Tier 2'
    }
  });

  await prisma.User.create({
    data: {
      firstName: 'Zi Kun',
      lastName: 'Teng',
      email: 'meleenoob971+b2b@gmail.com',
      password: encryptedPassword,
      role: 'B2B',
      isVerified: false,
      tier: 'Tier 3'
    }
  });

  await prisma.discountCode.create({
    data: {
      discountCode: 'XMAS2020',
      minOrderAmount: 20.0,
      amount: 10,
      startDate: '2022-09-10T00:00:00.000Z',
      endDate: '2022-12-10T00:00:00.000Z',
      customerEmails: [],
      type: 'FLAT_AMOUNT'
    }
  });

  await prisma.discountCode.create({
    data: {
      discountCode: '10PERCENT',
      minOrderAmount: 20.0,
      amount: 10,
      startDate: '2022-09-10T00:00:00.000Z',
      endDate: '2022-12-10T00:00:00.000Z',
      customerEmails: [],
      type: 'PERCENTAGE'
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
