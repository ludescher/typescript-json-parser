import TokenType from "../Enum/TokenType";
import ITokenType from "../Interface/ITokenType";

class EndArrayTokenType implements ITokenType {
    type: TokenType = TokenType.EndArray;
    regex: RegExp = /^\]/;
    match: number = 0;
}

export default EndArrayTokenType;