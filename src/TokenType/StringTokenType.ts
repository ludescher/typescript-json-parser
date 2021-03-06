import TokenType from "../Enum/TokenType";
import ITokenType from "../Interface/ITokenType";

class StringTokenType implements ITokenType {
    type: TokenType = TokenType.String;
    regex: RegExp = /^(["'])((?:[^\1\\]|\\.)*?)\1/;
    match: number = 2;
}

export default StringTokenType;