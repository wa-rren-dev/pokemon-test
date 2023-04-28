import { evolutionChain } from "./index";
import expectedResponse from "./expected-response.json";

describe("Pokemon evolution chain", () => {
  it("Should throw without a Pokemon supplied", async (): Promise<void> => {
    await expect(async () => {
      await evolutionChain("");
    }).rejects.toThrowErrorMatchingInlineSnapshot(`"No name supplied"`);
  });

  it("Should throw if response is 404 for no pokemon found", async (): Promise<void> => {
    await expect(async () => {
      await evolutionChain("Barry");
    }).rejects.toThrowErrorMatchingInlineSnapshot(`"No pokemon found with the name Barry"`);
  });

  it("Should return expected result for caterpie", async (): Promise<void> => {
    const output = await evolutionChain("caterpie");
    expect(output).toEqual(JSON.stringify(expectedResponse));
  });

  it("Should return expected result for metapod", async (): Promise<void> => {
    const output = await evolutionChain("metapod");
    expect(output).toEqual(JSON.stringify(expectedResponse));
  });

  it("Should return expected result for butterfree", async (): Promise<void> => {
    const output = await evolutionChain("butterfree");
    expect(output).toEqual(JSON.stringify(expectedResponse));
  });
});
