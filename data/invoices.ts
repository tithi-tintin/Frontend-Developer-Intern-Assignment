import type { Invoice } from "@/types";

const companies = [
  ["TechGear Inc.", "SH9283746", "Paid", 1250],
  ["StyleHub Co.", "SH9182635", "Unpaid", 980],
  ["FreshNest", "SH9037821", "Paid", 1320],
  ["FitPlus Gear", "SH9374652", "Unpaid", 1150],
  ["AutoParts Pro", "SH9457830", "Overdue", 1480],
  ["EcoLights", "SH8821349", "Paid", 790],
  ["GreenHaven", "SH8967432", "Paid", 875],
  ["ModaWear", "SH8893247", "Unpaid", 910],
  ["SunCore Panels", "SH9018723", "Unpaid", 1600],
  ["VitaFresh", "SH8881190", "Overdue", 1120],
  ["SmartAppliance", "SH8923752", "Paid", 1050],
] as const;

export const invoices: Invoice[] = companies.map(
  ([company, shippingId, status, amount], index) => {
    const issueDay = 15 - (index % 5);
    const dueDay = 22 + (index % 4);
    const normalizedCompany = company.toLowerCase().replace(/[^a-z]/g, "");
    const base = index === 7 ? [360, 360, 190] : [amount * 0.4, amount * 0.35, amount * 0.25];
    return {
      id: `INV-${1001 + index}`,
      company,
      shippingId,
      issueDate: `Mar ${issueDay}, 2035`,
      dueDate: `Mar ${dueDay}, 2035`,
      amount,
      status,
      email: index === 7 ? "billing@modawear.com" : `billing@${normalizedCompany}.com`,
      address:
        index === 7
          ? "89 Franklin St, Boston, MA 02110, USA"
          : `${120 + index * 14} Commerce Street, ${index % 2 ? "Atlanta, GA" : "Austin, TX"}, USA`,
      phone: index === 7 ? "+1 617-555-2290" : `+1 555-01${20 + index}`,
      lines: [
        {
          description: index === 7 ? "Lightweight Hoodie Pack" : `${company} Priority Package`,
          shipmentType: "Road Freight Express",
          price: index === 7 ? 120 : base[0],
          quantity: index === 7 ? 3 : 1,
        },
        {
          description: index === 7 ? "Autumn Jacket Set" : "Standard Cargo Handling",
          shipmentType: "Road Freight Standard",
          price: index === 7 ? 180 : base[1],
          quantity: index === 7 ? 2 : 1,
        },
        {
          description: index === 7 ? "Lightweight Hoodie Pack" : "Insured Final Mile",
          shipmentType: "Road Freight Express",
          price: index === 7 ? 95 : base[2],
          quantity: index === 7 ? 2 : 1,
        },
      ],
      taxRate: 0.08,
      fee: 10,
    };
  },
);
