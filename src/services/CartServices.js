import apiClient from "../utils/api-client";

export function addToCartAPI(id, quantity) {
  return apiClient.post(`/cart/${id}`, { quantity });
}

export function getCartAPI() {
  return apiClient.get("/cart");
}

export function removCartAPI(id) {
  return apiClient.patch(`/cart/remove/${id}`);
}
export function increaseCartAPI(id) {
  return apiClient.patch(`/cart/increase/${id}`);
}
export function decreaseCartAPI(id) {
  return apiClient.patch(`/cart/decrease/${id}`);
}
