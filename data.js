// Dữ liệu cho ứng dụng Delivery Tracker

const DELIVERY_STATUS = {
  time: "9:10 Sáng",
  description: "Tài xế đang đến Warehouse, 2 Phan Đình Giót, Phường 2, Tân Bình, Thành phố Hồ Chí Minh",
  progress: 45,
  currentStop: 2, // Đang ở điểm dừng thứ 2 (heading to point 2)
  isStopped: true,
};

const DRIVER_INFO = {
  name: "Driver Hải Đăng",
  rating: 5.0,
  vehicle: "Suzuki",
  plateNumber: "59P3-327.94",
  avatarUrl: "avt_default.png",
};

const GEOMAP_INFO = {
  title: "GeoMap",
  name: "GM_Polygon_Google",
  code: "GM_POLYGON",
  type: "polygon",
  radius: "500",
  date: "27/11/2025",
};

const TIMELINE_STEPS = [
  {
    id: 1,
    title: "Saigonvape",
    address: "243/38 Tô Hiến Thành, Phường 13, Quận 10, Hồ Chí Minh",
    status: 'completed', // Đã hoàn thành
  },
  {
    id: 2,
    title: "Warehouse",
    address: "2 Phan Đình Giót, Phường 2, Tân Bình, Thành phố Hồ Chí Minh",
    status: 'active', // Đang tiến đến
  },
  {
    id: 3,
    title: "Công ty Sharemap",
    address: "482/51/35 Lê Quang Định, Phường 11, Quận Bình Thạnh, Hồ Chí Minh",
    status: 'pending', // Chưa đến
  },
];

const TRACKING_INFO = {
  id: "https://dev-business.sharemap.live/public-geomap/GM_POLYGON_AVATAR_DEFAULT_GOOGLE_197B03995DE?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaXN0VXVpZCI6WyI0Mjg4MiJdLCJkYXRlIjoxNzY0MTc2NDAwMDAwLCJpYXQiOjE3NjQyMzAxNzksImV4cCI6MTc2NDMxNjU3OX0.vOSFSVcVGhr0gcAWgrYWmE1F610AHQKVY9ADoBAI3R4",
};
