import {ROUTER_TYPE_IDENTIFIER, VALIDATION_MIDDLEWARE_IDENTIFIER} from "../constants";
import {GeneratorPart, GeneratorPartOptions} from "../types";

export class WrapFunctionPart implements GeneratorPart {
    async visit({ output }: GeneratorPartOptions): Promise<void> {
        output.addContent(`export function wrap<T extends IRouter>(app: T): ${ROUTER_TYPE_IDENTIFIER} {
  app.use(${VALIDATION_MIDDLEWARE_IDENTIFIER});
  return app as ${ROUTER_TYPE_IDENTIFIER};
}`);
    }
}