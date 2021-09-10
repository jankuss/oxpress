import {GeneratorPart, GeneratorPartOptions, Route} from "../types";
import {REQUEST_HANDLER_IDENTIFIER, REQUEST_IDENTIFIER, RESPONSE_IDENTIFIER} from "../constants";

export class RequestHandlerTypePart implements GeneratorPart {
    constructor(private _route: Route) {

    }


    async visit({ context, config, output }: GeneratorPartOptions): Promise<void> {
        const identifierRequestHandler = context.getRequestHandlerTypeIdentifierName(
            this._route,
            REQUEST_HANDLER_IDENTIFIER
        );
        const identifierResponse = context.getRequestHandlerTypeIdentifierName(
            this._route,
            RESPONSE_IDENTIFIER
        );
        const identifierRequest = context.getRequestHandlerTypeIdentifierName(
            this._route,
            REQUEST_IDENTIFIER
        );

        output.addContent(`export interface ${identifierRequestHandler} {
    (
        req: ${identifierRequest},
        res: ${identifierResponse},
        next: NextFunction,
    ): void;
}`);
    }

}