import Api from "../../config/api";
import asyncHandler from "../../utils/asyncHandler";

const locationApi = new Api('/api/locations')

export const getAvailableTables = async (locationId, body) => {
  try {
    const response = await locationApi.post(`/${locationId}/tables/freeTimes`, body);
    if(response) console.log('response', response)
      return response
  } catch (error) {
    console.log('error', error)
  }
}
export const createReservation = async (locationId, payload) => {
  try {
    const response = await locationApi.post(`/${locationId}/reservations/online`, payload);
    if(response) console.log('response', response)
      return response
  } catch (error) {
    console.log('error', error)
  }
}
