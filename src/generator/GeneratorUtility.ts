import { Response, Route } from "./types";
import { upperFirst } from "lodash";
import { ParameterObject } from "openapi-typescript";

export class GeneratorUtility {
  static getUniqueRouteIdentifier(route: Route) {
    let str = "";
    str += upperFirst(route.method);
    str += route.path
      .split("/")
      .map((value) => value.replace(routeParamRegex, "$1"))
      .map((value) => upperFirst(value))
      .join("");

    if (!this.isValidIdentifier(str)) {
      throw new Error(`The route "${route.path}" contains invalid characters.`);
    }

    return str;
  }

  static getRouteSpecificIdentifier(route: Route, identifier: string) {
    if (identifier.length === 0) throw new Error(`"identifier" can't be empty`);
    const uniqueRouteIdentifier = this.getUniqueRouteIdentifier(route);

    return `${uniqueRouteIdentifier}${identifier}`;
  }

  static getExpressRoute(openApiRoute: string) {
    return openApiRoute.replace(routeParamRegex, ":$1");
  }

  static getResponsesForRoute(route: Route) {
    const responses = route.operation?.responses ?? {};
    const arr: Response[] = [];

    for (const status in responses) {
      const response = responses[status];
      if ("$ref" in response) continue;

      for (const contentType in response.content) {
        arr.push({
          status: Number(status),
          content: response.content[contentType],
          type: contentType,
          route: route,
        });
      }
    }

    return arr;
  }

  static getRouteParametersOfKind<T extends ParameterObject["in"]>(
    route: Route,
    param: T
  ): ParameterObject[] {
    const result =
      route.operation?.parameters?.filter((p) => {
        if ("$ref" in p) {
          return false;
        } else {
          return p.in === param;
        }
      }) ?? [];

    return result as ParameterObject[];
  }

  static isValidIdentifier(identifier: string) {
    return identifier.match(regexInvalidIdentifierCharacters) == null;
  }

  static getResponseBodyIdentifier(route: Route, response: Response) {
    const { status, type: contentType } = response;

    return this.getRouteSpecificIdentifier(
      route,
      `ResponseBody${status}${contentType
        .split("/")
        .map((value) => upperFirst(value))
        .join("")}`
    );
  }
}

const routeParamRegex = /{(.+?)}/gm;
const regexInvalidIdentifierCharacters = /[^0-9a-zA-Z$_]/gm;
