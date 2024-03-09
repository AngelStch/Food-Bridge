import axios from "axios";

export const userSignUp = async (payload) => {
  try {
    const data = await axios.post(`/user/signup`, payload);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginUser = async (payload) => {
  try {
    const data = await axios.post(`/user/login`, payload);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const resturantSignUp = async (payload) => {
  try {
    const data = await axios.post(`/resturant/signup`, payload);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginResturant = async (payload) => {
  try {
    const data = await axios.post(`/resturant/login`, payload);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const resturantsList = async (search) => {
  try {
    const data = await axios.get(
      `/user/resturant?search=${search}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createOffer = async (payload) => {
  try {
    const data = await axios.post(`/offer`, payload);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const offerListByRest = async (id) => {
  try {
    const data = await axios.get(`/offer/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const offerDeleteRest = async (id) => {
  try {
    const data = await axios.delete(`/offer/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updateOffer = async (id, payload) => {
  try {
    const data = await axios.patch(`/offer/${id}`, payload);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getOffer = async (id) => {
  try {
    const data = await axios.get(`/offer/single/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getOfferDetails = async (id) => {
  try {
    const data = await axios.get(`/offer/details/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const addToCart = async (payload) => {
  try {
    const data = await axios.post(`/cart`, payload);
    return data;
  } catch (error) {
    return error.response;
  }
};

export const checkoutApi = async (payload) => {
  try {
    return await axios.post(`/cart/checkout`, payload);
  } catch (error) {
    return error.response;
  }
};

export const getCartList = async (userId) => {
  try {
    const data = await axios.get(`/cart/${userId}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteCartItem = async (itemId) => {
  try {
    const data = await axios.delete(`/cart/${itemId}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const removeFromCart = async (payload) => {
  try {
    const data = await axios.post(
      `/cart/remove-from-cart`,
      payload
    );
    return data;
  } catch (error) {
    return error;
  }
};
