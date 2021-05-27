import ClassManager from "../Manager/ClassManager";
import BooleanTokenType from "../TokenType/BooleanTokenType";
import ColonTokenType from "../TokenType/ColonTokenType";
import CommaTokenType from "../TokenType/CommaTokenType";
import EndArrayTokenType from "../TokenType/EndArrayTokenType";
import EndObjectTokenType from "../TokenType/EndObjectTokenType";
import NullTokenType from "../TokenType/NullTokenType";
import NumberTokenType from "../TokenType/NumberTokenType";
import WhitespaceTokenType from "../TokenType/WhitespaceTokenType";
import StringTokenType from "../TokenType/StringTokenType";
import StartObjectTokenType from "../TokenType/StartObjectTokenType";
import StartArrayTokenType from "../TokenType/StartArrayTokenType";
import TokenType from "../Enum/TokenType";
import InvalidTokenError from "../Error/InvalidTokenError";
import InvalidJsonError from "../Error/InvalidJsonError";
import PropertyValue from "../Entity/PropertyValue";
import InvalidClassError from "../Error/InvalidClassError";
const REGISTERED_TOKEN_TYPES = [
    new BooleanTokenType(),
    new ColonTokenType(),
    new CommaTokenType(),
    new EndArrayTokenType(),
    new EndObjectTokenType(),
    new NullTokenType(),
    new NumberTokenType(),
    new StartArrayTokenType(),
    new StartObjectTokenType(),
    new StringTokenType(),
    new WhitespaceTokenType(),
];
function parseAsClass(entity_identifier, json_string) {
    var _a, _b;
    const RCLASS = ClassManager.GetRegisteredClass(entity_identifier);
    if (RCLASS === null) {
        throw new InvalidClassError(entity_identifier);
    }
    const PARSER = FetchToken(json_string);
    let iterator_result = PARSER.next();
    if (((_a = iterator_result.value) === null || _a === void 0 ? void 0 : _a.type) === TokenType.StartObject) {
        return ParseObject(PARSER, RCLASS);
    }
    else if (((_b = iterator_result.value) === null || _b === void 0 ? void 0 : _b.type) === TokenType.StartArray) {
        return ParseArray(PARSER, RCLASS);
    }
    throw new InvalidJsonError();
}
function ParseObject(parser, rclass) {
    const ENTITY = new rclass();
    let iterator_result = parser.next();
    if (iterator_result.value === null) {
        throw new InvalidTokenError();
    }
    let temp = new PropertyValue();
    while (iterator_result.done === false) {
        switch (iterator_result.value.type) {
            case TokenType.Whitespace:
                break;
            case TokenType.StartObject:
                if (temp.property === undefined) {
                    throw new InvalidJsonError();
                }
                const CHILD_ENTITY_IDENTIFIER = rclass.TypeMap[temp.property];
                const RCLASS = ClassManager.GetRegisteredClass(CHILD_ENTITY_IDENTIFIER);
                if (RCLASS === null) {
                    throw new InvalidClassError(CHILD_ENTITY_IDENTIFIER);
                }
                temp.value = ParseObject(parser, RCLASS);
                break;
            case TokenType.EndObject:
                return ENTITY;
                break;
            case TokenType.StartArray:
                throw new Error("TODO");
                break;
            case TokenType.EndArray:
                break;
            case TokenType.Colon:
                break;
            case TokenType.Comma:
                break;
            case TokenType.String:
                if (temp.property === undefined) {
                    temp.property = iterator_result.value.value;
                }
                else {
                    temp.value = iterator_result.value.value;
                }
                break;
            case TokenType.Number:
                temp.value = iterator_result.value.value;
                break;
            case TokenType.Boolean:
                temp.value = iterator_result.value.value;
                break;
            case TokenType.Null:
                temp.value = iterator_result.value.value;
                break;
            default:
                throw new InvalidTokenError();
        }
        if (temp.property !== undefined && temp.value !== undefined) {
            ENTITY[temp.property] = temp.value;
            temp.value = undefined;
            temp.property = undefined;
        }
        iterator_result = parser.next();
    }
    return ENTITY;
}
function ParseArray(parser, rclass) {
    const RESULT = [];
    return RESULT;
}
function* FetchToken(json_string) {
    let cursor = 0;
    const STR_LENGTH = json_string.length;
    while (cursor < STR_LENGTH) {
        const CURRENT_INPUT = json_string.substring(cursor);
        for (let i = 0; i < REGISTERED_TOKEN_TYPES.length; i++) {
            const TOKEN_TYPE = REGISTERED_TOKEN_TYPES[i];
            const REGEX_RESULT = TOKEN_TYPE.regex.exec(CURRENT_INPUT);
            if (REGEX_RESULT !== null) {
                cursor += REGEX_RESULT[0].length;
                yield {
                    type: TOKEN_TYPE.type,
                    value: REGEX_RESULT[TOKEN_TYPE.match],
                };
            }
        }
    }
    return null;
}
export default parseAsClass;
//# sourceMappingURL=ClassParser.js.map