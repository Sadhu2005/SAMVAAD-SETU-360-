/** One-shot builder for src/data/indiaGeo.ts from a public India district snapshot + LGD patches. */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const STATES = [
  { lgdCode: 1, name: 'Jammu and Kashmir', isoCode: 'JK', type: 'ut' },
  { lgdCode: 2, name: 'Himachal Pradesh', isoCode: 'HP', type: 'state' },
  { lgdCode: 3, name: 'Punjab', isoCode: 'PB', type: 'state' },
  { lgdCode: 4, name: 'Chandigarh', isoCode: 'CH', type: 'ut' },
  { lgdCode: 5, name: 'Uttarakhand', isoCode: 'UK', type: 'state' },
  { lgdCode: 6, name: 'Haryana', isoCode: 'HR', type: 'state' },
  { lgdCode: 7, name: 'Delhi', isoCode: 'DL', type: 'ut' },
  { lgdCode: 8, name: 'Rajasthan', isoCode: 'RJ', type: 'state' },
  { lgdCode: 9, name: 'Uttar Pradesh', isoCode: 'UP', type: 'state' },
  { lgdCode: 10, name: 'Bihar', isoCode: 'BR', type: 'state' },
  { lgdCode: 11, name: 'Sikkim', isoCode: 'SK', type: 'state' },
  { lgdCode: 12, name: 'Arunachal Pradesh', isoCode: 'AR', type: 'state' },
  { lgdCode: 13, name: 'Nagaland', isoCode: 'NL', type: 'state' },
  { lgdCode: 14, name: 'Manipur', isoCode: 'MN', type: 'state' },
  { lgdCode: 15, name: 'Mizoram', isoCode: 'MZ', type: 'state' },
  { lgdCode: 16, name: 'Tripura', isoCode: 'TR', type: 'state' },
  { lgdCode: 17, name: 'Meghalaya', isoCode: 'ML', type: 'state' },
  { lgdCode: 18, name: 'Assam', isoCode: 'AS', type: 'state' },
  { lgdCode: 19, name: 'West Bengal', isoCode: 'WB', type: 'state' },
  { lgdCode: 20, name: 'Jharkhand', isoCode: 'JH', type: 'state' },
  { lgdCode: 21, name: 'Odisha', isoCode: 'OD', type: 'state' },
  { lgdCode: 22, name: 'Chhattisgarh', isoCode: 'CG', type: 'state' },
  { lgdCode: 23, name: 'Madhya Pradesh', isoCode: 'MP', type: 'state' },
  { lgdCode: 24, name: 'Gujarat', isoCode: 'GJ', type: 'state' },
  { lgdCode: 27, name: 'Maharashtra', isoCode: 'MH', type: 'state' },
  { lgdCode: 28, name: 'Andhra Pradesh', isoCode: 'AP', type: 'state' },
  { lgdCode: 29, name: 'Karnataka', isoCode: 'KA', type: 'state' },
  { lgdCode: 30, name: 'Goa', isoCode: 'GA', type: 'state' },
  { lgdCode: 31, name: 'Lakshadweep', isoCode: 'LD', type: 'ut' },
  { lgdCode: 32, name: 'Kerala', isoCode: 'KL', type: 'state' },
  { lgdCode: 33, name: 'Tamil Nadu', isoCode: 'TN', type: 'state' },
  { lgdCode: 34, name: 'Puducherry', isoCode: 'PY', type: 'ut' },
  { lgdCode: 35, name: 'Andaman and Nicobar Islands', isoCode: 'AN', type: 'ut' },
  { lgdCode: 36, name: 'Telangana', isoCode: 'TS', type: 'state' },
  { lgdCode: 37, name: 'Ladakh', isoCode: 'LA', type: 'ut' },
  { lgdCode: 38, name: 'The Dadra and Nagar Haveli and Daman and Diu', isoCode: 'DH', type: 'ut' },
];

