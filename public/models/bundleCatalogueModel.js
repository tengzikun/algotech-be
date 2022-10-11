const { prisma } = require('./index.js');

const createBundleCatalogue = async (req) => {
  const { price, bundleId } = req;

  await prisma.bundleCatalogue.create({
    data: {
      price,
      bundleId
    }
  });
};

const getAllBundleCatalogue = async () => {
  const bundleCatalogue = await prisma.bundleCatalogue.findMany({
    include: {
      bundle: {
        include: {
          bundleProduct: {
            select: {
              product: true,
              productId: true,
              quantity: true
            }
          }
        }
      }
    }
  });
  return bundleCatalogue;
};

const updateBundleCatalogue = async (req) => {
  const { id, price } = req;

  bundleCatalogue = await prisma.bundleCatalogue.update({
    where: { id },
    data: {
      price
    }
  });
  return bundleCatalogue;
};

const deleteBundleCatalogue = async (req) => {
  const { id } = req;
  await prisma.bundleCatalogue.delete({
    where: {
      id: Number(id)
    }
  });
};

const findBundleCatalogueById = async (req) => {
  const { id } = req;
  const bundleCatalogue = await prisma.bundleCatalogue.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      bundle: {
        include: {
          bundleProduct: {
            select: {
              product: true,
              productId: true,
              quantity: true
            }
          }
        }
      }
    }
  });
  return bundleCatalogue;
};

exports.createBundleCatalogue = createBundleCatalogue;
exports.getAllBundleCatalogue = getAllBundleCatalogue;
exports.updateBundleCatalogue = updateBundleCatalogue;
exports.deleteBundleCatalogue = deleteBundleCatalogue;
exports.findBundleCatalogueById = findBundleCatalogueById;
