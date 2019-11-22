require("jest-localstorage-mock");
import secureStorage from "../../utils/secureToken";

describe("secure storage", () => {
  it("saves item to secure storage", () => {
    secureStorage.setItem(`${process.env.REACT_APP_KEY}`, "TEST_TOKEN");
    expect(secureStorage.getItem(`${process.env.REACT_APP_KEY}`)).toEqual(
      "TEST_TOKEN"
    );
  });

  it("removes item from secure storage", () => {
    secureStorage.setItem(`${process.env.REACT_APP_KEY}`, "TEST_TOKEN");
    secureStorage.removeItem(`${process.env.REACT_APP_KEY}`);
    expect(secureStorage.getItem(`${process.env.REACT_APP_KEY}`)).toEqual(null);
  });

  it("clears secure storage", () => {
    secureStorage.setItem(`${process.env.REACT_APP_KEY}`, "TEST_TOKEN");
    secureStorage.clear();
    expect(secureStorage.getItem(`${process.env.REACT_APP_KEY}`)).toEqual(null);
  });

  it("returns secure storage length", () => {
    secureStorage.setItem(`${process.env.REACT_APP_KEY}`, "TEST_TOKEN");
    expect(secureStorage.length).toEqual(1)
  })
});
