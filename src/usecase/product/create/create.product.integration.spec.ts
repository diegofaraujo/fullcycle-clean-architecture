import { Sequelize } from "sequelize-typescript";
import { string } from "yup";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product",
      price: 10,
    };

    const output = {
      id: expect.any(string),
      name: "Product",
      price: 10,
    };

    const result = await usecase.execute(input);

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(output.name);
    expect(result.price).toEqual(output.price);
  });
});
