import { Sequelize } from "sequelize-typescript";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;
  let product1: ProductInterface;
  let product2: ProductInterface;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();

    const productRepository = new ProductRepository();
    product1 = ProductFactory.create("a", "Product", 10);
    product2 = ProductFactory.create("b", "Product b", 12);
    await productRepository.create(product1);
    await productRepository.create(product2);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const output = await usecase.execute({});

    expect(output).toEqual({
      products: [
        { name: product1.name, price: product1.price, id: product1.id },
        { name: product2.name, price: product2.price, id: product2.id },
      ],
    });
  });
});
