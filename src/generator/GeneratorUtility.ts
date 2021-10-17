import { Response, Route } from "./types";
import { upperFirst } from "lodash";
import { ParameterObject } from "openapi-typescript";

export class GeneratorUtility {
  /**
   * A helper method which returns a unique identifier for the generated file based on the given OpenAPI route definition.
   * 
   * @param route The OpenAPI route
   * @returns A unique identifier for the route
   */
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

  /**
   * A helper method which returns a identifier prefix by the unique identifier for the OpenAPI route
   * @param route The OpenAPI route
   * @param identifier A name for an identifier
   * @returns The identifier prefixed by the unique identifier for the OpenAPI route
   */
  static getRouteSpecificIdentifier(route: Route, identifier: string) {
    if (identifier.length === 0) throw new Error(`"identifier" can't be empty`);
    const uniqueRouteIdentifier = this.getUniqueRouteIdentifier(route);

    return `${uniqueRouteIdentifier}${identifier}`;
  }

  /**
   * Converts a OpenAPI route string to a `express` one. This means replacing all `{param}` to the `:param` notation. 
   * @param openApiRoute The OpenAPI route string
   * @returns A express route string
   */
  static getExpressRoute(openApiRoute: string) {
    return openApiRoute.replace(routeParamRegex, ":$1");
  }

  /**
   * 
   * @param route 
   * @returns 
   */
  static getResponsesForRoute(route: Route) {
    const responses = route.operation?.responses ?? {};
    const arr: Response[] = [];

    for (const status in responses) {
      const response = responses[status];

      // Skip refs, because `@apidevtools/swagger-parser` resolves them already.
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

  /**
   * Get a list of route parameters by their kind
   * @param route The route object of OpenAPI
   * @param param The kind of parameter 
   * @returns 
   */
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

  /**
   * Checks if an identifier is valid
   * @param identifier 
   * @returns Boolean if the identifier is valid or not
   */
  static isValidIdentifier(identifier: string) {
    return identifier.match(regexInvalidIdentifierCharacters) == null;
  }

  /**
   * Combines a OpenAPI Route and Response object into a string which uniquely identifies it.
   * @param route The OpenAPI route object
   * @param response The OpenAPI response object
   * @returns A string which uniquely identifies it Route and Response
   */
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

  static getCommonDescription(props?: {
    description?: string;
    summary?: string;
  }) {
    if (props == null) return;
    return props.description ?? props.summary;
  }
}

const routeParamRegex = /{(.+?)}/gm;
const regexInvalidIdentifierCharacters = /[^0-9a-zA-Z$_]/gm;
