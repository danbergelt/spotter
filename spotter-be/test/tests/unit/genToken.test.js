const { genToken } = require("../../../utils/tokens");
const jwtDecode = require("jwt-decode");
const assert = require("assert");

describe("token factory", () => {
  it("generates token based on args", () => {
    const token = genToken(100, "secret", "1d");
    const { id, exp } = jwtDecode(token);
    assert(id === 100);
    assert((new Date(exp * 1000) - new Date(Date.now()) > 86399000))
  });
});
