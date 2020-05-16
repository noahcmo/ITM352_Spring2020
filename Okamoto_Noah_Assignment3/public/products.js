products4 =
  [
    {
      "model": "Yeezy",
      "price": 210.00,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQbrlIqAtUctrWW8EbVPRZYCflIlRCP5074glQblePWVN17AEQ7Xuq3NiHvV1JvPIViz51RjK3G&usqp=CAc"
    }
  ];
products2 =
  [
    {
      "model": "Ultraboost",
      "price": 175.00,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQFaswOWLjKflH2wxpnv0kJLBbjhV8eT5IKGlUTlnYq6OVylYNd0sKl576L_LTqe9PsGAIs2PAFeg&usqp=CAc"
    },
  ];
products3 =
  [
    {
      "model": "Chuck Taylor",
      "price": 60.00,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZd4evJWcH8U6vQ7gZOrXDr1Lmxy2vtg8nZC5g2XOrq_d41TDD&usqp=CAU"
    },
  ];
products1 =
  [
    {
      "model": "Janowski",
      "price": 100.00,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpsroI-hhZnEp1aVCrByVmStKkWoBHaVubNQBjTnMxBZ0CjKrA&usqp=CAU"
    },
    {
      "model": "Roshe",
      "price": 85.00,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGI4QHNXdPY9R95EqqufcIGGMw7Y5jrmLjJprE8n5RwRAAKbfB1L8CFSq9gf6HdcFRcx2mKc4&usqp=CAc"
    },
  ];
products = {
  "p1": products1,
  "p2": products2,
  "p3": products3,
  "p4": products4
}
if (typeof module != 'undefined') {
  module.exports.products = products;
}