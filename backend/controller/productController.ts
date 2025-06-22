import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entity/product';

const productRepo = AppDataSource.getRepository(Product);

export const getProducts = async (req: Request, res: Response) => {
  const products = await productRepo.find();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  console.log('hello');
  const files = req.files as Express.Multer.File[];

  const images = files.map((file, index) => ({
    id: index + 1,
    url: `/uploads/${file.filename}`,
  }));

  const { sku, name, price } = req.body;

  const product = new Product();
  product.sku = sku;
  product.name = name;
  product.price = parseFloat(price);
  product.images = images;

  await productRepo.save(product);

  res.status(201).json(product);
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { sku, name, price, existingImages } = req.body;

    const product = await productRepo.findOneBy({ id });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const parsedExistingImages =
      existingImages && typeof existingImages === 'string'
        ? JSON.parse(existingImages).map((url: string, index: number) => ({
            id: index + 1,
            url,
          }))
        : [];

    const files = Array.isArray(req.files) ? req.files : [];

    const newImages = files.map((file, index) => ({
      id: parsedExistingImages.length + index + 1,
      url: `/uploads/${file.filename}`,
    }));

    const finalImages = [...parsedExistingImages, ...newImages];

    product.sku = sku;
    product.name = name;
    product.price = parseFloat(price);
    product.images = finalImages;

    await productRepo.save(product);

    res.status(200).json(product);
  } catch (error) {
    console.error('Update Product Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await productRepo.delete(id);
  res.status(204).send();
};
