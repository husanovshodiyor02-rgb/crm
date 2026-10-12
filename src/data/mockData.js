export const stats = [
  { id: 1, title: "Jami Mijozlar", value: "3,842", change: "+12%", trend: "up", icon: "users" },
  { id: 2, title: "Oylik Daromad", value: "$48,295", change: "+8.2%", trend: "up", icon: "dollar" },
  { id: 3, title: "Yangi Buyurtmalar", value: "284", change: "-3.1%", trend: "down", icon: "cart" },
  { id: 4, title: "Konversiya", value: "5.27%", change: "+1.4%", trend: "up", icon: "chart" },
];

export const recentOrders = [
  { id: "#ORD-001", customer: "Alisher Nazarov", product: "MacBook Pro", amount: "$1,299", status: "Bajarildi", date: "2026-10-12" },
  { id: "#ORD-002", customer: "Malika Yusupova", product: "iPhone 15", amount: "$999", status: "Jarayonda", date: "2026-10-11" },
  { id: "#ORD-003", customer: "Bobur Rahimov", product: "AirPods Pro", amount: "$249", status: "Kutilmoqda", date: "2026-10-11" },
  { id: "#ORD-004", customer: "Zulfiya Karimova", product: "iPad Air", amount: "$599", status: "Bekor qilindi", date: "2026-10-10" },
  { id: "#ORD-005", customer: "Jasur Toshmatov", product: "Apple Watch", amount: "$399", status: "Bajarildi", date: "2026-10-10" },
  { id: "#ORD-006", customer: "Nilufar Xasanova", product: "MacBook Air", amount: "$1,099", status: "Jarayonda", date: "2026-10-09" },
];

export const customers = [
  { id: 1, name: "Alisher Nazarov", email: "alisher@gmail.com", phone: "+998 90 123 45 67", city: "Toshkent", orders: 12, spent: "$4,280", status: "Faol", avatar: "AN" },
  { id: 2, name: "Malika Yusupova", email: "malika@gmail.com", phone: "+998 91 234 56 78", city: "Samarqand", orders: 8, spent: "$2,150", status: "Faol", avatar: "MY" },
  { id: 3, name: "Bobur Rahimov", email: "bobur@gmail.com", phone: "+998 93 345 67 89", city: "Buxoro", orders: 5, spent: "$890", status: "Nofaol", avatar: "BR" },
  { id: 4, name: "Zulfiya Karimova", email: "zulfiya@gmail.com", phone: "+998 94 456 78 90", city: "Namangan", orders: 15, spent: "$6,320", status: "Faol", avatar: "ZK" },
  { id: 5, name: "Jasur Toshmatov", email: "jasur@gmail.com", phone: "+998 95 567 89 01", city: "Andijon", orders: 3, spent: "$420", status: "Faol", avatar: "JT" },
  { id: 6, name: "Nilufar Xasanova", email: "nilufar@gmail.com", phone: "+998 97 678 90 12", city: "Farg'ona", orders: 9, spent: "$3,100", status: "VIP", avatar: "NX" },
  { id: 7, name: "Sherzod Mirzayev", email: "sherzod@gmail.com", phone: "+998 98 789 01 23", city: "Toshkent", orders: 21, spent: "$8,950", status: "VIP", avatar: "SM" },
  { id: 8, name: "Dilorom Sultanova", email: "dilorom@gmail.com", phone: "+998 99 890 12 34", city: "Qarshi", orders: 6, spent: "$1,560", status: "Nofaol", avatar: "DS" },
];

export const products = [
  { id: 1, name: "MacBook Pro 16\"", category: "Laptop", price: "$2,499", stock: 23, sold: 145, status: "Mavjud" },
  { id: 2, name: "iPhone 15 Pro", category: "Telefon", price: "$999", stock: 67, sold: 389, status: "Mavjud" },
  { id: 3, name: "AirPods Pro", category: "Aksesuar", price: "$249", stock: 0, sold: 512, status: "Tugagan" },
  { id: 4, name: "iPad Air M2", category: "Planshet", price: "$599", stock: 41, sold: 203, status: "Mavjud" },
  { id: 5, name: "Apple Watch S9", category: "Soat", price: "$399", stock: 18, sold: 178, status: "Kam qoldi" },
  { id: 6, name: "MacBook Air M3", category: "Laptop", price: "$1,299", stock: 35, sold: 267, status: "Mavjud" },
  { id: 7, name: "iPhone 15", category: "Telefon", price: "$799", stock: 5, sold: 445, status: "Kam qoldi" },
  { id: 8, name: "Mac Mini M4", category: "Desktop", price: "$699", stock: 0, sold: 89, status: "Tugagan" },
];

export const employees = [
  { id: 1, name: "Sarvar Usmonov", role: "Sales Manager", email: "sarvar@crm.uz", dept: "Sotuv", performance: 94, tasks: 12, status: "Online", avatar: "SU" },
  { id: 2, name: "Gulnora Azimova", role: "Support Lead", email: "gulnora@crm.uz", dept: "Qo'llab-quvvatlash", performance: 88, tasks: 8, status: "Online", avatar: "GA" },
  { id: 3, name: "Timur Xoliqov", role: "Developer", email: "timur@crm.uz", dept: "IT", performance: 91, tasks: 15, status: "Offline", avatar: "TX" },
  { id: 4, name: "Feruza Norova", role: "Marketing", email: "feruza@crm.uz", dept: "Marketing", performance: 79, tasks: 6, status: "Online", avatar: "FN" },
  { id: 5, name: "Ulugbek Sobirov", role: "Accountant", email: "ulugbek@crm.uz", dept: "Moliya", performance: 85, tasks: 9, status: "Away", avatar: "US" },
];

export const chartData = [
  { month: "May", revenue: 32000, orders: 180 },
  { month: "Iyn", revenue: 38000, orders: 210 },
  { month: "Iyl", revenue: 35000, orders: 195 },
  { month: "Avg", revenue: 42000, orders: 240 },
  { month: "Sen", revenue: 39000, orders: 220 },
  { month: "Okt", revenue: 48000, orders: 284 },
];
