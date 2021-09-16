import {
  ROUTER_TYPE_IDENTIFIER,
  VALIDATION_MIDDLEWARE_IDENTIFIER,
} from "../constants";
import { GeneratorPart, GeneratorPartOptions } from "../types";

export class WrapFunctionPart implements GeneratorPart {
  async visit({ output, config }: GeneratorPartOptions): Promise<void> {
    const content: string[] = [];

    if (config.invokeValidationMiddleware) {
      content.push(`router.use(${VALIDATION_MIDDLEWARE_IDENTIFIER});`);
    }

    content.push(`return router as ${ROUTER_TYPE_IDENTIFIER};`);

    output.addContent(`export function wrap<T extends IRouter>(router: T): ${ROUTER_TYPE_IDENTIFIER} {
${content.map((value) => `  ${value}`).join("\n")}
}`);
  }
}
