require("jest-localstorage-mock");
import secureStorage from "../../utils/secureToken";
import axios from "axios";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

jest.unmock("axios");

describe("axios with auth", () => {
  test("create axios object to use for calls", () => {
    secureStorage.setItem(`${process.env.REACT_APP_KEY}`, "TEST_TOKEN");
    expect(axiosWithAuth().defaults.headers.Authorization).toEqual('Bearer TEST_TOKEN')
  });
});
