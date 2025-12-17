import api from "./axios";


export const addFavorite = (productId: number) => {
  return api.post(`/favorites/${productId}`);
};

export const getFavorites = () => {
  return api.get("/favorites");
};
