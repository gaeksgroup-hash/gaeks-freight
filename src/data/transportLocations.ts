/**
 * Registry lokasi dari LIST SEAPORT.pdf dan AIRPORT LIST.pdf.
 * Disalin dari registry ERP agar kode rute konsisten antara gaeks.com dan erp.gaeks.com.
 */

export interface TransportLocation {
  code: string;
  name: string;
  city: string;
  country: string;
  type: "SEAPORT" | "AIRPORT";
}

export const STANDARD_SEAPORTS: readonly TransportLocation[] = [
  {
    "code": "IDTTE",
    "name": "Ahmad Yani",
    "city": "Ternate",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDBTM",
    "name": "Batu Ampar / Batam",
    "city": "Batam",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDBLW",
    "name": "Belawan",
    "city": "Medan",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDBOA",
    "name": "Benoa",
    "city": "Denpasar / Bali",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDBIT",
    "name": "Bitung",
    "city": "Bitung / Manado",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDPLM",
    "name": "Boom Baru",
    "city": "Palembang",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDCRB",
    "name": "Cirebon",
    "city": "Cirebon",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDCIW",
    "name": "Ciwandan / Cigading",
    "city": "Cilegon / Banten",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDDUM",
    "name": "Dumai",
    "city": "Dumai",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDPNK",
    "name": "Dwikora",
    "city": "Pontianak",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDGTO",
    "name": "Gorontalo",
    "city": "Gorontalo",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDDJJ",
    "name": "Jayapura",
    "city": "Jayapura",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDKID",
    "name": "Kabil",
    "city": "Batam",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDKRI",
    "name": "Kariangau Intermodal Terminal",
    "city": "Balikpapan",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDKTP",
    "name": "Ketapang",
    "city": "Banyuwangi",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDLBJ",
    "name": "Labuan Bajo",
    "city": "Labuan Bajo",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDMAK",
    "name": "Makassar (Soekarno-Hatta)",
    "city": "Makassar",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDMKQ",
    "name": "Merauke",
    "city": "Merauke",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDPAN",
    "name": "Panjang",
    "city": "Bandar Lampung",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDPTB",
    "name": "Pelabuhan Patimban",
    "city": "Subang",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDBPN",
    "name": "Semayang",
    "city": "Balikpapan",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDSOQ",
    "name": "Sorong",
    "city": "Sorong",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDSRG",
    "name": "Tanjung Emas",
    "city": "Semarang",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDCXP",
    "name": "Tanjung Intan",
    "city": "Cilacap",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDTPS",
    "name": "Tanjung Perak",
    "city": "Surabaya",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDTPP",
    "name": "Tanjung Priok",
    "city": "Jakarta",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDPDG",
    "name": "Teluk Bayur",
    "city": "Padang",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDKOE",
    "name": "Tenau",
    "city": "Kupang",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDBDJ",
    "name": "Trisakti",
    "city": "Banjarmasin",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "IDAMQ",
    "name": "Yos Sudarso",
    "city": "Ambon",
    "country": "Indonesia",
    "type": "SEAPORT"
  },
  {
    "code": "DZALG",
    "name": "Algiers",
    "city": "Algiers",
    "country": "Algeria",
    "type": "SEAPORT"
  },
  {
    "code": "DZBJA",
    "name": "Béjaïa",
    "city": "Béjaïa",
    "country": "Algeria",
    "type": "SEAPORT"
  },
  {
    "code": "DZORN",
    "name": "Oran",
    "city": "Oran",
    "country": "Algeria",
    "type": "SEAPORT"
  },
  {
    "code": "DZSKI",
    "name": "Skikda",
    "city": "Skikda",
    "country": "Algeria",
    "type": "SEAPORT"
  },
  {
    "code": "AOLOB",
    "name": "Lobito",
    "city": "Lobito",
    "country": "Angola",
    "type": "SEAPORT"
  },
  {
    "code": "AOLAD",
    "name": "Luanda",
    "city": "Luanda",
    "country": "Angola",
    "type": "SEAPORT"
  },
  {
    "code": "ARBHI",
    "name": "Bahía Blanca",
    "city": "Bahía Blanca",
    "country": "Argentina",
    "type": "SEAPORT"
  },
  {
    "code": "ARBUE",
    "name": "Buenos Aires (Puerto Nuevo & Dock Sud)",
    "city": "Buenos Aires",
    "country": "Argentina",
    "type": "SEAPORT"
  },
  {
    "code": "ARMDQ",
    "name": "Mar del Plata",
    "city": "Mar del Plata",
    "country": "Argentina",
    "type": "SEAPORT"
  },
  {
    "code": "ARROS",
    "name": "Rosario",
    "city": "Rosario / Santa Fe",
    "country": "Argentina",
    "type": "SEAPORT"
  },
  {
    "code": "ARUSH",
    "name": "Ushuaia",
    "city": "Ushuaia / Tierra del Fuego",
    "country": "Argentina",
    "type": "SEAPORT"
  },
  {
    "code": "ARZAR",
    "name": "Zárate",
    "city": "Zárate / Buenos Aires",
    "country": "Argentina",
    "type": "SEAPORT"
  },
  {
    "code": "AUBNE",
    "name": "Brisbane",
    "city": "Brisbane, QLD",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUBUR",
    "name": "Burnie",
    "city": "Burnie, TAS",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUCNS",
    "name": "Cairns",
    "city": "Cairns, QLD",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUDAM",
    "name": "Dampier",
    "city": "Dampier / Karratha, WA",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUDRW",
    "name": "Darwin",
    "city": "Darwin, NT",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUEPT",
    "name": "Esperance Port",
    "city": "Esperance, WA",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUFRE",
    "name": "Fremantle Ports (Perth)",
    "city": "Perth / Fremantle, WA",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUGAT",
    "name": "Gladstone",
    "city": "Gladstone, QLD",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUHPT",
    "name": "Hay Point Coal Terminal",
    "city": "Mackay, QLD",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUHBA",
    "name": "Hobart",
    "city": "Hobart, TAS",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUMEL",
    "name": "Melbourne",
    "city": "Melbourne, VIC",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUNTL",
    "name": "Newcastle (World's Largest Coal Port)",
    "city": "Newcastle, NSW",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUADL",
    "name": "Port Adelaide (Flinders Ports)",
    "city": "Adelaide, SA",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUSYD",
    "name": "Port Botany (Sydney)",
    "city": "Sydney, NSW",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUPHE",
    "name": "Port Hedland (World's Largest Bulk Export Port)",
    "city": "Port Hedland, WA",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "AUTSV",
    "name": "Townsville",
    "city": "Townsville, QLD",
    "country": "Australia",
    "type": "SEAPORT"
  },
  {
    "code": "BSFPO",
    "name": "Freeport Container Port",
    "city": "Freeport / Grand Bahama",
    "country": "Bahamas",
    "type": "SEAPORT"
  },
  {
    "code": "BHKBS",
    "name": "Khalifa Bin Salman Port",
    "city": "Hidd / Manama",
    "country": "Bahrain",
    "type": "SEAPORT"
  },
  {
    "code": "BDCGP",
    "name": "Chittagong Port",
    "city": "Chittagong",
    "country": "Bangladesh",
    "type": "SEAPORT"
  },
  {
    "code": "BDMGL",
    "name": "Mongla",
    "city": "Mongla / Bagerhat",
    "country": "Bangladesh",
    "type": "SEAPORT"
  },
  {
    "code": "BDPRA",
    "name": "Payra Port",
    "city": "Patuakhali",
    "country": "Bangladesh",
    "type": "SEAPORT"
  },
  {
    "code": "BEANR",
    "name": "Antwerp-Bruges",
    "city": "Antwerp",
    "country": "Belgium",
    "type": "SEAPORT"
  },
  {
    "code": "BEGNE",
    "name": "Ghent (North Sea Port)",
    "city": "Ghent",
    "country": "Belgium",
    "type": "SEAPORT"
  },
  {
    "code": "BEOST",
    "name": "Oostende",
    "city": "Ostend",
    "country": "Belgium",
    "type": "SEAPORT"
  },
  {
    "code": "BEZEE",
    "name": "Zeebrugge (Antwerp-Bruges)",
    "city": "Zeebrugge",
    "country": "Belgium",
    "type": "SEAPORT"
  },
  {
    "code": "BJCOO",
    "name": "Autonomous Cotonou",
    "city": "Cotonou",
    "country": "Benin",
    "type": "SEAPORT"
  },
  {
    "code": "BRITJ",
    "name": "Itajaí",
    "city": "Itajaí / SC",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BRMAO",
    "name": "Manaus (Amazon River Port)",
    "city": "Manaus",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BRFOR",
    "name": "Mucuripe (Fortaleza)",
    "city": "Fortaleza",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BRPNG",
    "name": "Paranaguá",
    "city": "Paranaguá / Paraná",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BRPEC",
    "name": "Pecém",
    "city": "São Gonçalo do Amarante / Ceará",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BRPMA",
    "name": "Ponta da Madeira (Itaqui)",
    "city": "São Luís / Maranhão",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BRNVT",
    "name": "Portonave (Navegantes)",
    "city": "Navegantes / SC",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BRRIO",
    "name": "Rio de Janeiro",
    "city": "Rio de Janeiro",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BRRIG",
    "name": "Rio Grande",
    "city": "Rio Grande / RS",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BRSSA",
    "name": "Salvador",
    "city": "Salvador / Bahia",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BRSSZ",
    "name": "Santos",
    "city": "Santos / São Paulo",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BRSUA",
    "name": "Suape",
    "city": "Ipojuca / Recife",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BRBET",
    "name": "Vila do Conde (Barcarena)",
    "city": "Barcarena / Pará",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BRVIX",
    "name": "Vitória",
    "city": "Vitória / Espírito Santo",
    "country": "Brazil",
    "type": "SEAPORT"
  },
  {
    "code": "BNMUA",
    "name": "Muara Port",
    "city": "Bandar Seri Begawan / Muara",
    "country": "Brunei Darussalam",
    "type": "SEAPORT"
  },
  {
    "code": "BGBOJ",
    "name": "Burgas",
    "city": "Burgas",
    "country": "Bulgaria",
    "type": "SEAPORT"
  },
  {
    "code": "BGVAR",
    "name": "Varna",
    "city": "Varna",
    "country": "Bulgaria",
    "type": "SEAPORT"
  },
  {
    "code": "KHPNH",
    "name": "Phnom Penh Autonomous Port",
    "city": "Phnom Penh",
    "country": "Cambodia",
    "type": "SEAPORT"
  },
  {
    "code": "KHKOS",
    "name": "Sihanoukville Autonomous Port (PAS)",
    "city": "Sihanoukville",
    "country": "Cambodia",
    "type": "SEAPORT"
  },
  {
    "code": "CMDLA",
    "name": "Douala",
    "city": "Douala",
    "country": "Cameroon",
    "type": "SEAPORT"
  },
  {
    "code": "CMKRI",
    "name": "Kribi Deep Sea Port",
    "city": "Kribi",
    "country": "Cameroon",
    "type": "SEAPORT"
  },
  {
    "code": "CAHAL",
    "name": "Halifax",
    "city": "Halifax, NS",
    "country": "Canada",
    "type": "SEAPORT"
  },
  {
    "code": "CAHAM",
    "name": "Hamilton Port",
    "city": "Hamilton, ON",
    "country": "Canada",
    "type": "SEAPORT"
  },
  {
    "code": "CAMTR",
    "name": "Montreal",
    "city": "Montreal, QC",
    "country": "Canada",
    "type": "SEAPORT"
  },
  {
    "code": "CASJB",
    "name": "Port Saint John",
    "city": "Saint John, NB",
    "country": "Canada",
    "type": "SEAPORT"
  },
  {
    "code": "CAPRR",
    "name": "Prince Rupert",
    "city": "Prince Rupert, BC",
    "country": "Canada",
    "type": "SEAPORT"
  },
  {
    "code": "CAQUE",
    "name": "Québec",
    "city": "Quebec City, QC",
    "country": "Canada",
    "type": "SEAPORT"
  },
  {
    "code": "CASAR",
    "name": "Sarnia",
    "city": "Sarnia, ON",
    "country": "Canada",
    "type": "SEAPORT"
  },
  {
    "code": "CATOR",
    "name": "Toronto",
    "city": "Toronto, ON",
    "country": "Canada",
    "type": "SEAPORT"
  },
  {
    "code": "CAVAN",
    "name": "Vancouver",
    "city": "Vancouver, BC",
    "country": "Canada",
    "type": "SEAPORT"
  },
  {
    "code": "CLANF",
    "name": "Antofagasta",
    "city": "Antofagasta",
    "country": "Chile",
    "type": "SEAPORT"
  },
  {
    "code": "CLARI",
    "name": "Arica",
    "city": "Arica",
    "country": "Chile",
    "type": "SEAPORT"
  },
  {
    "code": "CLCOR",
    "name": "Coronel",
    "city": "Coronel / Biobío",
    "country": "Chile",
    "type": "SEAPORT"
  },
  {
    "code": "CLIQQ",
    "name": "Iquique",
    "city": "Iquique",
    "country": "Chile",
    "type": "SEAPORT"
  },
  {
    "code": "CLMEJ",
    "name": "Mejillones",
    "city": "Mejillones",
    "country": "Chile",
    "type": "SEAPORT"
  },
  {
    "code": "CLPMC",
    "name": "Puerto Montt",
    "city": "Puerto Montt",
    "country": "Chile",
    "type": "SEAPORT"
  },
  {
    "code": "CLPUQ",
    "name": "Punta Arenas",
    "city": "Punta Arenas",
    "country": "Chile",
    "type": "SEAPORT"
  },
  {
    "code": "CLSAI",
    "name": "San Antonio",
    "city": "San Antonio",
    "country": "Chile",
    "type": "SEAPORT"
  },
  {
    "code": "CLTHO",
    "name": "San Vicente / Talcahuano",
    "city": "Talcahuano",
    "country": "Chile",
    "type": "SEAPORT"
  },
  {
    "code": "CLVAP",
    "name": "Valparaíso",
    "city": "Valparaíso",
    "country": "Chile",
    "type": "SEAPORT"
  },
  {
    "code": "CNDLC",
    "name": "Dalian",
    "city": "Dalian",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNFOC",
    "name": "Fuzhou",
    "city": "Fuzhou",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNGZG",
    "name": "Guangzhou (Nansha)",
    "city": "Guangzhou",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNHUA",
    "name": "Huanghua",
    "city": "Cangzhou / Huanghua",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNLYG",
    "name": "Lianyungang",
    "city": "Lianyungang",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNNBO",
    "name": "Ningbo-Zhoushan",
    "city": "Ningbo / Zhoushan",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNTAO",
    "name": "Qingdao",
    "city": "Qingdao",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNQZH",
    "name": "Qinzhou",
    "city": "Qinzhou / Guangxi",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNRZH",
    "name": "Rizhao",
    "city": "Rizhao",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNSHA",
    "name": "Shanghai (Yangshan & Waigaoqiao)",
    "city": "Shanghai",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNSZX",
    "name": "Shenzhen (Yantian, Shekou, Chiwan)",
    "city": "Shenzhen",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNTXG",
    "name": "Tangshan",
    "city": "Tangshan",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNTJN",
    "name": "Tianjin",
    "city": "Tianjin",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNWNZ",
    "name": "Wenzhou",
    "city": "Wenzhou",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNXMN",
    "name": "Xiamen",
    "city": "Xiamen",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNYAT",
    "name": "Yantai",
    "city": "Yantai",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNYTN",
    "name": "Yingkou",
    "city": "Yingkou",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "CNZHA",
    "name": "Zhanjiang",
    "city": "Zhanjiang",
    "country": "China",
    "type": "SEAPORT"
  },
  {
    "code": "COBAQ",
    "name": "Barranquilla",
    "city": "Barranquilla",
    "country": "Colombia",
    "type": "SEAPORT"
  },
  {
    "code": "COBUN",
    "name": "Buenaventura (SPRBUN & Aguadulce)",
    "city": "Buenaventura",
    "country": "Colombia",
    "type": "SEAPORT"
  },
  {
    "code": "COCTG",
    "name": "Cartagena (Contecar & SPRC)",
    "city": "Cartagena",
    "country": "Colombia",
    "type": "SEAPORT"
  },
  {
    "code": "COSMR",
    "name": "Santa Marta",
    "city": "Santa Marta",
    "country": "Colombia",
    "type": "SEAPORT"
  },
  {
    "code": "CRCAL",
    "name": "Caldera",
    "city": "Caldera / Puntarenas",
    "country": "Costa Rica",
    "type": "SEAPORT"
  },
  {
    "code": "CRLIO",
    "name": "Moín (APM Terminals)",
    "city": "Limón",
    "country": "Costa Rica",
    "type": "SEAPORT"
  },
  {
    "code": "HRRJK",
    "name": "Rijeka",
    "city": "Rijeka",
    "country": "Croatia",
    "type": "SEAPORT"
  },
  {
    "code": "CUHAV",
    "name": "Havana",
    "city": "Havana",
    "country": "Cuba",
    "type": "SEAPORT"
  },
  {
    "code": "CUMAR",
    "name": "Mariel",
    "city": "Mariel",
    "country": "Cuba",
    "type": "SEAPORT"
  },
  {
    "code": "CYLMS",
    "name": "Limassol",
    "city": "Limassol",
    "country": "Cyprus",
    "type": "SEAPORT"
  },
  {
    "code": "DKAAR",
    "name": "Aarhus",
    "city": "Aarhus",
    "country": "Denmark",
    "type": "SEAPORT"
  },
  {
    "code": "DKCPH",
    "name": "Copenhagen (CMP)",
    "city": "Copenhagen",
    "country": "Denmark",
    "type": "SEAPORT"
  },
  {
    "code": "DKFRC",
    "name": "Fredericia",
    "city": "Fredericia",
    "country": "Denmark",
    "type": "SEAPORT"
  },
  {
    "code": "DJJIB",
    "name": "Djibouti (Doraleh Container Terminal)",
    "city": "Djibouti City",
    "country": "Djibouti",
    "type": "SEAPORT"
  },
  {
    "code": "DOCAU",
    "name": "Caucedo (DP World)",
    "city": "Boca Chica / Santo Domingo",
    "country": "Dominican Republic",
    "type": "SEAPORT"
  },
  {
    "code": "DOHAI",
    "name": "Rio Haina",
    "city": "Santo Domingo",
    "country": "Dominican Republic",
    "type": "SEAPORT"
  },
  {
    "code": "CDMAT",
    "name": "Matadi",
    "city": "Matadi",
    "country": "DR Congo",
    "type": "SEAPORT"
  },
  {
    "code": "ECPBO",
    "name": "Bolívar",
    "city": "Machala / El Oro",
    "country": "Ecuador",
    "type": "SEAPORT"
  },
  {
    "code": "ECPOS",
    "name": "DP World Posorja",
    "city": "Posorja / Guayas",
    "country": "Ecuador",
    "type": "SEAPORT"
  },
  {
    "code": "ECGYE",
    "name": "Guayaquil (Contecon)",
    "city": "Guayaquil",
    "country": "Ecuador",
    "type": "SEAPORT"
  },
  {
    "code": "ECMEC",
    "name": "Manta",
    "city": "Manta",
    "country": "Ecuador",
    "type": "SEAPORT"
  },
  {
    "code": "EGALX",
    "name": "Alexandria (and Dekheila)",
    "city": "Alexandria",
    "country": "Egypt",
    "type": "SEAPORT"
  },
  {
    "code": "EGDAM",
    "name": "Damietta",
    "city": "Damietta",
    "country": "Egypt",
    "type": "SEAPORT"
  },
  {
    "code": "EGPSD",
    "name": "Port Said / East Port Said Port",
    "city": "Port Said",
    "country": "Egypt",
    "type": "SEAPORT"
  },
  {
    "code": "EGSOK",
    "name": "Sokhna (Ain Sokhna)",
    "city": "Ain Sokhna",
    "country": "Egypt",
    "type": "SEAPORT"
  },
  {
    "code": "EGSUZ",
    "name": "Suez (Port Tawfiq)",
    "city": "Suez",
    "country": "Egypt",
    "type": "SEAPORT"
  },
  {
    "code": "SVACJ",
    "name": "Acajutla",
    "city": "Acajutla",
    "country": "El Salvador",
    "type": "SEAPORT"
  },
  {
    "code": "ERASA",
    "name": "Assab",
    "city": "Assab",
    "country": "Eritrea",
    "type": "SEAPORT"
  },
  {
    "code": "ERMAS",
    "name": "Massawa",
    "city": "Massawa",
    "country": "Eritrea",
    "type": "SEAPORT"
  },
  {
    "code": "EETLL",
    "name": "Tallinn (Muuga)",
    "city": "Tallinn",
    "country": "Estonia",
    "type": "SEAPORT"
  },
  {
    "code": "FJLKA",
    "name": "Lautoka",
    "city": "Lautoka",
    "country": "Fiji",
    "type": "SEAPORT"
  },
  {
    "code": "FJSVU",
    "name": "Suva",
    "city": "Suva",
    "country": "Fiji",
    "type": "SEAPORT"
  },
  {
    "code": "FIKOT",
    "name": "HaminaKotka",
    "city": "Kotka / Hamina",
    "country": "Finland",
    "type": "SEAPORT"
  },
  {
    "code": "FIHEL",
    "name": "Helsinki",
    "city": "Helsinki",
    "country": "Finland",
    "type": "SEAPORT"
  },
  {
    "code": "FIRAU",
    "name": "Rauma",
    "city": "Rauma",
    "country": "Finland",
    "type": "SEAPORT"
  },
  {
    "code": "FITKU",
    "name": "Turku",
    "city": "Turku",
    "country": "Finland",
    "type": "SEAPORT"
  },
  {
    "code": "FRBOD",
    "name": "Bordeaux",
    "city": "Bordeaux",
    "country": "France",
    "type": "SEAPORT"
  },
  {
    "code": "FRBES",
    "name": "Brest",
    "city": "Brest",
    "country": "France",
    "type": "SEAPORT"
  },
  {
    "code": "FRCQF",
    "name": "Calais",
    "city": "Calais",
    "country": "France",
    "type": "SEAPORT"
  },
  {
    "code": "FRDKK",
    "name": "Dunkirk",
    "city": "Dunkirk",
    "country": "France",
    "type": "SEAPORT"
  },
  {
    "code": "FRLEH",
    "name": "HAROPA Port - Le Havre",
    "city": "Le Havre",
    "country": "France",
    "type": "SEAPORT"
  },
  {
    "code": "FRROU",
    "name": "HAROPA Port - Rouen",
    "city": "Rouen",
    "country": "France",
    "type": "SEAPORT"
  },
  {
    "code": "FRMRS",
    "name": "Marseille Fos",
    "city": "Marseille / Fos-sur-Mer",
    "country": "France",
    "type": "SEAPORT"
  },
  {
    "code": "FRNTE",
    "name": "Nantes Saint-Nazaire",
    "city": "Nantes / Saint-Nazaire",
    "country": "France",
    "type": "SEAPORT"
  },
  {
    "code": "PFPPF",
    "name": "Port Autonome de Papeete",
    "city": "Papeete / Tahiti",
    "country": "French Polynesia",
    "type": "SEAPORT"
  },
  {
    "code": "GALBV",
    "name": "Owendo (Libreville)",
    "city": "Libreville / Owendo",
    "country": "Gabon",
    "type": "SEAPORT"
  },
  {
    "code": "GNBJL",
    "name": "Banjul",
    "city": "Banjul",
    "country": "Gambia",
    "type": "SEAPORT"
  },
  {
    "code": "DEDUI",
    "name": "Duisport (World's Largest Inland Port)",
    "city": "Duisburg",
    "country": "Germany",
    "type": "SEAPORT"
  },
  {
    "code": "DEHAM",
    "name": "Hamburg",
    "city": "Hamburg",
    "country": "Germany",
    "type": "SEAPORT"
  },
  {
    "code": "DEWVN",
    "name": "JadeWeserPort (Wilhelmshaven)",
    "city": "Wilhelmshaven",
    "country": "Germany",
    "type": "SEAPORT"
  },
  {
    "code": "DEKIL",
    "name": "Kiel",
    "city": "Kiel",
    "country": "Germany",
    "type": "SEAPORT"
  },
  {
    "code": "DELBC",
    "name": "Lübeck",
    "city": "Lübeck",
    "country": "Germany",
    "type": "SEAPORT"
  },
  {
    "code": "DEBRE",
    "name": "Ports of Bremen / Bremerhaven",
    "city": "Bremerhaven / Bremen",
    "country": "Germany",
    "type": "SEAPORT"
  },
  {
    "code": "DEROS",
    "name": "Rostock",
    "city": "Rostock",
    "country": "Germany",
    "type": "SEAPORT"
  },
  {
    "code": "GHTKD",
    "name": "Takoradi",
    "city": "Takoradi",
    "country": "Ghana",
    "type": "SEAPORT"
  },
  {
    "code": "GHTEM",
    "name": "Tema",
    "city": "Tema / Accra",
    "country": "Ghana",
    "type": "SEAPORT"
  },
  {
    "code": "GRHER",
    "name": "Heraklion",
    "city": "Heraklion / Crete",
    "country": "Greece",
    "type": "SEAPORT"
  },
  {
    "code": "GRGPA",
    "name": "Patras",
    "city": "Patras",
    "country": "Greece",
    "type": "SEAPORT"
  },
  {
    "code": "GRPIR",
    "name": "Piraeus",
    "city": "Athens / Piraeus",
    "country": "Greece",
    "type": "SEAPORT"
  },
  {
    "code": "GRSKG",
    "name": "Thessaloniki",
    "city": "Thessaloniki",
    "country": "Greece",
    "type": "SEAPORT"
  },
  {
    "code": "GUGUM",
    "name": "Guam (Jose D. Leon Guerrero)",
    "city": "Piti / Hagåtña",
    "country": "Guam",
    "type": "SEAPORT"
  },
  {
    "code": "GTPRQ",
    "name": "Puerto Quetzal",
    "city": "Escuintla",
    "country": "Guatemala",
    "type": "SEAPORT"
  },
  {
    "code": "GTSTC",
    "name": "Santo Tomás de Castilla",
    "city": "Puerto Barrios",
    "country": "Guatemala",
    "type": "SEAPORT"
  },
  {
    "code": "GNCKY",
    "name": "Autonomous Conakry",
    "city": "Conakry",
    "country": "Guinea",
    "type": "SEAPORT"
  },
  {
    "code": "GYGEO",
    "name": "Georgetown",
    "city": "Georgetown",
    "country": "Guyana",
    "type": "SEAPORT"
  },
  {
    "code": "HTPAP",
    "name": "Port International de Port-au-Prince",
    "city": "Port-au-Prince",
    "country": "Haiti",
    "type": "SEAPORT"
  },
  {
    "code": "HNPCR",
    "name": "Puerto Cortés",
    "city": "Puerto Cortés",
    "country": "Honduras",
    "type": "SEAPORT"
  },
  {
    "code": "CNHKG",
    "name": "Hong Kong (Kwai Tsing)",
    "city": "Hong Kong",
    "country": "Hong Kong SAR",
    "type": "SEAPORT"
  },
  {
    "code": "INMAA",
    "name": "Chennai Port",
    "city": "Chennai",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INCOK",
    "name": "Cochin Port (Vallarpadam Terminal)",
    "city": "Kochi",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INIXY",
    "name": "Deendayal Port (Kandla)",
    "city": "Gandhidham / Gujarat",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INHAL",
    "name": "Haldia Dock Complex",
    "city": "Haldia / West Bengal",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INGAZ",
    "name": "Hazira Port (Adani Hazira)",
    "city": "Surat / Gujarat",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INNSA",
    "name": "Jawaharlal Nehru Port (JNPT / Nhava Sheva)",
    "city": "Navi Mumbai",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INENR",
    "name": "Kamarajar Port (Ennore)",
    "city": "Chennai",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INKAT",
    "name": "Kattupalli Port",
    "city": "Kattupalli / Chennai",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INCCU",
    "name": "Kolkata Port (Syama Prasad Mookerjee)",
    "city": "Kolkata",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INKRI",
    "name": "Krishnapatnam Port",
    "city": "Nellore / Andhra Pradesh",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INMRM",
    "name": "Mormugao Port",
    "city": "Goa",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INBOM",
    "name": "Mumbai Port",
    "city": "Mumbai",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INMUN",
    "name": "Mundra",
    "city": "Mundra / Gujarat",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INNML",
    "name": "New Mangalore Port",
    "city": "Mangaluru",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INPRT",
    "name": "Paradip Port",
    "city": "Paradip / Odisha",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INPAV",
    "name": "Pipavav",
    "city": "Pipavav / Gujarat",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INTUT",
    "name": "V.O. Chidambaranar Port (Tuticorin)",
    "city": "Thoothukudi",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "INVTZ",
    "name": "Visakhapatnam Port",
    "city": "Visakhapatnam",
    "country": "India",
    "type": "SEAPORT"
  },
  {
    "code": "IRBAZ",
    "name": "Bandar Anzali Port (Caspian)",
    "city": "Bandar Anzali",
    "country": "Iran",
    "type": "SEAPORT"
  },
  {
    "code": "IRBKM",
    "name": "Bandar Imam Khomeini Port",
    "city": "Bandar Imam Khomeini",
    "country": "Iran",
    "type": "SEAPORT"
  },
  {
    "code": "IRBUZ",
    "name": "Bushehr Port",
    "city": "Bushehr",
    "country": "Iran",
    "type": "SEAPORT"
  },
  {
    "code": "IRCSB",
    "name": "Chabahar Port (Shahid Beheshti)",
    "city": "Chabahar",
    "country": "Iran",
    "type": "SEAPORT"
  },
  {
    "code": "IRBND",
    "name": "Shahid Rajaee Port (Bandar Abbas)",
    "city": "Bandar Abbas",
    "country": "Iran",
    "type": "SEAPORT"
  },
  {
    "code": "IECOR",
    "name": "Cork",
    "city": "Cork",
    "country": "Ireland",
    "type": "SEAPORT"
  },
  {
    "code": "IEDUB",
    "name": "Dublin Port",
    "city": "Dublin",
    "country": "Ireland",
    "type": "SEAPORT"
  },
  {
    "code": "IESNN",
    "name": "Shannon Foynes Port",
    "city": "Shannon / Foynes",
    "country": "Ireland",
    "type": "SEAPORT"
  },
  {
    "code": "ILASH",
    "name": "Ashdod",
    "city": "Ashdod",
    "country": "Israel",
    "type": "SEAPORT"
  },
  {
    "code": "ILELT",
    "name": "Eilat",
    "city": "Eilat",
    "country": "Israel",
    "type": "SEAPORT"
  },
  {
    "code": "ILHFA",
    "name": "Haifa",
    "city": "Haifa",
    "country": "Israel",
    "type": "SEAPORT"
  },
  {
    "code": "ITANC",
    "name": "Ancona",
    "city": "Ancona",
    "country": "Italy",
    "type": "SEAPORT"
  },
  {
    "code": "ITBRI",
    "name": "Bari",
    "city": "Bari",
    "country": "Italy",
    "type": "SEAPORT"
  },
  {
    "code": "ITCTA",
    "name": "Catania",
    "city": "Catania / Sicily",
    "country": "Italy",
    "type": "SEAPORT"
  },
  {
    "code": "ITCVV",
    "name": "Civitavecchia (Rome)",
    "city": "Civitavecchia / Rome",
    "country": "Italy",
    "type": "SEAPORT"
  },
  {
    "code": "ITGOA",
    "name": "Genoa (Western Ligurian Sea)",
    "city": "Genoa",
    "country": "Italy",
    "type": "SEAPORT"
  },
  {
    "code": "ITGIT",
    "name": "Gioia Tauro",
    "city": "Gioia Tauro",
    "country": "Italy",
    "type": "SEAPORT"
  },
  {
    "code": "ITSPE",
    "name": "La Spezia",
    "city": "La Spezia",
    "country": "Italy",
    "type": "SEAPORT"
  },
  {
    "code": "ITLIV",
    "name": "Livorno",
    "city": "Livorno",
    "country": "Italy",
    "type": "SEAPORT"
  },
  {
    "code": "ITNAP",
    "name": "Naples",
    "city": "Naples",
    "country": "Italy",
    "type": "SEAPORT"
  },
  {
    "code": "ITRAV",
    "name": "Ravenna",
    "city": "Ravenna",
    "country": "Italy",
    "type": "SEAPORT"
  },
  {
    "code": "ITSAL",
    "name": "Salerno",
    "city": "Salerno",
    "country": "Italy",
    "type": "SEAPORT"
  },
  {
    "code": "ITTRS",
    "name": "Trieste",
    "city": "Trieste",
    "country": "Italy",
    "type": "SEAPORT"
  },
  {
    "code": "ITVCE",
    "name": "Venice",
    "city": "Venice",
    "country": "Italy",
    "type": "SEAPORT"
  },
  {
    "code": "CIABJ",
    "name": "Autonomous Abidjan (PAA)",
    "city": "Abidjan",
    "country": "Ivory Coast",
    "type": "SEAPORT"
  },
  {
    "code": "CISPD",
    "name": "San Pedro",
    "city": "San Pedro",
    "country": "Ivory Coast",
    "type": "SEAPORT"
  },
  {
    "code": "JMKIN",
    "name": "Kingston (Kingston Wharves)",
    "city": "Kingston",
    "country": "Jamaica",
    "type": "SEAPORT"
  },
  {
    "code": "JPCHB",
    "name": "Chiba",
    "city": "Chiba",
    "country": "Japan",
    "type": "SEAPORT"
  },
  {
    "code": "JPHKT",
    "name": "Hakata (Fukuoka)",
    "city": "Fukuoka",
    "country": "Japan",
    "type": "SEAPORT"
  },
  {
    "code": "JPKWS",
    "name": "Kawasaki",
    "city": "Kawasaki",
    "country": "Japan",
    "type": "SEAPORT"
  },
  {
    "code": "JPKIT",
    "name": "Kitakyushu",
    "city": "Kitakyushu",
    "country": "Japan",
    "type": "SEAPORT"
  },
  {
    "code": "JPUKB",
    "name": "Kobe",
    "city": "Kobe",
    "country": "Japan",
    "type": "SEAPORT"
  },
  {
    "code": "JPNGO",
    "name": "Nagoya",
    "city": "Nagoya",
    "country": "Japan",
    "type": "SEAPORT"
  },
  {
    "code": "JPOSA",
    "name": "Osaka",
    "city": "Osaka",
    "country": "Japan",
    "type": "SEAPORT"
  },
  {
    "code": "JPSMZ",
    "name": "Shimizu",
    "city": "Shizuoka",
    "country": "Japan",
    "type": "SEAPORT"
  },
  {
    "code": "JPTYO",
    "name": "Tokyo",
    "city": "Tokyo",
    "country": "Japan",
    "type": "SEAPORT"
  },
  {
    "code": "JPTMS",
    "name": "Tomakomai",
    "city": "Tomakomai / Hokkaido",
    "country": "Japan",
    "type": "SEAPORT"
  },
  {
    "code": "JPYKK",
    "name": "Yokkaichi",
    "city": "Yokkaichi",
    "country": "Japan",
    "type": "SEAPORT"
  },
  {
    "code": "JPYOK",
    "name": "Yokohama",
    "city": "Yokohama",
    "country": "Japan",
    "type": "SEAPORT"
  },
  {
    "code": "JOAQJ",
    "name": "Aqaba",
    "city": "Aqaba",
    "country": "Jordan",
    "type": "SEAPORT"
  },
  {
    "code": "KEMBA",
    "name": "Mombasa (Kilindini Harbour)",
    "city": "Mombasa",
    "country": "Kenya",
    "type": "SEAPORT"
  },
  {
    "code": "KWSAA",
    "name": "Shuaiba Port",
    "city": "Shuaiba",
    "country": "Kuwait",
    "type": "SEAPORT"
  },
  {
    "code": "KWSHU",
    "name": "Shuwaikh Port",
    "city": "Kuwait City",
    "country": "Kuwait",
    "type": "SEAPORT"
  },
  {
    "code": "LVRIX",
    "name": "Freeport of Riga",
    "city": "Riga",
    "country": "Latvia",
    "type": "SEAPORT"
  },
  {
    "code": "LBBEY",
    "name": "Beirut",
    "city": "Beirut",
    "country": "Lebanon",
    "type": "SEAPORT"
  },
  {
    "code": "LRMLW",
    "name": "Freeport of Monrovia",
    "city": "Monrovia",
    "country": "Liberia",
    "type": "SEAPORT"
  },
  {
    "code": "LYBEN",
    "name": "Benghazi",
    "city": "Benghazi",
    "country": "Libya",
    "type": "SEAPORT"
  },
  {
    "code": "LYTIP",
    "name": "Tripoli",
    "city": "Tripoli",
    "country": "Libya",
    "type": "SEAPORT"
  },
  {
    "code": "LTKLJ",
    "name": "Klaip ė da State Seaport Klaip ė",
    "city": "da",
    "country": "Lithuania",
    "type": "SEAPORT"
  },
  {
    "code": "MGTMM",
    "name": "Toamasina (Tamatave)",
    "city": "Toamasina",
    "country": "Madagascar",
    "type": "SEAPORT"
  },
  {
    "code": "MYBTU",
    "name": "Bintulu Port",
    "city": "Bintulu",
    "country": "Malaysia",
    "type": "SEAPORT"
  },
  {
    "code": "MYJHB",
    "name": "Johor Port (Pasir Gudang)",
    "city": "Pasir Gudang",
    "country": "Malaysia",
    "type": "SEAPORT"
  },
  {
    "code": "MYBKI",
    "name": "Kota Kinabalu Port (Sepangar Bay)",
    "city": "Kota Kinabalu",
    "country": "Malaysia",
    "type": "SEAPORT"
  },
  {
    "code": "MYKUA",
    "name": "Kuantan Port",
    "city": "Kuantan",
    "country": "Malaysia",
    "type": "SEAPORT"
  },
  {
    "code": "MYKCH",
    "name": "Kuching Port",
    "city": "Kuching",
    "country": "Malaysia",
    "type": "SEAPORT"
  },
  {
    "code": "MYLBU",
    "name": "Labuan Port",
    "city": "Victoria / Labuan",
    "country": "Malaysia",
    "type": "SEAPORT"
  },
  {
    "code": "MYMYY",
    "name": "Miri Port",
    "city": "Miri",
    "country": "Malaysia",
    "type": "SEAPORT"
  },
  {
    "code": "MYPEN",
    "name": "Penang Port",
    "city": "George Town / Butterworth",
    "country": "Malaysia",
    "type": "SEAPORT"
  },
  {
    "code": "MYPKG",
    "name": "Port Klang (Northport & Westport)",
    "city": "Klang / Selangor",
    "country": "Malaysia",
    "type": "SEAPORT"
  },
  {
    "code": "MYTPP",
    "name": "Tanjung Pelepas (PTP)",
    "city": "Johor Bahru / Iskandar Puteri",
    "country": "Malaysia",
    "type": "SEAPORT"
  },
  {
    "code": "MTMAR",
    "name": "Marsaxlokk Port (Malta Freeport)",
    "city": "Marsaxlokk",
    "country": "Malta",
    "type": "SEAPORT"
  },
  {
    "code": "MRTNK",
    "name": "Nouakchott (Port de l'Amitié)",
    "city": "Nouakchott",
    "country": "Mauritania",
    "type": "SEAPORT"
  },
  {
    "code": "MUPLU",
    "name": "Port Louis Harbour",
    "city": "Port Louis",
    "country": "Mauritius",
    "type": "SEAPORT"
  },
  {
    "code": "MXATM",
    "name": "Altamira",
    "city": "Altamira / Tamaulipas",
    "country": "Mexico",
    "type": "SEAPORT"
  },
  {
    "code": "MXCOA",
    "name": "Coatzacoalcos",
    "city": "Coatzacoalcos / Veracruz",
    "country": "Mexico",
    "type": "SEAPORT"
  },
  {
    "code": "MXENS",
    "name": "Ensenada",
    "city": "Ensenada / Baja California",
    "country": "Mexico",
    "type": "SEAPORT"
  },
  {
    "code": "MXGAY",
    "name": "Guaymas",
    "city": "Guaymas / Sonora",
    "country": "Mexico",
    "type": "SEAPORT"
  },
  {
    "code": "MXLZC",
    "name": "Lázaro Cárdenas",
    "city": "Lázaro Cárdenas / Michoacán",
    "country": "Mexico",
    "type": "SEAPORT"
  },
  {
    "code": "MXZLO",
    "name": "Manzanillo",
    "city": "Manzanillo / Colima",
    "country": "Mexico",
    "type": "SEAPORT"
  },
  {
    "code": "MXPGO",
    "name": "Progreso",
    "city": "Progreso / Yucatán",
    "country": "Mexico",
    "type": "SEAPORT"
  },
  {
    "code": "MXPMS",
    "name": "Puerto Morelos",
    "city": "Puerto Morelos / Quintana Roo",
    "country": "Mexico",
    "type": "SEAPORT"
  },
  {
    "code": "MXVER",
    "name": "Veracruz",
    "city": "Veracruz",
    "country": "Mexico",
    "type": "SEAPORT"
  },
  {
    "code": "MAAGA",
    "name": "Agadir",
    "city": "Agadir",
    "country": "Morocco",
    "type": "SEAPORT"
  },
  {
    "code": "MACAS",
    "name": "Casablanca",
    "city": "Casablanca",
    "country": "Morocco",
    "type": "SEAPORT"
  },
  {
    "code": "MAJOR",
    "name": "Jorf Lasfar Port",
    "city": "El Jadida",
    "country": "Morocco",
    "type": "SEAPORT"
  },
  {
    "code": "MATNG",
    "name": "Tanger Med Port",
    "city": "Tangier",
    "country": "Morocco",
    "type": "SEAPORT"
  },
  {
    "code": "MZBEI",
    "name": "Beira",
    "city": "Beira",
    "country": "Mozambique",
    "type": "SEAPORT"
  },
  {
    "code": "MZMPM",
    "name": "Maputo",
    "city": "Maputo",
    "country": "Mozambique",
    "type": "SEAPORT"
  },
  {
    "code": "MZNAC",
    "name": "Nacala",
    "city": "Nacala",
    "country": "Mozambique",
    "type": "SEAPORT"
  },
  {
    "code": "MMMYT",
    "name": "Mawlamyine Port",
    "city": "Mawlamyine",
    "country": "Myanmar",
    "type": "SEAPORT"
  },
  {
    "code": "MMRGN",
    "name": "Yangon (MITT & Thilawa)",
    "city": "Yangon",
    "country": "Myanmar",
    "type": "SEAPORT"
  },
  {
    "code": "NALUD",
    "name": "Lüderitz",
    "city": "Lüderitz",
    "country": "Namibia",
    "type": "SEAPORT"
  },
  {
    "code": "NAWVB",
    "name": "Walvis Bay",
    "city": "Walvis Bay",
    "country": "Namibia",
    "type": "SEAPORT"
  },
  {
    "code": "NLAMS",
    "name": "Amsterdam",
    "city": "Amsterdam",
    "country": "Netherlands",
    "type": "SEAPORT"
  },
  {
    "code": "NLLWO",
    "name": "Moerdijk",
    "city": "Moerdijk",
    "country": "Netherlands",
    "type": "SEAPORT"
  },
  {
    "code": "NLRTM",
    "name": "Rotterdam",
    "city": "Rotterdam",
    "country": "Netherlands",
    "type": "SEAPORT"
  },
  {
    "code": "NLVLI",
    "name": "Vlissingen (North Sea Port)",
    "city": "Vlissingen",
    "country": "Netherlands",
    "type": "SEAPORT"
  },
  {
    "code": "NCNOU",
    "name": "Autonomous New Caledonia",
    "city": "Nouméa",
    "country": "New Caledonia",
    "type": "SEAPORT"
  },
  {
    "code": "NZWLG",
    "name": "CentrePort Wellington",
    "city": "Wellington",
    "country": "New Zealand",
    "type": "SEAPORT"
  },
  {
    "code": "NZLYT",
    "name": "Lyttelton Christchurch",
    "city": "Lyttelton / Christchurch",
    "country": "New Zealand",
    "type": "SEAPORT"
  },
  {
    "code": "NZNPE",
    "name": "Napier Port",
    "city": "Napier",
    "country": "New Zealand",
    "type": "SEAPORT"
  },
  {
    "code": "NZPOE",
    "name": "Port Chalmers (Port Otago)",
    "city": "Dunedin",
    "country": "New Zealand",
    "type": "SEAPORT"
  },
  {
    "code": "NZNSN",
    "name": "Port Nelson",
    "city": "Nelson",
    "country": "New Zealand",
    "type": "SEAPORT"
  },
  {
    "code": "NZNPL",
    "name": "Port Taranaki",
    "city": "New Plymouth",
    "country": "New Zealand",
    "type": "SEAPORT"
  },
  {
    "code": "NZAKL",
    "name": "Ports of Auckland",
    "city": "Auckland",
    "country": "New Zealand",
    "type": "SEAPORT"
  },
  {
    "code": "NZTIU",
    "name": "PrimePort Timaru",
    "city": "Timaru",
    "country": "New Zealand",
    "type": "SEAPORT"
  },
  {
    "code": "NZTRG",
    "name": "Tauranga (Largest Port in NZ)",
    "city": "Tauranga / Mount Maunganui",
    "country": "New Zealand",
    "type": "SEAPORT"
  },
  {
    "code": "NICIO",
    "name": "Puerto Corinto",
    "city": "Corinto",
    "country": "Nicaragua",
    "type": "SEAPORT"
  },
  {
    "code": "NGAPP",
    "name": "Apapa (Lagos Port Complex)",
    "city": "Lagos",
    "country": "Nigeria",
    "type": "SEAPORT"
  },
  {
    "code": "NGLKK",
    "name": "Lekki Deep Sea Port",
    "city": "Lekki / Lagos",
    "country": "Nigeria",
    "type": "SEAPORT"
  },
  {
    "code": "NGONN",
    "name": "Onne Port Complex",
    "city": "Port Harcourt / Onne",
    "country": "Nigeria",
    "type": "SEAPORT"
  },
  {
    "code": "NGTIN",
    "name": "Tin Can Island Port",
    "city": "Lagos",
    "country": "Nigeria",
    "type": "SEAPORT"
  },
  {
    "code": "NOBGO",
    "name": "Bergen",
    "city": "Bergen",
    "country": "Norway",
    "type": "SEAPORT"
  },
  {
    "code": "NOOSL",
    "name": "Oslo",
    "city": "Oslo",
    "country": "Norway",
    "type": "SEAPORT"
  },
  {
    "code": "NOSTV",
    "name": "Stavanger",
    "city": "Stavanger",
    "country": "Norway",
    "type": "SEAPORT"
  },
  {
    "code": "NOTOS",
    "name": "Tromsø",
    "city": "Tromsø",
    "country": "Norway",
    "type": "SEAPORT"
  },
  {
    "code": "OMDQM",
    "name": "Duqm",
    "city": "Duqm",
    "country": "Oman",
    "type": "SEAPORT"
  },
  {
    "code": "OMMSQ",
    "name": "Port Sultan Qaboos",
    "city": "Muscat",
    "country": "Oman",
    "type": "SEAPORT"
  },
  {
    "code": "OMSLL",
    "name": "Salalah",
    "city": "Salalah",
    "country": "Oman",
    "type": "SEAPORT"
  },
  {
    "code": "OMSOH",
    "name": "Sohar Port",
    "city": "Sohar",
    "country": "Oman",
    "type": "SEAPORT"
  },
  {
    "code": "PKGWD",
    "name": "Gwadar Port",
    "city": "Gwadar",
    "country": "Pakistan",
    "type": "SEAPORT"
  },
  {
    "code": "PKKHI",
    "name": "Karachi Port",
    "city": "Karachi",
    "country": "Pakistan",
    "type": "SEAPORT"
  },
  {
    "code": "PKBQM",
    "name": "Port Muhammad Bin Qasim",
    "city": "Karachi",
    "country": "Pakistan",
    "type": "SEAPORT"
  },
  {
    "code": "PABLB",
    "name": "Balboa",
    "city": "Panama City / Balboa",
    "country": "Panama",
    "type": "SEAPORT"
  },
  {
    "code": "PACCT",
    "name": "Colon Container Terminal (CCT)",
    "city": "Colón",
    "country": "Panama",
    "type": "SEAPORT"
  },
  {
    "code": "PACRI",
    "name": "Cristobal",
    "city": "Colón",
    "country": "Panama",
    "type": "SEAPORT"
  },
  {
    "code": "PAMIT",
    "name": "Manzanillo International Terminal (MIT)",
    "city": "Colón",
    "country": "Panama",
    "type": "SEAPORT"
  },
  {
    "code": "PGLAE",
    "name": "Lae",
    "city": "Lae",
    "country": "Papua New Guinea",
    "type": "SEAPORT"
  },
  {
    "code": "PGPOM",
    "name": "Port Moresby",
    "city": "Port Moresby",
    "country": "Papua New Guinea",
    "type": "SEAPORT"
  },
  {
    "code": "PYASU",
    "name": "Asunción (River Port)",
    "city": "Asunción",
    "country": "Paraguay",
    "type": "SEAPORT"
  },
  {
    "code": "PECLL",
    "name": "Callao (DP World & APM Terminals)",
    "city": "Callao / Lima",
    "country": "Peru",
    "type": "SEAPORT"
  },
  {
    "code": "PECHY",
    "name": "Chancay (Megaport Chancay)",
    "city": "Chancay",
    "country": "Peru",
    "type": "SEAPORT"
  },
  {
    "code": "PEILQ",
    "name": "Ilo",
    "city": "Ilo / Moquegua",
    "country": "Peru",
    "type": "SEAPORT"
  },
  {
    "code": "PEMAT",
    "name": "Matarani",
    "city": "Matarani / Arequipa",
    "country": "Peru",
    "type": "SEAPORT"
  },
  {
    "code": "PEPAI",
    "name": "Paita",
    "city": "Paita / Piura",
    "country": "Peru",
    "type": "SEAPORT"
  },
  {
    "code": "PESAL",
    "name": "Salaverry",
    "city": "Salaverry / Trujillo",
    "country": "Peru",
    "type": "SEAPORT"
  },
  {
    "code": "PHBAT",
    "name": "Batangas International Port",
    "city": "Batangas City",
    "country": "Philippines",
    "type": "SEAPORT"
  },
  {
    "code": "PHCGY",
    "name": "Cagayan de Oro Port",
    "city": "Cagayan de Oro",
    "country": "Philippines",
    "type": "SEAPORT"
  },
  {
    "code": "PHCEB",
    "name": "Cebu International Port",
    "city": "Cebu City",
    "country": "Philippines",
    "type": "SEAPORT"
  },
  {
    "code": "PHDVO",
    "name": "Davao (Sasa Wharf)",
    "city": "Davao City",
    "country": "Philippines",
    "type": "SEAPORT"
  },
  {
    "code": "PHGEN",
    "name": "General Santos Port (Makar Wharf)",
    "city": "General Santos",
    "country": "Philippines",
    "type": "SEAPORT"
  },
  {
    "code": "PHILO",
    "name": "Iloilo International Port",
    "city": "Iloilo City",
    "country": "Philippines",
    "type": "SEAPORT"
  },
  {
    "code": "PHMNL",
    "name": "Manila (MICT & South Harbor)",
    "city": "Manila",
    "country": "Philippines",
    "type": "SEAPORT"
  },
  {
    "code": "PHSUB",
    "name": "Subic Bay Freeport Port",
    "city": "Subic Bay / Olongapo",
    "country": "Philippines",
    "type": "SEAPORT"
  },
  {
    "code": "PHZAM",
    "name": "Zamboanga",
    "city": "Zamboanga City",
    "country": "Philippines",
    "type": "SEAPORT"
  },
  {
    "code": "PLGDN",
    "name": "Gda ń sk Gda ń",
    "city": "sk",
    "country": "Poland",
    "type": "SEAPORT"
  },
  {
    "code": "PLGDY",
    "name": "Gdynia",
    "city": "Gdynia",
    "country": "Poland",
    "type": "SEAPORT"
  },
  {
    "code": "PLSZZ",
    "name": "Ports of Szczecin and Ś winouj ś cie Szczecin / Ś winouj ś",
    "city": "cie",
    "country": "Poland",
    "type": "SEAPORT"
  },
  {
    "code": "PTLEI",
    "name": "Leixões (Porto)",
    "city": "Matosinhos / Porto",
    "country": "Portugal",
    "type": "SEAPORT"
  },
  {
    "code": "PTLIS",
    "name": "Lisbon",
    "city": "Lisbon",
    "country": "Portugal",
    "type": "SEAPORT"
  },
  {
    "code": "PTSET",
    "name": "Setúbal",
    "city": "Setúbal",
    "country": "Portugal",
    "type": "SEAPORT"
  },
  {
    "code": "PTSIE",
    "name": "Sines",
    "city": "Sines",
    "country": "Portugal",
    "type": "SEAPORT"
  },
  {
    "code": "PRSJU",
    "name": "San Juan",
    "city": "San Juan",
    "country": "Puerto Rico",
    "type": "SEAPORT"
  },
  {
    "code": "QAHMD",
    "name": "Hamad Port",
    "city": "Umm Al Houl / Doha",
    "country": "Qatar",
    "type": "SEAPORT"
  },
  {
    "code": "CGPNR",
    "name": "Pointe-Noire",
    "city": "Pointe-Noire",
    "country": "Republic of the Congo",
    "type": "SEAPORT"
  },
  {
    "code": "ROCND",
    "name": "Constan ț a Constan ț",
    "city": "a",
    "country": "Romania",
    "type": "SEAPORT"
  },
  {
    "code": "RUMMK",
    "name": "Murmansk (Arctic)",
    "city": "Murmansk",
    "country": "Russia",
    "type": "SEAPORT"
  },
  {
    "code": "RUNVS",
    "name": "Novorossiysk (Black Sea)",
    "city": "Novorossiysk",
    "country": "Russia",
    "type": "SEAPORT"
  },
  {
    "code": "RUPST",
    "name": "Saint Petersburg",
    "city": "Saint Petersburg",
    "country": "Russia",
    "type": "SEAPORT"
  },
  {
    "code": "RUVVO",
    "name": "Vladivostok (Pacific)",
    "city": "Vladivostok",
    "country": "Russia",
    "type": "SEAPORT"
  },
  {
    "code": "RUVYP",
    "name": "Vostochny Port",
    "city": "Nakhodka / Primorsky Krai",
    "country": "Russia",
    "type": "SEAPORT"
  },
  {
    "code": "WSAPW",
    "name": "Apia",
    "city": "Apia",
    "country": "Samoa",
    "type": "SEAPORT"
  },
  {
    "code": "SAJED",
    "name": "Jeddah Islamic Port",
    "city": "Jeddah",
    "country": "Saudi Arabia",
    "type": "SEAPORT"
  },
  {
    "code": "SAGIZ",
    "name": "Jizan Port",
    "city": "Jizan",
    "country": "Saudi Arabia",
    "type": "SEAPORT"
  },
  {
    "code": "SAJUB",
    "name": "Jubail Commercial Port",
    "city": "Jubail",
    "country": "Saudi Arabia",
    "type": "SEAPORT"
  },
  {
    "code": "SADMM",
    "name": "King Abdulaziz Port",
    "city": "Dammam",
    "country": "Saudi Arabia",
    "type": "SEAPORT"
  },
  {
    "code": "SAKAP",
    "name": "King Abdullah Port",
    "city": "Rabigh",
    "country": "Saudi Arabia",
    "type": "SEAPORT"
  },
  {
    "code": "SAKAA",
    "name": "King Fahd Industrial Port",
    "city": "Yanbu",
    "country": "Saudi Arabia",
    "type": "SEAPORT"
  },
  {
    "code": "SAYNB",
    "name": "Yanbu Commercial Port",
    "city": "Yanbu",
    "country": "Saudi Arabia",
    "type": "SEAPORT"
  },
  {
    "code": "SNDKR",
    "name": "Autonomous Dakar (PAD)",
    "city": "Dakar",
    "country": "Senegal",
    "type": "SEAPORT"
  },
  {
    "code": "SCPOV",
    "name": "Port Victoria",
    "city": "Victoria / Mahé",
    "country": "Seychelles",
    "type": "SEAPORT"
  },
  {
    "code": "SLFNA",
    "name": "Freetown (Queen Elizabeth II)",
    "city": "Freetown",
    "country": "Sierra Leone",
    "type": "SEAPORT"
  },
  {
    "code": "SGSIN",
    "name": "Singapore (PSA / Jurong / Tuas)",
    "city": "Singapore",
    "country": "Singapore",
    "type": "SEAPORT"
  },
  {
    "code": "SIKOP",
    "name": "Koper",
    "city": "Koper",
    "country": "Slovenia",
    "type": "SEAPORT"
  },
  {
    "code": "SBHIR",
    "name": "Honiara Port",
    "city": "Honiara",
    "country": "Solomon Islands",
    "type": "SEAPORT"
  },
  {
    "code": "SOPLN",
    "name": "Berbera",
    "city": "Berbera / Somaliland",
    "country": "Somalia",
    "type": "SEAPORT"
  },
  {
    "code": "SOMOG",
    "name": "Mogadishu",
    "city": "Mogadishu",
    "country": "Somalia",
    "type": "SEAPORT"
  },
  {
    "code": "ZACPT",
    "name": "Cape Town",
    "city": "Cape Town",
    "country": "South Africa",
    "type": "SEAPORT"
  },
  {
    "code": "ZADUR",
    "name": "Durban",
    "city": "Durban",
    "country": "South Africa",
    "type": "SEAPORT"
  },
  {
    "code": "ZAZBA",
    "name": "Ngqura (Coega)",
    "city": "Gqeberha / Port Elizabeth",
    "country": "South Africa",
    "type": "SEAPORT"
  },
  {
    "code": "ZAPLZ",
    "name": "Port Elizabeth Harbour",
    "city": "Gqeberha / Port Elizabeth",
    "country": "South Africa",
    "type": "SEAPORT"
  },
  {
    "code": "ZARCB",
    "name": "Richards Bay",
    "city": "Richards Bay",
    "country": "South Africa",
    "type": "SEAPORT"
  },
  {
    "code": "ZASAL",
    "name": "Saldanha Bay",
    "city": "Saldanha",
    "country": "South Africa",
    "type": "SEAPORT"
  },
  {
    "code": "KRPUS",
    "name": "Busan (New Port & North Port)",
    "city": "Busan",
    "country": "South Korea",
    "type": "SEAPORT"
  },
  {
    "code": "KRDAN",
    "name": "Dangjin",
    "city": "Dangjin",
    "country": "South Korea",
    "type": "SEAPORT"
  },
  {
    "code": "KRKAN",
    "name": "Gwangyang",
    "city": "Gwangyang",
    "country": "South Korea",
    "type": "SEAPORT"
  },
  {
    "code": "KRINC",
    "name": "Incheon",
    "city": "Incheon",
    "country": "South Korea",
    "type": "SEAPORT"
  },
  {
    "code": "KRMAS",
    "name": "Masan",
    "city": "Changwon",
    "country": "South Korea",
    "type": "SEAPORT"
  },
  {
    "code": "KRPOH",
    "name": "Pohang",
    "city": "Pohang",
    "country": "South Korea",
    "type": "SEAPORT"
  },
  {
    "code": "KRPTK",
    "name": "Pyeongtaek-Dangjin",
    "city": "Pyeongtaek",
    "country": "South Korea",
    "type": "SEAPORT"
  },
  {
    "code": "KRUSN",
    "name": "Ulsan",
    "city": "Ulsan",
    "country": "South Korea",
    "type": "SEAPORT"
  },
  {
    "code": "ESALG",
    "name": "Algeciras",
    "city": "Algeciras",
    "country": "Spain",
    "type": "SEAPORT"
  },
  {
    "code": "ESBCN",
    "name": "Barcelona",
    "city": "Barcelona",
    "country": "Spain",
    "type": "SEAPORT"
  },
  {
    "code": "ESBIO",
    "name": "Bilbao",
    "city": "Bilbao",
    "country": "Spain",
    "type": "SEAPORT"
  },
  {
    "code": "ESCAR",
    "name": "Cartagena",
    "city": "Cartagena",
    "country": "Spain",
    "type": "SEAPORT"
  },
  {
    "code": "ESGIJ",
    "name": "Gijón (El Musel)",
    "city": "Gijón",
    "country": "Spain",
    "type": "SEAPORT"
  },
  {
    "code": "ESLPA",
    "name": "Las Palmas",
    "city": "Las Palmas / Canary Islands",
    "country": "Spain",
    "type": "SEAPORT"
  },
  {
    "code": "ESSCT",
    "name": "Santa Cruz de Tenerife",
    "city": "Tenerife / Canary Islands",
    "country": "Spain",
    "type": "SEAPORT"
  },
  {
    "code": "ESTAR",
    "name": "Tarragona",
    "city": "Tarragona",
    "country": "Spain",
    "type": "SEAPORT"
  },
  {
    "code": "ESVLC",
    "name": "Valencia",
    "city": "Valencia",
    "country": "Spain",
    "type": "SEAPORT"
  },
  {
    "code": "ESVGO",
    "name": "Vigo",
    "city": "Vigo",
    "country": "Spain",
    "type": "SEAPORT"
  },
  {
    "code": "LKCMB",
    "name": "Colombo",
    "city": "Colombo",
    "country": "Sri Lanka",
    "type": "SEAPORT"
  },
  {
    "code": "LKGLE",
    "name": "Galle Harbour",
    "city": "Galle",
    "country": "Sri Lanka",
    "type": "SEAPORT"
  },
  {
    "code": "LKHRI",
    "name": "Hambantota International Port",
    "city": "Hambantota",
    "country": "Sri Lanka",
    "type": "SEAPORT"
  },
  {
    "code": "LKTRR",
    "name": "Trincomalee Harbour",
    "city": "Trincomalee",
    "country": "Sri Lanka",
    "type": "SEAPORT"
  },
  {
    "code": "SDPZU",
    "name": "Port Sudan",
    "city": "Port Sudan",
    "country": "Sudan",
    "type": "SEAPORT"
  },
  {
    "code": "PMPBM",
    "name": "Paramaribo",
    "city": "Paramaribo",
    "country": "Suriname",
    "type": "SEAPORT"
  },
  {
    "code": "SEGOT",
    "name": "Gothenburg",
    "city": "Gothenburg",
    "country": "Sweden",
    "type": "SEAPORT"
  },
  {
    "code": "SEHEL",
    "name": "Helsingborg",
    "city": "Helsingborg",
    "country": "Sweden",
    "type": "SEAPORT"
  },
  {
    "code": "SEMMA",
    "name": "Malmö (CMP)",
    "city": "Malmö",
    "country": "Sweden",
    "type": "SEAPORT"
  },
  {
    "code": "SESTO",
    "name": "Ports of Stockholm",
    "city": "Stockholm",
    "country": "Sweden",
    "type": "SEAPORT"
  },
  {
    "code": "TWKHH",
    "name": "Kaohsiung",
    "city": "Kaohsiung",
    "country": "Taiwan",
    "type": "SEAPORT"
  },
  {
    "code": "TWKEL",
    "name": "Keelung",
    "city": "Keelung",
    "country": "Taiwan",
    "type": "SEAPORT"
  },
  {
    "code": "TWTXG",
    "name": "Taichung",
    "city": "Taichung",
    "country": "Taiwan",
    "type": "SEAPORT"
  },
  {
    "code": "TWTPE",
    "name": "Taipei",
    "city": "Taipei / Bali",
    "country": "Taiwan",
    "type": "SEAPORT"
  },
  {
    "code": "TZDAR",
    "name": "Dar es Salaam",
    "city": "Dar es Salaam",
    "country": "Tanzania",
    "type": "SEAPORT"
  },
  {
    "code": "TZMTW",
    "name": "Mtwara",
    "city": "Mtwara",
    "country": "Tanzania",
    "type": "SEAPORT"
  },
  {
    "code": "TZTGA",
    "name": "Tanga",
    "city": "Tanga",
    "country": "Tanzania",
    "type": "SEAPORT"
  },
  {
    "code": "TZZNZ",
    "name": "Zanzibar (Malindi)",
    "city": "Zanzibar City",
    "country": "Tanzania",
    "type": "SEAPORT"
  },
  {
    "code": "THBKK",
    "name": "Bangkok Port (Khlong Toei)",
    "city": "Bangkok",
    "country": "Thailand",
    "type": "SEAPORT"
  },
  {
    "code": "THLCH",
    "name": "Laem Chabang Port",
    "city": "Chonburi / Pattaya",
    "country": "Thailand",
    "type": "SEAPORT"
  },
  {
    "code": "THMAP",
    "name": "Map Ta Phut Port",
    "city": "Rayong",
    "country": "Thailand",
    "type": "SEAPORT"
  },
  {
    "code": "THHKT",
    "name": "Phuket Deep Sea Port",
    "city": "Phuket",
    "country": "Thailand",
    "type": "SEAPORT"
  },
  {
    "code": "THSON",
    "name": "Songkhla Port",
    "city": "Songkhla",
    "country": "Thailand",
    "type": "SEAPORT"
  },
  {
    "code": "TGLFW",
    "name": "Lomé",
    "city": "Lomé",
    "country": "Togo",
    "type": "SEAPORT"
  },
  {
    "code": "TOTBU",
    "name": "Queen Salote Wharf Nuku ʻ",
    "city": "alofa",
    "country": "Tonga",
    "type": "SEAPORT"
  },
  {
    "code": "TTPPT",
    "name": "Point Lisas",
    "city": "Couva",
    "country": "Trinidad and Tobago",
    "type": "SEAPORT"
  },
  {
    "code": "TTPOS",
    "name": "Spain",
    "city": "Spain",
    "country": "Trinidad and Tobago",
    "type": "SEAPORT"
  },
  {
    "code": "TNBZT",
    "name": "Bizerte",
    "city": "Bizerte",
    "country": "Tunisia",
    "type": "SEAPORT"
  },
  {
    "code": "TNSFA",
    "name": "Sfax",
    "city": "Sfax",
    "country": "Tunisia",
    "type": "SEAPORT"
  },
  {
    "code": "TNTUN",
    "name": "Tunis (La Goulette / Radès)",
    "city": "Tunis / Radès",
    "country": "Tunisia",
    "type": "SEAPORT"
  },
  {
    "code": "TRALI",
    "name": "Alia ğ a Port Complex Izmir / Alia ğ",
    "city": "a",
    "country": "Turkey",
    "type": "SEAPORT"
  },
  {
    "code": "TRIST",
    "name": "Ambarli / Marport",
    "city": "Istanbul",
    "country": "Turkey",
    "type": "SEAPORT"
  },
  {
    "code": "TRTEK",
    "name": "Asyaport (Tekirda ğ ) Tekirda",
    "city": "ğ",
    "country": "Turkey",
    "type": "SEAPORT"
  },
  {
    "code": "TRGEM",
    "name": "Gemport / Borusan Port",
    "city": "Gemlik / Bursa",
    "country": "Turkey",
    "type": "SEAPORT"
  },
  {
    "code": "TRISK",
    "name": "Iskenderun (Assan Port)",
    "city": "Iskenderun",
    "country": "Turkey",
    "type": "SEAPORT"
  },
  {
    "code": "TRIZM",
    "name": "Izmir (Alsancak)",
    "city": "Izmir",
    "country": "Turkey",
    "type": "SEAPORT"
  },
  {
    "code": "TRKOR",
    "name": "Kocaeli (Evyap / DP World Yarimca)",
    "city": "Kocaeli / Izmit",
    "country": "Turkey",
    "type": "SEAPORT"
  },
  {
    "code": "TRMER",
    "name": "Mersin International Port (MIP)",
    "city": "Mersin",
    "country": "Turkey",
    "type": "SEAPORT"
  },
  {
    "code": "TRSSX",
    "name": "Samsun Port",
    "city": "Samsun",
    "country": "Turkey",
    "type": "SEAPORT"
  },
  {
    "code": "TRTZX",
    "name": "Trabzon Port",
    "city": "Trabzon",
    "country": "Turkey",
    "type": "SEAPORT"
  },
  {
    "code": "UACHO",
    "name": "Chornomorsk",
    "city": "Chornomorsk",
    "country": "Ukraine",
    "type": "SEAPORT"
  },
  {
    "code": "UAODS",
    "name": "Odesa",
    "city": "Odesa",
    "country": "Ukraine",
    "type": "SEAPORT"
  },
  {
    "code": "UAPIV",
    "name": "Pivdennyi (Yuzhny)",
    "city": "Yuzhne / Odesa",
    "country": "Ukraine",
    "type": "SEAPORT"
  },
  {
    "code": "AEFJR",
    "name": "Fujairah",
    "city": "Fujairah",
    "country": "United Arab Emirates",
    "type": "SEAPORT"
  },
  {
    "code": "AEJEA",
    "name": "Jebel Ali",
    "city": "Dubai",
    "country": "United Arab Emirates",
    "type": "SEAPORT"
  },
  {
    "code": "AEKHL",
    "name": "Khalifa Port",
    "city": "Abu Dhabi",
    "country": "United Arab Emirates",
    "type": "SEAPORT"
  },
  {
    "code": "AEKLF",
    "name": "Khor Fakkan Container Terminal",
    "city": "Sharjah / Khor Fakkan",
    "country": "United Arab Emirates",
    "type": "SEAPORT"
  },
  {
    "code": "AESHJ",
    "name": "Port Khalid",
    "city": "Sharjah",
    "country": "United Arab Emirates",
    "type": "SEAPORT"
  },
  {
    "code": "AERKT",
    "name": "Saqr Port",
    "city": "Ras Al Khaimah",
    "country": "United Arab Emirates",
    "type": "SEAPORT"
  },
  {
    "code": "GBBEL",
    "name": "Belfast Harbour",
    "city": "Belfast",
    "country": "United Kingdom",
    "type": "SEAPORT"
  },
  {
    "code": "GBDVR",
    "name": "Dover",
    "city": "Dover",
    "country": "United Kingdom",
    "type": "SEAPORT"
  },
  {
    "code": "GBFXT",
    "name": "Felixstowe",
    "city": "Felixstowe",
    "country": "United Kingdom",
    "type": "SEAPORT"
  },
  {
    "code": "GBGRG",
    "name": "Grangemouth",
    "city": "Grangemouth / Edinburgh",
    "country": "United Kingdom",
    "type": "SEAPORT"
  },
  {
    "code": "GBIMM",
    "name": "Immingham",
    "city": "Immingham / Grimsby",
    "country": "United Kingdom",
    "type": "SEAPORT"
  },
  {
    "code": "GBLIV",
    "name": "Liverpool",
    "city": "Liverpool",
    "country": "United Kingdom",
    "type": "SEAPORT"
  },
  {
    "code": "GBLON",
    "name": "London Gateway / London",
    "city": "London / Tilbury",
    "country": "United Kingdom",
    "type": "SEAPORT"
  },
  {
    "code": "GBMIL",
    "name": "Milford Haven",
    "city": "Milford Haven / Wales",
    "country": "United Kingdom",
    "type": "SEAPORT"
  },
  {
    "code": "GBSOU",
    "name": "Southampton",
    "city": "Southampton",
    "country": "United Kingdom",
    "type": "SEAPORT"
  },
  {
    "code": "GBTEE",
    "name": "Teesport",
    "city": "Middlesbrough",
    "country": "United Kingdom",
    "type": "SEAPORT"
  },
  {
    "code": "USANC",
    "name": "Alaska (Anchorage)",
    "city": "Anchorage, AK",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USBAL",
    "name": "Baltimore (Helen Delich Bentley)",
    "city": "Baltimore, MD",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USBPT",
    "name": "Beaumont",
    "city": "Beaumont, TX",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USBOS",
    "name": "Boston (Conley Terminal)",
    "city": "Boston, MA",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USCHS",
    "name": "Charleston",
    "city": "Charleston, SC",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USCRP",
    "name": "Corpus Christi",
    "city": "Corpus Christi, TX",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USGLS",
    "name": "Galveston",
    "city": "Galveston, TX",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USHNL",
    "name": "Honolulu",
    "city": "Honolulu, HI",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USHOU",
    "name": "Houston",
    "city": "Houston, TX",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USJAX",
    "name": "JAXPORT ( Jacksonville)",
    "city": "Jacksonville, FL",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USLGB",
    "name": "Long Beach",
    "city": "Long Beach, CA",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USLAX",
    "name": "Los Angeles",
    "city": "Los Angeles / San Pedro, CA",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USMOB",
    "name": "Mobile",
    "city": "Mobile, AL",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USMSY",
    "name": "New Orleans",
    "city": "New Orleans, LA",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USNYC",
    "name": "New York and New Jersey",
    "city": "New York / Newark, NY/NJ",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USOAK",
    "name": "Oakland",
    "city": "Oakland, CA",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USPHL",
    "name": "PhilaPort ( Philadelphia)",
    "city": "Philadelphia, PA",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USEVG",
    "name": "Port Everglades",
    "city": "Fort Lauderdale, FL",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USTPA",
    "name": "Port Tampa Bay",
    "city": "Tampa, FL",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USPDX",
    "name": "Portland",
    "city": "Portland, OR",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USMIA",
    "name": "PortMiami",
    "city": "Miami, FL",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USSAV",
    "name": "Savannah (Garden City Terminal)",
    "city": "Savannah, GA",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USSEA",
    "name": "Seattle (NW Seaport Alliance)",
    "city": "Seattle, WA",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USTAC",
    "name": "Tacoma (NW Seaport Alliance)",
    "city": "Tacoma, WA",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USORF",
    "name": "Virginia (Norfolk)",
    "city": "Norfolk / Portsmouth, VA",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USWIL",
    "name": "Wilmington",
    "city": "Wilmington, DE",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "USILM",
    "name": "Wilmington",
    "city": "Wilmington, NC",
    "country": "United States",
    "type": "SEAPORT"
  },
  {
    "code": "UYMVD",
    "name": "Montevideo",
    "city": "Montevideo",
    "country": "Uruguay",
    "type": "SEAPORT"
  },
  {
    "code": "VUVLI",
    "name": "Port Vila Harbour",
    "city": "Port Vila",
    "country": "Vanuatu",
    "type": "SEAPORT"
  },
  {
    "code": "VELAG",
    "name": "La Guaira",
    "city": "La Guaira / Caracas",
    "country": "Venezuela",
    "type": "SEAPORT"
  },
  {
    "code": "VEPBL",
    "name": "Puerto Cabello",
    "city": "Puerto Cabello",
    "country": "Venezuela",
    "type": "SEAPORT"
  },
  {
    "code": "VNVUT",
    "name": "Cai Mep - Thi Vai Port Complex",
    "city": "Vung Tau / Ba Ria",
    "country": "Vietnam",
    "type": "SEAPORT"
  },
  {
    "code": "VNCAT",
    "name": "Cua Lo Port",
    "city": "Vinh / Nghe An",
    "country": "Vietnam",
    "type": "SEAPORT"
  },
  {
    "code": "VNDAD",
    "name": "Da Nang (Tien Sa)",
    "city": "Da Nang",
    "country": "Vietnam",
    "type": "SEAPORT"
  },
  {
    "code": "VNDNA",
    "name": "Dung Quat Port",
    "city": "Quang Ngai",
    "country": "Vietnam",
    "type": "SEAPORT"
  },
  {
    "code": "VNHPH",
    "name": "Hai Phong (Dinh Vu / Lach Huyen)",
    "city": "Hai Phong",
    "country": "Vietnam",
    "type": "SEAPORT"
  },
  {
    "code": "VNQNH",
    "name": "Quy Nhon Port",
    "city": "Quy Nhon",
    "country": "Vietnam",
    "type": "SEAPORT"
  },
  {
    "code": "VNSGN",
    "name": "Saigon Port (Cat Lai / SP-PSA)",
    "city": "Ho Chi Minh City",
    "country": "Vietnam",
    "type": "SEAPORT"
  }
] as const;

