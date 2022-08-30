import { SWITCH_LOADING } from "../types";

export function switchLoading(loading) {
  return {
    type: SWITCH_LOADING,
    loading: loading
  }
}