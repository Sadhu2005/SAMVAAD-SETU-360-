/** Bundled India geo master. Do not edit by hand — regenerate via buildIndiaGeo.mjs. */
export interface GeoState {
  lgdCode: number;
  name: string;
  isoCode: string;
  type: 'state' | 'ut';
}

export interface GeoDistrict {
  lgdCode: number;
  name: string;
  stateLgdCode: number;
  stateName: string;
  aliases?: string[];
}

export const INDIA_GEO_SOURCE = "Local Government Directory (MoPR) codes + public India district snapshot (data.gov.in / LGD style)";

export const INDIA_STATES: GeoState[] = [
  {
    "lgdCode": 1,
    "name": "Jammu and Kashmir",
    "isoCode": "JK",
    "type": "ut"
  },
  {
    "lgdCode": 2,
    "name": "Himachal Pradesh",
    "isoCode": "HP",
    "type": "state"
  },
  {
    "lgdCode": 3,
    "name": "Punjab",
    "isoCode": "PB",
    "type": "state"
  },
  {
    "lgdCode": 4,
    "name": "Chandigarh",
    "isoCode": "CH",
    "type": "ut"
  },
  {
    "lgdCode": 5,
    "name": "Uttarakhand",
    "isoCode": "UK",
    "type": "state"
  },
  {
    "lgdCode": 6,
    "name": "Haryana",
    "isoCode": "HR",
    "type": "state"
  },
  {
    "lgdCode": 7,
    "name": "Delhi",
    "isoCode": "DL",
    "type": "ut"
  },
  {
    "lgdCode": 8,
    "name": "Rajasthan",
    "isoCode": "RJ",
    "type": "state"
  },
  {
    "lgdCode": 9,
    "name": "Uttar Pradesh",
    "isoCode": "UP",
    "type": "state"
  },
  {
    "lgdCode": 10,
    "name": "Bihar",
    "isoCode": "BR",
    "type": "state"
  },
  {
    "lgdCode": 11,
    "name": "Sikkim",
    "isoCode": "SK",
    "type": "state"
  },
  {
    "lgdCode": 12,
    "name": "Arunachal Pradesh",
    "isoCode": "AR",
    "type": "state"
  },
  {
    "lgdCode": 13,
    "name": "Nagaland",
    "isoCode": "NL",
    "type": "state"
  },
  {
    "lgdCode": 14,
    "name": "Manipur",
    "isoCode": "MN",
    "type": "state"
  },
  {
    "lgdCode": 15,
    "name": "Mizoram",
    "isoCode": "MZ",
    "type": "state"
  },
  {
    "lgdCode": 16,
    "name": "Tripura",
    "isoCode": "TR",
    "type": "state"
  },
  {
    "lgdCode": 17,
    "name": "Meghalaya",
    "isoCode": "ML",
    "type": "state"
  },
  {
    "lgdCode": 18,
    "name": "Assam",
    "isoCode": "AS",
    "type": "state"
  },
  {
    "lgdCode": 19,
    "name": "West Bengal",
    "isoCode": "WB",
    "type": "state"
  },
  {
    "lgdCode": 20,
    "name": "Jharkhand",
    "isoCode": "JH",
    "type": "state"
  },
  {
    "lgdCode": 21,
    "name": "Odisha",
    "isoCode": "OD",
    "type": "state"
  },
  {
    "lgdCode": 22,
    "name": "Chhattisgarh",
    "isoCode": "CG",
    "type": "state"
  },
  {
    "lgdCode": 23,
    "name": "Madhya Pradesh",
    "isoCode": "MP",
    "type": "state"
  },
  {
    "lgdCode": 24,
    "name": "Gujarat",
    "isoCode": "GJ",
    "type": "state"
  },
  {
    "lgdCode": 27,
    "name": "Maharashtra",
    "isoCode": "MH",
    "type": "state"
  },
  {
    "lgdCode": 28,
    "name": "Andhra Pradesh",
    "isoCode": "AP",
    "type": "state"
  },
  {
    "lgdCode": 29,
    "name": "Karnataka",
    "isoCode": "KA",
    "type": "state"
  },
  {
    "lgdCode": 30,
    "name": "Goa",
    "isoCode": "GA",
    "type": "state"
  },
  {
    "lgdCode": 31,
    "name": "Lakshadweep",
    "isoCode": "LD",
    "type": "ut"
  },
  {
    "lgdCode": 32,
    "name": "Kerala",
    "isoCode": "KL",
    "type": "state"
  },
  {
    "lgdCode": 33,
    "name": "Tamil Nadu",
    "isoCode": "TN",
    "type": "state"
  },
  {
    "lgdCode": 34,
    "name": "Puducherry",
    "isoCode": "PY",
    "type": "ut"
  },
  {
    "lgdCode": 35,
    "name": "Andaman and Nicobar Islands",
    "isoCode": "AN",
    "type": "ut"
  },
  {
    "lgdCode": 36,
    "name": "Telangana",
    "isoCode": "TS",
    "type": "state"
  },
  {
    "lgdCode": 37,
    "name": "Ladakh",
    "isoCode": "LA",
    "type": "ut"
  },
  {
    "lgdCode": 38,
    "name": "The Dadra and Nagar Haveli and Daman and Diu",
    "isoCode": "DH",
    "type": "ut"
  }
];

