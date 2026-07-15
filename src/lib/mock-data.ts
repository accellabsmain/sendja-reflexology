export const TREATMENTS = [
  // SIGNATURE MASSAGE
  { id: "SM-01", name: "Sendja Massage", description: "Pijatan badan full dari kepala hingga kaki khas Sendja untuk meregangkan otot-otot, memperlancar peredaran darah, melepas stress dan memberikan relaksasi.", durationMinutes: 90, priceIdr: 235000, category: "SIGNATURE MASSAGE" },
  { id: "SM-02", name: "Aroma Sendja Massage", description: "Sendja Massage yang digabungkan dengan sensori aroma essential oil pilihan. Untuk relaksasi penuh.", durationMinutes: 90, priceIdr: 265000, category: "SIGNATURE MASSAGE" },
  { id: "SM-03", name: "Sendja Massage + Boreh", description: "Sendja Massage disertai penggunaan boreh yang memberi kehangatan pada tubuh, melepas racun, dan meningkatkan kondisi tubuh.", durationMinutes: 90, priceIdr: 270000, category: "SIGNATURE MASSAGE" },
  { id: "SM-04", name: "Sendja Massage + Lulur", description: "Sendja Massage disertai lulur untuk mengangkat sel-sel kulit mati, mencerahkan dan meremajakan kulit.", durationMinutes: 90, priceIdr: 265000, category: "SIGNATURE MASSAGE" },
  { id: "SM-05", name: "Sendja Massage + Batu Panas", description: "Sendja Massage dengan batu panas, melancarkan peredaran darah dan menenangkan otot tegang.", durationMinutes: 90, priceIdr: 265000, category: "SIGNATURE MASSAGE" },
  { id: "SM-06", name: "Sendja Massage + Kerok", description: "Sendja Massage disertai kerok untuk membantu mengeluarkan angin dari tubuh, memulihkan kondisi.", durationMinutes: 90, priceIdr: 265000, category: "SIGNATURE MASSAGE" },

  // REFLEXOLOGY
  { id: "RF-01", name: "Sendja Reflexology", description: "Pijatan refleksi khas Sendja dengan penekanan pada titik-titik acupressure, memberikan relaksasi dan melepas lelah.", durationMinutes: 60, priceIdr: 110000, category: "REFLEXOLOGY" },
  { id: "RF-02", name: "Sendja Reflexology + Back Therapy", description: "Pijatan refleksi khas Sendja disertai dengan pijatan pada area punggung dan pinggang untuk melepas ketegangan.", durationMinutes: 90, priceIdr: 155000, category: "REFLEXOLOGY" },
  { id: "RF-03", name: "Sendja Back Release", description: "Pijatan pada area punggung dan pinggang untuk membantu melepaskan tensi dan ketegangan pada otot.", durationMinutes: 45, priceIdr: 110000, category: "REFLEXOLOGY" },
  
  // SIGNATURE TREATMENT
  { id: "ST-01", name: "Teduh Pelita", description: "Paket pijat relaksasi ala Sendja untuk melepas stress. (Sendja Massage + Reflexology + Totok)", durationMinutes: 120, priceIdr: 345000, category: "SIGNATURE TREATMENT" },
  { id: "ST-02", name: "Kala Dimanja", description: "Paket pijat relaksasi ala Sendja yang memanjakan tubuh. (Sendja Massage + Totok + Lulur)", durationMinutes: 120, priceIdr: 355000, category: "SIGNATURE TREATMENT" },
  { id: "ST-03", name: "Pulih Raga", description: "Paket pijat relaksasi ala Sendja yang menghangatkan tubuh. (Sendja Massage + Reflexology + Boreh)", durationMinutes: 120, priceIdr: 365000, category: "SIGNATURE TREATMENT" },
  { id: "ST-04", name: "Sendja Prenatal Massage", description: "Pijat relaksasi ala Sendja yang dikhususkan pada titik-titik aman bagi ibu hamil oleh terapis terlatih.", durationMinutes: 60, priceIdr: 195000, category: "SIGNATURE TREATMENT" },

  // SIGNATURE SPA PACKAGE
  { id: "SP-01", name: "Kala Sendja", description: "Kombinasi Aroma Sendja Massage dilengkapi dengan mandi rendam.", durationMinutes: 120, priceIdr: 385000, category: "SIGNATURE SPA PACKAGE" },
  { id: "SP-02", name: "Paras Jelita", description: "Kombinasi Aroma Sendja Massage dilengkapi mandi rendam, totok wajah, dan lulur.", durationMinutes: 150, priceIdr: 445000, category: "SIGNATURE SPA PACKAGE" },
];

export const ADD_ONS = [
  { id: "AO-01", name: "Totok Wajah by Sensatia Botanicals", durationMinutes: 30, priceIdr: 100000 },
  { id: "AO-02", name: "Aroma Essential Oil", durationMinutes: 0, priceIdr: 25000 },
  { id: "AO-03", name: "Dry Cupping", durationMinutes: 0, priceIdr: 100000 },
  { id: "AO-04", name: "Ratus", durationMinutes: 0, priceIdr: 125000 },
  { id: "AO-05", name: "Bath Bomb (during treatment)", durationMinutes: 0, priceIdr: 20000 },
  { id: "AO-06", name: "Bath Bomb (to take home)", durationMinutes: 0, priceIdr: 30000 },
];

export const THERAPISTS = [
  { id: "TH-01", name: "Ayu", expertise: "Specialist" },
  { id: "TH-02", name: "Bima", expertise: "Senior" },
  { id: "TH-03", name: "Citra", expertise: "Specialist" }
];

export const ROOMS = [
  { id: "RM-01", name: "Twilight Room 1" },
  { id: "RM-02", name: "Twilight Room 2" },
  { id: "RM-03", name: "VIP Sanctuary" }
];
