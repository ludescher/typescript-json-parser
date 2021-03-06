import TokenType from "../Enum/TokenType";
import ITokenType from "../Interface/ITokenType";

class NumberTokenType implements ITokenType {
    type: TokenType = TokenType.Number;
    regex: RegExp = /^\d+(?:\.\d+)?/;
    match: number = 0;
}

export default NumberTokenType;