const SOURCE_NAME = {
  'Andhra Pradesh': 28,
  'Arunachal Pradesh': 12,
  Assam: 18,
  Bihar: 10,
  'Chandigarh (UT)': 4,
  Chandigarh: 4,
  Chhattisgarh: 22,
  'Dadra and Nagar Haveli (UT)': 38,
  'Daman and Diu (UT)': 38,
  'Delhi (NCT)': 7,
  Delhi: 7,
  Goa: 30,
  Gujarat: 24,
  Haryana: 6,
  'Himachal Pradesh': 2,
  'Jammu and Kashmir': 1,
  Jharkhand: 20,
  Karnataka: 29,
  Kerala: 32,
  'Lakshadweep (UT)': 31,
  Lakshadweep: 31,
  'Madhya Pradesh': 23,
  Maharashtra: 27,
  Manipur: 14,
  Meghalaya: 17,
  Mizoram: 15,
  Nagaland: 13,
  Odisha: 21,
  'Puducherry (UT)': 34,
  Puducherry: 34,
  Punjab: 3,
  Rajasthan: 8,
  Sikkim: 11,
  'Tamil Nadu': 33,
  Telangana: 36,
  Tripura: 16,
  Uttarakhand: 5,
  'Uttar Pradesh': 9,
  'West Bengal': 19,
};

const CLEAN = {
  'Dantewada (South Bastar)': { name: 'Dantewada', aliases: ['Dantewada (South Bastar)', 'South Bastar'] },
  'Kanker (North Bastar)': { name: 'Kanker', aliases: ['Kanker (North Bastar)', 'North Bastar'] },
  'Kabirdham (Kawardha)': { name: 'Kabirdham', aliases: ['Kawardha', 'Kabirdham (Kawardha)'] },
  'Korea (Koriya)': { name: 'Korea', aliases: ['Koriya', 'Korea (Koriya)'] },
  Mewat: { name: 'Nuh', aliases: ['Mewat'] },
  Gurgaon: { name: 'Gurugram', aliases: ['Gurgaon'] },
  'East Champaran (Motihari)': { name: 'East Champaran', aliases: ['Motihari', 'East Champaran (Motihari)'] },
  'Munger (Monghyr)': { name: 'Munger', aliases: ['Monghyr'] },
  'Purnia (Purnea)': { name: 'Purnia', aliases: ['Purnea'] },
  'Kaimur (Bhabua)': { name: 'Kaimur', aliases: ['Bhabua'] },
  Allahabad: { name: 'Prayagraj', aliases: ['Allahabad'] },
  Faizabad: { name: 'Ayodhya', aliases: ['Faizabad'] },
  'Hoshangabad': { name: 'Narmadapuram', aliases: ['Hoshangabad'] },
  'Osmanabad': { name: 'Dharashiv', aliases: ['Osmanabad'] },
  'Aurangabad': { name: 'Chhatrapati Sambhajinagar', aliases: ['Aurangabad'] },
};

const KNOWN_LGD = {
  '22:Bastar': 384,
  '22:Dantewada': 376,
  '22:Kanker': 387,
  '22:Bijapur': 636,
  '22:Kondagaon': 634,
  '22:Narayanpur': 637,
  '22:Sukma': 635,
  '21:Kalahandi': 383,
  '6:Nuh': 720,
  '9:Varanasi': 198,
};

const EXTRA = {
  22: ['Manendragarh-Chirmiri-Bharatpur', 'Mohla-Manpur-Ambagarh Chowki', 'Sakti', 'Sarangarh-Bilaigarh'],
  35: ['Nicobar', 'North and Middle Andaman', 'South Andaman'],
  37: ['Leh', 'Kargil'],
  11: ['Pakyong', 'Soreng'],
  31: ['Lakshadweep'],
};

