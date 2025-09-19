import authReducer, { setTokens, logout } from "src/redux/auth/authSlice";
import type { IAuthState } from "src/redux/auth/types";

describe("authSlice", () => {
  const initialState: IAuthState = {
    isAuth: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false
  };

  it("должен вернуть initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("setTokens должен сохранять токены", () => {
    const state = authReducer(
      initialState,
      setTokens({
        accessToken: "token123",
        refreshToken: "refresh123"
      })
    );

    expect(state.accessToken).toBe("token123");
    expect(state.refreshToken).toBe("refresh123");
    expect(state.isAuth).toBe(true);
  });

  it("logout должен сбрасывать стейт", () => {
    const loggedState = { ...initialState, isAuth: true, accessToken: "abc" };
    const state = authReducer(loggedState, logout());
    expect(state.isAuth).toBe(false);
    expect(state.accessToken).toBeNull();
  });
});