export const STANDARD_AIRPORTS: readonly TransportLocation[] = [
  {
    "code": "SOC",
    "name": "Adisumarmo International Airport",
    "city": "Surakarta / Solo",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "JOG",
    "name": "Adisutjipto Airport",
    "city": "Yogyakarta",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "AAP",
    "name": "Aji Pangeran Tumenggung Pranoto International Airport",
    "city": "Samarinda",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "PGK",
    "name": "Depati Amir Airport",
    "city": "Pangkal Pinang",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "SOQ",
    "name": "Domine Eduard Osok Airport",
    "city": "Sorong",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "KOE",
    "name": "El Tari International Airport",
    "city": "Kupang",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "TJQ",
    "name": "H.A.S. Hanandjoeddin International Airport",
    "city": "Tanjung Pandan / Belitung",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "HLP",
    "name": "Halim Perdanakusuma International Airport",
    "city": "Jakarta",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "BTH",
    "name": "Hang Nadim International Airport",
    "city": "Batam",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "BDO",
    "name": "Husein Sastranegara International Airport",
    "city": "Bandung",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "DPS",
    "name": "I Gusti Ngurah Rai International Airport",
    "city": "Denpasar / Bali",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "SRG",
    "name": "Jenderal Ahmad Yani International Airport",
    "city": "Semarang",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "SUB",
    "name": "Juanda International Airport",
    "city": "Surabaya / Sidoarjo",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "TRK",
    "name": "Juwata International Airport",
    "city": "Tarakan",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "KJT",
    "name": "Kertajati International Airport",
    "city": "Majalengka / Bandung",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "LBJ",
    "name": "Komodo International Airport",
    "city": "Labuan Bajo",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "KNO",
    "name": "Kualanamu International Airport",
    "city": "Medan / Deli Serdang",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "LOP",
    "name": "Lombok International Airport (ZAM)",
    "city": "Mataram / Praya",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "PDG",
    "name": "Minangkabau International Airport",
    "city": "Padang",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "MKQ",
    "name": "Mopah International Airport",
    "city": "Merauke",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "TIM",
    "name": "Mozes Kilangin Airport",
    "city": "Timika",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "AMQ",
    "name": "Pattimura Airport",
    "city": "Ambon",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "TKG",
    "name": "Radin Inten II Airport",
    "city": "Bandar Lampung",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "TNJ",
    "name": "Raja Haji Fisabilillah International Airport",
    "city": "Tanjung Pinang",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "MDC",
    "name": "Sam Ratulangi International Airport",
    "city": "Manado",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "DJJ",
    "name": "Sentani International Airport",
    "city": "Jayapura",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "CGK",
    "name": "Soekarno–Hatta International Airport",
    "city": "Jakarta / Tangerang",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "BPN",
    "name": "Sultan Aji Muhammad Sulaiman Sepinggan Airport",
    "city": "Balikpapan",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "UPG",
    "name": "Sultan Hasanuddin International Airport",
    "city": "Makassar / Maros",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "BTJ",
    "name": "Sultan Iskandar Muda International Airport",
    "city": "Banda Aceh",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "PLM",
    "name": "Sultan Mahmud Badaruddin II Airport",
    "city": "Palembang",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "PKU",
    "name": "Sultan Syarif Kasim II International Airport",
    "city": "Pekanbaru",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "PNK",
    "name": "Supadio International Airport",
    "city": "Pontianak / Kubu Raya",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "BDJ",
    "name": "Syamsudin Noor International Airport",
    "city": "Banjarmasin / Banjarbaru",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "YIA",
    "name": "Yogyakarta International Airport",
    "city": "Yogyakarta / Kulon Progo",
    "country": "Indonesia",
    "type": "AIRPORT"
  },
  {
    "code": "ORN",
    "name": "Ahmed Ben Bella Airport",
    "city": "Oran",
    "country": "Algeria",
    "type": "AIRPORT"
  },
  {
    "code": "ALG",
    "name": "Houari Boumediene Airport",
    "city": "Algiers",
    "country": "Algeria",
    "type": "AIRPORT"
  },
  {
    "code": "LAD",
    "name": "Quatro de Fevereiro Airport",
    "city": "Luanda",
    "country": "Angola",
    "type": "AIRPORT"
  },
  {
    "code": "AEP",
    "name": "Aeroparque Jorge Newbery",
    "city": "Buenos Aires",
    "country": "Argentina",
    "type": "AIRPORT"
  },
  {
    "code": "MDZ",
    "name": "Governor Francisco Gabrielli International Airport (El Plumerillo)",
    "city": "Mendoza",
    "country": "Argentina",
    "type": "AIRPORT"
  },
  {
    "code": "COR",
    "name": "Ingeniero Aeronáutico Ambrosio L.V. Taravella International Airport",
    "city": "Córdoba",
    "country": "Argentina",
    "type": "AIRPORT"
  },
  {
    "code": "EZE",
    "name": "Ministro Pistarini International Airport (Ezeiza)",
    "city": "Buenos Aires",
    "country": "Argentina",
    "type": "AIRPORT"
  },
  {
    "code": "ROS",
    "name": "Rosario – Islas Malvinas International Airport",
    "city": "Rosario",
    "country": "Argentina",
    "type": "AIRPORT"
  },
  {
    "code": "BRC",
    "name": "San Carlos de Bariloche Airport",
    "city": "Bariloche",
    "country": "Argentina",
    "type": "AIRPORT"
  },
  {
    "code": "EVN",
    "name": "Zvartnots International Airport",
    "city": "Yerevan",
    "country": "Armenia",
    "type": "AIRPORT"
  },
  {
    "code": "ADL",
    "name": "Adelaide Airport",
    "city": "Adelaide, SA",
    "country": "Australia",
    "type": "AIRPORT"
  },
  {
    "code": "BNE",
    "name": "Brisbane Airport",
    "city": "Brisbane, QLD",
    "country": "Australia",
    "type": "AIRPORT"
  },
  {
    "code": "CNS",
    "name": "Cairns Airport",
    "city": "Cairns, QLD",
    "country": "Australia",
    "type": "AIRPORT"
  },
  {
    "code": "CBR",
    "name": "Canberra Airport",
    "city": "Canberra, ACT",
    "country": "Australia",
    "type": "AIRPORT"
  },
  {
    "code": "DRW",
    "name": "Darwin International Airport",
    "city": "Darwin, NT",
    "country": "Australia",
    "type": "AIRPORT"
  },
  {
    "code": "OOL",
    "name": "Gold Coast Airport",
    "city": "Gold Coast / Coolangatta, QLD",
    "country": "Australia",
    "type": "AIRPORT"
  },
  {
    "code": "HBA",
    "name": "Hobart Airport",
    "city": "Hobart, TAS",
    "country": "Australia",
    "type": "AIRPORT"
  },
  {
    "code": "MEL",
    "name": "Melbourne Airport (Tullamarine)",
    "city": "Melbourne, VIC",
    "country": "Australia",
    "type": "AIRPORT"
  },
  {
    "code": "PER",
    "name": "Perth Airport",
    "city": "Perth, WA",
    "country": "Australia",
    "type": "AIRPORT"
  },
  {
    "code": "SYD",
    "name": "Sydney Kingsford Smith Airport",
    "city": "Sydney, NSW",
    "country": "Australia",
    "type": "AIRPORT"
  },
  {
    "code": "GRZ",
    "name": "Graz Airport",
    "city": "Graz",
    "country": "Austria",
    "type": "AIRPORT"
  },
  {
    "code": "INN",
    "name": "Innsbruck Airport",
    "city": "Innsbruck",
    "country": "Austria",
    "type": "AIRPORT"
  },
  {
    "code": "SZG",
    "name": "Salzburg Airport",
    "city": "Salzburg",
    "country": "Austria",
    "type": "AIRPORT"
  },
  {
    "code": "VIE",
    "name": "Vienna International Airport",
    "city": "Vienna",
    "country": "Austria",
    "type": "AIRPORT"
  },
  {
    "code": "GYD",
    "name": "Heydar Aliyev International Airport",
    "city": "Baku",
    "country": "Azerbaijan",
    "type": "AIRPORT"
  },
  {
    "code": "NAS",
    "name": "Lynden Pindling International Airport",
    "city": "Nassau",
    "country": "Bahamas",
    "type": "AIRPORT"
  },
  {
    "code": "BAH",
    "name": "Bahrain International Airport",
    "city": "Manama / Muharraq",
    "country": "Bahrain",
    "type": "AIRPORT"
  },
  {
    "code": "DAC",
    "name": "Hazrat Shahjalal International Airport",
    "city": "Dhaka",
    "country": "Bangladesh",
    "type": "AIRPORT"
  },
  {
    "code": "ZYL",
    "name": "Osmani International Airport",
    "city": "Sylhet",
    "country": "Bangladesh",
    "type": "AIRPORT"
  },
  {
    "code": "CGP",
    "name": "Shah Amanat International Airport",
    "city": "Chittagong",
    "country": "Bangladesh",
    "type": "AIRPORT"
  },
  {
    "code": "BGI",
    "name": "Grantley Adams International Airport",
    "city": "Bridgetown",
    "country": "Barbados",
    "type": "AIRPORT"
  },
  {
    "code": "ANR",
    "name": "Antwerp International Airport",
    "city": "Antwerp",
    "country": "Belgium",
    "type": "AIRPORT"
  },
  {
    "code": "BRU",
    "name": "Brussels Airport",
    "city": "Brussels",
    "country": "Belgium",
    "type": "AIRPORT"
  },
  {
    "code": "CRL",
    "name": "Brussels South Charleroi Airport",
    "city": "Charleroi / Brussels",
    "country": "Belgium",
    "type": "AIRPORT"
  },
  {
    "code": "LGG",
    "name": "Liège Airport",
    "city": "Liège",
    "country": "Belgium",
    "type": "AIRPORT"
  },
  {
    "code": "BZE",
    "name": "Philip S. W. Goldson International Airport",
    "city": "Belize City",
    "country": "Belize",
    "type": "AIRPORT"
  },
  {
    "code": "COO",
    "name": "Cadjehoun Airport",
    "city": "Cotonou",
    "country": "Benin",
    "type": "AIRPORT"
  },
  {
    "code": "PBH",
    "name": "Paro Airport",
    "city": "Paro",
    "country": "Bhutan",
    "type": "AIRPORT"
  },
  {
    "code": "LPB",
    "name": "El Alto International Airport",
    "city": "La Paz",
    "country": "Bolivia",
    "type": "AIRPORT"
  },
  {
    "code": "VVI",
    "name": "Viru Viru International Airport",
    "city": "Santa Cruz de la Sierra",
    "country": "Bolivia",
    "type": "AIRPORT"
  },
  {
    "code": "GBE",
    "name": "Sir Seretse Khama International Airport",
    "city": "Gaborone",
    "country": "Botswana",
    "type": "AIRPORT"
  },
  {
    "code": "CWB",
    "name": "Afonso Pena International Airport",
    "city": "Curitiba",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "CNF",
    "name": "Belo Horizonte/Confins International Airport",
    "city": "Belo Horizonte",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "BSB",
    "name": "Brasília International Airport",
    "city": "Brasília",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "MAO",
    "name": "Eduardo Gomes International Airport",
    "city": "Manaus",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "FOR",
    "name": "Fortaleza Airport",
    "city": "Fortaleza",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "REC",
    "name": "Recife/Guararapes–Gilberto Freyre International Airport",
    "city": "Recife",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "GIG",
    "name": "Rio de Janeiro/Galeão International Airport",
    "city": "Rio de Janeiro",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "POA",
    "name": "Salgado Filho Porto Alegre International Airport",
    "city": "Porto Alegre",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "SSA",
    "name": "Salvador International Airport",
    "city": "Salvador",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "SDU",
    "name": "Santos Dumont Airport",
    "city": "Rio de Janeiro",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "CGH",
    "name": "São Paulo/Congonhas Airport",
    "city": "São Paulo",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "GRU",
    "name": "São Paulo/Guarulhos International Airport",
    "city": "São Paulo",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "BEL",
    "name": "Val-de-Cans/Júlio Cezar Ribeiro International Airport",
    "city": "Belém",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "VCP",
    "name": "Viracopos International Airport (Campinas)",
    "city": "Campinas / São Paulo",
    "country": "Brazil",
    "type": "AIRPORT"
  },
  {
    "code": "BWN",
    "name": "Brunei International Airport",
    "city": "Bandar Seri Begawan",
    "country": "Brunei Darussalam",
    "type": "AIRPORT"
  },
  {
    "code": "SOF",
    "name": "Sofia Airport",
    "city": "Sofia",
    "country": "Bulgaria",
    "type": "AIRPORT"
  },
  {
    "code": "OUA",
    "name": "Thomas Sankara International Airport Ouagadougou",
    "city": "Ouagadougou",
    "country": "Burkina Faso",
    "type": "AIRPORT"
  },
  {
    "code": "PNH",
    "name": "Phnom Penh International Airport",
    "city": "Phnom Penh",
    "country": "Cambodia",
    "type": "AIRPORT"
  },
  {
    "code": "SAI",
    "name": "Siem Reap–Angkor International Airport",
    "city": "Siem Reap",
    "country": "Cambodia",
    "type": "AIRPORT"
  },
  {
    "code": "KOS",
    "name": "Sihanouk International Airport",
    "city": "Sihanoukville",
    "country": "Cambodia",
    "type": "AIRPORT"
  },
  {
    "code": "DLA",
    "name": "Douala International Airport",
    "city": "Douala",
    "country": "Cameroon",
    "type": "AIRPORT"
  },
  {
    "code": "NSI",
    "name": "Yaoundé Nsimalen International Airport",
    "city": "Yaoundé",
    "country": "Cameroon",
    "type": "AIRPORT"
  },
  {
    "code": "YYC",
    "name": "Calgary International Airport",
    "city": "Calgary, AB",
    "country": "Canada",
    "type": "AIRPORT"
  },
  {
    "code": "YEG",
    "name": "Edmonton International Airport",
    "city": "Edmonton, AB",
    "country": "Canada",
    "type": "AIRPORT"
  },
  {
    "code": "YHZ",
    "name": "Halifax Stanfield International Airport",
    "city": "Halifax, NS",
    "country": "Canada",
    "type": "AIRPORT"
  },
  {
    "code": "YUL",
    "name": "Montréal–Trudeau International Airport",
    "city": "Montreal, QC",
    "country": "Canada",
    "type": "AIRPORT"
  },
  {
    "code": "YOW",
    "name": "Ottawa Macdonald–Cartier International Airport",
    "city": "Ottawa, ON",
    "country": "Canada",
    "type": "AIRPORT"
  },
  {
    "code": "YQB",
    "name": "Québec City Jean Lesage International Airport",
    "city": "Quebec City, QC",
    "country": "Canada",
    "type": "AIRPORT"
  },
  {
    "code": "YYZ",
    "name": "Toronto Pearson International Airport",
    "city": "Toronto, ON",
    "country": "Canada",
    "type": "AIRPORT"
  },
  {
    "code": "YVR",
    "name": "Vancouver International Airport",
    "city": "Vancouver, BC",
    "country": "Canada",
    "type": "AIRPORT"
  },
  {
    "code": "YYJ",
    "name": "Victoria International Airport",
    "city": "Victoria, BC",
    "country": "Canada",
    "type": "AIRPORT"
  },
  {
    "code": "YWG",
    "name": "Winnipeg James Armstrong Richardson International Airport",
    "city": "Winnipeg, MB",
    "country": "Canada",
    "type": "AIRPORT"
  },
  {
    "code": "ANF",
    "name": "Andrés Sabella Gálvez International Airport",
    "city": "Antofagasta",
    "country": "Chile",
    "type": "AIRPORT"
  },
  {
    "code": "SCL",
    "name": "Arturo Merino Benítez International Airport",
    "city": "Santiago",
    "country": "Chile",
    "type": "AIRPORT"
  },
  {
    "code": "CJC",
    "name": "El Loa Airport",
    "city": "Calama",
    "country": "Chile",
    "type": "AIRPORT"
  },
  {
    "code": "PMC",
    "name": "El Tepual Airport",
    "city": "Puerto Montt",
    "country": "Chile",
    "type": "AIRPORT"
  },
  {
    "code": "PUQ",
    "name": "Presidente Carlos Ibáñez del Campo International Airport",
    "city": "Punta Arenas",
    "country": "Chile",
    "type": "AIRPORT"
  },
  {
    "code": "PEK",
    "name": "Beijing Capital International Airport",
    "city": "Beijing",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "PKX",
    "name": "Beijing Daxing International Airport",
    "city": "Beijing",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "CSX",
    "name": "Changsha Huanghua International Airport",
    "city": "Changsha",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "CTU",
    "name": "Chengdu Shuangliu International Airport",
    "city": "Chengdu",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "TFU",
    "name": "Chengdu Tianfu International Airport",
    "city": "Chengdu",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "CKG",
    "name": "Chongqing Jiangbei International Airport",
    "city": "Chongqing",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "DLC",
    "name": "Dalian Zhoushuizi International Airport",
    "city": "Dalian",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "FOC",
    "name": "Fuzhou Changle International Airport",
    "city": "Fuzhou",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "CAN",
    "name": "Guangzhou Baiyun International Airport",
    "city": "Guangzhou",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "KWE",
    "name": "Guiyang Longdongbao International Airport",
    "city": "Guiyang",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "HAK",
    "name": "Haikou Meilan International Airport",
    "city": "Haikou",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "HGH",
    "name": "Hangzhou Xiaoshan International Airport",
    "city": "Hangzhou",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "HRB",
    "name": "Harbin Taiping International Airport",
    "city": "Harbin",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "KMG",
    "name": "Kunming Changshui International Airport",
    "city": "Kunming",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "LHW",
    "name": "Lanzhou Zhongchuan International Airport",
    "city": "Lanzhou",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "NKG",
    "name": "Nanjing Lukou International Airport",
    "city": "Nanjing",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "NNG",
    "name": "Nanning Wuxu International Airport",
    "city": "Nanning",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "TAO",
    "name": "Qingdao Jiaodong International Airport",
    "city": "Qingdao",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "SYX",
    "name": "Sanya Phoenix International Airport",
    "city": "Sanya",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "SHA",
    "name": "Shanghai Hongqiao International Airport",
    "city": "Shanghai",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "PVG",
    "name": "Shanghai Pudong International Airport",
    "city": "Shanghai",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "SHE",
    "name": "Shenyang Taoxian International Airport",
    "city": "Shenyang",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "SZX",
    "name": "Shenzhen Bao'an International Airport",
    "city": "Shenzhen",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "TYN",
    "name": "Taiyuan Wusu International Airport",
    "city": "Taiyuan",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "TSN",
    "name": "Tianjin Binhai International Airport",
    "city": "Tianjin",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "URC",
    "name": "Ürümqi Diwopu International Airport",
    "city": "Ürümqi",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "WUH",
    "name": "Wuhan Tianhe International Airport",
    "city": "Wuhan",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "XIY",
    "name": "Xi'an Xianyang International Airport",
    "city": "Xi'an",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "XMN",
    "name": "Xiamen Gaoqi International Airport",
    "city": "Xiamen",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "CGO",
    "name": "Zhengzhou Xinzheng International Airport",
    "city": "Zhengzhou",
    "country": "China",
    "type": "AIRPORT"
  },
  {
    "code": "CLO",
    "name": "Alfonso Bonilla Aragón International Airport",
    "city": "Cali",
    "country": "Colombia",
    "type": "AIRPORT"
  },
  {
    "code": "BOG",
    "name": "El Dorado International Airport",
    "city": "Bogotá",
    "country": "Colombia",
    "type": "AIRPORT"
  },
  {
    "code": "BAQ",
    "name": "Ernesto Cortissoz International Airport",
    "city": "Barranquilla",
    "country": "Colombia",
    "type": "AIRPORT"
  },
  {
    "code": "MDE",
    "name": "José María Córdova International Airport",
    "city": "Medellín",
    "country": "Colombia",
    "type": "AIRPORT"
  },
  {
    "code": "PEI",
    "name": "Matecaña International Airport",
    "city": "Pereira",
    "country": "Colombia",
    "type": "AIRPORT"
  },
  {
    "code": "BGA",
    "name": "Palonegro International Airport",
    "city": "Bucaramanga",
    "country": "Colombia",
    "type": "AIRPORT"
  },
  {
    "code": "CTG",
    "name": "Rafael Núñez International Airport",
    "city": "Cartagena",
    "country": "Colombia",
    "type": "AIRPORT"
  },
  {
    "code": "SJO",
    "name": "Juan Santamaría International Airport",
    "city": "San José",
    "country": "Costa Rica",
    "type": "AIRPORT"
  },
  {
    "code": "DBV",
    "name": "Dubrovnik Airport",
    "city": "Dubrovnik",
    "country": "Croatia",
    "type": "AIRPORT"
  },
  {
    "code": "SPU",
    "name": "Split Airport",
    "city": "Split",
    "country": "Croatia",
    "type": "AIRPORT"
  },
  {
    "code": "ZAG",
    "name": "Zagreb Airport",
    "city": "Zagreb",
    "country": "Croatia",
    "type": "AIRPORT"
  },
  {
    "code": "HAV",
    "name": "José Martí International Airport",
    "city": "Havana",
    "country": "Cuba",
    "type": "AIRPORT"
  },
  {
    "code": "LCA",
    "name": "Larnaca International Airport",
    "city": "Larnaca",
    "country": "Cyprus",
    "type": "AIRPORT"
  },
  {
    "code": "PFO",
    "name": "Paphos International Airport",
    "city": "Paphos",
    "country": "Cyprus",
    "type": "AIRPORT"
  },
  {
    "code": "PRG",
    "name": "Václav Havel Airport Prague",
    "city": "Prague",
    "country": "Czech Republic",
    "type": "AIRPORT"
  },
  {
    "code": "AAL",
    "name": "Aalborg Airport",
    "city": "Aalborg",
    "country": "Denmark",
    "type": "AIRPORT"
  },
  {
    "code": "BLL",
    "name": "Billund Airport",
    "city": "Billund",
    "country": "Denmark",
    "type": "AIRPORT"
  },
  {
    "code": "CPH",
    "name": "Copenhagen Airport",
    "city": "Copenhagen",
    "country": "Denmark",
    "type": "AIRPORT"
  },
  {
    "code": "JIB",
    "name": "Djibouti–Ambouli International Airport",
    "city": "Djibouti City",
    "country": "Djibouti",
    "type": "AIRPORT"
  },
  {
    "code": "SDQ",
    "name": "Las Américas International Airport",
    "city": "Santo Domingo",
    "country": "Dominican Republic",
    "type": "AIRPORT"
  },
  {
    "code": "PUJ",
    "name": "Punta Cana International Airport",
    "city": "Punta Cana",
    "country": "Dominican Republic",
    "type": "AIRPORT"
  },
  {
    "code": "FIH",
    "name": "N'djili Airport",
    "city": "Kinshasa",
    "country": "DR Congo",
    "type": "AIRPORT"
  },
  {
    "code": "GYE",
    "name": "José Joaquín de Olmedo International Airport",
    "city": "Guayaquil",
    "country": "Ecuador",
    "type": "AIRPORT"
  },
  {
    "code": "UIO",
    "name": "Mariscal Sucre International Airport",
    "city": "Quito",
    "country": "Ecuador",
    "type": "AIRPORT"
  },
  {
    "code": "HBE",
    "name": "Borg El Arab International Airport",
    "city": "Alexandria",
    "country": "Egypt",
    "type": "AIRPORT"
  },
  {
    "code": "CAI",
    "name": "Cairo International Airport",
    "city": "Cairo",
    "country": "Egypt",
    "type": "AIRPORT"
  },
  {
    "code": "HRG",
    "name": "Hurghada International Airport",
    "city": "Hurghada",
    "country": "Egypt",
    "type": "AIRPORT"
  },
  {
    "code": "SSH",
    "name": "Sharm El Sheikh International Airport",
    "city": "Sharm El Sheikh",
    "country": "Egypt",
    "type": "AIRPORT"
  },
  {
    "code": "SAL",
    "name": "El Salvador International Airport",
    "city": "San Salvador",
    "country": "El Salvador",
    "type": "AIRPORT"
  },
  {
    "code": "ADD",
    "name": "Addis Ababa Bole International Airport",
    "city": "Addis Ababa",
    "country": "Ethiopia",
    "type": "AIRPORT"
  },
  {
    "code": "NAN",
    "name": "Nadi International Airport",
    "city": "Nadi",
    "country": "Fiji",
    "type": "AIRPORT"
  },
  {
    "code": "SUV",
    "name": "Nausori International Airport",
    "city": "Suva",
    "country": "Fiji",
    "type": "AIRPORT"
  },
  {
    "code": "HEL",
    "name": "Helsinki-Vantaa Airport",
    "city": "Helsinki",
    "country": "Finland",
    "type": "AIRPORT"
  },
  {
    "code": "OUL",
    "name": "Oulu Airport",
    "city": "Oulu",
    "country": "Finland",
    "type": "AIRPORT"
  },
  {
    "code": "RVN",
    "name": "Rovaniemi Airport",
    "city": "Rovaniemi",
    "country": "Finland",
    "type": "AIRPORT"
  },
  {
    "code": "BVA",
    "name": "Beauvais–Tillé Airport",
    "city": "Beauvais / Paris",
    "country": "France",
    "type": "AIRPORT"
  },
  {
    "code": "BOD",
    "name": "Bordeaux–Mérignac Airport",
    "city": "Bordeaux",
    "country": "France",
    "type": "AIRPORT"
  },
  {
    "code": "LIL",
    "name": "Lille Airport",
    "city": "Lille",
    "country": "France",
    "type": "AIRPORT"
  },
  {
    "code": "LYS",
    "name": "Lyon–Saint-Exupéry Airport",
    "city": "Lyon",
    "country": "France",
    "type": "AIRPORT"
  },
  {
    "code": "MRS",
    "name": "Marseille Provence Airport",
    "city": "Marseille",
    "country": "France",
    "type": "AIRPORT"
  },
  {
    "code": "NTE",
    "name": "Nantes Atlantique Airport",
    "city": "Nantes",
    "country": "France",
    "type": "AIRPORT"
  },
  {
    "code": "NCE",
    "name": "Nice Côte d'Azur Airport",
    "city": "Nice",
    "country": "France",
    "type": "AIRPORT"
  },
  {
    "code": "CDG",
    "name": "Paris Charles de Gaulle Airport",
    "city": "Paris",
    "country": "France",
    "type": "AIRPORT"
  },
  {
    "code": "ORY",
    "name": "Paris Orly Airport",
    "city": "Paris",
    "country": "France",
    "type": "AIRPORT"
  },
  {
    "code": "SXB",
    "name": "Strasbourg Airport",
    "city": "Strasbourg",
    "country": "France",
    "type": "AIRPORT"
  },
  {
    "code": "TLS",
    "name": "Toulouse–Blagnac Airport",
    "city": "Toulouse",
    "country": "France",
    "type": "AIRPORT"
  },
  {
    "code": "PPT",
    "name": "Faa'a International Airport",
    "city": "Papeete / Tahiti",
    "country": "French Polynesia",
    "type": "AIRPORT"
  },
  {
    "code": "BUS",
    "name": "Batumi International Airport",
    "city": "Batumi",
    "country": "Georgia",
    "type": "AIRPORT"
  },
  {
    "code": "TBS",
    "name": "Tbilisi International Airport",
    "city": "Tbilisi",
    "country": "Georgia",
    "type": "AIRPORT"
  },
  {
    "code": "BER",
    "name": "Berlin Brandenburg Airport",
    "city": "Berlin",
    "country": "Germany",
    "type": "AIRPORT"
  },
  {
    "code": "BRE",
    "name": "Bremen Airport",
    "city": "Bremen",
    "country": "Germany",
    "type": "AIRPORT"
  },
  {
    "code": "CGN",
    "name": "Cologne Bonn Airport",
    "city": "Cologne / Bonn",
    "country": "Germany",
    "type": "AIRPORT"
  },
  {
    "code": "DUS",
    "name": "Düsseldorf Airport",
    "city": "Düsseldorf",
    "country": "Germany",
    "type": "AIRPORT"
  },
  {
    "code": "FRA",
    "name": "Frankfurt Airport",
    "city": "Frankfurt",
    "country": "Germany",
    "type": "AIRPORT"
  },
  {
    "code": "HAM",
    "name": "Hamburg Airport",
    "city": "Hamburg",
    "country": "Germany",
    "type": "AIRPORT"
  },
  {
    "code": "HAJ",
    "name": "Hannover Airport",
    "city": "Hannover",
    "country": "Germany",
    "type": "AIRPORT"
  },
  {
    "code": "LEJ",
    "name": "Leipzig/Halle Airport",
    "city": "Leipzig / Halle",
    "country": "Germany",
    "type": "AIRPORT"
  },
  {
    "code": "MUC",
    "name": "Munich Airport",
    "city": "Munich",
    "country": "Germany",
    "type": "AIRPORT"
  },
  {
    "code": "NUE",
    "name": "Nuremberg Airport",
    "city": "Nuremberg",
    "country": "Germany",
    "type": "AIRPORT"
  },
  {
    "code": "STR",
    "name": "Stuttgart Airport",
    "city": "Stuttgart",
    "country": "Germany",
    "type": "AIRPORT"
  },
  {
    "code": "ACC",
    "name": "Kotoka International Airport",
    "city": "Accra",
    "country": "Ghana",
    "type": "AIRPORT"
  },
  {
    "code": "ATH",
    "name": "Athens International Airport",
    "city": "Athens",
    "country": "Greece",
    "type": "AIRPORT"
  },
  {
    "code": "HER",
    "name": "Heraklion International Airport",
    "city": "Heraklion / Crete",
    "country": "Greece",
    "type": "AIRPORT"
  },
  {
    "code": "JMK",
    "name": "Mykonos Airport",
    "city": "Mykonos",
    "country": "Greece",
    "type": "AIRPORT"
  },
  {
    "code": "RHO",
    "name": "Rhodes International Airport",
    "city": "Rhodes",
    "country": "Greece",
    "type": "AIRPORT"
  },
  {
    "code": "JTR",
    "name": "Santorini (Thira) International Airport",
    "city": "Santorini",
    "country": "Greece",
    "type": "AIRPORT"
  },
  {
    "code": "SKG",
    "name": "Thessaloniki Airport",
    "city": "Thessaloniki",
    "country": "Greece",
    "type": "AIRPORT"
  },
  {
    "code": "GUM",
    "name": "Antonio B. Won Pat International Airport",
    "city": "Hagåtña / Tamuning",
    "country": "Guam",
    "type": "AIRPORT"
  },
  {
    "code": "GUA",
    "name": "La Aurora International Airport",
    "city": "Guatemala City",
    "country": "Guatemala",
    "type": "AIRPORT"
  },
  {
    "code": "GEO",
    "name": "Cheddi Jagan International Airport",
    "city": "Georgetown",
    "country": "Guyana",
    "type": "AIRPORT"
  },
  {
    "code": "PAP",
    "name": "Toussaint Louverture International Airport",
    "city": "Port-au-Prince",
    "country": "Haiti",
    "type": "AIRPORT"
  },
  {
    "code": "SAP",
    "name": "Ramón Villeda Morales International Airport",
    "city": "San Pedro Sula",
    "country": "Honduras",
    "type": "AIRPORT"
  },
  {
    "code": "HKG",
    "name": "Hong Kong International Airport",
    "city": "Hong Kong",
    "country": "Hong Kong SAR",
    "type": "AIRPORT"
  },
  {
    "code": "BUD",
    "name": "Budapest Ferenc Liszt International Airport",
    "city": "Budapest",
    "country": "Hungary",
    "type": "AIRPORT"
  },
  {
    "code": "BBI",
    "name": "Biju Patnaik Airport",
    "city": "Bhubaneswar",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "CCJ",
    "name": "Calicut International Airport",
    "city": "Kozhikode",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "LKO",
    "name": "Chaudhary Charan Singh International Airport",
    "city": "Lucknow",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "MAA",
    "name": "Chennai International Airport",
    "city": "Chennai",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "BOM",
    "name": "Chhatrapati Shivaji Maharaj International Airport",
    "city": "Mumbai",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "COK",
    "name": "Cochin International Airport",
    "city": "Kochi",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "GOI",
    "name": "Dabolim Airport",
    "city": "Goa",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "NAG",
    "name": "Dr. Babasaheb Ambedkar International Airport",
    "city": "Nagpur",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "DEL",
    "name": "Indira Gandhi International Airport",
    "city": "New Delhi",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "JAI",
    "name": "Jaipur International Airport",
    "city": "Jaipur",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "PAT",
    "name": "Jay Prakash Narayan Airport",
    "city": "Patna",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "BLR",
    "name": "Kempegowda International Airport",
    "city": "Bengaluru",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "GAU",
    "name": "Lokpriya Gopinath Bordoloi International Airport",
    "city": "Guwahati",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "GOX",
    "name": "Manohar International Airport (Mopa)",
    "city": "Goa",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "CCU",
    "name": "Netaji Subhash Chandra Bose International Airport",
    "city": "Kolkata",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "PNQ",
    "name": "Pune Airport",
    "city": "Pune",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "HYD",
    "name": "Rajiv Gandhi International Airport",
    "city": "Hyderabad",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "AMD",
    "name": "Sardar Vallabhbhai Patel International Airport",
    "city": "Ahmedabad",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "IXC",
    "name": "Shaheed Bhagat Singh International Airport",
    "city": "Chandigarh / Mohali",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "TRV",
    "name": "Thiruvananthapuram International Airport",
    "city": "Thiruvananthapuram",
    "country": "India",
    "type": "AIRPORT"
  },
  {
    "code": "BND",
    "name": "Bandar Abbas International Airport",
    "city": "Bandar Abbas",
    "country": "Iran",
    "type": "AIRPORT"
  },
  {
    "code": "IFN",
    "name": "Isfahan Shahid Beheshti International Airport",
    "city": "Isfahan",
    "country": "Iran",
    "type": "AIRPORT"
  },
  {
    "code": "MHD",
    "name": "Mashhad Shahid Hasheminejad International Airport",
    "city": "Mashhad",
    "country": "Iran",
    "type": "AIRPORT"
  },
  {
    "code": "THR",
    "name": "Mehrabad International Airport",
    "city": "Tehran",
    "country": "Iran",
    "type": "AIRPORT"
  },
  {
    "code": "SYZ",
    "name": "Shiraz Shahid Dastghaib International Airport",
    "city": "Shiraz",
    "country": "Iran",
    "type": "AIRPORT"
  },
  {
    "code": "TBZ",
    "name": "Tabriz Shahid Madani International Airport",
    "city": "Tabriz",
    "country": "Iran",
    "type": "AIRPORT"
  },
  {
    "code": "IKA",
    "name": "Tehran Imam Khomeini International Airport",
    "city": "Tehran",
    "country": "Iran",
    "type": "AIRPORT"
  },
  {
    "code": "NJF",
    "name": "Al Najaf International Airport",
    "city": "Najaf",
    "country": "Iraq",
    "type": "AIRPORT"
  },
  {
    "code": "BGW",
    "name": "Baghdad International Airport",
    "city": "Baghdad",
    "country": "Iraq",
    "type": "AIRPORT"
  },
  {
    "code": "BSR",
    "name": "Basra International Airport",
    "city": "Basra",
    "country": "Iraq",
    "type": "AIRPORT"
  },
  {
    "code": "EBL",
    "name": "Erbil International Airport",
    "city": "Erbil",
    "country": "Iraq",
    "type": "AIRPORT"
  },
  {
    "code": "ISU",
    "name": "Sulaimaniyah International Airport",
    "city": "Sulaimaniyah",
    "country": "Iraq",
    "type": "AIRPORT"
  },
  {
    "code": "ORK",
    "name": "Cork Airport",
    "city": "Cork",
    "country": "Ireland",
    "type": "AIRPORT"
  },
  {
    "code": "DUB",
    "name": "Dublin Airport",
    "city": "Dublin",
    "country": "Ireland",
    "type": "AIRPORT"
  },
  {
    "code": "NOC",
    "name": "Ireland West Airport Knock",
    "city": "Knock",
    "country": "Ireland",
    "type": "AIRPORT"
  },
  {
    "code": "SNN",
    "name": "Shannon Airport",
    "city": "Shannon / Limerick",
    "country": "Ireland",
    "type": "AIRPORT"
  },
  {
    "code": "TLV",
    "name": "Ben Gurion Airport",
    "city": "Tel Aviv / Lod",
    "country": "Israel",
    "type": "AIRPORT"
  },
  {
    "code": "ETM",
    "name": "Ramon Airport",
    "city": "Eilat",
    "country": "Israel",
    "type": "AIRPORT"
  },
  {
    "code": "BRI",
    "name": "Bari Karol Wojty ł a Airport",
    "city": "Bari",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "BLQ",
    "name": "Bologna Guglielmo Marconi Airport",
    "city": "Bologna",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "CTA",
    "name": "Catania–Fontanarossa Airport",
    "city": "Catania / Sicily",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "PMO",
    "name": "Falcone–Borsellino Airport",
    "city": "Palermo / Sicily",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "FLR",
    "name": "Florence Airport, Peretola",
    "city": "Florence",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "FCO",
    "name": "Leonardo da Vinci–Fiumicino Airport",
    "city": "Rome",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "LIN",
    "name": "Milan Linate Airport",
    "city": "Milan",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "MXP",
    "name": "Milan Malpensa Airport",
    "city": "Milan",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "NAP",
    "name": "Naples International Airport",
    "city": "Naples",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "BGY",
    "name": "Orio al Serio International Airport (Bergamo)",
    "city": "Bergamo / Milan",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "PSA",
    "name": "Pisa International Airport",
    "city": "Pisa",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "CIA",
    "name": "Rome Ciampino Airport",
    "city": "Rome",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "TRN",
    "name": "Turin Airport",
    "city": "Turin",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "VCE",
    "name": "Venice Marco Polo Airport",
    "city": "Venice",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "VRN",
    "name": "Verona Villafranca Airport",
    "city": "Verona",
    "country": "Italy",
    "type": "AIRPORT"
  },
  {
    "code": "ABJ",
    "name": "Félix-Houphouët-Boigny International Airport",
    "city": "Abidjan",
    "country": "Ivory Coast",
    "type": "AIRPORT"
  },
  {
    "code": "KIN",
    "name": "Norman Manley International Airport",
    "city": "Kingston",
    "country": "Jamaica",
    "type": "AIRPORT"
  },
  {
    "code": "MBJ",
    "name": "Sangster International Airport",
    "city": "Montego Bay",
    "country": "Jamaica",
    "type": "AIRPORT"
  },
  {
    "code": "NGO",
    "name": "Chubu Centrair International Airport",
    "city": "Nagoya / Tokoname",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "FUK",
    "name": "Fukuoka Airport",
    "city": "Fukuoka",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "HIJ",
    "name": "Hiroshima Airport",
    "city": "Hiroshima / Mihara",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "KOJ",
    "name": "Kagoshima Airport",
    "city": "Kagoshima",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "KIX",
    "name": "Kansai International Airport",
    "city": "Osaka / Izumisano",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "KMJ",
    "name": "Kumamoto Airport",
    "city": "Kumamoto / Mashiki",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "NGS",
    "name": "Nagasaki Airport",
    "city": "Nagasaki / Omura",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "OKA",
    "name": "Naha Airport",
    "city": "Naha / Okinawa",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "NRT",
    "name": "Narita International Airport",
    "city": "Tokyo / Narita",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "CTS",
    "name": "New Chitose Airport",
    "city": "Sapporo / Chitose",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "KIJ",
    "name": "Niigata Airport",
    "city": "Niigata",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "ITM",
    "name": "Osaka International Airport (Itami)",
    "city": "Osaka / Itami",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "SDJ",
    "name": "Sendai Airport",
    "city": "Sendai / Natori",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "TAK",
    "name": "Takamatsu Airport",
    "city": "Takamatsu",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "HND",
    "name": "Tokyo Haneda Airport",
    "city": "Tokyo",
    "country": "Japan",
    "type": "AIRPORT"
  },
  {
    "code": "AQJ",
    "name": "King Hussein International Airport",
    "city": "Aqaba",
    "country": "Jordan",
    "type": "AIRPORT"
  },
  {
    "code": "AMM",
    "name": "Queen Alia International Airport",
    "city": "Amman",
    "country": "Jordan",
    "type": "AIRPORT"
  },
  {
    "code": "SCO",
    "name": "Aktau Airport",
    "city": "Aktau",
    "country": "Kazakhstan",
    "type": "AIRPORT"
  },
  {
    "code": "ALA",
    "name": "Almaty International Airport",
    "city": "Almaty",
    "country": "Kazakhstan",
    "type": "AIRPORT"
  },
  {
    "code": "GUW",
    "name": "Atyrau Airport",
    "city": "Atyrau",
    "country": "Kazakhstan",
    "type": "AIRPORT"
  },
  {
    "code": "NQZ",
    "name": "Nursultan Nazarbayev International Airport",
    "city": "Astana",
    "country": "Kazakhstan",
    "type": "AIRPORT"
  },
  {
    "code": "CIT",
    "name": "Shymkent International Airport",
    "city": "Shymkent",
    "country": "Kazakhstan",
    "type": "AIRPORT"
  },
  {
    "code": "NBO",
    "name": "Jomo Kenyatta International Airport",
    "city": "Nairobi",
    "country": "Kenya",
    "type": "AIRPORT"
  },
  {
    "code": "MBA",
    "name": "Moi International Airport",
    "city": "Mombasa",
    "country": "Kenya",
    "type": "AIRPORT"
  },
  {
    "code": "KWI",
    "name": "Kuwait International Airport",
    "city": "Kuwait City",
    "country": "Kuwait",
    "type": "AIRPORT"
  },
  {
    "code": "LPQ",
    "name": "Luang Prabang International Airport",
    "city": "Luang Prabang",
    "country": "Laos",
    "type": "AIRPORT"
  },
  {
    "code": "PKZ",
    "name": "Pakse International Airport",
    "city": "Pakse",
    "country": "Laos",
    "type": "AIRPORT"
  },
  {
    "code": "VTE",
    "name": "Wattay International Airport",
    "city": "Vientiane",
    "country": "Laos",
    "type": "AIRPORT"
  },
  {
    "code": "BEY",
    "name": "Beirut–Rafic Hariri International Airport",
    "city": "Beirut",
    "country": "Lebanon",
    "type": "AIRPORT"
  },
  {
    "code": "TIP",
    "name": "Mitiga International Airport",
    "city": "Tripoli",
    "country": "Libya",
    "type": "AIRPORT"
  },
  {
    "code": "MFM",
    "name": "Macau International Airport",
    "city": "Macau",
    "country": "Macau SAR",
    "type": "AIRPORT"
  },
  {
    "code": "TNR",
    "name": "Ivato International Airport",
    "city": "Antananarivo",
    "country": "Madagascar",
    "type": "AIRPORT"
  },
  {
    "code": "BKI",
    "name": "Kota Kinabalu International Airport",
    "city": "Kota Kinabalu",
    "country": "Malaysia",
    "type": "AIRPORT"
  },
  {
    "code": "KUL",
    "name": "Kuala Lumpur International Airport (KLIA)",
    "city": "Kuala Lumpur / Sepang",
    "country": "Malaysia",
    "type": "AIRPORT"
  },
  {
    "code": "KCH",
    "name": "Kuching International Airport",
    "city": "Kuching",
    "country": "Malaysia",
    "type": "AIRPORT"
  },
  {
    "code": "LGK",
    "name": "Langkawi International Airport",
    "city": "Langkawi",
    "country": "Malaysia",
    "type": "AIRPORT"
  },
  {
    "code": "MYY",
    "name": "Miri Airport",
    "city": "Miri",
    "country": "Malaysia",
    "type": "AIRPORT"
  },
  {
    "code": "PEN",
    "name": "Penang International Airport",
    "city": "George Town / Penang",
    "country": "Malaysia",
    "type": "AIRPORT"
  },
  {
    "code": "JHB",
    "name": "Senai International Airport",
    "city": "Johor Bahru",
    "country": "Malaysia",
    "type": "AIRPORT"
  },
  {
    "code": "SZB",
    "name": "Sultan Abdul Aziz Shah Airport (Subang)",
    "city": "Kuala Lumpur / Subang",
    "country": "Malaysia",
    "type": "AIRPORT"
  },
  {
    "code": "IPH",
    "name": "Sultan Azlan Shah Airport",
    "city": "Ipoh",
    "country": "Malaysia",
    "type": "AIRPORT"
  },
  {
    "code": "KBR",
    "name": "Sultan Ismail Petra Airport",
    "city": "Kota Bharu",
    "country": "Malaysia",
    "type": "AIRPORT"
  },
  {
    "code": "GAN",
    "name": "Gan International Airport",
    "city": "Addu City",
    "country": "Maldives",
    "type": "AIRPORT"
  },
  {
    "code": "MLE",
    "name": "Velana International Airport",
    "city": "Malé",
    "country": "Maldives",
    "type": "AIRPORT"
  },
  {
    "code": "BKO",
    "name": "Modibo Keita International Airport",
    "city": "Bamako",
    "country": "Mali",
    "type": "AIRPORT"
  },
  {
    "code": "MRU",
    "name": "Sir Seewoosagur Ramgoolam International Airport",
    "city": "Port Louis / Plaine Magnien",
    "country": "Mauritius",
    "type": "AIRPORT"
  },
  {
    "code": "BJX",
    "name": "Bajío International Airport",
    "city": "León / Silao",
    "country": "Mexico",
    "type": "AIRPORT"
  },
  {
    "code": "CUN",
    "name": "Cancún International Airport",
    "city": "Cancún",
    "country": "Mexico",
    "type": "AIRPORT"
  },
  {
    "code": "NLU",
    "name": "Felipe Ángeles International Airport",
    "city": "Mexico City / Zumpango",
    "country": "Mexico",
    "type": "AIRPORT"
  },
  {
    "code": "GDL",
    "name": "Guadalajara International Airport",
    "city": "Guadalajara",
    "country": "Mexico",
    "type": "AIRPORT"
  },
  {
    "code": "SJD",
    "name": "Los Cabos International Airport",
    "city": "San José del Cabo",
    "country": "Mexico",
    "type": "AIRPORT"
  },
  {
    "code": "MID",
    "name": "Mérida International Airport",
    "city": "Mérida",
    "country": "Mexico",
    "type": "AIRPORT"
  },
  {
    "code": "MEX",
    "name": "Mexico City International Airport (Benito Juárez)",
    "city": "Mexico City",
    "country": "Mexico",
    "type": "AIRPORT"
  },
  {
    "code": "MTY",
    "name": "Monterrey International Airport",
    "city": "Monterrey",
    "country": "Mexico",
    "type": "AIRPORT"
  },
  {
    "code": "PVR",
    "name": "Puerto Vallarta International Airport",
    "city": "Puerto Vallarta",
    "country": "Mexico",
    "type": "AIRPORT"
  },
  {
    "code": "TIJ",
    "name": "Tijuana International Airport",
    "city": "Tijuana",
    "country": "Mexico",
    "type": "AIRPORT"
  },
  {
    "code": "UBN",
    "name": "Chinggis Khaan International Airport",
    "city": "Ulaanbaatar",
    "country": "Mongolia",
    "type": "AIRPORT"
  },
  {
    "code": "AGA",
    "name": "Agadir–Al Massira Airport",
    "city": "Agadir",
    "country": "Morocco",
    "type": "AIRPORT"
  },
  {
    "code": "RAK",
    "name": "Marrakesh Menara Airport",
    "city": "Marrakesh",
    "country": "Morocco",
    "type": "AIRPORT"
  },
  {
    "code": "CMN",
    "name": "Mohammed V International Airport",
    "city": "Casablanca",
    "country": "Morocco",
    "type": "AIRPORT"
  },
  {
    "code": "TNG",
    "name": "Tangier Ibn Battouta Airport",
    "city": "Tangier",
    "country": "Morocco",
    "type": "AIRPORT"
  },
  {
    "code": "MPM",
    "name": "Maputo International Airport",
    "city": "Maputo",
    "country": "Mozambique",
    "type": "AIRPORT"
  },
  {
    "code": "MDL",
    "name": "Mandalay International Airport",
    "city": "Mandalay",
    "country": "Myanmar",
    "type": "AIRPORT"
  },
  {
    "code": "NYT",
    "name": "Naypyidaw International Airport",
    "city": "Naypyidaw",
    "country": "Myanmar",
    "type": "AIRPORT"
  },
  {
    "code": "RGN",
    "name": "Yangon International Airport",
    "city": "Yangon",
    "country": "Myanmar",
    "type": "AIRPORT"
  },
  {
    "code": "WDH",
    "name": "Hosea Kutako International Airport",
    "city": "Windhoek",
    "country": "Namibia",
    "type": "AIRPORT"
  },
  {
    "code": "BWA",
    "name": "Gautam Buddha International Airport",
    "city": "Bhairahawa",
    "country": "Nepal",
    "type": "AIRPORT"
  },
  {
    "code": "PKR",
    "name": "Pokhara International Airport",
    "city": "Pokhara",
    "country": "Nepal",
    "type": "AIRPORT"
  },
  {
    "code": "KTM",
    "name": "Tribhuvan International Airport",
    "city": "Kathmandu",
    "country": "Nepal",
    "type": "AIRPORT"
  },
  {
    "code": "AMS",
    "name": "Amsterdam Airport Schiphol",
    "city": "Amsterdam",
    "country": "Netherlands",
    "type": "AIRPORT"
  },
  {
    "code": "EIN",
    "name": "Eindhoven Airport",
    "city": "Eindhoven",
    "country": "Netherlands",
    "type": "AIRPORT"
  },
  {
    "code": "MST",
    "name": "Maastricht Aachen Airport",
    "city": "Maastricht",
    "country": "Netherlands",
    "type": "AIRPORT"
  },
  {
    "code": "RTM",
    "name": "Rotterdam The Hague Airport",
    "city": "Rotterdam / The Hague",
    "country": "Netherlands",
    "type": "AIRPORT"
  },
  {
    "code": "NOU",
    "name": "La Tontouta International Airport",
    "city": "Nouméa",
    "country": "New Caledonia",
    "type": "AIRPORT"
  },
  {
    "code": "AKL",
    "name": "Auckland Airport",
    "city": "Auckland",
    "country": "New Zealand",
    "type": "AIRPORT"
  },
  {
    "code": "CHC",
    "name": "Christchurch Airport",
    "city": "Christchurch",
    "country": "New Zealand",
    "type": "AIRPORT"
  },
  {
    "code": "ZQN",
    "name": "Queenstown Airport",
    "city": "Queenstown",
    "country": "New Zealand",
    "type": "AIRPORT"
  },
  {
    "code": "WLG",
    "name": "Wellington International Airport",
    "city": "Wellington",
    "country": "New Zealand",
    "type": "AIRPORT"
  },
  {
    "code": "MGA",
    "name": "Augusto C. Sandino International Airport",
    "city": "Managua",
    "country": "Nicaragua",
    "type": "AIRPORT"
  },
  {
    "code": "LOS",
    "name": "Murtala Muhammed International Airport",
    "city": "Lagos",
    "country": "Nigeria",
    "type": "AIRPORT"
  },
  {
    "code": "ABV",
    "name": "Nnamdi Azikiwe International Airport",
    "city": "Abuja",
    "country": "Nigeria",
    "type": "AIRPORT"
  },
  {
    "code": "FNJ",
    "name": "Pyongyang Sunan International Airport",
    "city": "Pyongyang",
    "country": "North Korea",
    "type": "AIRPORT"
  },
  {
    "code": "BGO",
    "name": "Bergen Airport, Flesland",
    "city": "Bergen",
    "country": "Norway",
    "type": "AIRPORT"
  },
  {
    "code": "OSL",
    "name": "Oslo Airport, Gardermoen",
    "city": "Oslo",
    "country": "Norway",
    "type": "AIRPORT"
  },
  {
    "code": "SVG",
    "name": "Stavanger Airport, Sola",
    "city": "Stavanger",
    "country": "Norway",
    "type": "AIRPORT"
  },
  {
    "code": "TOS",
    "name": "Tromsø Airport, Langnes",
    "city": "Tromsø",
    "country": "Norway",
    "type": "AIRPORT"
  },
  {
    "code": "TRD",
    "name": "Trondheim Airport, Værnes",
    "city": "Trondheim",
    "country": "Norway",
    "type": "AIRPORT"
  },
  {
    "code": "MCT",
    "name": "Muscat International Airport",
    "city": "Muscat",
    "country": "Oman",
    "type": "AIRPORT"
  },
  {
    "code": "SLL",
    "name": "Salalah Airport",
    "city": "Salalah",
    "country": "Oman",
    "type": "AIRPORT"
  },
  {
    "code": "OHS",
    "name": "Sohar Airport",
    "city": "Sohar",
    "country": "Oman",
    "type": "AIRPORT"
  },
  {
    "code": "LHE",
    "name": "Allama Iqbal International Airport",
    "city": "Lahore",
    "country": "Pakistan",
    "type": "AIRPORT"
  },
  {
    "code": "PEW",
    "name": "Bacha Khan International Airport",
    "city": "Peshawar",
    "country": "Pakistan",
    "type": "AIRPORT"
  },
  {
    "code": "GWD",
    "name": "Gwadar International Airport",
    "city": "Gwadar",
    "country": "Pakistan",
    "type": "AIRPORT"
  },
  {
    "code": "ISB",
    "name": "Islamabad International Airport",
    "city": "Islamabad",
    "country": "Pakistan",
    "type": "AIRPORT"
  },
  {
    "code": "KHI",
    "name": "Jinnah International Airport",
    "city": "Karachi",
    "country": "Pakistan",
    "type": "AIRPORT"
  },
  {
    "code": "MUX",
    "name": "Multan International Airport",
    "city": "Multan",
    "country": "Pakistan",
    "type": "AIRPORT"
  },
  {
    "code": "UET",
    "name": "Quetta International Airport",
    "city": "Quetta",
    "country": "Pakistan",
    "type": "AIRPORT"
  },
  {
    "code": "SKT",
    "name": "Sialkot International Airport",
    "city": "Sialkot",
    "country": "Pakistan",
    "type": "AIRPORT"
  },
  {
    "code": "PTY",
    "name": "Tocumen International Airport",
    "city": "Panama City",
    "country": "Panama",
    "type": "AIRPORT"
  },
  {
    "code": "POM",
    "name": "Jacksons International Airport",
    "city": "Port Moresby",
    "country": "Papua New Guinea",
    "type": "AIRPORT"
  },
  {
    "code": "ASU",
    "name": "Silvio Pettirossi International Airport",
    "city": "Asunción",
    "country": "Paraguay",
    "type": "AIRPORT"
  },
  {
    "code": "CUZ",
    "name": "Alejandro Velasco Astete International Airport",
    "city": "Cusco",
    "country": "Peru",
    "type": "AIRPORT"
  },
  {
    "code": "TRU",
    "name": "Capitán FAP Carlos Martínez de Pinillos International Airport",
    "city": "Trujillo",
    "country": "Peru",
    "type": "AIRPORT"
  },
  {
    "code": "IQT",
    "name": "Coronel FAP Francisco Secada Vignetta International Airport",
    "city": "Iquitos",
    "country": "Peru",
    "type": "AIRPORT"
  },
  {
    "code": "LIM",
    "name": "Jorge Chávez International Airport",
    "city": "Lima / Callao",
    "country": "Peru",
    "type": "AIRPORT"
  },
  {
    "code": "AQP",
    "name": "Rodríguez Ballón International Airport",
    "city": "Arequipa",
    "country": "Peru",
    "type": "AIRPORT"
  },
  {
    "code": "BCD",
    "name": "Bacolod–Silay Airport",
    "city": "Bacolod / Silay",
    "country": "Philippines",
    "type": "AIRPORT"
  },
  {
    "code": "CRK",
    "name": "Clark International Airport",
    "city": "Angeles / Mabalacat",
    "country": "Philippines",
    "type": "AIRPORT"
  },
  {
    "code": "DVO",
    "name": "Francisco Bangoy International Airport",
    "city": "Davao City",
    "country": "Philippines",
    "type": "AIRPORT"
  },
  {
    "code": "GES",
    "name": "General Santos International Airport",
    "city": "General Santos",
    "country": "Philippines",
    "type": "AIRPORT"
  },
  {
    "code": "MPH",
    "name": "Godofredo P. Ramos Airport (Caticlan)",
    "city": "Malay / Boracay",
    "country": "Philippines",
    "type": "AIRPORT"
  },
  {
    "code": "ILO",
    "name": "Iloilo International Airport",
    "city": "Iloilo City",
    "country": "Philippines",
    "type": "AIRPORT"
  },
  {
    "code": "KLO",
    "name": "Kalibo International Airport",
    "city": "Kalibo / Boracay",
    "country": "Philippines",
    "type": "AIRPORT"
  },
  {
    "code": "CEB",
    "name": "Mactan–Cebu International Airport",
    "city": "Cebu / Lapu-Lapu",
    "country": "Philippines",
    "type": "AIRPORT"
  },
  {
    "code": "MNL",
    "name": "Ninoy Aquino International Airport",
    "city": "Manila / Pasay",
    "country": "Philippines",
    "type": "AIRPORT"
  },
  {
    "code": "PPS",
    "name": "Puerto Princesa International Airport",
    "city": "Puerto Princesa",
    "country": "Philippines",
    "type": "AIRPORT"
  },
  {
    "code": "GDN",
    "name": "Gda ń sk Lech Wa łę sa Airport Gda ń",
    "city": "sk",
    "country": "Poland",
    "type": "AIRPORT"
  },
  {
    "code": "KTW",
    "name": "Katowice Airport",
    "city": "Katowice",
    "country": "Poland",
    "type": "AIRPORT"
  },
  {
    "code": "KRK",
    "name": "Kraków John Paul II International Airport",
    "city": "Kraków",
    "country": "Poland",
    "type": "AIRPORT"
  },
  {
    "code": "POZ",
    "name": "Pozna ń – Ł awica Airport Pozna",
    "city": "ń",
    "country": "Poland",
    "type": "AIRPORT"
  },
  {
    "code": "WAW",
    "name": "Warsaw Chopin Airport",
    "city": "Warsaw",
    "country": "Poland",
    "type": "AIRPORT"
  },
  {
    "code": "WRO",
    "name": "Wroc ł aw Airport Wroc ł",
    "city": "aw",
    "country": "Poland",
    "type": "AIRPORT"
  },
  {
    "code": "FNC",
    "name": "Cristiano Ronaldo Madeira International Airport",
    "city": "Funchal / Madeira",
    "country": "Portugal",
    "type": "AIRPORT"
  },
  {
    "code": "FAO",
    "name": "Faro Airport",
    "city": "Faro / Algarve",
    "country": "Portugal",
    "type": "AIRPORT"
  },
  {
    "code": "OPO",
    "name": "Francisco Sá Carneiro Airport (Porto)",
    "city": "Porto",
    "country": "Portugal",
    "type": "AIRPORT"
  },
  {
    "code": "LIS",
    "name": "Humberto Delgado Airport (Lisbon)",
    "city": "Lisbon",
    "country": "Portugal",
    "type": "AIRPORT"
  },
  {
    "code": "PDL",
    "name": "João Paulo II Airport",
    "city": "Ponta Delgada / Azores",
    "country": "Portugal",
    "type": "AIRPORT"
  },
  {
    "code": "SJU",
    "name": "Luis Muñoz Marín International Airport",
    "city": "San Juan",
    "country": "Puerto Rico",
    "type": "AIRPORT"
  },
  {
    "code": "DIA",
    "name": "Doha International Airport",
    "city": "Doha",
    "country": "Qatar",
    "type": "AIRPORT"
  },
  {
    "code": "DOH",
    "name": "Hamad International Airport",
    "city": "Doha",
    "country": "Qatar",
    "type": "AIRPORT"
  },
  {
    "code": "OTP",
    "name": "Henri Coand ă International Airport",
    "city": "Bucharest",
    "country": "Romania",
    "type": "AIRPORT"
  },
  {
    "code": "DME",
    "name": "Domodedovo International Airport",
    "city": "Moscow",
    "country": "Russia",
    "type": "AIRPORT"
  },
  {
    "code": "SVX",
    "name": "Koltsovo Airport",
    "city": "Yekaterinburg",
    "country": "Russia",
    "type": "AIRPORT"
  },
  {
    "code": "LED",
    "name": "Pulkovo Airport",
    "city": "Saint Petersburg",
    "country": "Russia",
    "type": "AIRPORT"
  },
  {
    "code": "SVO",
    "name": "Sheremetyevo International Airport",
    "city": "Moscow",
    "country": "Russia",
    "type": "AIRPORT"
  },
  {
    "code": "OVB",
    "name": "Tolmachevo Airport",
    "city": "Novosibirsk",
    "country": "Russia",
    "type": "AIRPORT"
  },
  {
    "code": "VKO",
    "name": "Vnukovo International Airport",
    "city": "Moscow",
    "country": "Russia",
    "type": "AIRPORT"
  },
  {
    "code": "KGL",
    "name": "Kigali International Airport",
    "city": "Kigali",
    "country": "Rwanda",
    "type": "AIRPORT"
  },
  {
    "code": "APW",
    "name": "Faleolo International Airport",
    "city": "Apia",
    "country": "Samoa",
    "type": "AIRPORT"
  },
  {
    "code": "AHB",
    "name": "Abha International Airport",
    "city": "Abha",
    "country": "Saudi Arabia",
    "type": "AIRPORT"
  },
  {
    "code": "GIZ",
    "name": "Jazan Regional Airport",
    "city": "Jizan",
    "country": "Saudi Arabia",
    "type": "AIRPORT"
  },
  {
    "code": "JED",
    "name": "King Abdulaziz International Airport",
    "city": "Jeddah",
    "country": "Saudi Arabia",
    "type": "AIRPORT"
  },
  {
    "code": "DMM",
    "name": "King Fahd International Airport",
    "city": "Dammam",
    "country": "Saudi Arabia",
    "type": "AIRPORT"
  },
  {
    "code": "RUH",
    "name": "King Khalid International Airport",
    "city": "Riyadh",
    "country": "Saudi Arabia",
    "type": "AIRPORT"
  },
  {
    "code": "MED",
    "name": "Prince Mohammad bin Abdulaziz International Airport",
    "city": "Medina",
    "country": "Saudi Arabia",
    "type": "AIRPORT"
  },
  {
    "code": "TUU",
    "name": "Tabuk Regional Airport",
    "city": "Tabuk",
    "country": "Saudi Arabia",
    "type": "AIRPORT"
  },
  {
    "code": "DSS",
    "name": "Blaise Diagne International Airport",
    "city": "Dakar",
    "country": "Senegal",
    "type": "AIRPORT"
  },
  {
    "code": "DKR",
    "name": "Léopold Sédar Senghor International Airport",
    "city": "Dakar",
    "country": "Senegal",
    "type": "AIRPORT"
  },
  {
    "code": "BEG",
    "name": "Belgrade Nikola Tesla Airport",
    "city": "Belgrade",
    "country": "Serbia",
    "type": "AIRPORT"
  },
  {
    "code": "SEZ",
    "name": "Seychelles International Airport",
    "city": "Victoria / Mahé",
    "country": "Seychelles",
    "type": "AIRPORT"
  },
  {
    "code": "XSP",
    "name": "Seletar Airport",
    "city": "Singapore",
    "country": "Singapore",
    "type": "AIRPORT"
  },
  {
    "code": "SIN",
    "name": "Singapore Changi Airport",
    "city": "Singapore",
    "country": "Singapore",
    "type": "AIRPORT"
  },
  {
    "code": "BTS",
    "name": "M. R. Š tefánik Airport",
    "city": "Bratislava",
    "country": "Slovakia",
    "type": "AIRPORT"
  },
  {
    "code": "CPT",
    "name": "Cape Town International Airport",
    "city": "Cape Town",
    "country": "South Africa",
    "type": "AIRPORT"
  },
  {
    "code": "PLZ",
    "name": "Chief Dawid Stuurman International Airport",
    "city": "Gqeberha / Port Elizabeth",
    "country": "South Africa",
    "type": "AIRPORT"
  },
  {
    "code": "DUR",
    "name": "King Shaka International Airport",
    "city": "Durban",
    "country": "South Africa",
    "type": "AIRPORT"
  },
  {
    "code": "JNB",
    "name": "O. R. Tambo International Airport",
    "city": "Johannesburg",
    "country": "South Africa",
    "type": "AIRPORT"
  },
  {
    "code": "CJJ",
    "name": "Cheongju International Airport",
    "city": "Cheongju",
    "country": "South Korea",
    "type": "AIRPORT"
  },
  {
    "code": "TAE",
    "name": "Daegu International Airport",
    "city": "Daegu",
    "country": "South Korea",
    "type": "AIRPORT"
  },
  {
    "code": "PUS",
    "name": "Gimhae International Airport",
    "city": "Busan",
    "country": "South Korea",
    "type": "AIRPORT"
  },
  {
    "code": "GMP",
    "name": "Gimpo International Airport",
    "city": "Seoul",
    "country": "South Korea",
    "type": "AIRPORT"
  },
  {
    "code": "ICN",
    "name": "Incheon International Airport",
    "city": "Seoul / Incheon",
    "country": "South Korea",
    "type": "AIRPORT"
  },
  {
    "code": "CJU",
    "name": "Jeju International Airport",
    "city": "Jeju",
    "country": "South Korea",
    "type": "AIRPORT"
  },
  {
    "code": "MWX",
    "name": "Muan International Airport",
    "city": "Muan / Gwangju",
    "country": "South Korea",
    "type": "AIRPORT"
  },
  {
    "code": "YNY",
    "name": "Yangyang International Airport",
    "city": "Yangyang",
    "country": "South Korea",
    "type": "AIRPORT"
  },
  {
    "code": "MAD",
    "name": "Adolfo Suárez Madrid–Barajas Airport",
    "city": "Madrid",
    "country": "Spain",
    "type": "AIRPORT"
  },
  {
    "code": "ALC",
    "name": "Alicante–Elche Miguel Hernández Airport",
    "city": "Alicante",
    "country": "Spain",
    "type": "AIRPORT"
  },
  {
    "code": "BIO",
    "name": "Bilbao Airport",
    "city": "Bilbao",
    "country": "Spain",
    "type": "AIRPORT"
  },
  {
    "code": "LPA",
    "name": "Gran Canaria Airport",
    "city": "Las Palmas / Canary Islands",
    "country": "Spain",
    "type": "AIRPORT"
  },
  {
    "code": "IBZ",
    "name": "Ibiza Airport",
    "city": "Ibiza",
    "country": "Spain",
    "type": "AIRPORT"
  },
  {
    "code": "BCN",
    "name": "Josep Tarradellas Barcelona–El Prat Airport",
    "city": "Barcelona",
    "country": "Spain",
    "type": "AIRPORT"
  },
  {
    "code": "AGP",
    "name": "Málaga–Costa del Sol Airport",
    "city": "Málaga",
    "country": "Spain",
    "type": "AIRPORT"
  },
  {
    "code": "PMI",
    "name": "Palma de Mallorca Airport",
    "city": "Palma de Mallorca",
    "country": "Spain",
    "type": "AIRPORT"
  },
  {
    "code": "SCQ",
    "name": "Santiago–Rosalía de Castro Airport",
    "city": "Santiago de Compostela",
    "country": "Spain",
    "type": "AIRPORT"
  },
  {
    "code": "SVQ",
    "name": "Seville Airport",
    "city": "Seville",
    "country": "Spain",
    "type": "AIRPORT"
  },
  {
    "code": "TFN",
    "name": "Tenerife North–Ciudad de La Laguna Airport",
    "city": "Tenerife / Canary Islands",
    "country": "Spain",
    "type": "AIRPORT"
  },
  {
    "code": "TFS",
    "name": "Tenerife South Airport",
    "city": "Tenerife / Canary Islands",
    "country": "Spain",
    "type": "AIRPORT"
  },
  {
    "code": "VLC",
    "name": "Valencia Airport",
    "city": "Valencia",
    "country": "Spain",
    "type": "AIRPORT"
  },
  {
    "code": "CMB",
    "name": "Bandaranaike International Airport",
    "city": "Colombo / Katunayake",
    "country": "Sri Lanka",
    "type": "AIRPORT"
  },
  {
    "code": "HRI",
    "name": "Mattala Rajapaksa International Airport",
    "city": "Hambantota",
    "country": "Sri Lanka",
    "type": "AIRPORT"
  },
  {
    "code": "RML",
    "name": "Ratmalana Airport",
    "city": "Colombo",
    "country": "Sri Lanka",
    "type": "AIRPORT"
  },
  {
    "code": "PBM",
    "name": "Johan Adolf Pengel International Airport",
    "city": "Paramaribo",
    "country": "Suriname",
    "type": "AIRPORT"
  },
  {
    "code": "GOT",
    "name": "Göteborg Landvetter Airport",
    "city": "Gothenburg",
    "country": "Sweden",
    "type": "AIRPORT"
  },
  {
    "code": "MMX",
    "name": "Malmö Airport",
    "city": "Malmö",
    "country": "Sweden",
    "type": "AIRPORT"
  },
  {
    "code": "ARN",
    "name": "Stockholm Arlanda Airport",
    "city": "Stockholm",
    "country": "Sweden",
    "type": "AIRPORT"
  },
  {
    "code": "BMA",
    "name": "Stockholm Bromma Airport",
    "city": "Stockholm",
    "country": "Sweden",
    "type": "AIRPORT"
  },
  {
    "code": "BSL",
    "name": "EuroAirport Basel Mulhouse Freiburg",
    "city": "Basel",
    "country": "Switzerland",
    "type": "AIRPORT"
  },
  {
    "code": "GVA",
    "name": "Geneva Airport",
    "city": "Geneva",
    "country": "Switzerland",
    "type": "AIRPORT"
  },
  {
    "code": "ZRH",
    "name": "Zurich Airport",
    "city": "Zurich",
    "country": "Switzerland",
    "type": "AIRPORT"
  },
  {
    "code": "KHH",
    "name": "Kaohsiung International Airport",
    "city": "Kaohsiung",
    "country": "Taiwan",
    "type": "AIRPORT"
  },
  {
    "code": "RMQ",
    "name": "Taichung International Airport",
    "city": "Taichung",
    "country": "Taiwan",
    "type": "AIRPORT"
  },
  {
    "code": "TSA",
    "name": "Taipei Songshan Airport",
    "city": "Taipei",
    "country": "Taiwan",
    "type": "AIRPORT"
  },
  {
    "code": "TPE",
    "name": "Taiwan Taoyuan International Airport",
    "city": "Taipei / Taoyuan",
    "country": "Taiwan",
    "type": "AIRPORT"
  },
  {
    "code": "ZNZ",
    "name": "Abeid Amani Karume International Airport",
    "city": "Zanzibar",
    "country": "Tanzania",
    "type": "AIRPORT"
  },
  {
    "code": "DAR",
    "name": "Julius Nyerere International Airport",
    "city": "Dar es Salaam",
    "country": "Tanzania",
    "type": "AIRPORT"
  },
  {
    "code": "JRO",
    "name": "Kilimanjaro International Airport",
    "city": "Kilimanjaro / Arusha",
    "country": "Tanzania",
    "type": "AIRPORT"
  },
  {
    "code": "CNX",
    "name": "Chiang Mai International Airport",
    "city": "Chiang Mai",
    "country": "Thailand",
    "type": "AIRPORT"
  },
  {
    "code": "DMK",
    "name": "Don Mueang International Airport",
    "city": "Bangkok",
    "country": "Thailand",
    "type": "AIRPORT"
  },
  {
    "code": "HDY",
    "name": "Hat Yai International Airport",
    "city": "Hat Yai",
    "country": "Thailand",
    "type": "AIRPORT"
  },
  {
    "code": "KBV",
    "name": "Krabi International Airport",
    "city": "Krabi",
    "country": "Thailand",
    "type": "AIRPORT"
  },
  {
    "code": "CEI",
    "name": "Mae Fah Luang - Chiang Rai International Airport",
    "city": "Chiang Rai",
    "country": "Thailand",
    "type": "AIRPORT"
  },
  {
    "code": "HKT",
    "name": "Phuket International Airport",
    "city": "Phuket",
    "country": "Thailand",
    "type": "AIRPORT"
  },
  {
    "code": "USM",
    "name": "Samui Airport",
    "city": "Koh Samui",
    "country": "Thailand",
    "type": "AIRPORT"
  },
  {
    "code": "BKK",
    "name": "Suvarnabhumi Airport",
    "city": "Bangkok",
    "country": "Thailand",
    "type": "AIRPORT"
  },
  {
    "code": "UTP",
    "name": "U-Tapao International Airport",
    "city": "Rayong / Pattaya",
    "country": "Thailand",
    "type": "AIRPORT"
  },
  {
    "code": "UBP",
    "name": "Ubon Ratchathani Airport",
    "city": "Ubon Ratchathani",
    "country": "Thailand",
    "type": "AIRPORT"
  },
  {
    "code": "DIL",
    "name": "Presidente Nicolau Lobato International Airport",
    "city": "Dili",
    "country": "Timor-Leste",
    "type": "AIRPORT"
  },
  {
    "code": "LFW",
    "name": "Lomé–Tokoin International Airport",
    "city": "Lomé",
    "country": "Togo",
    "type": "AIRPORT"
  },
  {
    "code": "TBU",
    "name": "Fua ʻ amotu International Airport Nuku ʻ",
    "city": "alofa",
    "country": "Tonga",
    "type": "AIRPORT"
  },
  {
    "code": "POS",
    "name": "Piarco International Airport",
    "city": "Spain",
    "country": "Trinidad and Tobago",
    "type": "AIRPORT"
  },
  {
    "code": "DJE",
    "name": "Djerba–Zarzis International Airport",
    "city": "Djerba",
    "country": "Tunisia",
    "type": "AIRPORT"
  },
  {
    "code": "TUN",
    "name": "Tunis–Carthage International Airport",
    "city": "Tunis",
    "country": "Tunisia",
    "type": "AIRPORT"
  },
  {
    "code": "ADA",
    "name": "Adana Ş akirpa ş a Airport",
    "city": "Adana",
    "country": "Turkey",
    "type": "AIRPORT"
  },
  {
    "code": "ESB",
    "name": "Ankara Esenbo ğ a Airport",
    "city": "Ankara",
    "country": "Turkey",
    "type": "AIRPORT"
  },
  {
    "code": "AYT",
    "name": "Antalya Airport",
    "city": "Antalya",
    "country": "Turkey",
    "type": "AIRPORT"
  },
  {
    "code": "DLM",
    "name": "Dalaman Airport Mu ğ",
    "city": "la / Dalaman",
    "country": "Turkey",
    "type": "AIRPORT"
  },
  {
    "code": "GZT",
    "name": "Gaziantep Airport",
    "city": "Gaziantep",
    "country": "Turkey",
    "type": "AIRPORT"
  },
  {
    "code": "ADB",
    "name": "İ zmir Adnan Menderes Airport",
    "city": "Izmir",
    "country": "Turkey",
    "type": "AIRPORT"
  },
  {
    "code": "IST",
    "name": "Istanbul Airport",
    "city": "Istanbul",
    "country": "Turkey",
    "type": "AIRPORT"
  },
  {
    "code": "SAW",
    "name": "Istanbul Sabiha Gökçen International Airport",
    "city": "Istanbul",
    "country": "Turkey",
    "type": "AIRPORT"
  },
  {
    "code": "BJV",
    "name": "Milas–Bodrum Airport",
    "city": "Bodrum / Milas",
    "country": "Turkey",
    "type": "AIRPORT"
  },
  {
    "code": "TZX",
    "name": "Trabzon Airport",
    "city": "Trabzon",
    "country": "Turkey",
    "type": "AIRPORT"
  },
  {
    "code": "EBB",
    "name": "Entebbe International Airport",
    "city": "Kampala / Entebbe",
    "country": "Uganda",
    "type": "AIRPORT"
  },
  {
    "code": "KBP",
    "name": "Boryspil International Airport",
    "city": "Kyiv",
    "country": "Ukraine",
    "type": "AIRPORT"
  },
  {
    "code": "IEV",
    "name": "Igor Sikorsky Kyiv International Airport (Zhuliany)",
    "city": "Kyiv",
    "country": "Ukraine",
    "type": "AIRPORT"
  },
  {
    "code": "DWC",
    "name": "Al Maktoum International Airport (Dubai World Central)",
    "city": "Dubai",
    "country": "United Arab Emirates",
    "type": "AIRPORT"
  },
  {
    "code": "DXB",
    "name": "Dubai International Airport",
    "city": "Dubai",
    "country": "United Arab Emirates",
    "type": "AIRPORT"
  },
  {
    "code": "RKT",
    "name": "Ras Al Khaimah International Airport",
    "city": "Ras Al Khaimah",
    "country": "United Arab Emirates",
    "type": "AIRPORT"
  },
  {
    "code": "SHJ",
    "name": "Sharjah International Airport",
    "city": "Sharjah",
    "country": "United Arab Emirates",
    "type": "AIRPORT"
  },
  {
    "code": "AUH",
    "name": "Zayed International Airport (Abu Dhabi)",
    "city": "Abu Dhabi",
    "country": "United Arab Emirates",
    "type": "AIRPORT"
  },
  {
    "code": "ABZ",
    "name": "Aberdeen Airport",
    "city": "Aberdeen",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "BFS",
    "name": "Belfast International Airport",
    "city": "Belfast",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "BHX",
    "name": "Birmingham Airport",
    "city": "Birmingham",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "BRS",
    "name": "Bristol Airport",
    "city": "Bristol",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "EDI",
    "name": "Edinburgh Airport",
    "city": "Edinburgh",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "LGW",
    "name": "Gatwick Airport",
    "city": "London",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "GLA",
    "name": "Glasgow Airport",
    "city": "Glasgow",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "LHR",
    "name": "Heathrow Airport",
    "city": "London",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "LPL",
    "name": "Liverpool John Lennon Airport",
    "city": "Liverpool",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "LCY",
    "name": "London City Airport",
    "city": "London",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "LTN",
    "name": "London Luton Airport",
    "city": "London",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "STN",
    "name": "London Stansted Airport",
    "city": "London",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "MAN",
    "name": "Manchester Airport",
    "city": "Manchester",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "NCL",
    "name": "Newcastle International Airport",
    "city": "Newcastle",
    "country": "United Kingdom",
    "type": "AIRPORT"
  },
  {
    "code": "AUS",
    "name": "Austin–Bergstrom International Airport",
    "city": "Austin, TX",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "BWI",
    "name": "Baltimore/Washington International Thurgood Marshall Airport",
    "city": "Baltimore / Washington, MD/DC",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "CLT",
    "name": "Charlotte Douglas International Airport",
    "city": "Charlotte, NC",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "DFW",
    "name": "Dallas/Fort Worth International Airport",
    "city": "Dallas / Fort Worth, TX",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "HNL",
    "name": "Daniel K. Inouye International Airport",
    "city": "Honolulu, HI",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "DEN",
    "name": "Denver International Airport",
    "city": "Denver, CO",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "DTW",
    "name": "Detroit Metropolitan Wayne County Airport",
    "city": "Detroit, MI",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "FLL",
    "name": "Fort Lauderdale–Hollywood International Airport",
    "city": "Fort Lauderdale, FL",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "IAH",
    "name": "George Bush Intercontinental Airport",
    "city": "Houston, TX",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "LAS",
    "name": "Harry Reid International Airport",
    "city": "Las Vegas, NV",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "ATL",
    "name": "Hartsfield–Jackson Atlanta International Airport",
    "city": "Atlanta, GA",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "IND",
    "name": "Indianapolis International Airport",
    "city": "Indianapolis, IN",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "JFK",
    "name": "John F. Kennedy International Airport",
    "city": "New York, NY",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "LGA",
    "name": "LaGuardia Airport",
    "city": "New York, NY",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "BOS",
    "name": "Logan International Airport",
    "city": "Boston, MA",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "LAX",
    "name": "Los Angeles International Airport",
    "city": "Los Angeles, CA",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "MSY",
    "name": "Louis Armstrong New Orleans International Airport",
    "city": "New Orleans, LA",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "SDF",
    "name": "Louisville Muhammad Ali International Airport (Cargo Hub)",
    "city": "Louisville, KY",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "MEM",
    "name": "Memphis International Airport (Cargo Hub)",
    "city": "Memphis, TN",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "MIA",
    "name": "Miami International Airport",
    "city": "Miami, FL",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "MSP",
    "name": "Minneapolis–Saint Paul International Airport",
    "city": "Minneapolis / St. Paul, MN",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "BNA",
    "name": "Nashville International Airport",
    "city": "Nashville, TN",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "EWR",
    "name": "Newark Liberty International Airport",
    "city": "Newark / New York, NJ/NY",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "ORD",
    "name": "O'Hare International Airport",
    "city": "Chicago, IL",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "OAK",
    "name": "Oakland International Airport",
    "city": "Oakland / San Francisco Bay, CA",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "MCO",
    "name": "Orlando International Airport",
    "city": "Orlando, FL",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "PHL",
    "name": "Philadelphia International Airport",
    "city": "Philadelphia, PA",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "PHX",
    "name": "Phoenix Sky Harbor International Airport",
    "city": "Phoenix, AZ",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "PDX",
    "name": "Portland International Airport",
    "city": "Portland, OR",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "RDU",
    "name": "Raleigh–Durham International Airport",
    "city": "Raleigh / Durham, NC",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "DCA",
    "name": "Ronald Reagan Washington National Airport",
    "city": "Washington, D.C. / Arlington, VA",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "SMF",
    "name": "Sacramento International Airport",
    "city": "Sacramento, CA",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "SLC",
    "name": "Salt Lake City International Airport",
    "city": "Salt Lake City, UT",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "SAN",
    "name": "San Diego International Airport",
    "city": "San Diego, CA",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "SFO",
    "name": "San Francisco International Airport",
    "city": "San Francisco, CA",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "SJC",
    "name": "San Jose Mineta International Airport",
    "city": "San Jose / Silicon Valley, CA",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "SEA",
    "name": "Seattle–Tacoma International Airport",
    "city": "Seattle, WA",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "TPA",
    "name": "Tampa International Airport",
    "city": "Tampa, FL",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "ANC",
    "name": "Ted Stevens Anchorage International Airport",
    "city": "Anchorage, AK",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "IAD",
    "name": "Washington Dulles International Airport",
    "city": "Washington, D.C. / Dulles, VA",
    "country": "United States",
    "type": "AIRPORT"
  },
  {
    "code": "MVD",
    "name": "Carrasco / General Cesáreo L. Berisso International Airport",
    "city": "Montevideo",
    "country": "Uruguay",
    "type": "AIRPORT"
  },
  {
    "code": "BHK",
    "name": "Bukhara International Airport",
    "city": "Bukhara",
    "country": "Uzbekistan",
    "type": "AIRPORT"
  },
  {
    "code": "TAS",
    "name": "Islam Karimov Tashkent International Airport",
    "city": "Tashkent",
    "country": "Uzbekistan",
    "type": "AIRPORT"
  },
  {
    "code": "SKD",
    "name": "Samarkand International Airport",
    "city": "Samarkand",
    "country": "Uzbekistan",
    "type": "AIRPORT"
  },
  {
    "code": "UGC",
    "name": "Urgench International Airport",
    "city": "Urgench",
    "country": "Uzbekistan",
    "type": "AIRPORT"
  },
  {
    "code": "CCS",
    "name": "Simón Bolívar International Airport (Maiquetía)",
    "city": "Caracas",
    "country": "Venezuela",
    "type": "AIRPORT"
  },
  {
    "code": "CXR",
    "name": "Cam Ranh International Airport",
    "city": "Nha Trang",
    "country": "Vietnam",
    "type": "AIRPORT"
  },
  {
    "code": "VCA",
    "name": "Can Tho International Airport",
    "city": "Can Tho",
    "country": "Vietnam",
    "type": "AIRPORT"
  },
  {
    "code": "HPH",
    "name": "Cat Bi International Airport",
    "city": "Hai Phong",
    "country": "Vietnam",
    "type": "AIRPORT"
  },
  {
    "code": "DAD",
    "name": "Da Nang International Airport",
    "city": "Da Nang",
    "country": "Vietnam",
    "type": "AIRPORT"
  },
  {
    "code": "HAN",
    "name": "Noi Bai International Airport",
    "city": "Hanoi",
    "country": "Vietnam",
    "type": "AIRPORT"
  },
  {
    "code": "HUI",
    "name": "Phu Bai International Airport",
    "city": "Hue",
    "country": "Vietnam",
    "type": "AIRPORT"
  },
  {
    "code": "PQC",
    "name": "Phu Quoc International Airport",
    "city": "Phu Quoc",
    "country": "Vietnam",
    "type": "AIRPORT"
  },
  {
    "code": "SGN",
    "name": "Tan Son Nhat International Airport",
    "city": "Ho Chi Minh City",
    "country": "Vietnam",
    "type": "AIRPORT"
  },
  {
    "code": "LUN",
    "name": "Kenneth Kaunda International Airport",
    "city": "Lusaka",
    "country": "Zambia",
    "type": "AIRPORT"
  },
  {
    "code": "HRE",
    "name": "Robert Gabriel Mugabe International Airport",
    "city": "Harare",
    "country": "Zimbabwe",
    "type": "AIRPORT"
  },
  {
    "code": "VFA",
    "name": "Victoria Falls Airport",
    "city": "Victoria Falls",
    "country": "Zimbabwe",
    "type": "AIRPORT"
  }
] as const;
export const formatTransportLocation = (location: TransportLocation) => {
  const place = location.city && location.city !== location.name
    ? `${location.name}, ${location.city}`
    : location.name;
  return `${place} (${location.code}) — ${location.country}`;
};