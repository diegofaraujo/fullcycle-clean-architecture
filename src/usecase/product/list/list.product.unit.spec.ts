import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product", 10);
const product2 = ProductFactory.create("b", "Product b", 45);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockResolvedValue([product1, product2]),
  };
};

describe("Unit test list product use case", () => {
  it("should return a list of products", async () => {
    const repository = MockRepository();
    const useCase = new ListProductUseCase(repository);

    const result = await useCase.execute({});

    expect(result).toEqual({
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price,
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price,
        },
      ],
    });
  });
});
