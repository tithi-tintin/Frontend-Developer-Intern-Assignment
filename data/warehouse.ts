export const inventory = [
  { name: "Electronics", value: 2500, percent: 25, tone: "purple" },
  { name: "Apparel", value: 2000, percent: 20, tone: "stripe-purple" },
  { name: "Home & Kitchen", value: 1800, percent: 18, tone: "dark" },
  { name: "Beauty & Health", value: 1500, percent: 15, tone: "stripe-dark" },
  { name: "Automotive Parts", value: 1200, percent: 12, tone: "gray" },
  { name: "Sports Equipment", value: 1000, percent: 10, tone: "stripe-gray" },
];

export const storageRows = [
  ["1", "A1 - A10", "Electronics", 80, "20/100"],
  ["2", "B1 - B10", "Apparel", 60, "40/100"],
  ["1", "C1 - C10", "Home & Kitchen", 90, "10/100"],
  ["3", "D1 - D10", "Automotive Parts", 50, "50/100"],
  ["2", "E1 - E10", "Beauty & Health", 70, "30/100"],
];

export const floors = {
  "Floor 1": [
    ["Electronics", ["A1", "A2", "A3"], "20/100"],
    ["Home & Kitchen", ["C1", "C2", "C3"], "10/100"],
    ["Automotive Parts", ["D1", "D2", "D3"], "50/100"],
    ["Sports Equipment", ["F1", "F2", "F3"], "45/100"],
    ["Apparel", ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"], "20/100"],
    ["Beauty & Health", ["E1", "E2", "E3", "E4"], "30/100"],
  ],
  "Floor 2": [
    ["Electronics Reserve", ["A11", "A12", "A13"], "35/100"],
    ["Cold Storage", ["C11", "C12", "C13"], "22/100"],
    ["Heavy Cargo", ["D11", "D12", "D13"], "60/100"],
    ["Returns", ["R1", "R2", "R3"], "15/100"],
  ],
  "Floor 3": [
    ["Priority Dispatch", ["P1", "P2", "P3"], "18/100"],
    ["International", ["I1", "I2", "I3"], "42/100"],
    ["Oversized", ["O1", "O2", "O3"], "55/100"],
    ["Maintenance", ["M1", "M2"], "12/100"],
  ],
} as const;

export const packageRecords = [
  ["PKG-HK77420", "March 20, 2035 - 05:30 PM", "Sent"],
  ["PKG-A50812", "March 21, 2035 - 01:45 PM", "Received"],
  ["PKG-E10293", "March 22, 2035 - 09:00 AM", "Expected"],
] as const;

export const warehouseActivities = [
  ["✓", "Leo Fernandez", "confirmed receipt of 40 units of Winter Jacket Series in Section B3 (Apparel)", "01:45 PM"],
  ["▤", "Ava Martinez", "added 25 units of Smart Router Kit to Section A1 (Electronics)", "09:15 AM"],
  ["▱", "Oscar Liem", "dispatched 18 units of Stainless Steel Cookware Set from Section C5 (Home & Kitchen)", "05:30 PM"],
  ["▧", "Dina Choi", "created a shipment entry for Brake Pad Sets in Section D2 (Automotive Parts)", "04:10 PM"],
] as const;
