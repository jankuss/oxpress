import {
  GeneratorContext,
  GeneratorPart,
  GeneratorPartOptions,
  Route,
} from "../types";
import { REQUEST_HANDLER_IDENTIFIER } from "../constants";
import { GeneratorUtility } from "../GeneratorUtility";

export class RouterTypePart implements GeneratorPart {
  async visit({ output, context }: GeneratorPartOptions): Promise<void> {
    output.addContent(RouteType(context));
  }
}

const RouteType = (context: GeneratorContext) => {
  const allRoutes = context.getAllRoutes();

  return `// @ts-ignore
export interface TypedExpressRouter implements IRouter {
${allRoutes.map((route) => RouteTypeProperty(context, route)).join("\n")}
}`;
};

const RouteTypeProperty = (context: GeneratorContext, route: Route) => {
  const { method, path } = route;
  const handlerIdentifier = GeneratorUtility.getRouteSpecificIdentifier(
    route,
    REQUEST_HANDLER_IDENTIFIER
  );

  const expressRoute = GeneratorUtility.getExpressRoute(path);

  const strings: string[] = [];
  const description = GeneratorUtility.getCommonDescription(route.operation);

  if (description != null) {
    strings.push(`  /** ${description} */`);
  }

  strings.push(
    `  ${method}(path: "${expressRoute}", handler: ${handlerIdentifier}): void;`
  );
  return strings.join("\n");
};
