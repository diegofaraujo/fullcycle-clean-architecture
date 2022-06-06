import { Sequelize } from "sequelize-typescript";
import { string } from "yup";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;
  let product: ProductInterface;

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
    product = ProductFactory.create("a", "Product", 10);
    await productRepository.create(product);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: product.id,
      name: "Product Updated",
      price: 12,
    };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: product.id,
      name: input.name,
      price: input.price,
    });
  });
});
