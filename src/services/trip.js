import { getBusById } from "./bus";
import { handleApiRequest, instance } from "./instance";
import { createSeatsBatch } from "./seat";

// Base URL for trips
const URL_TRIPS = "/api/trips";

export const provinces = [
  { name: "An Giang", slug: "an-giang" },
  { name: "Bà Rịa - Vũng Tàu", slug: "ba-ria-vung-tau" },
  { name: "Bắc Giang", slug: "bac-giang" },
  { name: "Bắc Kạn", slug: "bac-kan" },
  { name: "Bạc Liêu", slug: "bac-lieu" },
  { name: "Bắc Ninh", slug: "bac-ninh" },
  { name: "Bến Tre", slug: "ben-tre" },
  { name: "Bình Định", slug: "binh-dinh" },
  { name: "Bình Dương", slug: "binh-duong" },
  { name: "Bình Phước", slug: "binh-phuoc" },
  { name: "Bình Thuận", slug: "binh-thuan" },
  { name: "Cà Mau", slug: "ca-mau" },
  { name: "Cần Thơ", slug: "can-tho" },
  { name: "Cao Bằng", slug: "cao-bang" },
  { name: "Đà Nẵng", slug: "da-nang" },
  { name: "Đắk Lắk", slug: "dak-lak" },
  { name: "Đắk Nông", slug: "dak-nong" },
  { name: "Điện Biên", slug: "dien-bien" },
  { name: "Đồng Nai", slug: "dong-nai" },
  { name: "Đồng Tháp", slug: "dong-thap" },
  { name: "Gia Lai", slug: "gia-lai" },
  { name: "Hà Giang", slug: "ha-giang" },
  { name: "Hà Nam", slug: "ha-nam" },
  { name: "Hà Nội", slug: "ha-noi" },
  { name: "Hà Tĩnh", slug: "ha-tinh" },
  { name: "Hải Dương", slug: "hai-duong" },
  { name: "Hải Phòng", slug: "hai-phong" },
  { name: "Hậu Giang", slug: "hau-giang" },
  { name: "Hòa Bình", slug: "hoa-binh" },
  { name: "Hồ Chí Minh", slug: "ho-chi-minh" },
  { name: "Hưng Yên", slug: "hung-yen" },
  { name: "Khánh Hòa", slug: "khanh-hoa" },
  { name: "Kiên Giang", slug: "kien-giang" },
  { name: "Kon Tum", slug: "kon-tum" },
  { name: "Lai Châu", slug: "lai-chau" },
  { name: "Lâm Đồng", slug: "lam-dong" },
  { name: "Lạng Sơn", slug: "lang-son" },
  { name: "Lào Cai", slug: "lao-cai" },
  { name: "Long An", slug: "long-an" },
  { name: "Nam Định", slug: "nam-dinh" },
  { name: "Nghệ An", slug: "nghe-an" },
  { name: "Ninh Bình", slug: "ninh-binh" },
  { name: "Ninh Thuận", slug: "ninh-thuan" },
  { name: "Phú Thọ", slug: "phu-tho" },
  { name: "Phú Yên", slug: "phu-yen" },
  { name: "Quảng Bình", slug: "quang-binh" },
  { name: "Quảng Nam", slug: "quang-nam" },
  { name: "Quảng Ngãi", slug: "quang-ngai" },
  { name: "Quảng Ninh", slug: "quang-ninh" },
  { name: "Quảng Trị", slug: "quang-tri" },
  { name: "Sóc Trăng", slug: "soc-trang" },
  { name: "Sơn La", slug: "son-la" },
  { name: "Tây Ninh", slug: "tay-ninh" },
  { name: "Thái Bình", slug: "thai-binh" },
  { name: "Thái Nguyên", slug: "thai-nguyen" },
  { name: "Thanh Hóa", slug: "thanh-hoa" },
  { name: "Thừa Thiên Huế", slug: "thua-thien-hue" },
  { name: "Tiền Giang", slug: "tien-giang" },
  { name: "Trà Vinh", slug: "tra-vinh" },
  { name: "Tuyên Quang", slug: "tuyen-quang" },
  { name: "Vĩnh Long", slug: "vinh-long" },
  { name: "Vĩnh Phúc", slug: "vinh-phuc" },
  { name: "Yên Bái", slug: "yen-bai" },
];

// Create a new trip
export const createTrip = async (tripCreationRequest) => {
  //console.log(tripCreationRequest);

  return handleApiRequest(async () => {
    // Gửi yêu cầu tạo chuyến đi
    const response = await instance.post(URL_TRIPS, tripCreationRequest);
    const trip = response.data;

    // Lấy thông tin của từng bus
    const buses = await Promise.all(
      tripCreationRequest.busIds.map(async (busId) => {
        const bus = await getBusById(busId);
        return {
          id: bus.id,
          seatCapacity: bus.seatCapacity,
        };
      })
    );

    // Tạo ghế cho từng bus
    await Promise.all(
      buses.map(async (bus) => {
        const seatCreationRequest = {
          busId: bus.id,
          tripId: trip.id,
          seatCapacity: bus.seatCapacity,
        };

        await createSeatsBatch(seatCreationRequest);
      })
    );

    return trip;
  });
};
// Get all trips
export const getAllTrips = async () => {
  return handleApiRequest(async () => {
    const response = await instance.get(URL_TRIPS);
    return response.data;
  });
};

// Get a trip by ID
export const getTripById = async (tripId) => {
  return handleApiRequest(async () => {
    const response = await instance.get(`${URL_TRIPS}/${tripId}`);
    return response.data;
  });
};

// Update a trip by ID
export const updateTrip = async (tripId, tripUpdateRequest) => {
  return handleApiRequest(async () => {
    const response = await instance.put(
      `${URL_TRIPS}/${tripId}`,
      tripUpdateRequest
    );
    return response.data.result;
  });
};

// Delete a trip by ID
export const deleteTrip = async (tripId) => {
  return handleApiRequest(async () => {
    const response = await instance.delete(`${URL_TRIPS}/${tripId}`);
    return response.data;
  });
};
