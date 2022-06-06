import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const produt = ProductFactory.create("a", "Product", 10);

const input = {
  id: produt.id,
  name: produt.name,
  price: produt.price,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(produt),
    findAll: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  };
};

describe("Test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it("should throw an error when product name is empty", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "",
      price: 10,
    };

    await expect(productUpdateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when product price is lower than zero", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Product",
      price: -1,
    };

    await expect(productUpdateUseCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
