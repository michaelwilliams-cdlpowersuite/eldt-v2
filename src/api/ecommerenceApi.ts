import apiClient from './apiClient';
import {User} from "../types/user";

// available products
// todo: not tested AT ALL, for example. See Postman collection
export const availableProducts = async (user: User) => {
  try {
    const response = await apiClient.get(`companies/${user.lastCompanyId}/products?type=availableCourses&forStudent=${user.student.id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting available product data:", error);
    throw error;
  }
};
