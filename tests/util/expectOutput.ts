import { defaultGeneratorOptions } from "../../src/config";
import { GeneratorOutputImpl } from "../../src/generator/GeneratorOutputImpl";
import { GeneratorContext, GeneratorPart } from "../../src/generator/types";

export function expectOutputForPart(
  part: GeneratorPart,
  options: { context?: Partial<GeneratorContext> } = {}
) {
  const { context } = options;
  const output = new GeneratorOutputImpl();

  return expect(
    part
      .visit({
        output,
        context: context as GeneratorContext,
        config: defaultGeneratorOptions,
      })
      .then(() => output.toString())
  );
}
