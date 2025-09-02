import { calculateDistance } from '../services/geolocationService';

export const templesData = [
  {
    id: 1,
    name: "Golden Temple",
    address: "Golden Temple Rd, Atta Mandi, Katra Ahluwalia, Amritsar, Punjab 143006, India",
    latitude: 31.6200,
    longitude: 74.8765,
    religion: "Sikh",
    description: "The Golden Temple, also known as Harmandir Sahib, is a gurdwara located in the city of Amritsar, Punjab, India. It is the holiest gurdwara and the most important pilgrimage site of Sikhism.",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    timings: "4:00 AM - 10:00 PM",
    contact: "+91-183-2553954"
  },
  {
    id: 2,
    name: "Lotus Temple",
    address: "Lotus Temple Rd, Bahapur, Shambhu Dayal Bagh, Kalkaji, New Delhi, Delhi 110019, India",
    latitude: 28.5535,
    longitude: 77.2588,
    religion: "Baháʼí",
    description: "The Lotus Temple, located in Delhi, India, is a Baháʼí House of Worship that was dedicated in December 1986. Notable for its flowerlike shape, it has become a prominent attraction in the city.",
    images: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    timings: "9:00 AM - 7:00 PM (Closed on Mondays)",
    contact: "+91-11-26444029"
  },
  {
    id: 3,
    name: "Meenakshi Temple",
    address: "Madurai Main, Madurai, Tamil Nadu 625001, India",
    latitude: 9.9195,
    longitude: 78.1193,
    religion: "Hindu",
    description: "Meenakshi Amman Temple is a historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai, Tamil Nadu, India.",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    ],
    timings: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
    contact: "+91-452-2345777"
  },
  {
    id: 4,
    name: "Akshardham Temple",
    address: "Nh 24, Akshardham Setu, New Delhi, Delhi 110092, India",
    latitude: 28.6127,
    longitude: 77.2773,
    religion: "Hindu",
    description: "Swaminarayan Akshardham is a Hindu temple and spiritual-cultural campus in Delhi, India. The temple is close to the border with Noida.",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    timings: "9:30 AM - 6:30 PM (Closed on Mondays)",
    contact: "+91-11-43442344"
  },
  {
    id: 5,
    name: "Vaishno Devi Temple",
    address: "Katra, Jammu and Kashmir 182301, India",
    latitude: 33.0311,
    longitude: 74.9455,
    religion: "Hindu",
    description: "Vaishno Devi Temple is a Hindu temple dedicated to the Hindu Goddess, located in Katra at the Trikuta Mountains within the Indian union territory of Jammu and Kashmir.",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    timings: "5:00 AM - 10:00 PM",
    contact: "+91-1991-232649"
  },
  {
    id: 6,
    name: "Siddhivinayak Temple",
    address: "SK Bole Rd, Prabhadevi, Mumbai, Maharashtra 400025, India",
    latitude: 19.0170,
    longitude: 72.8310,
    religion: "Hindu",
    description: "Shree Siddhivinayak Ganapati Temple is a Hindu temple dedicated to Lord Ganesha. It is located in Prabhadevi, Mumbai, Maharashtra, India. It was originally built by Laxman Vithu and Deubai Patil on 19 November 1801.",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    ],
    timings: "5:30 AM - 10:00 PM",
    contact: "+91-22-24223387"
  },
  {
    id: 7,
    name: "Mahalakshmi Temple",
    address: "Bhulabhai Desai Rd, Mahalakshmi, Mumbai, Maharashtra 400034, India",
    latitude: 18.9822,
    longitude: 72.8081,
    religion: "Hindu",
    description: "Mahalakshmi Temple is one of the most famous temples of Mumbai situated on Bhulabhai Desai Road in Mahalakshmi area. It is dedicated to Mahalakshmi the central deity of Devi Mahatmyam.",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    timings: "6:00 AM - 10:00 PM",
    contact: "+91-22-23518642"
  },
  {
    id: 8,
    name: "Mumbadevi Temple",
    address: "Mumbadevi Rd, Bhuleshwar, Mumbai, Maharashtra 400002, India",
    latitude: 18.9467,
    longitude: 72.8342,
    religion: "Hindu",
    description: "Mumbadevi Temple is an old Hindu temple in the city of Mumbai dedicated to the goddess Mumbadevi, the local incarnation of the Devi. The city of Mumbai derives its name from this temple.",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    timings: "6:00 AM - 9:00 PM",
    contact: "+91-22-22016781"
  },
  {
    id: 9,
    name: "Babulnath Temple",
    address: "Babulnath Rd, Chowpatty, Mumbai, Maharashtra 400007, India",
    latitude: 18.9648,
    longitude: 72.8118,
    religion: "Hindu",
    description: "Babulnath Temple is an ancient Shiva temple in Mumbai, India. The temple is situated on a small hillock near Girgaon Chowpatty, and is approachable by a flight of stone steps.",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    timings: "5:00 AM - 10:00 PM",
    contact: "+91-22-23676785"
  },
  {
    id: 10,
    name: "ISKCON Mumbai",
    address: "Hare Krishna Land, Juhu, Mumbai, Maharashtra 400049, India",
    latitude: 19.1075,
    longitude: 72.8263,
    religion: "Hindu",
    description: "ISKCON Mumbai is a prominent temple complex dedicated to Lord Krishna, located in Juhu. It's known for its beautiful architecture, spiritual programs, and cultural activities.",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    ],
    timings: "4:30 AM - 1:00 PM, 4:00 PM - 9:00 PM",
    contact: "+91-22-26205860"
  }
];

export const getTempleById = (id) => {
  return templesData.find(temple => temple.id === parseInt(id));
};

export const getNearbyTemples = (userLat, userLon, radiusKm = 50) => {
  return templesData.filter(temple => {
    const distance = calculateDistance(userLat, userLon, temple.latitude, temple.longitude);
    return distance <= radiusKm;
  }).sort((a, b) => {
    const distanceA = calculateDistance(userLat, userLon, a.latitude, a.longitude);
    const distanceB = calculateDistance(userLat, userLon, b.latitude, b.longitude);
    return distanceA - distanceB;
  });
};

export const searchTemples = (searchTerm, userLat = null, userLon = null) => {
  if (!searchTerm.trim()) {
    return templesData;
  }

  const term = searchTerm.toLowerCase();
  const results = templesData.filter(temple => {
    return (
      temple.name.toLowerCase().includes(term) ||
      temple.address.toLowerCase().includes(term) ||
      temple.religion.toLowerCase().includes(term) ||
      temple.description.toLowerCase().includes(term)
    );
  });

  // Sort by distance if user location is available
  if (userLat && userLon) {
    return results.sort((a, b) => {
      const distanceA = calculateDistance(userLat, userLon, a.latitude, a.longitude);
      const distanceB = calculateDistance(userLat, userLon, b.latitude, b.longitude);
      return distanceA - distanceB;
    });
  }

  return results;
};