export const INDIA_DISTRICTS: GeoDistrict[] = [
  {
    "lgdCode": 4765,
    "name": "Nicobar",
    "stateLgdCode": 35,
    "stateName": "Andaman and Nicobar Islands"
  },
  {
    "lgdCode": 4766,
    "name": "North and Middle Andaman",
    "stateLgdCode": 35,
    "stateName": "Andaman and Nicobar Islands"
  },
  {
    "lgdCode": 4767,
    "name": "South Andaman",
    "stateLgdCode": 35,
    "stateName": "Andaman and Nicobar Islands"
  },
  {
    "lgdCode": 4013,
    "name": "Alluri Sitharama Raju",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4014,
    "name": "Anakapalli",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4000,
    "name": "Anantapur",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4015,
    "name": "Annamayya",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4016,
    "name": "Bapatla",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4001,
    "name": "Chittoor",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4002,
    "name": "East Godavari",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4017,
    "name": "Eluru",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4003,
    "name": "Guntur",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4018,
    "name": "Kakinada",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4019,
    "name": "Konaseema",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4004,
    "name": "Krishna",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4005,
    "name": "Kurnool",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4020,
    "name": "Nandyal",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4006,
    "name": "Nellore",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4021,
    "name": "NTR",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4022,
    "name": "Palnadu",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4023,
    "name": "Parvathipuram Manyam",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4007,
    "name": "Prakasam",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4024,
    "name": "Sri Sathya Sai",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4008,
    "name": "Srikakulam",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4025,
    "name": "Tirupati",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4009,
    "name": "Visakhapatnam",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4010,
    "name": "Vizianagaram",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4011,
    "name": "West Godavari",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4012,
    "name": "YSR Kadapa",
    "stateLgdCode": 28,
    "stateName": "Andhra Pradesh"
  },
  {
    "lgdCode": 4041,
    "name": "Anjaw",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4044,
    "name": "Changlang",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4040,
    "name": "Dibang Valley",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4028,
    "name": "East Kameng",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4035,
    "name": "East Siang",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4047,
    "name": "Kamle",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4031,
    "name": "Kra Daadi",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4030,
    "name": "Kurung Kumey",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4048,
    "name": "Lepa Rada",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4042,
    "name": "Lohit",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4046,
    "name": "Longding",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4039,
    "name": "Lower Dibang Valley",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4038,
    "name": "Lower Siang",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4032,
    "name": "Lower Subansiri",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4043,
    "name": "Namsai",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4049,
    "name": "Pakke Kessang",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4029,
    "name": "Papum Pare",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4050,
    "name": "Shi Yomi",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4036,
    "name": "Siang",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4026,
    "name": "Tawang",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4045,
    "name": "Tirap",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4037,
    "name": "Upper Siang",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4033,
    "name": "Upper Subansiri",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4027,
    "name": "West Kameng",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4034,
    "name": "West Siang",
    "stateLgdCode": 12,
    "stateName": "Arunachal Pradesh"
  },
  {
    "lgdCode": 4084,
    "name": "Bajali",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4051,
    "name": "Baksa",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4052,
    "name": "Barpeta",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4053,
    "name": "Biswanath",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4054,
    "name": "Bongaigaon",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4055,
    "name": "Cachar",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4056,
    "name": "Charaideo",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4057,
    "name": "Chirang",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4058,
    "name": "Darrang",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4059,
    "name": "Dhemaji",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4060,
    "name": "Dhubri",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4061,
    "name": "Dibrugarh",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4077,
    "name": "Dima Hasao",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4062,
    "name": "Goalpara",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4063,
    "name": "Golaghat",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4064,
    "name": "Hailakandi",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4065,
    "name": "Hojai",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4066,
    "name": "Jorhat",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4068,
    "name": "Kamrup",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4067,
    "name": "Kamrup Metropolitan",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4069,
    "name": "Karbi Anglong",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4070,
    "name": "Karimganj",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4071,
    "name": "Kokrajhar",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4072,
    "name": "Lakhimpur",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4073,
    "name": "Majuli",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4074,
    "name": "Morigaon",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4075,
    "name": "Nagaon",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4076,
    "name": "Nalbari",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4078,
    "name": "Sivasagar",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4079,
    "name": "Sonitpur",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4080,
    "name": "South Salmara-Mankachar",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4085,
    "name": "Tamulpur",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4081,
    "name": "Tinsukia",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4082,
    "name": "Udalguri",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4083,
    "name": "West Karbi Anglong",
    "stateLgdCode": 18,
    "stateName": "Assam"
  },
  {
    "lgdCode": 4086,
    "name": "Araria",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4087,
    "name": "Arwal",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4088,
    "name": "Aurangabad",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4089,
    "name": "Banka",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4090,
    "name": "Begusarai",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4091,
    "name": "Bhagalpur",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4092,
    "name": "Bhojpur",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4093,
    "name": "Buxar",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4094,
    "name": "Darbhanga",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4095,
    "name": "East Champaran",
    "stateLgdCode": 10,
    "stateName": "Bihar",
    "aliases": [
      "Motihari",
      "East Champaran (Motihari)"
    ]
  },
  {
    "lgdCode": 4096,
    "name": "Gaya",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4097,
    "name": "Gopalganj",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4098,
    "name": "Jamui",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4099,
    "name": "Jehanabad",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4100,
    "name": "Kaimur",
    "stateLgdCode": 10,
    "stateName": "Bihar",
    "aliases": [
      "Bhabua"
    ]
  },
  {
    "lgdCode": 4101,
    "name": "Katihar",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4102,
    "name": "Khagaria",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4103,
    "name": "Kishanganj",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4104,
    "name": "Lakhisarai",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4105,
    "name": "Madhepura",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4106,
    "name": "Madhubani",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4107,
    "name": "Munger",
    "stateLgdCode": 10,
    "stateName": "Bihar",
    "aliases": [
      "Monghyr"
    ]
  },
  {
    "lgdCode": 4108,
    "name": "Muzaffarpur",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4109,
    "name": "Nalanda",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4110,
    "name": "Nawada",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4111,
    "name": "Patna",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4112,
    "name": "Purnia",
    "stateLgdCode": 10,
    "stateName": "Bihar",
    "aliases": [
      "Purnea"
    ]
  },
  {
    "lgdCode": 4113,
    "name": "Rohtas",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4114,
    "name": "Saharsa",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4115,
    "name": "Samastipur",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4116,
    "name": "Saran",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4117,
    "name": "Sheikhpura",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4118,
    "name": "Sheohar",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4119,
    "name": "Sitamarhi",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4120,
    "name": "Siwan",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4121,
    "name": "Supaul",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4122,
    "name": "Vaishali",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4123,
    "name": "West Champaran",
    "stateLgdCode": 10,
    "stateName": "Bihar"
  },
  {
    "lgdCode": 4124,
    "name": "Chandigarh",
    "stateLgdCode": 4,
    "stateName": "Chandigarh"
  },
  {
    "lgdCode": 4125,
    "name": "Balod",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4126,
    "name": "Baloda Bazar",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4127,
    "name": "Balrampur",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 384,
    "name": "Bastar",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4128,
    "name": "Bemetara",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 636,
    "name": "Bijapur",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4129,
    "name": "Bilaspur",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 376,
    "name": "Dantewada",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh",
    "aliases": [
      "Dantewada (South Bastar)",
      "South Bastar"
    ]
  },
  {
    "lgdCode": 4130,
    "name": "Dhamtari",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4131,
    "name": "Durg",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4132,
    "name": "Gariyaband",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4145,
    "name": "Gaurela-Pendra-Marwahi",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4133,
    "name": "Janjgir-Champa",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4134,
    "name": "Jashpur",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4135,
    "name": "Kabirdham",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh",
    "aliases": [
      "Kawardha",
      "Kabirdham (Kawardha)"
    ]
  },
  {
    "lgdCode": 387,
    "name": "Kanker",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh",
    "aliases": [
      "Kanker (North Bastar)",
      "North Bastar"
    ]
  },
  {
    "lgdCode": 634,
    "name": "Kondagaon",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4136,
    "name": "Korba",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4137,
    "name": "Korea",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh",
    "aliases": [
      "Koriya",
      "Korea (Koriya)"
    ]
  },
  {
    "lgdCode": 4138,
    "name": "Mahasamund",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4760,
    "name": "Manendragarh-Chirmiri-Bharatpur",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4761,
    "name": "Mohla-Manpur-Ambagarh Chowki",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4139,
    "name": "Mungeli",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 637,
    "name": "Narayanpur",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4140,
    "name": "Raigarh",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4141,
    "name": "Raipur",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4142,
    "name": "Rajnandgaon",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4762,
    "name": "Sakti",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4763,
    "name": "Sarangarh-Bilaigarh",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 635,
    "name": "Sukma",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4143,
    "name": "Surajpur",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4144,
    "name": "Surguja",
    "stateLgdCode": 22,
    "stateName": "Chhattisgarh"
  },
  {
    "lgdCode": 4146,
    "name": "Central Delhi",
    "stateLgdCode": 7,
    "stateName": "Delhi"
  },
  {
    "lgdCode": 4147,
    "name": "East Delhi",
    "stateLgdCode": 7,
    "stateName": "Delhi"
  },
  {
    "lgdCode": 4148,
    "name": "New Delhi",
    "stateLgdCode": 7,
    "stateName": "Delhi"
  },
  {
    "lgdCode": 4149,
    "name": "North Delhi",
    "stateLgdCode": 7,
    "stateName": "Delhi"
  },
  {
    "lgdCode": 4150,
    "name": "North East Delhi",
    "stateLgdCode": 7,
    "stateName": "Delhi"
  },
  {
    "lgdCode": 4151,
    "name": "North West Delhi",
    "stateLgdCode": 7,
    "stateName": "Delhi"
  },
  {
    "lgdCode": 4152,
    "name": "Shahdara",
    "stateLgdCode": 7,
    "stateName": "Delhi"
  },
  {
    "lgdCode": 4153,
    "name": "South Delhi",
    "stateLgdCode": 7,
    "stateName": "Delhi"
  },
  {
    "lgdCode": 4154,
    "name": "South East Delhi",
    "stateLgdCode": 7,
    "stateName": "Delhi"
  },
  {
    "lgdCode": 4155,
    "name": "South West Delhi",
    "stateLgdCode": 7,
    "stateName": "Delhi"
  },
  {
    "lgdCode": 4156,
    "name": "West Delhi",
    "stateLgdCode": 7,
    "stateName": "Delhi"
  },
  {
    "lgdCode": 4157,
    "name": "North Goa",
    "stateLgdCode": 30,
    "stateName": "Goa"
  },
  {
    "lgdCode": 4158,
    "name": "South Goa",
    "stateLgdCode": 30,
    "stateName": "Goa"
  },
  {
    "lgdCode": 4159,
    "name": "Ahmedabad",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4160,
    "name": "Amreli",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4161,
    "name": "Anand",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4162,
    "name": "Aravalli",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4163,
    "name": "Banaskantha",
    "stateLgdCode": 24,
    "stateName": "Gujarat",
    "aliases": [
      "Banaskantha (Palanpur)",
      "Palanpur"
    ]
  },
  {
    "lgdCode": 4164,
    "name": "Bharuch",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4165,
    "name": "Bhavnagar",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4166,
    "name": "Botad",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4167,
    "name": "Chhota Udepur",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4168,
    "name": "Dahod",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4169,
    "name": "Dangs",
    "stateLgdCode": 24,
    "stateName": "Gujarat",
    "aliases": [
      "Dangs (Ahwa)",
      "Ahwa"
    ]
  },
  {
    "lgdCode": 4170,
    "name": "Devbhoomi Dwarka",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4171,
    "name": "Gandhinagar",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4172,
    "name": "Gir Somnath",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4173,
    "name": "Jamnagar",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4174,
    "name": "Junagadh",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4175,
    "name": "Kachchh",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4176,
    "name": "Kheda",
    "stateLgdCode": 24,
    "stateName": "Gujarat",
    "aliases": [
      "Kheda (Nadiad)",
      "Nadiad"
    ]
  },
  {
    "lgdCode": 4177,
    "name": "Mahisagar",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4178,
    "name": "Mehsana",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4179,
    "name": "Morbi",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4180,
    "name": "Narmada",
    "stateLgdCode": 24,
    "stateName": "Gujarat",
    "aliases": [
      "Narmada (Rajpipla)",
      "Rajpipla"
    ]
  },
  {
    "lgdCode": 4181,
    "name": "Navsari",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4182,
    "name": "Panchmahal",
    "stateLgdCode": 24,
    "stateName": "Gujarat",
    "aliases": [
      "Panchmahal (Godhra)",
      "Godhra"
    ]
  },
  {
    "lgdCode": 4183,
    "name": "Patan",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4184,
    "name": "Porbandar",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4185,
    "name": "Rajkot",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4186,
    "name": "Sabarkantha",
    "stateLgdCode": 24,
    "stateName": "Gujarat",
    "aliases": [
      "Sabarkantha (Himmatnagar)",
      "Himmatnagar"
    ]
  },
  {
    "lgdCode": 4187,
    "name": "Surat",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4188,
    "name": "Surendranagar",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4189,
    "name": "Tapi",
    "stateLgdCode": 24,
    "stateName": "Gujarat",
    "aliases": [
      "Tapi (Vyara)",
      "Vyara"
    ]
  },
  {
    "lgdCode": 4190,
    "name": "Vadodara",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4191,
    "name": "Valsad",
    "stateLgdCode": 24,
    "stateName": "Gujarat"
  },
  {
    "lgdCode": 4192,
    "name": "Ambala",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4193,
    "name": "Bhiwani",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4194,
    "name": "Charkhi Dadri",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4195,
    "name": "Faridabad",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4196,
    "name": "Fatehabad",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4197,
    "name": "Gurugram",
    "stateLgdCode": 6,
    "stateName": "Haryana",
    "aliases": [
      "Gurgaon"
    ]
  },
  {
    "lgdCode": 4198,
    "name": "Hisar",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4199,
    "name": "Jhajjar",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4200,
    "name": "Jind",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4201,
    "name": "Kaithal",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4202,
    "name": "Karnal",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4203,
    "name": "Kurukshetra",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4204,
    "name": "Mahendragarh",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 720,
    "name": "Nuh",
    "stateLgdCode": 6,
    "stateName": "Haryana",
    "aliases": [
      "Mewat"
    ]
  },
  {
    "lgdCode": 4205,
    "name": "Palwal",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4206,
    "name": "Panchkula",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4207,
    "name": "Panipat",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4208,
    "name": "Rewari",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4209,
    "name": "Rohtak",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4210,
    "name": "Sirsa",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4211,
    "name": "Sonipat",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4212,
    "name": "Yamunanagar",
    "stateLgdCode": 6,
    "stateName": "Haryana"
  },
  {
    "lgdCode": 4213,
    "name": "Bilaspur",
    "stateLgdCode": 2,
    "stateName": "Himachal Pradesh"
  },
  {
    "lgdCode": 4214,
    "name": "Chamba",
    "stateLgdCode": 2,
    "stateName": "Himachal Pradesh"
  },
  {
    "lgdCode": 4215,
    "name": "Hamirpur",
    "stateLgdCode": 2,
    "stateName": "Himachal Pradesh"
  },
  {
    "lgdCode": 4216,
    "name": "Kangra",
    "stateLgdCode": 2,
    "stateName": "Himachal Pradesh"
  },
  {
    "lgdCode": 4217,
    "name": "Kinnaur",
    "stateLgdCode": 2,
    "stateName": "Himachal Pradesh"
  },
  {
    "lgdCode": 4218,
    "name": "Kullu",
    "stateLgdCode": 2,
    "stateName": "Himachal Pradesh"
  },
  {
    "lgdCode": 4219,
    "name": "Lahaul & Spiti",
    "stateLgdCode": 2,
    "stateName": "Himachal Pradesh"
  },
  {
    "lgdCode": 4220,
    "name": "Mandi",
    "stateLgdCode": 2,
    "stateName": "Himachal Pradesh"
  },
  {
    "lgdCode": 4221,
    "name": "Shimla",
    "stateLgdCode": 2,
    "stateName": "Himachal Pradesh"
  },
  {
    "lgdCode": 4222,
    "name": "Sirmaur",
    "stateLgdCode": 2,
    "stateName": "Himachal Pradesh",
    "aliases": [
      "Sirmaur (Sirmour)",
      "Sirmour"
    ]
  },
  {
    "lgdCode": 4223,
    "name": "Solan",
    "stateLgdCode": 2,
    "stateName": "Himachal Pradesh"
  },
  {
    "lgdCode": 4224,
    "name": "Una",
    "stateLgdCode": 2,
    "stateName": "Himachal Pradesh"
  },
  {
    "lgdCode": 4225,
    "name": "Anantnag",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4226,
    "name": "Bandipore",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4227,
    "name": "Baramulla",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4228,
    "name": "Budgam",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4229,
    "name": "Doda",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4230,
    "name": "Ganderbal",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4231,
    "name": "Jammu",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4232,
    "name": "Kathua",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4233,
    "name": "Kishtwar",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4234,
    "name": "Kulgam",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4235,
    "name": "Kupwara",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4236,
    "name": "Poonch",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4237,
    "name": "Pulwama",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4238,
    "name": "Rajouri",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4239,
    "name": "Ramban",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4240,
    "name": "Reasi",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4241,
    "name": "Samba",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4242,
    "name": "Shopian",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4243,
    "name": "Srinagar",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4244,
    "name": "Udhampur",
    "stateLgdCode": 1,
    "stateName": "Jammu and Kashmir"
  },
  {
    "lgdCode": 4245,
    "name": "Bokaro",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4246,
    "name": "Chatra",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4247,
    "name": "Deoghar",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4248,
    "name": "Dhanbad",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4249,
    "name": "Dumka",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4250,
    "name": "East Singhbhum",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4251,
    "name": "Garhwa",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4252,
    "name": "Giridih",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4253,
    "name": "Godda",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4254,
    "name": "Gumla",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4255,
    "name": "Hazaribag",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4256,
    "name": "Jamtara",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4257,
    "name": "Khunti",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4258,
    "name": "Koderma",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4259,
    "name": "Latehar",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4260,
    "name": "Lohardaga",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4261,
    "name": "Pakur",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4262,
    "name": "Palamu",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4263,
    "name": "Ramgarh",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4264,
    "name": "Ranchi",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4265,
    "name": "Sahibganj",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4266,
    "name": "Seraikela-Kharsawan",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4267,
    "name": "Simdega",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4268,
    "name": "West Singhbhum",
    "stateLgdCode": 20,
    "stateName": "Jharkhand"
  },
  {
    "lgdCode": 4269,
    "name": "Bagalkot",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4270,
    "name": "Ballari",
    "stateLgdCode": 29,
    "stateName": "Karnataka",
    "aliases": [
      "Ballari (Bellary)",
      "Bellary"
    ]
  },
  {
    "lgdCode": 4271,
    "name": "Belagavi",
    "stateLgdCode": 29,
    "stateName": "Karnataka",
    "aliases": [
      "Belagavi (Belgaum)",
      "Belgaum"
    ]
  },
  {
    "lgdCode": 4272,
    "name": "Bengaluru (Bangalore) Rural",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4273,
    "name": "Bengaluru (Bangalore) Urban",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4274,
    "name": "Bidar",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4275,
    "name": "Chamarajanagar",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4276,
    "name": "Chikballapur",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4277,
    "name": "Chikkamagaluru",
    "stateLgdCode": 29,
    "stateName": "Karnataka",
    "aliases": [
      "Chikkamagaluru (Chikmagalur)",
      "Chikmagalur"
    ]
  },
  {
    "lgdCode": 4278,
    "name": "Chitradurga",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4279,
    "name": "Dakshina Kannada",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4280,
    "name": "Davangere",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4281,
    "name": "Dharwad",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4282,
    "name": "Gadag",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4283,
    "name": "Hassan",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4284,
    "name": "Haveri",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4285,
    "name": "Kalaburagi",
    "stateLgdCode": 29,
    "stateName": "Karnataka",
    "aliases": [
      "Kalaburagi (Gulbarga)",
      "Gulbarga"
    ]
  },
  {
    "lgdCode": 4286,
    "name": "Kodagu",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4287,
    "name": "Kolar",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4288,
    "name": "Koppal",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4289,
    "name": "Mandya",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4290,
    "name": "Mysuru",
    "stateLgdCode": 29,
    "stateName": "Karnataka",
    "aliases": [
      "Mysuru (Mysore)",
      "Mysore"
    ]
  },
  {
    "lgdCode": 4291,
    "name": "Raichur",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4292,
    "name": "Ramanagara",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4293,
    "name": "Shivamogga",
    "stateLgdCode": 29,
    "stateName": "Karnataka",
    "aliases": [
      "Shivamogga (Shimoga)",
      "Shimoga"
    ]
  },
  {
    "lgdCode": 4294,
    "name": "Tumakuru",
    "stateLgdCode": 29,
    "stateName": "Karnataka",
    "aliases": [
      "Tumakuru (Tumkur)",
      "Tumkur"
    ]
  },
  {
    "lgdCode": 4295,
    "name": "Udupi",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4296,
    "name": "Uttara Kannada",
    "stateLgdCode": 29,
    "stateName": "Karnataka",
    "aliases": [
      "Uttara Kannada (Karwar)",
      "Karwar"
    ]
  },
  {
    "lgdCode": 4299,
    "name": "Vijayanagara",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4297,
    "name": "Vijayapura",
    "stateLgdCode": 29,
    "stateName": "Karnataka",
    "aliases": [
      "Vijayapura (Bijapur)",
      "Bijapur"
    ]
  },
  {
    "lgdCode": 4298,
    "name": "Yadgir",
    "stateLgdCode": 29,
    "stateName": "Karnataka"
  },
  {
    "lgdCode": 4300,
    "name": "Alappuzha",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4301,
    "name": "Ernakulam",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4302,
    "name": "Idukki",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4303,
    "name": "Kannur",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4304,
    "name": "Kasaragod",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4305,
    "name": "Kollam",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4306,
    "name": "Kottayam",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4307,
    "name": "Kozhikode",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4308,
    "name": "Malappuram",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4309,
    "name": "Palakkad",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4310,
    "name": "Pathanamthitta",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4311,
    "name": "Thiruvananthapuram",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4312,
    "name": "Thrissur",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4313,
    "name": "Wayanad",
    "stateLgdCode": 32,
    "stateName": "Kerala"
  },
  {
    "lgdCode": 4769,
    "name": "Kargil",
    "stateLgdCode": 37,
    "stateName": "Ladakh"
  },
  {
    "lgdCode": 4768,
    "name": "Leh",
    "stateLgdCode": 37,
    "stateName": "Ladakh"
  },
  {
    "lgdCode": 4764,
    "name": "Lakshadweep",
    "stateLgdCode": 31,
    "stateName": "Lakshadweep"
  },
  {
    "lgdCode": 4314,
    "name": "Agar Malwa",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4315,
    "name": "Alirajpur",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4316,
    "name": "Anuppur",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4317,
    "name": "Ashoknagar",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4318,
    "name": "Balaghat",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4319,
    "name": "Barwani",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4320,
    "name": "Betul",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4321,
    "name": "Bhind",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4322,
    "name": "Bhopal",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4323,
    "name": "Burhanpur",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4324,
    "name": "Chhatarpur",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4325,
    "name": "Chhindwara",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4326,
    "name": "Damoh",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4327,
    "name": "Datia",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4328,
    "name": "Dewas",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4329,
    "name": "Dhar",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4330,
    "name": "Dindori",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4331,
    "name": "Guna",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4332,
    "name": "Gwalior",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4333,
    "name": "Harda",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4335,
    "name": "Indore",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4336,
    "name": "Jabalpur",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4337,
    "name": "Jhabua",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4338,
    "name": "Katni",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4339,
    "name": "Khandwa",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4340,
    "name": "Khargone",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4341,
    "name": "Mandla",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4342,
    "name": "Mandsaur",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4366,
    "name": "Mauganj",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4343,
    "name": "Morena",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4334,
    "name": "Narmadapuram",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh",
    "aliases": [
      "Hoshangabad"
    ]
  },
  {
    "lgdCode": 4344,
    "name": "Narsinghpur",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4345,
    "name": "Neemuch",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4365,
    "name": "Niwari",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4367,
    "name": "Pandhurna",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4346,
    "name": "Panna",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4347,
    "name": "Raisen",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4348,
    "name": "Rajgarh",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4349,
    "name": "Ratlam",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4350,
    "name": "Rewa",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4351,
    "name": "Sagar",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4352,
    "name": "Satna",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4353,
    "name": "Sehore",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4354,
    "name": "Seoni",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4355,
    "name": "Shahdol",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4356,
    "name": "Shajapur",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4357,
    "name": "Sheopur",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4358,
    "name": "Shivpuri",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4359,
    "name": "Sidhi",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4360,
    "name": "Singrauli",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4361,
    "name": "Tikamgarh",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4362,
    "name": "Ujjain",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4363,
    "name": "Umaria",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4364,
    "name": "Vidisha",
    "stateLgdCode": 23,
    "stateName": "Madhya Pradesh"
  },
  {
    "lgdCode": 4368,
    "name": "Ahmednagar",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4369,
    "name": "Akola",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4370,
    "name": "Amravati",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4372,
    "name": "Beed",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4373,
    "name": "Bhandara",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4374,
    "name": "Buldhana",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4375,
    "name": "Chandrapur",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4371,
    "name": "Chhatrapati Sambhajinagar",
    "stateLgdCode": 27,
    "stateName": "Maharashtra",
    "aliases": [
      "Aurangabad"
    ]
  },
  {
    "lgdCode": 4390,
    "name": "Dharashiv",
    "stateLgdCode": 27,
    "stateName": "Maharashtra",
    "aliases": [
      "Osmanabad"
    ]
  },
  {
    "lgdCode": 4376,
    "name": "Dhule",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4377,
    "name": "Gadchiroli",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4378,
    "name": "Gondia",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4379,
    "name": "Hingoli",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4380,
    "name": "Jalgaon",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4381,
    "name": "Jalna",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4382,
    "name": "Kolhapur",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4383,
    "name": "Latur",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4384,
    "name": "Mumbai City",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4385,
    "name": "Mumbai Suburban",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4386,
    "name": "Nagpur",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4387,
    "name": "Nanded",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4388,
    "name": "Nandurbar",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4389,
    "name": "Nashik",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4391,
    "name": "Palghar",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4392,
    "name": "Parbhani",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4393,
    "name": "Pune",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4394,
    "name": "Raigad",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4395,
    "name": "Ratnagiri",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4396,
    "name": "Sangli",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4397,
    "name": "Satara",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4398,
    "name": "Sindhudurg",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4399,
    "name": "Solapur",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4400,
    "name": "Thane",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4401,
    "name": "Wardha",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4402,
    "name": "Washim",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4403,
    "name": "Yavatmal",
    "stateLgdCode": 27,
    "stateName": "Maharashtra"
  },
  {
    "lgdCode": 4404,
    "name": "Bishnupur",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4405,
    "name": "Chandel",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4406,
    "name": "Churachandpur",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4407,
    "name": "Imphal East",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4408,
    "name": "Imphal West",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4409,
    "name": "Jiribam",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4410,
    "name": "Kakching",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4411,
    "name": "Kamjong",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4412,
    "name": "Kangpokpi",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4413,
    "name": "Noney",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4414,
    "name": "Pherzawl",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4415,
    "name": "Senapati",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4416,
    "name": "Tamenglong",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4417,
    "name": "Tengnoupal",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4418,
    "name": "Thoubal",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4419,
    "name": "Ukhrul",
    "stateLgdCode": 14,
    "stateName": "Manipur"
  },
  {
    "lgdCode": 4420,
    "name": "East Garo Hills",
    "stateLgdCode": 17,
    "stateName": "Meghalaya"
  },
  {
    "lgdCode": 4421,
    "name": "East Jaintia Hills",
    "stateLgdCode": 17,
    "stateName": "Meghalaya"
  },
  {
    "lgdCode": 4422,
    "name": "East Khasi Hills",
    "stateLgdCode": 17,
    "stateName": "Meghalaya"
  },
  {
    "lgdCode": 4431,
    "name": "Eastern West Khasi Hills",
    "stateLgdCode": 17,
    "stateName": "Meghalaya"
  },
  {
    "lgdCode": 4423,
    "name": "North Garo Hills",
    "stateLgdCode": 17,
    "stateName": "Meghalaya"
  },
  {
    "lgdCode": 4424,
    "name": "Ri Bhoi",
    "stateLgdCode": 17,
    "stateName": "Meghalaya"
  },
  {
    "lgdCode": 4425,
    "name": "South Garo Hills",
    "stateLgdCode": 17,
    "stateName": "Meghalaya"
  },
  {
    "lgdCode": 4426,
    "name": "South West Garo Hills",
    "stateLgdCode": 17,
    "stateName": "Meghalaya"
  },
  {
    "lgdCode": 4427,
    "name": "South West Khasi Hills",
    "stateLgdCode": 17,
    "stateName": "Meghalaya"
  },
  {
    "lgdCode": 4428,
    "name": "West Garo Hills",
    "stateLgdCode": 17,
    "stateName": "Meghalaya"
  },
  {
    "lgdCode": 4429,
    "name": "West Jaintia Hills",
    "stateLgdCode": 17,
    "stateName": "Meghalaya"
  },
  {
    "lgdCode": 4430,
    "name": "West Khasi Hills",
    "stateLgdCode": 17,
    "stateName": "Meghalaya"
  },
  {
    "lgdCode": 4432,
    "name": "Aizawl",
    "stateLgdCode": 15,
    "stateName": "Mizoram"
  },
  {
    "lgdCode": 4433,
    "name": "Champhai",
    "stateLgdCode": 15,
    "stateName": "Mizoram"
  },
  {
    "lgdCode": 4440,
    "name": "Hnahthial",
    "stateLgdCode": 15,
    "stateName": "Mizoram"
  },
  {
    "lgdCode": 4441,
    "name": "Khawzawl",
    "stateLgdCode": 15,
    "stateName": "Mizoram"
  },
  {
    "lgdCode": 4434,
    "name": "Kolasib",
    "stateLgdCode": 15,
    "stateName": "Mizoram"
  },
  {
    "lgdCode": 4435,
    "name": "Lawngtlai",
    "stateLgdCode": 15,
    "stateName": "Mizoram"
  },
  {
    "lgdCode": 4436,
    "name": "Lunglei",
    "stateLgdCode": 15,
    "stateName": "Mizoram"
  },
  {
    "lgdCode": 4437,
    "name": "Mamit",
    "stateLgdCode": 15,
    "stateName": "Mizoram"
  },
  {
    "lgdCode": 4438,
    "name": "Saiha",
    "stateLgdCode": 15,
    "stateName": "Mizoram"
  },
  {
    "lgdCode": 4442,
    "name": "Saitual",
    "stateLgdCode": 15,
    "stateName": "Mizoram"
  },
  {
    "lgdCode": 4439,
    "name": "Serchhip",
    "stateLgdCode": 15,
    "stateName": "Mizoram"
  },
  {
    "lgdCode": 4458,
    "name": "Chumoukedima",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4443,
    "name": "Dimapur",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4444,
    "name": "Kiphire",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4445,
    "name": "Kohima",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4446,
    "name": "Longleng",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4447,
    "name": "Mokokchung",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4448,
    "name": "Mon",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4457,
    "name": "Niuland",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4454,
    "name": "Noklak",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4449,
    "name": "Peren",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4450,
    "name": "Phek",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4456,
    "name": "Shamator",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4455,
    "name": "Tseminyu",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4451,
    "name": "Tuensang",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4452,
    "name": "Wokha",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4453,
    "name": "Zunheboto",
    "stateLgdCode": 13,
    "stateName": "Nagaland"
  },
  {
    "lgdCode": 4459,
    "name": "Angul",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4460,
    "name": "Balangir",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4461,
    "name": "Balasore",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4462,
    "name": "Bargarh",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4463,
    "name": "Bhadrak",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4464,
    "name": "Boudh",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4465,
    "name": "Cuttack",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4466,
    "name": "Deogarh",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4467,
    "name": "Dhenkanal",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4468,
    "name": "Gajapati",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4469,
    "name": "Ganjam",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4470,
    "name": "Jagatsinghapur",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4471,
    "name": "Jajpur",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4472,
    "name": "Jharsuguda",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 383,
    "name": "Kalahandi",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4473,
    "name": "Kandhamal",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4474,
    "name": "Kendrapara",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4475,
    "name": "Kendujhar",
    "stateLgdCode": 21,
    "stateName": "Odisha",
    "aliases": [
      "Kendujhar (Keonjhar)",
      "Keonjhar"
    ]
  },
  {
    "lgdCode": 4476,
    "name": "Khordha",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4477,
    "name": "Koraput",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4478,
    "name": "Malkangiri",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4479,
    "name": "Mayurbhanj",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4480,
    "name": "Nabarangpur",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4481,
    "name": "Nayagarh",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4482,
    "name": "Nuapada",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4483,
    "name": "Puri",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4484,
    "name": "Rayagada",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4485,
    "name": "Sambalpur",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4486,
    "name": "Sonepur",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4487,
    "name": "Sundargarh",
    "stateLgdCode": 21,
    "stateName": "Odisha"
  },
  {
    "lgdCode": 4488,
    "name": "Karaikal",
    "stateLgdCode": 34,
    "stateName": "Puducherry"
  },
  {
    "lgdCode": 4489,
    "name": "Mahe",
    "stateLgdCode": 34,
    "stateName": "Puducherry"
  },
  {
    "lgdCode": 4490,
    "name": "Puducherry",
    "stateLgdCode": 34,
    "stateName": "Puducherry"
  },
  {
    "lgdCode": 4491,
    "name": "Yanam",
    "stateLgdCode": 34,
    "stateName": "Puducherry"
  },
  {
    "lgdCode": 4492,
    "name": "Amritsar",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4493,
    "name": "Barnala",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4494,
    "name": "Bathinda",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4495,
    "name": "Faridkot",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4496,
    "name": "Fatehgarh Sahib",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4497,
    "name": "Fazilka",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4498,
    "name": "Ferozepur",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4499,
    "name": "Gurdaspur",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4500,
    "name": "Hoshiarpur",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4501,
    "name": "Jalandhar",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4502,
    "name": "Kapurthala",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4503,
    "name": "Ludhiana",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4514,
    "name": "Malerkotla",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4504,
    "name": "Mansa",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4505,
    "name": "Moga",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4508,
    "name": "Pathankot",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4509,
    "name": "Patiala",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4510,
    "name": "Rupnagar",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4511,
    "name": "Sahibzada Ajit Singh Nagar",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4512,
    "name": "Sangrur",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4507,
    "name": "Shahid Bhagat Singh Nagar",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4506,
    "name": "Sri Muktsar Sahib",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4513,
    "name": "Tarn Taran",
    "stateLgdCode": 3,
    "stateName": "Punjab"
  },
  {
    "lgdCode": 4515,
    "name": "Ajmer",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4516,
    "name": "Alwar",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4548,
    "name": "Anupgarh",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4549,
    "name": "Balotra",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4517,
    "name": "Banswara",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4518,
    "name": "Baran",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4519,
    "name": "Barmer",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4550,
    "name": "Beawar",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4520,
    "name": "Bharatpur",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4521,
    "name": "Bhilwara",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4522,
    "name": "Bikaner",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4523,
    "name": "Bundi",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4524,
    "name": "Chittorgarh",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4525,
    "name": "Churu",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4526,
    "name": "Dausa",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4551,
    "name": "Deeg",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4527,
    "name": "Dholpur",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4552,
    "name": "Didwana-Kuchaman",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4553,
    "name": "Dudu",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4528,
    "name": "Dungarpur",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4554,
    "name": "Gangapur City",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4529,
    "name": "Hanumangarh",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4530,
    "name": "Jaipur",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4555,
    "name": "Jaipur Rural",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4531,
    "name": "Jaisalmer",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4532,
    "name": "Jalore",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4533,
    "name": "Jhalawar",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4534,
    "name": "Jhunjhunu",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4535,
    "name": "Jodhpur",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4556,
    "name": "Jodhpur Rural",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4536,
    "name": "Karauli",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4557,
    "name": "Kekri",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4558,
    "name": "Khairthal-Tijara",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4537,
    "name": "Kota",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4559,
    "name": "Kotputli-Behror",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4538,
    "name": "Nagaur",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4560,
    "name": "Neem Ka Thana",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4539,
    "name": "Pali",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4561,
    "name": "Phalodi",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4540,
    "name": "Pratapgarh",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4541,
    "name": "Rajsamand",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4562,
    "name": "Salumbar",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4563,
    "name": "Sanchore",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4542,
    "name": "Sawai Madhopur",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4564,
    "name": "Shahpura",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4543,
    "name": "Sikar",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4544,
    "name": "Sirohi",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4545,
    "name": "Sri Ganganagar",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4546,
    "name": "Tonk",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4547,
    "name": "Udaipur",
    "stateLgdCode": 8,
    "stateName": "Rajasthan"
  },
  {
    "lgdCode": 4565,
    "name": "Gangtok",
    "stateLgdCode": 11,
    "stateName": "Sikkim"
  },
  {
    "lgdCode": 4568,
    "name": "Gyalshing",
    "stateLgdCode": 11,
    "stateName": "Sikkim"
  },
  {
    "lgdCode": 4566,
    "name": "Mangan",
    "stateLgdCode": 11,
    "stateName": "Sikkim"
  },
  {
    "lgdCode": 4567,
    "name": "Namchi",
    "stateLgdCode": 11,
    "stateName": "Sikkim"
  },
  {
    "lgdCode": 4569,
    "name": "Pakyong",
    "stateLgdCode": 11,
    "stateName": "Sikkim"
  },
  {
    "lgdCode": 4570,
    "name": "Soreng",
    "stateLgdCode": 11,
    "stateName": "Sikkim"
  },
  {
    "lgdCode": 4571,
    "name": "Ariyalur",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4607,
    "name": "Chengalpattu",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4572,
    "name": "Chennai",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4573,
    "name": "Coimbatore",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4574,
    "name": "Cuddalore",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4575,
    "name": "Dharmapuri",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4576,
    "name": "Dindigul",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4577,
    "name": "Erode",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4608,
    "name": "Kallakurichi",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4578,
    "name": "Kanchipuram",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4579,
    "name": "Kanniyakumari",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4580,
    "name": "Karur",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4581,
    "name": "Krishnagiri",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4582,
    "name": "Madurai",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4583,
    "name": "Mayiladuthurai",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4584,
    "name": "Nagapattinam",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4585,
    "name": "Namakkal",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4587,
    "name": "Perambalur",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4588,
    "name": "Pudukkottai",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4589,
    "name": "Ramanathapuram",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4590,
    "name": "Ranipet",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4591,
    "name": "Salem",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4592,
    "name": "Sivaganga",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4593,
    "name": "Tenkasi",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4594,
    "name": "Thanjavur",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4586,
    "name": "The Nilgiris",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4595,
    "name": "Theni",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4596,
    "name": "Thoothukudi",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4597,
    "name": "Tiruchirappalli",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4598,
    "name": "Tirunelveli",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4599,
    "name": "Tirupathur",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4600,
    "name": "Tiruppur",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4601,
    "name": "Tiruvallur",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4602,
    "name": "Tiruvannamalai",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4603,
    "name": "Tiruvarur",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4604,
    "name": "Vellore",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4605,
    "name": "Viluppuram",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4606,
    "name": "Virudhunagar",
    "stateLgdCode": 33,
    "stateName": "Tamil Nadu"
  },
  {
    "lgdCode": 4609,
    "name": "Adilabad",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4610,
    "name": "Bhadradri Kothagudem",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4640,
    "name": "Hanamkonda",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4611,
    "name": "Hyderabad",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4612,
    "name": "Jagtial",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4613,
    "name": "Jangaon",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4614,
    "name": "Jayashankar Bhupalpally",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4615,
    "name": "Jogulamba Gadwal",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4616,
    "name": "Kamareddy",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4617,
    "name": "Karimnagar",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4618,
    "name": "Khammam",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4619,
    "name": "Kumuram Bheem Asifabad",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4620,
    "name": "Mahabubabad",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4621,
    "name": "Mahabubnagar",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4622,
    "name": "Mancherial",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4623,
    "name": "Medak",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4624,
    "name": "Medchal Malkajgiri",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4625,
    "name": "Mulugu",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4626,
    "name": "Nagarkurnool",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4627,
    "name": "Nalgonda",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4628,
    "name": "Narayanpet",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4629,
    "name": "Nirmal",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4630,
    "name": "Nizamabad",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4631,
    "name": "Peddapalli",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4632,
    "name": "Rajanna Sircilla",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4633,
    "name": "Rangareddy",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4634,
    "name": "Sangareddy",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4635,
    "name": "Siddipet",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4636,
    "name": "Suryapet",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4637,
    "name": "Vikarabad",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4638,
    "name": "Wanaparthy",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4639,
    "name": "Warangal",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4641,
    "name": "Yadadri Bhuvanagiri",
    "stateLgdCode": 36,
    "stateName": "Telangana"
  },
  {
    "lgdCode": 4770,
    "name": "Dadra and Nagar Haveli",
    "stateLgdCode": 38,
    "stateName": "The Dadra and Nagar Haveli and Daman and Diu"
  },
  {
    "lgdCode": 4771,
    "name": "Daman",
    "stateLgdCode": 38,
    "stateName": "The Dadra and Nagar Haveli and Daman and Diu"
  },
  {
    "lgdCode": 4772,
    "name": "Diu",
    "stateLgdCode": 38,
    "stateName": "The Dadra and Nagar Haveli and Daman and Diu"
  },
  {
    "lgdCode": 4642,
    "name": "Dhalai",
    "stateLgdCode": 16,
    "stateName": "Tripura"
  },
  {
    "lgdCode": 4643,
    "name": "Gomati",
    "stateLgdCode": 16,
    "stateName": "Tripura"
  },
  {
    "lgdCode": 4644,
    "name": "Khowai",
    "stateLgdCode": 16,
    "stateName": "Tripura"
  },
  {
    "lgdCode": 4645,
    "name": "North Tripura",
    "stateLgdCode": 16,
    "stateName": "Tripura"
  },
  {
    "lgdCode": 4646,
    "name": "Sepahijala",
    "stateLgdCode": 16,
    "stateName": "Tripura"
  },
  {
    "lgdCode": 4647,
    "name": "South Tripura",
    "stateLgdCode": 16,
    "stateName": "Tripura"
  },
  {
    "lgdCode": 4648,
    "name": "Unakoti",
    "stateLgdCode": 16,
    "stateName": "Tripura"
  },
  {
    "lgdCode": 4649,
    "name": "West Tripura",
    "stateLgdCode": 16,
    "stateName": "Tripura"
  },
  {
    "lgdCode": 4663,
    "name": "Agra",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4664,
    "name": "Aligarh",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4666,
    "name": "Ambedkar Nagar",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4667,
    "name": "Amethi",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4668,
    "name": "Amroha",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4669,
    "name": "Auraiya",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4688,
    "name": "Ayodhya",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh",
    "aliases": [
      "Faizabad"
    ]
  },
  {
    "lgdCode": 4670,
    "name": "Azamgarh",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4671,
    "name": "Baghpat",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4672,
    "name": "Bahraich",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4673,
    "name": "Ballia",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4674,
    "name": "Balrampur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4675,
    "name": "Banda",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4676,
    "name": "Barabanki",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4677,
    "name": "Bareilly",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4678,
    "name": "Basti",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4679,
    "name": "Bhadohi",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4680,
    "name": "Bijnor",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4681,
    "name": "Budaun",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4682,
    "name": "Bulandshahr",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4683,
    "name": "Chandauli",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4684,
    "name": "Chitrakoot",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4685,
    "name": "Deoria",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4686,
    "name": "Etah",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4687,
    "name": "Etawah",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4689,
    "name": "Farrukhabad",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4690,
    "name": "Fatehpur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4691,
    "name": "Firozabad",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4692,
    "name": "Gautam Buddha Nagar",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4693,
    "name": "Ghaziabad",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4694,
    "name": "Ghazipur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4695,
    "name": "Gonda",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4696,
    "name": "Gorakhpur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4697,
    "name": "Hamirpur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4698,
    "name": "Hapur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4699,
    "name": "Hardoi",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4700,
    "name": "Hathras",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4701,
    "name": "Jalaun",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4702,
    "name": "Jaunpur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4703,
    "name": "Jhansi",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4704,
    "name": "Kannauj",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4705,
    "name": "Kanpur Dehat",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4706,
    "name": "Kanpur Nagar",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4707,
    "name": "Kasganj",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4708,
    "name": "Kaushambi",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4709,
    "name": "Kushinagar",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4710,
    "name": "Lakhimpur Kheri",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4711,
    "name": "Lalitpur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4712,
    "name": "Lucknow",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4713,
    "name": "Maharajganj",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4714,
    "name": "Mahoba",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4715,
    "name": "Mainpuri",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4716,
    "name": "Mathura",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4717,
    "name": "Mau",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4718,
    "name": "Meerut",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4719,
    "name": "Mirzapur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4720,
    "name": "Moradabad",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4721,
    "name": "Muzaffarnagar",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4722,
    "name": "Pilibhit",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4723,
    "name": "Pratapgarh",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4665,
    "name": "Prayagraj",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh",
    "aliases": [
      "Allahabad"
    ]
  },
  {
    "lgdCode": 4724,
    "name": "Raebareli",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4725,
    "name": "Rampur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4726,
    "name": "Saharanpur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4727,
    "name": "Sambhal",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4728,
    "name": "Sant Kabir Nagar",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4729,
    "name": "Shahjahanpur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4730,
    "name": "Shamli",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4731,
    "name": "Shravasti",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4732,
    "name": "Siddharthnagar",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4733,
    "name": "Sitapur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4734,
    "name": "Sonbhadra",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4735,
    "name": "Sultanpur",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4736,
    "name": "Unnao",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 198,
    "name": "Varanasi",
    "stateLgdCode": 9,
    "stateName": "Uttar Pradesh"
  },
  {
    "lgdCode": 4650,
    "name": "Almora",
    "stateLgdCode": 5,
    "stateName": "Uttarakhand"
  },
  {
    "lgdCode": 4651,
    "name": "Bageshwar",
    "stateLgdCode": 5,
    "stateName": "Uttarakhand"
  },
  {
    "lgdCode": 4652,
    "name": "Chamoli",
    "stateLgdCode": 5,
    "stateName": "Uttarakhand"
  },
  {
    "lgdCode": 4653,
    "name": "Champawat",
    "stateLgdCode": 5,
    "stateName": "Uttarakhand"
  },
  {
    "lgdCode": 4654,
    "name": "Dehradun",
    "stateLgdCode": 5,
    "stateName": "Uttarakhand"
  },
  {
    "lgdCode": 4655,
    "name": "Haridwar",
    "stateLgdCode": 5,
    "stateName": "Uttarakhand"
  },
  {
    "lgdCode": 4656,
    "name": "Nainital",
    "stateLgdCode": 5,
    "stateName": "Uttarakhand"
  },
  {
    "lgdCode": 4657,
    "name": "Pauri Garhwal",
    "stateLgdCode": 5,
    "stateName": "Uttarakhand"
  },
  {
    "lgdCode": 4658,
    "name": "Pithoragarh",
    "stateLgdCode": 5,
    "stateName": "Uttarakhand"
  },
  {
    "lgdCode": 4659,
    "name": "Rudraprayag",
    "stateLgdCode": 5,
    "stateName": "Uttarakhand"
  },
  {
    "lgdCode": 4660,
    "name": "Tehri Garhwal",
    "stateLgdCode": 5,
    "stateName": "Uttarakhand"
  },
  {
    "lgdCode": 4661,
    "name": "Udham Singh Nagar",
    "stateLgdCode": 5,
    "stateName": "Uttarakhand"
  },
  {
    "lgdCode": 4662,
    "name": "Uttarkashi",
    "stateLgdCode": 5,
    "stateName": "Uttarakhand"
  },
  {
    "lgdCode": 4737,
    "name": "Alipurduar",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4738,
    "name": "Bankura",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4739,
    "name": "Birbhum",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4742,
    "name": "Cooch Behar",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4743,
    "name": "Dakshin Dinajpur",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4744,
    "name": "Darjeeling",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4745,
    "name": "Hooghly",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4746,
    "name": "Howrah",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4747,
    "name": "Jalpaiguri",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4748,
    "name": "Jhargram",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4749,
    "name": "Kalimpong",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4750,
    "name": "Kolkata",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4751,
    "name": "Malda",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4752,
    "name": "Murshidabad",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4753,
    "name": "Nadia",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4754,
    "name": "North 24 Parganas",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4740,
    "name": "Paschim Bardhaman",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4755,
    "name": "Paschim Medinipur",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4741,
    "name": "Purba Bardhaman",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4756,
    "name": "Purba Medinipur",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4757,
    "name": "Purulia",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4758,
    "name": "South 24 Parganas",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  },
  {
    "lgdCode": 4759,
    "name": "Uttar Dinajpur",
    "stateLgdCode": 19,
    "stateName": "West Bengal"
  }
];