const SOURCE = {
  'Andhra Pradesh': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa', 'Alluri Sitharama Raju', 'Anakapalli', 'Annamayya', 'Bapatla', 'Eluru', 'Kakinada', 'Konaseema', 'Nandyal', 'NTR', 'Palnadu', 'Parvathipuram Manyam', 'Sri Sathya Sai', 'Tirupati'],
  'Arunachal Pradesh': ['Tawang', 'West Kameng', 'East Kameng', 'Papum Pare', 'Kurung Kumey', 'Kra Daadi', 'Lower Subansiri', 'Upper Subansiri', 'West Siang', 'East Siang', 'Siang', 'Upper Siang', 'Lower Siang', 'Lower Dibang Valley', 'Dibang Valley', 'Anjaw', 'Lohit', 'Namsai', 'Changlang', 'Tirap', 'Longding', 'Kamle', 'Lepa Rada', 'Pakke Kessang', 'Shi Yomi'],
  Assam: ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup Metropolitan', 'Kamrup', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Dima Hasao', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong', 'Bajali', 'Tamulpur'],
  Bihar: ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran (Motihari)', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur (Bhabua)', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger (Monghyr)', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia (Purnea)', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'],
  Chandigarh: ['Chandigarh'],
  Chhattisgarh: ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada (South Bastar)', 'Dhamtari', 'Durg', 'Gariyaband', 'Janjgir-Chamnpa', 'Janjgir-Champa', 'Jashpur', 'Kabirdham (Kawardha)', 'Kanker (North Bastar)', 'Kondagaon', 'Korba', 'Korea (Koriya)', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja', 'Gaurela-Pendra-Marwahi'],
  Delhi: ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
  Goa: ['North Goa', 'South Goa'],
  Gujarat: ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha (Palanpur)', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udepur', 'Dahod', 'Dangs (Ahwa)', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kachchh', 'Kheda (Nadiad)', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada (Rajpipla)', 'Navsari', 'Panchmahal (Godhra)', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha (Himmatnagar)', 'Surat', 'Surendranagar', 'Tapi (Vyara)', 'Vadodara', 'Valsad'],
  Haryana: ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurgaon', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Mewat', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
  'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul & Spiti', 'Mandi', 'Shimla', 'Sirmaur (Sirmour)', 'Solan', 'Una'],
  'Jammu and Kashmir': ['Anantnag', 'Bandipore', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur'],
  Jharkhand: ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribag', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela-Kharsawan', 'Simdega', 'West Singhbhum'],
  Karnataka: ['Bagalkot', 'Ballari (Bellary)', 'Belagavi (Belgaum)', 'Bengaluru (Bangalore) Rural', 'Bengaluru (Bangalore) Urban', 'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikkamagaluru (Chikmagalur)', 'Chitradurga', 'Dakshina Kannada', 'Davangere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi (Gulbarga)', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru (Mysore)', 'Raichur', 'Ramanagara', 'Shivamogga (Shimoga)', 'Tumakuru (Tumkur)', 'Udupi', 'Uttara Kannada (Karwar)', 'Vijayapura (Bijapur)', 'Yadgir', 'Vijayanagara'],
  Kerala: ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
  'Madhya Pradesh': ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha', 'Niwari', 'Mauganj', 'Pandhurna'],
  Maharashtra: ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
  Manipur: ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'],
  Meghalaya: ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills', 'Eastern West Khasi Hills'],
  Mizoram: ['Aizawl', 'Champhai', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Serchhip', 'Hnahthial', 'Khawzawl', 'Saitual'],
  Nagaland: ['Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Peren', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto', 'Noklak', 'Tseminyu', 'Shamator', 'Niuland', 'Chumoukedima'],
  Odisha: ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghapur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar (Keonjhar)', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Sonepur', 'Sundargarh'],
  Puducherry: ['Karaikal', 'Mahe', 'Puducherry', 'Yanam'],
  Punjab: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Sri Muktsar Sahib', 'Shahid Bhagat Singh Nagar', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 'Sangrur', 'Tarn Taran', 'Malerkotla'],
  Rajasthan: ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur', 'Anupgarh', 'Balotra', 'Beawar', 'Deeg', 'Didwana-Kuchaman', 'Dudu', 'Gangapur City', 'Jaipur Rural', 'Jodhpur Rural', 'Kekri', 'Khairthal-Tijara', 'Kotputli-Behror', 'Neem Ka Thana', 'Phalodi', 'Salumbar', 'Sanchore', 'Shahpura'],
  Sikkim: ['Gangtok', 'Mangan', 'Namchi', 'Gyalshing', 'Pakyong', 'Soreng'],
  'Tamil Nadu': ['Ariyalur', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kanchipuram', 'Kanniyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'The Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar', 'Chengalpattu', 'Kallakurichi'],
  Telangana: ['Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Kumuram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Hanamkonda', 'Yadadri Bhuvanagiri'],
  Tripura: ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],
  Uttarakhand: ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'],
  'Uttar Pradesh': ['Agra', 'Aligarh', 'Allahabad', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Faizabad', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kushinagar', 'Lakhimpur Kheri', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
  'West Bengal': ['Alipurduar', 'Bankura', 'Birbhum', 'Paschim Bardhaman', 'Purba Bardhaman', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Medinipur', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'],
};

const MH_ONLY = new Set(['Chhatrapati Sambhajinagar']);
const BR_KEEP_AURANGABAD = true;

function cleanDistrict(raw, stateLgd) {
  const trimmed = raw.replace(/\s+/g, ' ').trim();
  if (trimmed === 'Janjgir-Chamnpa') return null;
  if (stateLgd === 27 && trimmed === 'Aurangabad') {
    return { name: 'Chhatrapati Sambhajinagar', aliases: ['Aurangabad'] };
  }
  if (stateLgd === 10 && trimmed === 'Aurangabad') {
    return { name: 'Aurangabad', aliases: [] };
  }
  const mapped = CLEAN[trimmed];
  if (mapped) return { name: mapped.name, aliases: mapped.aliases || [] };
  const alias = [];
  const paren = trimmed.match(/^(.+?)\s*\((.+)\)$/);
  if (paren) {
    return { name: paren[1].trim(), aliases: [trimmed, paren[2].trim()] };
  }
  return { name: trimmed, aliases: alias };
}

const usedLgd = new Set(STATES.map((s) => s.lgdCode));
let next = 4000;
function nextLgd() {
  while (usedLgd.has(next)) next += 1;
  usedLgd.add(next);
  return next++;
}

const districts = [];
const seen = new Set();

function addDistrict(state, raw) {
  const cleaned = cleanDistrict(raw, state.lgdCode);
  if (!cleaned) return;
  const key = `${state.lgdCode}:${cleaned.name.toLowerCase()}`;
  if (seen.has(key)) return;
  seen.add(key);
  const known = KNOWN_LGD[`${state.lgdCode}:${cleaned.name}`];
  const lgdCode = known || nextLgd();
  if (known) usedLgd.add(known);
  districts.push({
    lgdCode,
    name: cleaned.name,
    stateLgdCode: state.lgdCode,
    stateName: state.name,
    ...(cleaned.aliases.length ? { aliases: [...new Set(cleaned.aliases)] } : {}),
  });
}

for (const [sourceName, names] of Object.entries(SOURCE)) {
  const code = SOURCE_NAME[sourceName];
  const state = STATES.find((s) => s.lgdCode === code);
  if (!state) throw new Error(`No state for ${sourceName}`);
  for (const n of names) addDistrict(state, n);
}
for (const [code, names] of Object.entries(EXTRA)) {
  const state = STATES.find((s) => s.lgdCode === Number(code));
  for (const n of names) addDistrict(state, n);
}

addDistrict(STATES.find((s) => s.lgdCode === 38), 'Dadra and Nagar Haveli');
addDistrict(STATES.find((s) => s.lgdCode === 38), 'Daman');
addDistrict(STATES.find((s) => s.lgdCode === 38), 'Diu');

districts.sort((a, b) => a.stateName.localeCompare(b.stateName) || a.name.localeCompare(b.name));

const out = {
  source: 'Local Government Directory (MoPR) codes + public India district snapshot (data.gov.in / LGD style)',
  states: STATES,
  districts,
};

const here = dirname(fileURLToPath(import.meta.url));
const ts = `/** Bundled India geo master. Do not edit by hand — regenerate via buildIndiaGeo.mjs. */
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

export const INDIA_GEO_SOURCE = ${JSON.stringify(out.source)};

export const INDIA_STATES: GeoState[] = ${JSON.stringify(STATES, null, 2)};

export const INDIA_DISTRICTS: GeoDistrict[] = ${JSON.stringify(districts, null, 2)};
`;

writeFileSync(join(here, 'indiaGeo.ts'), ts);
console.log(`wrote ${STATES.length} states, ${districts.length} districts`);
